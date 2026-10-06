import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, ArrowLeft, Zap, Sparkles, AlertCircle, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { IndicatorType, Sample } from '../types';
import { analyzeSampleColor } from '../utils/colorAnalysis';
import { speakVietnamese } from '../utils/speech';

interface CameraCaptureProps {
  onCaptureResult: (sample: Omit<Sample, 'id' | 'timestamp'>) => void;
  onBack: () => void;
  soundEnabled: boolean;
  customCalibration?: any[];
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCaptureResult,
  onBack,
  soundEnabled,
  customCalibration
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [indicatorType, setIndicatorType] = useState<IndicatorType>('universal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } else {
        setCameraError('Trình duyệt không hỗ trợ truy cập Camera API hoặc đang chạy trong môi trường không bảo mật (HTTP). Bạn vẫn có thể dùng các mẫu thử sẵn có.');
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Không thể mở camera (vui lòng cấp quyền truy cập camera trong cài đặt trình duyệt). Bạn có thể chọn nhanh mẫu thử bên dưới.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    setIsAnalyzing(true);

    setTimeout(() => {
      const analysis = analyzeSampleColor(imageData, indicatorType, customCalibration);
      
      const sampleNameMap: Record<IndicatorType, string> = {
        universal: `Mẫu thử vạn năng (pH ~${analysis.estimatedPH})`,
        litmus: `Giấy quỳ tím (${analysis.environment === 'acid' ? 'Acid' : analysis.environment === 'base' ? 'Base' : 'Trung tính'})`,
        phenolphthalein: `Phenolphthalein (pH ~${analysis.estimatedPH})`,
        methyl_orange: `Methyl orange (pH ~${analysis.estimatedPH})`,
        homemade: `Mẫu chỉ thị tự chế (pH ~${analysis.estimatedPH})`
      };

      if (soundEnabled) {
        const envText = analysis.environment === 'acid' ? 'môi trường acid' : analysis.environment === 'base' ? 'môi trường base' : 'môi trường trung tính';
        speakVietnamese(`Kết quả phân tích: giá trị P H khoảng ${analysis.estimatedPH.toFixed(1).replace('.', ' phẩy ')}. Mẫu thử có ${envText}.`);
      }

      setIsAnalyzing(false);
      onCaptureResult({
        name: sampleNameMap[indicatorType],
        image: dataUrl,
        indicatorType,
        estimatedPH: analysis.estimatedPH,
        environment: analysis.environment,
        detectedColor: analysis.detectedColor,
        rgb: analysis.rgb,
        hsv: analysis.hsv,
        lab: analysis.lab,
        confidence: analysis.confidence,
        note: `Phân tích tự động bằng ECO pH (Ánh sáng: ${analysis.lightingCheck.quality})`
      });
    }, 600);
  };

