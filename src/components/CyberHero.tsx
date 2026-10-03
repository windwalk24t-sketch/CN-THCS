import React, { useState, useEffect } from 'react';
import { Search, Bot, Terminal, Cpu, Sparkles, BookOpen, Layers, Radio } from 'lucide-react';
import robotHeroImg from '../assets/images/cyber_robot_hero_1791029757334.jpg';
import robotAvatarImg from '../assets/images/robot_avatar_mentor_1791029771859.jpg';
import { playCyberBeep } from '../utils/audio';

interface CyberHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalLessonsCount: number;
  onOpenLab?: () => void;
}

const TERMINAL_LOGS = [
  'INITIALIZING THCS_KNTT_OS v4.0.2...',
  'BOOTING MODULE: SMART HOME AUTOMATION [GRADE_06] - NOMINAL',
  'SYNCING AGRI-TECH SOIL SENSORS [GRADE_07] - 88% OK',
  'LOADING CAD/CAM PROJECTION MATRIX [GRADE_08] - READY',
  'EVALUATING CAREER PATHFINDER [GRADE_09] - ACTIVE',
  'TEACHER IN COMMAND: NGUYEN DUC TAI [ADMIN_AUTH_VERIFIED]',
];

export const CyberHero: React.FC<CyberHeroProps> = ({
  searchQuery,
  setSearchQuery,
  totalLessonsCount,
  onOpenLab,
}) => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden border-b border-cyan-950/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Search */}
          <div className="lg:col-span-7 space-y-5">
            {/* Teacher Badge & Protocol Lead */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cyber tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <img
                src={robotAvatarImg}
                alt="Robot Mentor Avatar"
                className="w-5 h-5 rounded-full border border-cyan-400 object-cover"
                referrerPolicy="no-referrer"
              />
              <span>GIÁO VIÊN: NGUYỄN ĐỨC TÀI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <h1 className="font-cyber font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-100 leading-tight">
              CÔNG NGHỆ THCS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mt-1">
                KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed">
              Không gian học tập công nghệ tương tác phong cách Robot CyberTech. Tích hợp giáo trình chuẩn lớp 6, 7, 8, 9, phòng thí nghiệm mô phỏng IoT, vẽ kỹ thuật và trắc nghiệm thực chiến.
            </p>

            {/* Terminal Code Stream Ticker */}
            <div className="p-3 rounded-lg bg-slate-950/90 border border-cyan-900/60 font-code text-xs text-cyan-400/90 flex items-center gap-2 overflow-hidden shadow-inner">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-500 shrink-0">&gt;</span>
              <span className="truncate transition-all duration-300">
                {TERMINAL_LOGS[logIndex]}
              </span>
              <span className="w-2 h-4 bg-cyan-400/80 animate-pulse ml-auto shrink-0" />
            </div>

            {/* Universal Search Input */}
            <div className="relative max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length % 3 === 0) {
                    playCyberBeep(650, 'sine', 0.02);
                  }
                }}
                placeholder="Tìm kiếm bài học: Nhà thông minh, Trồng trọt, Vẽ kỹ thuật, Aptomat..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-200 placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-sans shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span><strong className="text-slate-200">{totalLessonsCount}</strong> Bài học chuẩn hóa</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-slate-200">4</strong> Khối lớp (6, 7, 8, 9)</span>
              </div>
              {onOpenLab && (
                <>
                  <span>·</span>
                  <button
                    onClick={onOpenLab}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-950/70 hover:bg-purple-900 border border-purple-500/50 text-purple-300 font-cyber transition-colors cursor-pointer"
                  >
                    <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    <span>Âm thanh Robot Lab</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Hero Graphic Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] group">
              <img
                src={robotHeroImg}
                alt="Robot Teacher Nguyễn Đức Tài - CyberTech Laboratory"
                className="w-full h-64 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              {/* Overlay HUD Badges */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span className="font-cyber text-slate-200 font-semibold">BOT-TÀI 4.0</span>
                </div>
                <div className="font-mono text-[11px] text-cyan-300">
                  ONLINE // LATENCY: 0.1ms
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
