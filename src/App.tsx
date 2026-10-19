import React, { useState } from 'react';
import { GradeLevel } from './types/curriculum';
import { CyberHeader } from './components/CyberHeader';
import { CyberHero } from './components/CyberHero';
import { CyberFooter } from './components/CyberFooter';
import { THCSExamView } from './components/THCSExamView';
import { QRCodeModal, TARGET_WEB_URL } from './components/QRCodeModal';
import { toggleSound, isSoundEnabled } from './utils/audio';

export default function App() {
  // Focus exclusively on THCS Exam Review by Grade (6, 7, 8, 9)
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(8);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
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
      />

      {/* Focused Cyber Hero Banner for Exam Review */}
      <CyberHero
        selectedGrade={selectedGrade}
        onSelectGrade={(g) => setSelectedGrade(g)}
        onOpenQRModal={() => setIsQRModalOpen(true)}
      />

      {/* Main Focus: THCS Exam Review Center for Grades 6, 7, 8, 9 */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <THCSExamView
          selectedGrade={selectedGrade}
          onSelectGrade={(g) => setSelectedGrade(g)}
        />
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
