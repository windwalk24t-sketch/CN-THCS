import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, ExternalLink, X, Check, Smartphone } from 'lucide-react';
import { playLaserChirp, playSuccessChirp } from '../utils/audio';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
}

export const TARGET_WEB_URL = 'https://cn-taind48.vercel.app/';

export const QRCodeModal: React.FC<QRCodeModalProps> = ({
  isOpen,
  onClose,
  url = TARGET_WEB_URL,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    // Generate high resolution QR code for display & download
    QRCode.toDataURL(
      url,
      {
        width: 480,
        margin: 2,
        color: {
          dark: '#020617', // Slate-950
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      },
      (err, uri) => {
        if (!err && uri) {
          setDataUrl(uri);
        }
      }
    );
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      playSuccessChirp();
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleDownload = () => {
    if (!dataUrl) return;
    playLaserChirp();

    // Create a beautiful downloadable poster canvas with teacher branding
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header title
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CÔNG NGHỆ THCS · THẦY NGUYỄN ĐỨC TÀI', canvas.width / 2, 55);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Quét mã QR bằng Camera điện thoại hoặc Zalo để vào web', canvas.width / 2, 88);

    // Draw QR Code Image
    const img = new Image();
    img.onload = () => {
      // Draw white card backing for high contrast scanning
      ctx.fillStyle = '#ffffff';
      const cardPadding = 16;
      const qrSize = 460;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 120;
      if (ctx.roundRect) {
        ctx.roundRect(qrX - cardPadding, qrY - cardPadding, qrSize + cardPadding * 2, qrSize + cardPadding * 2, 20);
      } else {
        ctx.rect(qrX - cardPadding, qrY - cardPadding, qrSize + cardPadding * 2, qrSize + cardPadding * 2);
      }
      ctx.fill();

      ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

      // Bottom URL text
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 22px monospace';
      ctx.fillText(url, canvas.width / 2, 650);

      ctx.fillStyle = '#64748b';
      ctx.font = '14px sans-serif';
      ctx.fillText('Giáo trình Lớp 6 - 7 - 8 - 9 · Ôn thi & Thí nghiệm mô phỏng', canvas.width / 2, 690);

      const downloadLink = document.createElement('a');
      downloadLink.download = 'QR_Code_Cong_Nghe_Thay_Tai.png';
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.click();
    };
    img.src = dataUrl;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-950 border border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.3)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-cyber font-bold text-sm sm:text-base text-slate-100">
                MÃ QR TRUY CẬP WEBSITE
              </h3>
              <p className="text-[11px] text-slate-400">
                Giáo viên: Nguyễn Đức Tài
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center space-y-5">
          {/* Instructions */}
          <div className="flex items-center justify-center gap-2 text-xs text-cyan-300 font-mono">
            <Smartphone className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Mở Camera điện thoại hoặc Zalo để quét mã</span>
          </div>

          {/* QR Code Container with High-Contrast Cyber Glow */}
          <div className="inline-block p-4 sm:p-5 rounded-2xl bg-white shadow-[0_0_30px_rgba(6,182,212,0.35)] border-4 border-cyan-400/80">
            {dataUrl ? (
              <img
                src={dataUrl}
                alt={`Mã QR truy cập ${url}`}
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto block"
              />
            ) : (
              <div className="w-56 h-56 flex items-center justify-center text-slate-500 font-mono text-xs">
                Đang tạo mã QR...
              </div>
            )}
          </div>

          {/* URL Box with Copy Button */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-left">
            <div className="truncate">
              <div className="text-[10px] font-cyber text-slate-400">ĐỊA CHỈ TRANG WEB:</div>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-cyan-300 hover:underline truncate block"
              >
                {url}
              </a>
            </div>

            <button
              onClick={handleCopy}
              className={`p-2 rounded-lg text-xs font-cyber flex items-center gap-1 shrink-0 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
              title="Sao chép liên kết"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline">{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-110 text-slate-950 font-cyber font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Tải ảnh QR (PNG)</span>
            </button>

            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-cyber font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>Mở trang web</span>
            </a>
          </div>

          <p className="text-[11px] text-slate-500">
            Thầy có thể tải ảnh mã QR để chèn vào bài giảng trình chiếu Powerpoint hoặc in ra dán ở lớp học cho học sinh quét.
          </p>
        </div>
      </div>
    </div>
  );
};
