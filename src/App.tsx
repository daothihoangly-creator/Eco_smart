/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppTab, Sample, CalibrationColor } from './types';
import { DEFAULT_SAMPLES } from './data/defaultSamples';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Home } from './components/Home';
import { CameraCapture } from './components/CameraCapture';
import { ResultView } from './components/ResultView';
import { SampleLibrary } from './components/SampleLibrary';
import { KnowledgeLibrary } from './components/KnowledgeLibrary';
import { ExperimentsView } from './components/ExperimentsView';
import { CalibrationView } from './components/CalibrationView';
import { MiniGameView } from './components/MiniGameView';
import { AiTutorModal } from './components/AiTutorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [aiTutorOpen, setAiTutorOpen] = useState<boolean>(false);

  // Load samples from localStorage or default
  const [samples, setSamples] = useState<Sample[]>(() => {
    try {
      const saved = localStorage.getItem('eco_ph_samples');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load samples from localStorage', e);
    }
    return DEFAULT_SAMPLES;
  });

  // Load custom calibration colors
  const [customCalibration, setCustomCalibration] = useState<CalibrationColor[]>(() => {
    try {
      const saved = localStorage.getItem('eco_ph_calibration');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load calibration', e);
    }
    return [];
  });

  const [currentCaptureResult, setCurrentCaptureResult] = useState<Omit<Sample, 'id' | 'timestamp'> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('eco_ph_samples', JSON.stringify(samples));
    } catch (e) {
      console.error('Failed to save samples', e);
    }
  }, [samples]);

  useEffect(() => {
    try {
      localStorage.setItem('eco_ph_calibration', JSON.stringify(customCalibration));
    } catch (e) {
      console.error('Failed to save calibration', e);
    }
  }, [customCalibration]);

  const handleCaptureResult = (sampleData: Omit<Sample, 'id' | 'timestamp'>) => {
    setCurrentCaptureResult(sampleData);
    setActiveTab('result');
  };

  const handleSaveSample = (sampleData: Omit<Sample, 'id' | 'timestamp'>) => {
    const newSample: Sample = {
      ...sampleData,
      id: `sample-${Date.now()}`,
      timestamp: Date.now()
    };
    setSamples([newSample, ...samples]);
  };

  const handleDeleteSample = (id: string) => {
    setSamples(samples.filter(s => s.id !== id));
  };

  const handleUpdateSampleNote = (id: string, note: string, name: string) => {
    setSamples(samples.map(s => s.id === id ? { ...s, note, name } : s));
  };

  const handleAddCalibration = (calib: CalibrationColor) => {
    setCustomCalibration([...customCalibration, calib]);
  };

  const handleDeleteCalibration = (id: string) => {
    setCustomCalibration(customCalibration.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenAiTutor={() => setAiTutorOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 md:pb-12">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            savedSamplesCount={samples.length}
            onOpenAiTutor={() => setAiTutorOpen(true)}
          />
        )}

        {activeTab === 'camera' && (
          <CameraCapture
            onCaptureResult={handleCaptureResult}
            onBack={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
            customCalibration={customCalibration}
          />
        )}

        {activeTab === 'result' && currentCaptureResult && (
          <ResultView
            sample={currentCaptureResult}
            onSave={handleSaveSample}
            onRetake={() => setActiveTab('camera')}
            onExploreKnowledge={() => setActiveTab('knowledge')}
            onBackHome={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'library' && (
          <SampleLibrary
            samples={samples}
            onDeleteSample={handleDeleteSample}
            onUpdateSampleNote={handleUpdateSampleNote}
            onBackHome={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeLibrary
            onBackHome={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'experiments' && (
          <ExperimentsView
            setActiveTab={setActiveTab}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'calibration' && (
          <CalibrationView
            customCalibration={customCalibration}
            onAddCalibration={handleAddCalibration}
            onDeleteCalibration={handleDeleteCalibration}
            onBackHome={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeTab === 'minigame' && (
          <MiniGameView
            onBackHome={() => setActiveTab('home')}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ECO AI Chatbot Modal */}
      <AiTutorModal
        isOpen={aiTutorOpen}
        onClose={() => setAiTutorOpen(false)}
        soundEnabled={soundEnabled}
      />
    </div>
  );
}
