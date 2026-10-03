import React from 'react';
import { Bot, Heart } from 'lucide-react';

export const CyberFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="font-cyber font-bold text-slate-200">
            CÔNG NGHỆ THCS · GIÁO VIÊN NGUYỄN ĐỨC TÀI
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Bộ sách Kết Nối Tri Thức Với Cuộc Sống</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span>Lớp 6 · 7 · 8 · 9</span>
          <span>·</span>
          <span>Robot Tech &amp; STEM Simulation</span>
          <span>·</span>
          <span className="text-cyan-400">© 2026 GV Nguyễn Đức Tài</span>
        </div>
      </div>
    </footer>
  );
};
