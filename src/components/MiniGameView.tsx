import React, { useState } from 'react';
import { Gamepad2, ArrowLeft, Award, Sparkles, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { EnvironmentType } from '../types';
import { speakVietnamese } from '../utils/speech';

interface MiniGameViewProps {
  onBackHome: () => void;
  soundEnabled: boolean;
}

interface Question {
  color: [number, number, number];
  colorName: string;
  actualPH: number;
  environment: EnvironmentType;
  hint: string;
}

const QUESTIONS: Question[] = [
  { color: [220, 50, 40], colorName: 'Đỏ đậm', actualPH: 2.0, environment: 'acid', hint: 'Màu sắc đặc trưng của nước chanh hoặc giấm ăn.' },
  { color: [235, 110, 40], colorName: 'Cam sáng', actualPH: 4.0, environment: 'acid', hint: 'Thường thấy ở dung dịch axit yếu hoặc trái cây chua.' },
  { color: [60, 175, 110], colorName: 'Xanh lá cây', actualPH: 7.0, environment: 'neutral', hint: 'Màu của nước cất tinh khiết ở 25°C.' },
  { color: [30, 150, 160], colorName: 'Xanh mòng két', actualPH: 8.5, environment: 'base', hint: 'Môi trường kiềm nhẹ của dung dịch baking soda.' },
  { color: [110, 30, 140], colorName: 'Tím đậm', actualPH: 12.0, environment: 'base', hint: 'Dung dịch kiềm mạnh như sodium hydroxide loãng.' },
  { color: [200, 40, 30], colorName: 'Đỏ thẫm', actualPH: 1.0, environment: 'acid', hint: 'Tính axit rất mạnh.' }
];

export const MiniGameView: React.FC<MiniGameViewProps> = ({ onBackHome, soundEnabled }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<EnvironmentType | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleGuess = (env: EnvironmentType) => {
    if (isAnswered) return;
    setSelectedAnswer(env);
    setIsAnswered(true);

    const correct = env === currentQ.environment;
    if (correct) {
      setScore(score + 10);
      setStreak(streak + 1);
      if (soundEnabled) speakVietnamese('Chính xác! Bạn thật là một thợ săn pH xuất sắc.');
    } else {
      setStreak(0);
      if (soundEnabled) speakVietnamese('Chưa chính xác rồi. Hãy thử câu tiếp theo nhé.');
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < QUESTIONS.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setGameOver(true);
      if (soundEnabled) speakVietnamese(`Trò chơi kết thúc. Tổng số điểm của bạn là ${score + (selectedAnswer === currentQ.environment ? 10 : 0)} điểm.`);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameOver(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </button>

        <div className="text-center">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center justify-center space-x-2">
            <Gamepad2 className="w-6 h-6 text-purple-600" />
            <span>THỢ SĂN pH</span>
          </h2>
          <p className="text-xs text-slate-500">Trò chơi phán đoán môi trường qua màu sắc</p>
        </div>

        <div className="bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200 text-purple-900 font-extrabold text-xs">
          ⭐ Điểm: {score}
        </div>
      </div>

      {gameOver ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-6 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900">Hoàn thành xuất sắc!</h3>
            <p className="text-sm text-slate-600">Bạn đã hoàn thành các thử thách nhận diện môi trường pH.</p>
            <div className="text-3xl font-black text-purple-700 pt-2">Tổng điểm: {score} điểm</div>
          </div>

          <button
            onClick={handleRestart}
            className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-2xl bg-purple-600 text-white font-extrabold hover:bg-purple-700 shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Chơi lại từ đầu</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Câu hỏi {currentIndex + 1} / {QUESTIONS.length}</span>
            <span>🔥 Chuỗi đúng liên tiếp: {streak}</span>
          </div>

          {/* Color Swatch Display */}
          <div className="space-y-3 text-center">
            <div 
              className="w-36 h-36 rounded-3xl mx-auto shadow-lg border-4 border-white ring-4 ring-slate-100 transition-transform duration-500 hover:scale-105"
              style={{ backgroundColor: `rgb(${currentQ.color.join(',')})` }}
            ></div>
            <div className="text-sm font-bold text-slate-800">Màu nhận diện: <span className="text-indigo-600">{currentQ.colorName}</span></div>
            <p className="text-xs text-slate-500 italic">💡 Gợi ý: {currentQ.hint}</p>
          </div>

          <h3 className="text-center font-extrabold text-slate-900 text-lg">
            Mẫu màu trên thuộc môi trường hóa học nào?
          </h3>

          {/* Guess Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleGuess('acid')}
              disabled={isAnswered}
              className={`p-4 rounded-2xl font-extrabold text-sm border transition-all ${
                isAnswered
                  ? currentQ.environment === 'acid'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : selectedAnswer === 'acid'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-red-50 text-red-800 border-red-200 hover:bg-red-100'
              }`}
            >
              🍋 ACID (pH &lt; 7)
            </button>

            <button
              onClick={() => handleGuess('neutral')}
              disabled={isAnswered}
              className={`p-4 rounded-2xl font-extrabold text-sm border transition-all ${
                isAnswered
                  ? currentQ.environment === 'neutral'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : selectedAnswer === 'neutral'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              💧 TRUNG TÍNH (pH = 7)
            </button>

            <button
              onClick={() => handleGuess('base')}
              disabled={isAnswered}
              className={`p-4 rounded-2xl font-extrabold text-sm border transition-all ${
                isAnswered
                  ? currentQ.environment === 'base'
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : selectedAnswer === 'base'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                  : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
              }`}
            >
              🧼 BASE / KIỀM (pH &gt; 7)
            </button>
          </div>

          {isAnswered && (
            <div className="space-y-4 pt-2">
              <div className={`p-4 rounded-2xl text-center font-bold text-sm ${
                selectedAnswer === currentQ.environment ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
              }`}>
                {selectedAnswer === currentQ.environment ? '🎉 Chính xác tuyệt vời!' : `❌ Chưa đúng. Đáp án đúng là môi trường ${currentQ.environment.toUpperCase()} (pH thực tế ≈ ${currentQ.actualPH}).`}
              </div>

              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 shadow-lg"
              >
                Tiếp tục câu hỏi tiếp theo →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
