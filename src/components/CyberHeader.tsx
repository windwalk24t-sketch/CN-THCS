import React from 'react';
import { GradeLevel } from '../types/curriculum';
import { Volume2, VolumeX, Terminal, Award } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

interface CyberHeaderProps {
  currentGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  activeView: 'curriculum' | 'lab' | 'exam';
  setActiveView: (view: 'curriculum' | 'lab' | 'exam') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  currentGrade,
  onSelectGrade,
  activeView,
  setActiveView,
  soundEnabled,
  onToggleSound,
}) => {
  const grades: { level: GradeLevel; label: string }[] = [
    { level: 6, label: 'Công nghệ 6' },
    { level: 7, label: 'Công nghệ 7' },
    { level: 8, label: 'Công nghệ 8' },
    { level: 9, label: 'Công nghệ 9' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-cyan-900/40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap">
        {/* Brand / Teacher Title */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setActiveView('curriculum');
            }}
            className="font-cyber font-bold text-sm sm:text-base tracking-wider text-slate-100 flex items-center gap-2 hover:text-cyan-300 transition-colors whitespace-nowrap"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)] shrink-0" />
            Giáo viên: Nguyễn Đức Tài
          </a>
        </div>

        {/* Navigation Tabs on the SAME single line */}
        <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {grades.map((g) => {
            const isSelected = activeView === 'curriculum' && currentGrade === g.level;
            return (
              <button
                key={g.level}
                onClick={() => {
                  playCyberBeep(600 + g.level * 50, 'sine', 0.04);
                  setActiveView('curriculum');
                  onSelectGrade(g.level);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {g.label}
              </button>
            );
          })}

          <button
            onClick={() => {
              playCyberBeep(850, 'triangle', 0.05);
              setActiveView('lab');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'lab'
                ? 'bg-purple-950/90 text-purple-300 border border-purple-500/60 shadow-[0_0_12px_rgba(168,85,247,0.3)] font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Robot Lab</span>
          </button>

          {/* ÔN THI CÔNG NGHỆ 9 */}
          <button
            onClick={() => {
              playCyberBeep(920, 'triangle', 0.05);
              setActiveView('exam');
            }}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              activeView === 'exam'
                ? 'bg-amber-950/90 text-amber-300 border border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.3)] font-semibold'
                : 'text-amber-400 hover:text-amber-300 hover:bg-slate-900/60'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Ôn Thi CN 9</span>
          </button>
        </nav>

        {/* Sound Toggle Button */}
        <div className="flex items-center shrink-0">
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