  // Quick preset test helper if camera is blocked
  const handleQuickPresetTest = (presetPH: number, presetName: string, presetColor: [number, number, number], presetEnv: 'acid' | 'neutral' | 'base') => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = `rgb(${presetColor[0]}, ${presetColor[1]}, ${presetColor[2]})`;
      ctx.fillRect(0, 0, 300, 300);
    }
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    if (soundEnabled) {
      const envText = presetEnv === 'acid' ? 'môi trường acid' : presetEnv === 'base' ? 'môi trường base' : 'môi trường trung tính';
      speakVietnamese(`Kết quả kiểm tra mẫu giả lập: giá trị P H ${presetPH.toFixed(1).replace('.', ' phẩy ')}. Mẫu thử có ${envText}.`);
    }

    onCaptureResult({
      name: presetName,
      image: dataUrl,
      indicatorType,
      estimatedPH: presetPH,
      environment: presetEnv,
      detectedColor: presetEnv === 'acid' ? 'Cam đỏ' : presetEnv === 'base' ? 'Xanh dương' : 'Xanh lá cây',
      rgb: presetColor,
      hsv: [20, 80, 80],
      lab: [60, 20, 10],
      confidence: 95,
      note: 'Mẫu thử giả lập kiểm tra nhanh hệ thống.'
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl font-extrabold text-slate-900">NHẬN DIỆN pH QUA CAMERA</h2>
          <p className="text-xs text-slate-500">Đặt giấy chỉ thị vào khung ngắm để phân tích màu</p>
        </div>

        <button
          onClick={() => setFacingMode(facingMode === 'environment' ? 'user' : 'environment')}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          title="Đổi camera trước/sau"
        >
          <RefreshCw className="w-5 h-5 text-emerald-600" />
        </button>
      </div>

      {/* Indicator Selector */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          Chọn loại chất chỉ thị:
        </label>
        <select
          value={indicatorType}
          onChange={(e) => setIndicatorType(e.target.value as IndicatorType)}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="universal">Giấy chỉ thị vạn năng (Thang đo 0 – 14)</option>
          <option value="litmus">Giấy quỳ tím (Xác định Acid / Trung tính / Base)</option>
          <option value="phenolphthalein">Chỉ thị Phenolphthalein (Vùng kiềm pH 8.2 – 10)</option>
          <option value="methyl_orange">Chỉ thị Methyl orange (Vùng acid pH 3.1 – 4.4)</option>
          <option value="homemade">Chỉ thị tự chế (Bắp cải tím / Hoa đậu biếc)</option>
        </select>
      </div>

      {/* Camera Viewport or Error */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 shadow-xl aspect-[4/3] flex items-center justify-center">
        {cameraError ? (
          <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center bg-slate-900/90 text-white space-y-4">
            <AlertCircle className="w-12 h-12 text-amber-400 animate-bounce" />
            <p className="text-sm text-slate-200 max-w-md">{cameraError}</p>
            <div className="pt-2">
              <span className="text-xs text-slate-400 block mb-2 font-semibold uppercase tracking-wider">Hoặc chọn nhanh mẫu kiểm thử giả lập:</span>
              <div className="flex flex-wrap justify-center gap-2">
                <button 
                  onClick={() => handleQuickPresetTest(2.5, 'Nước chanh (pH 2.5)', [220, 50, 40], 'acid')}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  pH 2.5 (Chanh)
                </button>
                <button 
                  onClick={() => handleQuickPresetTest(7.0, 'Nước cất (pH 7.0)', [60, 175, 110], 'neutral')}
                  className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  pH 7.0 (Nước cất)
                </button>
                <button 
                  onClick={() => handleQuickPresetTest(9.5, 'Nước xà phòng (pH 9.5)', [40, 120, 210], 'base')}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow"
                >
                  pH 9.5 (Xà phòng)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        )}

        {/* Target Guide Box Overlay */}
        {!cameraError && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-6">
            <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-dashed border-emerald-400 rounded-3xl bg-emerald-500/10 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center shadow-2xl relative">
              <div className="absolute -top-3 px-3 py-0.5 bg-emerald-600 text-white text-[11px] font-bold rounded-full shadow">
                ĐẶT MẪU VÀO ĐÂY
              </div>
              <div className="w-8 h-8 rounded-full border border-emerald-300 flex items-center justify-center text-emerald-200">
                +
              </div>
            </div>

            <div className="absolute bottom-6 bg-slate-900/80 backdrop-blur-md text-white text-xs px-4 py-2 rounded-xl border border-white/20 text-center space-y-0.5">
              <p className="font-semibold text-emerald-300">💡 Hướng dẫn ánh sáng:</p>
              <p className="text-slate-300">Tránh ánh sáng chói lóa trực tiếp & giữ camera ổn định.</p>
            </div>
          </div>
        )}

        {/* Analyzing Overlay Spinner */}
        {isAnalyzing && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-white space-y-3 z-30">
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            <p className="font-bold text-lg animate-pulse">Đang phân tích quang phổ màu & ước tính pH...</p>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Capture Action Button */}
      {!cameraError && (
        <div className="flex justify-center pt-2">
          <button
            onClick={handleCapture}
            disabled={isAnalyzing}
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 text-white font-extrabold text-lg shadow-xl shadow-emerald-500/30 hover:scale-105 transition-transform disabled:opacity-50"
          >
            <Camera className="w-6 h-6 animate-pulse" />
            <span>CHỤP VÀ PHÂN TÍCH MẪU</span>
          </button>
        </div>
      )}
    </div>
  );
};
