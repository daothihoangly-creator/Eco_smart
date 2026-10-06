import React, { useState } from 'react';
import { BookOpen, Search, ArrowLeft, CheckCircle2, Award, Sparkles, HelpCircle, ChevronRight, X } from 'lucide-react';
import { KNOWLEDGE_ARTICLES } from '../data/knowledge';
import { KnowledgeArticle } from '../types';
import { speakVietnamese } from '../utils/speech';
import { MathView } from './MathView';

interface KnowledgeLibraryProps {
  onBackHome: () => void;
  soundEnabled: boolean;
}

export function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g);
  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      const math = part.slice(2, -2);
      return <div key={index} className="my-2 text-center overflow-x-auto py-2"><MathView math={math} display={true} /></div>;
    } else if (part.startsWith('$') && part.endsWith('$')) {
      const math = part.slice(1, -1);
      return <MathView key={index} math={math} />;
    } else {
      const subParts = part.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={index}>
          {subParts.map((sub, sIdx) => {
            if (sub.startsWith('**') && sub.endsWith('**')) {
              return <strong key={sIdx} className="font-bold text-slate-900">{sub.slice(2, -2)}</strong>;
            }
            return sub;
          })}
        </span>
      );
    }
  });
}

export const KnowledgeLibrary: React.FC<KnowledgeLibraryProps> = ({ onBackHome, soundEnabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<KnowledgeArticle | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  const categories = ['all', 'Cơ bản', 'Đời sống', 'Chuyên sâu', 'STEM'];

  const filteredArticles = KNOWLEDGE_ARTICLES.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSelectQuizOption = (articleId: string, optionIndex: number) => {
    if (quizSubmitted[articleId]) return;
    setQuizAnswers({ ...quizAnswers, [articleId]: optionIndex });
  };

  const handleSubmitQuiz = (article: KnowledgeArticle) => {
    setQuizSubmitted({ ...quizSubmitted, [article.id]: true });
    const chosen = quizAnswers[article.id];
    const isCorrect = chosen === article.quiz.correctAnswer;
    if (soundEnabled) {
      if (isCorrect) {
        speakVietnamese('Chính xác! Bạn đã trả lời đúng câu hỏi trắc nghiệm.');
      } else {
        speakVietnamese('Chưa chính xác. Hãy đọc lại giải thích để nắm vững kiến thức nhé.');
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
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
            <BookOpen className="w-7 h-7 text-indigo-600" />
            <span>KHÁM PHÁ KIẾN THỨC HÓA HỌC ({KNOWLEDGE_ARTICLES.length} bài)</span>
          </h2>
          <p className="text-xs text-slate-500">Thư viện bài học chuẩn THCS, công thức LaTeX & danh pháp IUPAC</p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài học, công thức..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map(article => (
          <div
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-indigo-800 shadow-xs">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-xs">
                    ⏱ {article.readingTime}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-700 transition-colors line-clamp-1">
                  {renderFormattedText(article.title)}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{renderFormattedText(article.subtitle)}</p>
              </div>
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
              <span>Đọc chi tiết bài học</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{activeArticle.category}</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-1">
                  {renderFormattedText(activeArticle.title)}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden aspect-video shadow-sm">
              <img src={activeArticle.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content text with LaTeX rendering */}
            <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
              {activeArticle.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-700">{renderFormattedText(paragraph)}</p>
              ))}
            </div>

            {/* IUPAC Chemistry terms box */}
            {activeArticle.iupacTerms && activeArticle.iupacTerms.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-extrabold text-emerald-900 text-sm flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Thuật ngữ Hóa học & Công thức LaTeX:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeArticle.iupacTerms.map((term, i) => (
                    <div key={i} className="bg-white p-3.5 rounded-xl border border-emerald-100 shadow-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">{term.term}</span>
                        <span className="text-xs font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded-lg">
                          {renderFormattedText(term.formula)}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 font-medium">Tên thông dụng: {term.common}</p>
                      <p className="text-xs text-slate-600 pt-1">{renderFormattedText(term.description)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Quiz Box */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center space-x-2 text-indigo-900 font-extrabold text-base">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                <span>Câu hỏi trắc nghiệm củng cố kiến thức</span>
              </div>

              <p className="text-sm font-bold text-slate-900">{renderFormattedText(activeArticle.quiz.question)}</p>

              <div className="space-y-2">
                {activeArticle.quiz.options.map((opt, optIdx) => {
                  const chosen = quizAnswers[activeArticle.id] === optIdx;
                  const submitted = quizSubmitted[activeArticle.id];
                  const isCorrectAnswer = optIdx === activeArticle.quiz.correctAnswer;

                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-indigo-100/50';
                  if (chosen) btnStyle = 'bg-indigo-600 text-white border-indigo-600 font-bold';
                  if (submitted) {
                    if (isCorrectAnswer) btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                    else if (chosen) btnStyle = 'bg-red-600 text-white border-red-600 font-bold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuizOption(activeArticle.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{renderFormattedText(opt)}</span>
                      {submitted && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted[activeArticle.id] ? (
                <button
                  onClick={() => handleSubmitQuiz(activeArticle)}
                  disabled={quizAnswers[activeArticle.id] === undefined}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 shadow-md"
                >
                  Kiểm tra đáp án
                </button>
              ) : (
                <div className={`p-4 rounded-xl text-sm font-medium ${
                  quizAnswers[activeArticle.id] === activeArticle.quiz.correctAnswer ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                }`}>
                  <span className="font-bold">Giải thích: </span>
                  {renderFormattedText(activeArticle.quiz.explanation)}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
              >
                Đóng bài học
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
