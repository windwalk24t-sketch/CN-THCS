import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Smartphone, Maximize2 } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';
import { TARGET_WEB_URL } from './QRCodeModal';

interface CyberQRCardProps {
  onOpenModal: () => void;
}

export const CyberQRCard: React.FC<CyberQRCardProps> = ({ onOpenModal }) => {
  const [thumbUrl, setThumbUrl] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(
      TARGET_WEB_URL,
      {
        width: 160,
        margin: 1,
        color: {
          dark: '#020617',
          light: '#ffffff',
        },
      },
      (err, uri) => {
        if (!err && uri) {
          setThumbUrl(uri);
        }
      }
    );
  }, []);

  return (
    <div
      onClick={() => {
        playCyberBeep(750, 'sine', 0.04);
        onOpenModal();
      }}
      className="group relative p-2.5 sm:p-3 rounded-2xl bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center gap-3 backdrop-blur-md"
      title="Bấm để phóng to hoặc tải ảnh mã QR"
    >
      {/* Mini QR preview with white frame for 100% scan reliability */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl p-1 border-2 border-cyan-400/80 shadow-[0_0_12px_rgba(6,182,212,0.3)] shrink-0 flex items-center justify-center overflow-hidden">
        {thumbUrl ? (
          <img
            src={thumbUrl}
            alt="Mã QR Web Thầy Tài"
            className="w-full h-full object-contain"
          />
        ) : (
          <QrCode className="w-8 h-8 text-slate-800 animate-pulse" />
        )}
        <div className="absolute inset-0 bg-cyan-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Maximize2 className="w-5 h-5 text-cyan-400 drop-shadow" />
        </div>
      </div>

      {/* Info text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[10px] font-cyber text-cyan-400 uppercase font-semibold">
          <Smartphone className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>QUÉT MÃ TRÊN ĐIỆN THOẠI</span>
        </div>
        <div className="font-mono text-xs font-bold text-slate-100 truncate mt-0.5 group-hover:text-cyan-300 transition-colors">
          cn-taind48.vercel.app
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
          <span>Camera / Zalo</span>
          <span className="text-slate-600">·</span>
          <span className="text-cyan-400 underline underline-offset-2">Phóng to &amp; Tải ảnh</span>
        </div>
      </div>
    </div>
  );
};
