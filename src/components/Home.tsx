import React from 'react';
import { Camera, Layers, BookOpen, FlaskConical, Settings, Sparkles, Atom, ChevronRight, Gamepad2, ShieldAlert } from 'lucide-react';
import { AppTab } from '../types';

interface HomeProps {
  setActiveTab: (tab: AppTab) => void;
  savedSamplesCount: number;
  onOpenAiTutor: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, savedSamplesCount, onOpenAiTutor }) => {
  return (
    <div className="space-y-8 pb-20 md:pb-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-700 to-indigo-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold">
            <Atom className="w-4 h-4 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Trợ lý Hóa học & STEM THCS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ECO pH
          </h1>
          
          <p className="text-lg sm:text-xl text-emerald-100 font-medium">
            Camera thông minh hỗ trợ nhận diện màu chỉ thị acid–base, ước tính pH và đọc kết quả bằng giọng nói.
          </p>

          <p className="text-xs sm:text-sm text-slate-300 italic">
            "Nhận diện màu – Ước tính pH – Khám phá Hóa học"
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('camera')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-900 font-bold shadow-lg hover:bg-emerald-50 transition-all hover:scale-105"
            >
              <Camera className="w-5 h-5 text-emerald-600" />
              <span>BẮT ĐẦU PHÂN TÍCH</span>
            </button>

            <button
              onClick={onOpenAiTutor}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-emerald-600/40 backdrop-blur-md border border-white/30 text-white font-semibold hover:bg-emerald-600/60 transition-all"
            >
              <Sparkles className="w-5 h-5 text-emerald-300" />
              <span>Hỏi đáp cùng ECO AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scientific Disclaimer Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 shadow-xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
          <span className="font-bold">Lưu ý khoa học:</span> Giá trị pH được ứng dụng ước tính dựa trên màu sắc của chất chỉ thị và điều kiện ánh sáng camera. Kết quả có tính chất tham khảo cho học tập và thí nghiệm STEM, không thay thế cho thiết bị đo pH điện tử chuyên dụng.
        </div>
      </div>

      {/* 5 Main Functions Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-between">
          <span>Chức năng chính</span>
          <span className="text-xs font-semibold text-slate-500">Dành cho học sinh & giáo viên KHTN</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* 1. Nhận diện pH */}
          <div 
            onClick={() => setActiveTab('camera')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">1. Nhận diện pH</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Chụp ảnh giấy chỉ thị hoặc dung dịch, tự động phân tích RGB/LAB, ước tính pH và đọc kết quả tiếng Việt.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
              <span>Mở camera ngay</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 2. Kho mẫu thử */}
          <div 
            onClick={() => setActiveTab('library')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">2. Kho mẫu thử</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 font-bold">{savedSamplesCount} mẫu</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lưu trữ lịch sử các lần đo, ghi chú, so sánh nhiều mẫu thử với biểu đồ trực quan và xuất dữ liệu.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Xem kho mẫu</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 3. Khám phá kiến thức */}
          <div 
            onClick={() => setActiveTab('knowledge')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">3. Khám phá kiến thức</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thư viện 12 bài học Hóa học THCS chuẩn IUPAC, giải thích chi tiết chất chỉ thị, thang pH và làm mini quiz.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Đọc bài học</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 4. Thực hành thí nghiệm */}
          <div 
            onClick={() => setActiveTab('experiments')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">4. Thực hành thí nghiệm</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Nhiệm vụ STEM thực tế: kiểm tra nước chanh, nước lọc, sodium hydroxide, tự tạo chất chỉ thị từ bắp cải tím.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
              <span>Bắt đầu thí nghiệm</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 5. Mini Game Thợ săn pH */}
          <div 
            onClick={() => setActiveTab('minigame')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">5. Thợ săn pH (Mini Game)</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thử tài phán đoán môi trường acid, trung tính hay base qua các mẫu màu ngẫu nhiên để tích lũy điểm thưởng.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
              <span>Chơi game ngay</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* 6. Cài đặt & Hiệu chuẩn màu */}
          <div 
            onClick={() => setActiveTab('calibration')}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-400 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">6. Hiệu chuẩn màu & Cài đặt</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tạo bảng màu chuẩn cá nhân hóa cho từng loại giấy quỳ, camera hoặc chất chỉ thị tự chế và chế độ giáo viên.
              </p>
            </div>
            <div className="mt-6 flex items-center text-sm font-semibold text-slate-700 group-hover:translate-x-1 transition-transform">
              <span>Cấu hình</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
