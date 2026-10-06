import React from 'react';
import { Volume2, BookmarkPlus, Camera, BookOpen, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Sample } from '../types';
import { speakVietnamese } from '../utils/speech';

interface ResultViewProps {
  sample: Omit<Sample, 'id' | 'timestamp'>;
  onSave: (sampleData: Omit<Sample, 'id' | 'timestamp'>) => void;
  onRetake: () => void;
  onExploreKnowledge: () => void;
  onBackHome: () => void;
  soundEnabled: boolean;
}

export const ResultView: React.FC<ResultViewProps> = ({
  sample,
  onSave,
  onRetake,
  onExploreKnowledge,
  onBackHome,
  soundEnabled
}) => {
  const [saved, setSaved] = React.useState(false);

  const envColorMap = {
    acid: 'bg-red-500 text-white border-red-200',
    neutral: 'bg-emerald-500 text-white border-emerald-200',
    base: 'bg-blue-600 text-white border-blue-200'
  };

  const envTextMap = {
    acid: 'MÔI TRƯỜNG ACID',
    neutral: 'MÔI TRƯỜNG TRUNG TÍNH',
    base: 'MÔI TRƯỜNG BASE (KIỀM)'
  };

  const strengthDescription = () => {
    const pH = sample.estimatedPH;
    if (pH < 3) return 'Acid mạnh';
    if (pH < 7) return 'Acid yếu / trung bình';
    if (pH === 7) return 'Trung tính hoàn toàn';
    if (pH < 11) return 'Base yếu / trung bình';
    return 'Base mạnh';
  };

  const handleSpeak = () => {
    const envText = sample.environment === 'acid' ? 'môi trường acid' : sample.environment === 'base' ? 'môi trường base' : 'môi trường trung tính';
    const text = `Kết quả phân tích: giá trị P H khoảng ${sample.estimatedPH.toFixed(1).replace('.', ' phẩy ')}. Mẫu thử có ${envText}. Màu nhận diện là ${sample.detectedColor}. Độ tin cậy ${sample.confidence} phần trăm.`;
    speakVietnamese(text);
  };

  const handleSaveSample = () => {
    if (!saved) {
      onSave(sample);
      setSaved(true);
      if (soundEnabled) {
        speakVietnamese('Đã lưu mẫu thành công vào kho mẫu thử.');
      }
    }
  };

  // Calculate marker percentage for 0-14 pH bar
  const markerPercent = Math.max(0, Math.min(100, (sample.estimatedPH / 14) * 100));

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </button>
        <h2 className="text-xl font-extrabold text-slate-900">KẾT QUẢ PHÂN TÍCH pH</h2>
        <div className="w-20"></div>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Thumbnail & Color preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-sm">
            <img src={sample.image} alt={sample.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-bold">
              {sample.name}
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-block">
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${envColorMap[sample.environment]}`}>
                {envTextMap[sample.environment]}
              </span>
            </div>

            <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              pH ≈ {sample.estimatedPH.toFixed(1)}
            </div>

            <div className="text-sm font-semibold text-slate-600">
              Mức độ: <span className="text-emerald-700 font-bold">{strengthDescription()}</span>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">Màu nhận diện</span>
            <div className="flex items-center space-x-2">
              <div 
                className="w-5 h-5 rounded-full border border-slate-300 shadow-xs shrink-0" 
                style={{ backgroundColor: `rgb(${sample.rgb[0]}, ${sample.rgb[1]}, ${sample.rgb[2]})` }}
              ></div>
              <span className="text-sm font-bold text-slate-800">{sample.detectedColor}</span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-xs text-slate-500 font-medium">Độ tin cậy ước tính</span>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${sample.confidence}%` }}></div>
              </div>
              <span className="text-sm font-bold text-emerald-700">{sample.confidence}%</span>
            </div>
          </div>
        </div>

        {/* pH Scale Bar (0 -> 14) */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold text-slate-500">
            <span>0 (Acid mạnh)</span>
            <span>7 (Trung tính)</span>
            <span>14 (Base mạnh)</span>
          </div>

          <div className="relative h-6 rounded-xl bg-gradient-to-r from-red-600 via-yellow-400 via-emerald-500 via-blue-600 to-purple-800 shadow-inner p-1">
            {/* Marker */}
            <div 
              className="absolute -top-1 w-4 h-8 bg-white border-2 border-slate-900 rounded-md shadow-lg flex items-center justify-center -translate-x-1/2 transition-all duration-500"
              style={{ left: `${markerPercent}%` }}
              title={`pH ${sample.estimatedPH}`}
            >
              <div className="w-1.5 h-4 bg-slate-900 rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Vị trí trên thang đo: pH {sample.estimatedPH.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Explanation Note */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 leading-relaxed">
          <span className="font-bold">Giải thích Hóa học:</span> {sample.estimatedPH < 7 ? 'Giá trị pH nhỏ hơn 7 cho thấy dung dịch chứa nhiều ion H⁺, biểu thị môi trường acid.' : sample.estimatedPH > 7 ? 'Giá trị pH lớn hơn 7 cho thấy dung dịch chứa nhiều ion OH⁻, biểu thị môi trường base (kiềm).' : 'Giá trị pH bằng 7 cho thấy nồng độ ion H⁺ cân bằng với OH⁻, tạo môi trường trung tính.'}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={handleSpeak}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors border border-emerald-200"
          >
            <Volume2 className="w-5 h-5 text-emerald-600" />
            <span>🔊 NGHE KẾT QUẢ</span>
          </button>

          <button
            onClick={handleSaveSample}
            disabled={saved}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl font-bold transition-all shadow-md ${
              saved ? 'bg-emerald-600 text-white cursor-default' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            <BookmarkPlus className="w-5 h-5" />
            <span>{saved ? '✓ ĐÃ LƯU MẪU' : '💾 LƯU VÀO KHO'}</span>
          </button>

          <button
            onClick={onRetake}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors"
          >
            <Camera className="w-5 h-5 text-slate-600" />
            <span>📷 PHÂN TÍCH LẠI</span>
          </button>

          <button
            onClick={onExploreKnowledge}
            className="flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors border border-indigo-200"
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>📚 TÌM HIỂU THÊM</span>
          </button>
        </div>
      </div>
    </div>
  );
};
