import React, { useState } from 'react';
import { Layers, Trash2, Edit3, Volume2, Search, BarChart2, Download, FileText, ArrowLeft, Check, Sparkles, X } from 'lucide-react';
import { Sample } from '../types';
import { speakVietnamese } from '../utils/speech';

interface SampleLibraryProps {
  samples: Sample[];
  onDeleteSample: (id: string) => void;
  onUpdateSampleNote: (id: string, note: string, name: string) => void;
  onBackHome: () => void;
  soundEnabled: boolean;
}

export const SampleLibrary: React.FC<SampleLibraryProps> = ({
  samples,
  onDeleteSample,
  onUpdateSampleNote,
  onBackHome,
  soundEnabled
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEnv, setFilterEnv] = useState<'all' | 'acid' | 'neutral' | 'base'>('all');
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [editingSample, setEditingSample] = useState<Sample | null>(null);
  const [editName, setEditName] = useState('');
  const [editNote, setEditNote] = useState('');

  const filteredSamples = samples.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.note.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEnv = filterEnv === 'all' || s.environment === filterEnv;
    return matchesSearch && matchesEnv;
  });

  const toggleSelectCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter(i => i !== id));
    } else {
      if (selectedForCompare.length >= 4) {
        alert('Bạn chỉ có thể chọn tối đa 4 mẫu để so sánh.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleStartEdit = (sample: Sample) => {
    setEditingSample(sample);
    setEditName(sample.name);
    setEditNote(sample.note);
  };

  const handleSaveEdit = () => {
    if (editingSample) {
      onUpdateSampleNote(editingSample.id, editNote, editName);
      setEditingSample(null);
    }
  };

  const handleExportCSV = () => {
    const headers = 'ID,TenMau,pH,MoiTruong,MauNhanDien,DoTinCay,ThoiGian,GhiChu\n';
    const rows = samples.map(s => 
      `"${s.id}","${s.name}",${s.estimatedPH},"${s.environment}","${s.detectedColor}",${s.confidence},"${new Date(s.timestamp).toLocaleString()}","${s.note.replace(/"/g, '""')}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ECO_pH_Bao_Cao_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const envBadgeColor = {
    acid: 'bg-red-100 text-red-800 border-red-200',
    neutral: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    base: 'bg-blue-100 text-blue-800 border-blue-200'
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
            <Layers className="w-7 h-7 text-teal-600" />
            <span>KHO MẪU THỬ ({samples.length})</span>
          </h2>
          <p className="text-xs text-slate-500">Quản lý, so sánh và xuất báo cáo kết quả đo pH</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {selectedForCompare.length >= 2 && (
            <button
              onClick={() => setCompareModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 transition-colors text-sm"
            >
              <BarChart2 className="w-4 h-4" />
              <span>So sánh ({selectedForCompare.length})</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-md hover:bg-emerald-700 transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            <span>Xuất CSV</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tên mẫu hoặc ghi chú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterEnv('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterEnv === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterEnv('acid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterEnv === 'acid' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
          >
            Acid (pH &lt; 7)
          </button>
          <button
            onClick={() => setFilterEnv('neutral')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterEnv === 'neutral' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            Trung tính (= 7)
          </button>
          <button
            onClick={() => setFilterEnv('base')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filterEnv === 'base' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            Base (&gt; 7)
          </button>
        </div>
      </div>

      {/* Samples Grid */}
      {filteredSamples.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">Không tìm thấy mẫu thử nào</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Hãy sử dụng chức năng Nhận diện pH qua camera để chụp và lưu lại các mẫu thí nghiệm của bạn.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSamples.map(sample => {
            const isSelected = selectedForCompare.includes(sample.id);
            return (
              <div 
                key={sample.id}
                className={`bg-white rounded-3xl border transition-all shadow-sm overflow-hidden flex flex-col justify-between ${
                  isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <img src={sample.image} alt={sample.name} className="w-full h-full object-cover" />
                    
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase border ${envBadgeColor[sample.environment]}`}>
                        {sample.environment === 'acid' ? 'Acid' : sample.environment === 'base' ? 'Base' : 'Trung tính'}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleSelectCompare(sample.id)}
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white'
                      }`}
                    >
                      {isSelected ? '✓ Đang chọn so sánh' : '+ So sánh'}
                    </button>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-extrabold text-slate-900 text-base line-clamp-1">{sample.name}</h3>
                    </div>

                    <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 font-medium block">pH ước tính</span>
                        <span className="text-xl font-black text-slate-900">pH {sample.estimatedPH.toFixed(1)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 font-medium block">Màu nhận diện</span>
                        <div className="flex items-center space-x-1.5 justify-end">
                          <div 
                            className="w-4 h-4 rounded-full border border-slate-300 shadow-xs" 
                            style={{ backgroundColor: `rgb(${sample.rgb[0]}, ${sample.rgb[1]}, ${sample.rgb[2]})` }}
                          ></div>
                          <span className="text-xs font-bold text-slate-800">{sample.detectedColor}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 italic line-clamp-2">
                      "{sample.note || 'Không có ghi chú thêm.'}"
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{new Date(sample.timestamp).toLocaleDateString('vi-VN')}</span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (soundEnabled) {
                          const envText = sample.environment === 'acid' ? 'môi trường acid' : sample.environment === 'base' ? 'môi trường base' : 'môi trường trung tính';
                          speakVietnamese(`Mẫu ${sample.name}. Giá trị pH ${sample.estimatedPH.toFixed(1).replace('.', ' phẩy ')}. Có ${envText}.`);
                        }
                      }}
                      title="Nghe kết quả"
                      className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleStartEdit(sample)}
                      title="Sửa tên hoặc ghi chú"
                      className="p-1.5 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc chắn muốn xóa mẫu "${sample.name}" không?`)) {
                          onDeleteSample(sample.id);
                        }
                      }}
                      title="Xóa mẫu"
                      className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Compare Modal */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                <BarChart2 className="w-6 h-6 text-indigo-600" />
                <span>So sánh các mẫu thử ({selectedForCompare.length})</span>
              </h3>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase">
                    <th className="py-3 px-4">Mẫu thử</th>
                    <th className="py-3 px-4">Màu sắc</th>
                    <th className="py-3 px-4">pH ước tính</th>
                    <th className="py-3 px-4">Môi trường</th>
                    <th className="py-3 px-4">Độ tin cậy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {selectedForCompare.map(id => {
                    const sample = samples.find(s => s.id === id);
                    if (!sample) return null;
                    return (
                      <tr key={sample.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                          <img src={sample.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <span>{sample.name}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: `rgb(${sample.rgb.join(',')})` }}></div>
                            <span className="text-xs">{sample.detectedColor}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-black text-indigo-700">pH {sample.estimatedPH.toFixed(1)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${envBadgeColor[sample.environment]}`}>
                            {sample.environment.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-emerald-700">{sample.confidence}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-slate-800">Biểu đồ so sánh giá trị pH:</h4>
              <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedForCompare.map(id => {
                  const sample = samples.find(s => s.id === id);
                  if (!sample) return null;
                  const percent = (sample.estimatedPH / 14) * 100;
                  return (
                    <div key={sample.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-700">
                        <span>{sample.name}</span>
                        <span className="font-bold">pH {sample.estimatedPH.toFixed(1)}</span>
                      </div>
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: sample.estimatedPH < 7 ? '#ef4444' : sample.estimatedPH === 7 ? '#10b981' : '#3b82f6'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => setCompareModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
              >
                Đóng so sánh
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sample Modal */}
      {editingSample && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-extrabold text-slate-900">Chỉnh sửa thông tin mẫu thử</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tên mẫu thử:</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú / Mô tả:</label>
                <textarea
                  rows={3}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setEditingSample(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
