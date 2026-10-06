import React, { useState } from 'react';
import { FlaskConical, ArrowLeft, CheckCircle2, ChevronRight, Camera, Sparkles, HelpCircle } from 'lucide-react';
import { ExperimentTask, AppTab } from '../types';
import { speakVietnamese } from '../utils/speech';

interface ExperimentsViewProps {
  setActiveTab: (tab: AppTab) => void;
  soundEnabled: boolean;
}

export const ExperimentsView: React.FC<ExperimentsViewProps> = ({ setActiveTab, soundEnabled }) => {
  const [tasks, setTasks] = useState<ExperimentTask[]>([
    {
      id: 'exp-1',
      title: 'Nhiệm vụ 1: Dự đoán pH nước chanh tươi',
      objective: 'Quan sát sự đổi màu của chất chỉ thị khi tiếp xúc với dung dịch nước chanh.',
      indicatorType: 'universal',
      suggestedMaterial: 'Nước cốt chanh tươi + Giấy chỉ thị vạn năng',
      expectedPH: 'pH ≈ 2.0 – 3.0',
      expectedEnvironment: 'acid',
      steps: [
        'Chuẩn bị nửa quả chanh tươi và vắt lấy nước cốt vào ly sạch.',
        'Nhúng một mẩu giấy chỉ thị vạn năng vào nước chanh trong 2 giây.',
        'Đặt giấy chỉ thị lên mặt phẳng sạch, đủ ánh sáng.',
        'Mở camera ECO pH để chụp và so sánh giá trị.'
      ],
      completed: false
    },
    {
      id: 'exp-2',
      title: 'Nhiệm vụ 2: Kiểm tra độ tinh khiết nước lọc',
      objective: 'Xác định xem nước sinh hoạt hoặc nước lọc đóng chai có đạt độ trung tính không.',
      indicatorType: 'universal',
      suggestedMaterial: 'Nước lọc / nước cất + Giấy chỉ thị',
      expectedPH: 'pH ≈ 6.5 – 7.5',
      expectedEnvironment: 'neutral',
      steps: [
        'Rót 50ml nước lọc vào một chiếc cốc thủy tinh sạch.',
        'Dùng kẹp gắp giấy chỉ thị nhúng vào nước.',
        'Chờ giấy đổi màu và đặt trên nền trắng.',
        'Sử dụng ECO pH để nhận diện màu sắc và xác định môi trường trung tính.'
      ],
      completed: false
    },
    {
      id: 'exp-3',
      title: 'Nhiệm vụ 3: Kiểm tra dung dịch kiềm (Sodium hydroxide)',
      objective: 'Nhận biết môi trường base mạnh bằng giấy quỳ hoặc chỉ thị vạn năng.',
      indicatorType: 'universal',
      suggestedMaterial: 'Dung dịch sodium hydroxide loãng (hoặc nước xà phòng)',
      expectedPH: 'pH &gt; 9.0',
      expectedEnvironment: 'base',
      steps: [
        'Pha loãng xà phòng hoặc dung dịch kiềm nhẹ theo hướng dẫn của giáo viên.',
        'Nhúng giấy chỉ thị vạn năng vào dung dịch.',
        'Quan sát màu sắc chuyển sang xanh dương hoặc tím.',
        'Chụp ảnh qua ứng dụng để ghi nhận giá trị pH.'
      ],
      completed: false
    },
    {
      id: 'exp-4',
      title: 'Nhiệm vụ 4: Tự chế tạo chất chỉ thị từ bắp cải tím',
      objective: 'Trải nghiệm làm chất chỉ thị tự nhiên STEM tại nhà bằng bắp cải tím.',
      indicatorType: 'homemade',
      suggestedMaterial: 'Lá bắp cải tím + Nước nóng + Lọc lấy dịch',
      expectedPH: 'Thay đổi từ đỏ sang xanh và vàng theo pH',
      expectedEnvironment: 'acid',
      steps: [
        'Thái nhỏ vài lá bắp cải tím, cho vào cốc và đổ nước sôi ngập lá.',
        'Ngâm khoảng 10-15 phút cho đến khi nước có màu tím đậm (chứa anthocyanin).',
        'Lọc lấy dịch nước bắp cải tím.',
        'Thử lần lượt với giấm ăn (acid), nước lọc (trung tính) và xà phòng (base).'
      ],
      completed: false
    },
    {
      id: 'exp-5',
      title: 'Nhiệm vụ 5: Tự chế tạo chất chỉ thị từ khoai lang tím',
      objective: 'Khám phá sắc tố anthocyanin từ củ khoai lang tím để nhận biết môi trường acid–base.',
      indicatorType: 'homemade',
      suggestedMaterial: 'Củ khoai lang tím + Nước cất + Lọc lấy dịch chiết',
      expectedPH: 'Đỏ hồng (acid) đến xanh lá / vàng (base)',
      expectedEnvironment: 'acid',
      steps: [
        'Gọt vỏ một củ khoai lang tím, thái nhỏ thành các lát mỏng.',
        'Đun sôi với nước cất khoảng 10–15 phút đến khi dung dịch chuyển sang màu tím đậm.',
        'Lọc bỏ bã khoai qua rây sạch để thu lấy dung dịch chỉ thị khoai lang tím.',
        'Nhỏ dung dịch vào các ống nghiệm chứa chanh, nước cất và xà phòng, sau đó chụp ảnh bằng ECO pH.'
      ],
      completed: false
    }
  ]);

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextState = !t.completed;
        if (nextState && soundEnabled) {
          speakVietnamese('Chúc mừng bạn đã hoàn thành nhiệm vụ thí nghiệm STEM!');
        }
        return { ...t, completed: nextState };
      }
      return t;
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </button>

        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-slate-900 flex items-center space-x-2">
            <FlaskConical className="w-7 h-7 text-amber-600" />
            <span>THỰC HÀNH THÍ NGHIỆM STEM ({tasks.filter(t => t.completed).length}/{tasks.length})</span>
          </h2>
          <p className="text-xs text-slate-500">Nhiệm vụ thực hành hóa học thực tế dành cho học sinh THCS và giáo viên</p>
        </div>
      </div>

      {/* Task Cards */}
      <div className="space-y-5">
        {tasks.map(task => (
          <div
            key={task.id}
            className={`bg-white rounded-3xl border transition-all shadow-sm p-6 space-y-4 ${
              task.completed ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">Thí nghiệm STEM</span>
                  {task.completed && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Đã hoàn thành</span>
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{task.title}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveTab('camera')}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>Chụp mẫu ngay</span>
                </button>

                <button
                  onClick={() => toggleComplete(task.id)}
                  className={`px-4 py-2 rounded-xl font-bold text-sm transition-colors border ${
                    task.completed ? 'bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  }`}
                >
                  {task.completed ? 'Hoàn tác' : '✓ Đã làm xong'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Mục tiêu thí nghiệm:</span>
                <span className="font-bold text-slate-800">{task.objective}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Vật liệu gợi ý:</span>
                <span className="font-bold text-emerald-700">{task.suggestedMaterial}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Kết quả dự kiến:</span>
                <span className="font-bold text-indigo-700" dangerouslySetInnerHTML={{ __html: task.expectedPH }}></span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Quy trình thực hiện:</span>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-700">
                {task.steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
