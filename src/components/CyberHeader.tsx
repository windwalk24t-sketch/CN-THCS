import React from 'react';
import { GradeLevel } from '../types/curriculum';
import { Volume2, VolumeX, Award, QrCode } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

interface CyberHeaderProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenQRModal: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  currentGrade,
  onSelectGrade,
  soundEnabled,
  onToggleSound,
  onOpenQRModal,
}) => {
  const grades: { level: GradeLevel; label: string }[] = [
    { level: 6, label: 'Khối 6' },
    { level: 7, label: 'Khối 7' },
    { level: 8, label: 'Khối 8' },
    { level: 9, label: 'Khối 9' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-cyan-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap">
        {/* Brand / STEM Department Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="font-cyber font-bold text-sm sm:text-base tracking-wider text-slate-100 flex items-center gap-2 whitespace-nowrap">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
            <span>TỔ STEM FSCBN</span>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-cyber font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.3)]">
              HỆ THỐNG ÔN THI THCS
            </span>
          </div>
        </div>

        {/* Grade Selection Tabs for Exam */}
        <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {grades.map((g) => {
            const isSelected = currentGrade === g.level;
            return (
              <button
                key={g.level}
                onClick={() => {
                  playCyberBeep(600 + g.level * 50, 'sine', 0.04);
                  onSelectGrade(g.level);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Award className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{g.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions: QR Code + Sound Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              playCyberBeep(750, 'sine', 0.04);
              onOpenQRModal();
            }}
            title="Quét mã QR để mở website trên điện thoại (https://cn-taind48.vercel.app/)"
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all flex items-center gap-1.5 cursor-pointer bg-cyan-950/70 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
          >
            <QrCode className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Mã QR Web</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh Robot' : 'Bật âm thanh Robot'}
            className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
