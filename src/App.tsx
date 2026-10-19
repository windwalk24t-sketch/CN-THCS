import React, { useState } from 'react';
import { GradeLevel } from './types/curriculum';
import { CyberHeader } from './components/CyberHeader';
import { CyberHero } from './components/CyberHero';
import { CyberFooter } from './components/CyberFooter';
import { THCSExamView } from './components/THCSExamView';
import { STEMLabSection } from './components/STEMLabSection';
import { QRCodeModal, TARGET_WEB_URL } from './components/QRCodeModal';
import { toggleSound, isSoundEnabled, playCyberBeep } from './utils/audio';
import { BookOpen, Bot, Layers, Sparkles } from 'lucide-react';

export default function App() {
  // Focus on THCS Exam Review by Grade (6, 7, 8, 9) + STEM Robot Lab & Simulators
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(8);
  const [activeSection, setActiveSection] = useState<'all' | 'exam' | 'stem_lab'>('all');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleJumpToSTEMLab = () => {
    if (activeSection === 'exam') {
      setActiveSection('all');
    }
    setTimeout(() => {
      const el = document.getElementById('stem-lab-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Cyber Navigation Header - Grade Selector & Actions */}
      <CyberHeader
        currentGrade={selectedGrade}
        onSelectGrade={(g) => setSelectedGrade(g)}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
        onOpenQRModal={() => setIsQRModalOpen(true)}
        onJumpToSTEMLab={handleJumpToSTEMLab}
      />

      {/* Cyber Hero Banner for Exam Review & Robot Lab */}
      <CyberHero
        selectedGrade={selectedGrade}
        onSelectGrade={(g) => setSelectedGrade(g)}
        onOpenQRModal={() => setIsQRModalOpen(true)}
      />

      {/* Section Quick Switcher Bar */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-900/80 border border-cyan-900/50 rounded-2xl backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-cyber text-slate-400 pl-2 hidden sm:inline">CHUYỂN KHÔNG GIAN:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playCyberBeep(650, 'sine', 0.03);
                  setActiveSection('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSection === 'all'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Xem Tất Cả</span>
              </button>

              <button
                onClick={() => {
                  playCyberBeep(700, 'sine', 0.03);
                  setActiveSection('exam');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSection === 'exam'
                    ? 'bg-amber-950 text-amber-300 border border-amber-400 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Đề Ôn Thi THCS (Khối 6-9)</span>
              </button>

              <button
                onClick={() => {
                  playCyberBeep(750, 'sine', 0.03);
                  setActiveSection('stem_lab');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeSection === 'stem_lab'
                    ? 'bg-purple-950 text-purple-300 border border-purple-400 font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Robot Lab & 4 Trình Mô Phỏng</span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pr-2 text-xs font-mono text-cyan-400/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Mô phỏng: Mạch điện · Nhà thông minh · Tưới tiêu · Hướng nghiệp</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-10">
        {/* THCS Exam Section */}
        {(activeSection === 'all' || activeSection === 'exam') && (
          <section id="thcs-exam-section">
            <THCSExamView
              selectedGrade={selectedGrade}
              onSelectGrade={(g) => setSelectedGrade(g)}
            />
          </section>
        )}

        {/* STEM Robot Lab & Simulators Section */}
        {(activeSection === 'all' || activeSection === 'stem_lab') && (
          <STEMLabSection />
        )}
      </main>

      {/* Cyber Footer */}
      <CyberFooter onOpenQRModal={() => setIsQRModalOpen(true)} />

      {/* Website QR Code Modal (https://cn-taind48.vercel.app/) */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        url={TARGET_WEB_URL}
      />
    </div>
  );
}
