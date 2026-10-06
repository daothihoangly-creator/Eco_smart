import React, { useState } from 'react';
import { Settings, ArrowLeft, Plus, Trash2, CheckCircle2, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';
import { CalibrationColor, IndicatorType } from '../types';
import { speakVietnamese } from '../utils/speech';

interface CalibrationViewProps {
  customCalibration: CalibrationColor[];
  onAddCalibration: (color: CalibrationColor) => void;
  onDeleteCalibration: (id: string) => void;
  onBackHome: () => void;
  soundEnabled: boolean;
}

export const CalibrationView: React.FC<CalibrationViewProps> = ({
  customCalibration,
  onAddCalibration,
  onDeleteCalibration,
  onBackHome,
  soundEnabled
}) => {
  const [indicatorType, setIndicatorType] = useState<IndicatorType>('homemade');
  const [pHValue, setPHValue] = useState<number>(7.0);
  const [colorHex, setColorHex] = useState<string>('#3b82f6');
  const [teacherMode, setTeacherMode] = useState(false);
  const [className, setClassName] = useState('Lớp 8A1 - Hóa học STEM');

  const handleAddCustomColor = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert hex to rgb
    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);

    const newCalib: CalibrationColor = {
      id: `calib-${Date.now()}`,
      indicatorType,
      pH: pHValue,
      rgb: [r, g, b],
      hsv: [0, 80, 80],
      lab: [50, 20, 20],
      timestamp: Date.now()
    };

    onAddCalibration(newCalib);
    if (soundEnabled) {
      speakVietnamese(`Đã thêm màu chuẩn cho pH ${pHValue} thành công.`);
    }
    alert(`Đã lưu màu chuẩn cho pH ${pHValue} thành công!`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </button>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <Settings className="w-7 h-7 text-slate-700" />
            <span>CÀI ĐẶT & HIỆU CHUẨN MÀU</span>
          </h2>
          <p className="text-xs text-slate-500">Tùy chỉnh bảng màu chuẩn và chế độ giáo viên KHTN</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setTeacherMode(!teacherMode)}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
              teacherMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Chế độ giáo viên</span>
          </button>
        </div>
      </div>

      {teacherMode && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-lg">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            <span>BẢNG ĐIỀU KHIỂN GIÁO VIÊN HÓA HỌC STEM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-indigo-100 space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase">Tên lớp học / Nhóm thí nghiệm:</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="bg-white p-4 rounded-2xl border border-indigo-100 flex flex-col justify-center">
              <span className="text-xs font-bold text-slate-500 uppercase">Trạng thái lớp:</span>
              <span className="text-base font-extrabold text-emerald-700">Đang hoạt động • Sẵn sàng thu thập mẫu học sinh</span>
            </div>
          </div>
        </div>
      )}

      {/* Color Calibration Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Thêm màu chuẩn cho chất chỉ thị tự chế / giấy quỳ riêng</span>
          </h3>
          <p className="text-xs text-slate-500">Giúp ứng dụng thích nghi tuyệt đối với điều kiện ánh sáng và loại giấy quỳ của bạn.</p>
        </div>

        <form onSubmit={handleAddCustomColor} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Loại chỉ thị:</label>
            <select
              value={indicatorType}
              onChange={(e) => setIndicatorType(e.target.value as IndicatorType)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="homemade">Mẫu chỉ thị tự chế</option>
              <option value="litmus">Giấy quỳ tím</option>
              <option value="universal">Chỉ thị vạn năng</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Giá trị pH (0 - 14):</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="14"
              value={pHValue}
              onChange={(e) => setPHValue(parseFloat(e.target.value) || 7)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Chọn mẫu màu chuẩn:</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="w-12 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5 bg-slate-50"
              />
              <input
                type="text"
                value={colorHex}
                onChange={(e) => setColorHex(e.target.value)}
                className="flex-1 px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-slate-50 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Lưu màu chuẩn</span>
            </button>
          </div>
        </form>

        {/* Existing Custom Calibration List */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-bold text-slate-800">Danh sách màu hiệu chuẩn đã lưu ({customCalibration.length}):</h4>
          
          {customCalibration.length === 0 ? (
            <p className="text-xs text-slate-500 italic">Chưa có màu hiệu chuẩn riêng nào được thêm. Ứng dụng đang dùng bảng màu tiêu chuẩn hệ thống.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {customCalibration.map(item => (
                <div key={item.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-8 h-8 rounded-xl border border-slate-300 shadow-xs shrink-0"
                      style={{ backgroundColor: `rgb(${item.rgb.join(',')})` }}
                    ></div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">pH {item.pH.toFixed(1)}</span>
                      <span className="text-[11px] text-slate-500 uppercase">{item.indicatorType}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteCalibration(item.id)}
                    className="p-2 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
