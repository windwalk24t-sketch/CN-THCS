import React from 'react';
import { Bot, QrCode } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

interface CyberFooterProps {
  onOpenQRModal?: () => void;
}

export const CyberFooter: React.FC<CyberFooterProps> = ({ onOpenQRModal }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 sm:px-6 text-xs text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span className="font-cyber font-bold text-slate-200">
            CÔNG NGHỆ THCS · TỔ STEM FSCBN
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Bộ sách Kết Nối Tri Thức Với Cuộc Sống</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-400 font-mono text-[11px]">
          {onOpenQRModal && (
            <button
              onClick={() => {
                playCyberBeep(750, 'sine', 0.04);
                onOpenQRModal();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 transition-colors cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>Quét mã QR web</span>
            </button>
          )}
          <span>Lớp 6 · 7 · 8 · 9</span>
          <span>·</span>
          <span className="text-cyan-400">cn-taind48.vercel.app</span>
        </div>
      </div>
    </footer>
  );
};
