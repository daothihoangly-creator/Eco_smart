import React from 'react';
import { Camera, Layers, BookOpen, FlaskConical, Home } from 'lucide-react';
import { AppTab } from '../types';

interface MobileNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'home' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Trang chủ</span>
        </button>

        <button
          onClick={() => setActiveTab('camera')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'camera' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Camera className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Nhận diện</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'library' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kho mẫu</span>
        </button>

        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'knowledge' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kiến thức</span>
        </button>

        <button
          onClick={() => setActiveTab('experiments')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-colors ${
            activeTab === 'experiments' ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FlaskConical className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Thực hành</span>
        </button>
      </div>
    </div>
  );
};
