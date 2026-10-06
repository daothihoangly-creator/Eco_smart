import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, User, Atom } from 'lucide-react';
import { ChatMessage } from '../types';
import { speakVietnamese } from '../utils/speech';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({ isOpen, onClose, soundEnabled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      role: 'model',
      text: 'Xin chào! Mình là ECO AI – gia sư Hóa học thông thái của bạn. Bạn có thắc mắc gì về chất chỉ thị, thang pH hay các thí nghiệm khoa học tự nhiên không?',
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, history: historyPayload })
      });

      const data = await response.json();
      const replyText = data.reply || 'ECO AI chưa nhận được phản hồi phù hợp.';

      const aiMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'model',
        text: replyText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMsg]);
      if (soundEnabled) {
        speakVietnamese(replyText);
      }
    } catch (err) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: 'Xin lỗi, kết nối tới ECO AI đang gặp sự cố nhỏ. Bạn hãy thử lại sau nhé!',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    'Chất chỉ thị là gì?',
    'Vì sao quỳ tím chuyển đỏ trong acid?',
    'Tại sao phenolphthalein chuyển hồng trong base?',
    'pH bằng 7 có nghĩa là gì?'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-indigo-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-extrabold text-base">ECO AI - Gia sư Hóa học</h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Gemini 2.5</span>
              </div>
              <p className="text-xs text-indigo-100">Giải đáp thắc mắc Hóa học THCS & STEM 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex items-start space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                m.role === 'user' ? 'bg-indigo-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md'
              }`}>
                {m.role === 'user' ? <User className="w-5 h-5" /> : <Atom className="w-5 h-5" />}
              </div>

              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Atom className="w-5 h-5 animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-slate-500 text-sm flex items-center space-x-2">
                <span>ECO AI đang suy nghĩ câu trả lời...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2 overflow-x-auto shrink-0">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s)}
              className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors whitespace-nowrap shrink-0 border border-indigo-100"
            >
              ✨ {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Nhập câu hỏi về hóa học, pH, chất chỉ thị..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-95 transition-opacity disabled:opacity-50 shadow-md flex items-center space-x-1"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Gửi</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
