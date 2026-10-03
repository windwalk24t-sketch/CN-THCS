import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Upload,
  Bot,
  Radio,
  FileAudio,
} from 'lucide-react';
import { playLaserChirp, playSuccessChirp } from '../utils/audio';

const AUDIO_STORAGE_KEY = 'robot_lab_custom_audio_data';

export const CyberAudioDeck: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'robot_voice' | 'custom_file'>('robot_voice');
  const [customAudioUrl, setCustomAudioUrl] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('Chưa chọn file (VD: lien_quan_intro.mp3)');
  const [audioDuration, setAudioDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Load custom audio from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(AUDIO_STORAGE_KEY);
      const savedName = localStorage.getItem(`${AUDIO_STORAGE_KEY}_name`);
      if (saved) {
        setCustomAudioUrl(saved);
        if (savedName) setCustomFileName(savedName);
        setSelectedTrack('custom_file');
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const numBars = 32;
      const barWidth = canvas.width / numBars;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;
        if (isPlaying) {
          barHeight = Math.max(
            4,
            Math.sin(step * 0.15 + i * 0.4) * 16 +
              Math.cos(step * 0.2 + i * 0.2) * 14 +
              20
          );
        }

        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, '#06b6d4');
        gradient.addColorStop(0.5, '#a855f7');
        gradient.addColorStop(1, '#ec4899');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth + 1,
          canvas.height - barHeight,
          barWidth - 2,
          barHeight
        );
      }
      step++;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isPlaying]);

  // Handle synthesized Robot intro voice
  const playSynthesizedRobotIntro = () => {
    setIsPlaying(true);
    playLaserChirp();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text =
        'Khởi động phòng thí nghiệm Robot Lab! Giáo viên Nguyễn Đức Tài. Hệ thống mô phỏng công nghệ đã sẵn sàng. Chào mừng các em học sinh!';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.05;
      utterance.pitch = 0.95;

      utterance.onend = () => {
        setIsPlaying(false);
        playSuccessChirp();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  // Play / Pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      if (selectedTrack === 'robot_voice') {
        window.speechSynthesis.cancel();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (selectedTrack === 'robot_voice') {
        playSynthesizedRobotIntro();
      } else if (audioRef.current && customAudioUrl) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        alert('Thầy vui lòng bấm nút "Tải file âm thanh vào" bên cạnh để nạp file trước nhé!');
      }
    }
  };

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCustomAudioUrl(dataUrl);
      setCustomFileName(file.name);
      setSelectedTrack('custom_file');
      try {
        localStorage.setItem(AUDIO_STORAGE_KEY, dataUrl);
        localStorage.setItem(`${AUDIO_STORAGE_KEY}_name`, file.name);
      } catch (err) {
        console.warn('File too large for localStorage, audio loaded in memory only', err);
      }
      playSuccessChirp();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 p-4 sm:p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
      {/* Hidden audio element for custom file */}
      {customAudioUrl && (
        <audio
          ref={audioRef}
          src={customAudioUrl}
          onEnded={() => setIsPlaying(false)}
          onTimeUpdate={() => {
            if (audioRef.current) {
              const cur = Math.floor(audioRef.current.currentTime);
              const dur = Math.floor(audioRef.current.duration || 0);
              const format = (s: number) =>
                `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
              setCurrentTime(format(cur));
              setAudioDuration(format(dur));
            }
          }}
        />
      )}

      {/* Top Deck Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-cyan-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/60 text-cyan-400 animate-pulse">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cyber font-bold text-sm sm:text-base text-slate-100 tracking-wider">
                CYBER AUDIO CONTROL DECK // ÂM THANH MỞ ĐẦU ROBOT LAB
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-sans">
              Phát hiệu ứng âm thanh chào mừng, nhạc trận đấu khởi động không khí học tập.
            </p>
          </div>
        </div>
      </div>

      {/* Main Controls & Visualizer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 items-center">
        {/* Track Selection & Upload */}
        <div className="md:col-span-6 space-y-2.5">
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (isPlaying) handleTogglePlay();
                setSelectedTrack('robot_voice');
                playLaserChirp();
              }}
              className={`flex-1 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                selectedTrack === 'robot_voice'
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-cyber font-bold text-xs flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-cyan-400" /> Robot AI Thầy Tài
              </div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                ● Lời chào Robot tự động
              </div>
            </button>

            <button
              onClick={() => {
                if (isPlaying) handleTogglePlay();
                setSelectedTrack('custom_file');
                playLaserChirp();
              }}
              className={`flex-1 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                selectedTrack === 'custom_file'
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="font-cyber font-bold text-xs flex items-center gap-1.5">
                <FileAudio className="w-3.5 h-3.5 text-purple-400" /> Âm thanh Thầy tải vào
              </div>
              <div className="text-[10px] text-amber-400 font-mono mt-0.5 truncate">
                {customAudioUrl ? '● Đã nạp file' : '○ Bấm tải file'}
              </div>
            </button>
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono transition-colors cursor-pointer shrink-0">
              <Upload className="w-3.5 h-3.5" />
              <span>Tải file âm thanh vào</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] font-mono text-slate-400 truncate">
              {customFileName}
            </span>
          </div>
        </div>

        {/* Visualizer & Play Button */}
        <div className="md:col-span-6 flex flex-col justify-between space-y-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          {/* Waveform Canvas */}
          <canvas
            ref={canvasRef}
            width={280}
            height={42}
            className="w-full h-11 rounded bg-slate-900/60"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={handleTogglePlay}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-cyber font-bold text-xs tracking-wider transition-all cursor-pointer ${
                  isPlaying
                    ? 'bg-rose-500 text-slate-950 shadow-[0_0_20px_rgba(244,63,94,0.5)]'
                    : 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'TẠM DỪNG' : 'PHÁT ÂM THANH'}</span>
              </button>

              <span className="text-xs font-mono text-slate-400">
                {currentTime} / {audioDuration}
              </span>
            </div>

            <div className="text-[11px] font-mono text-cyan-300">
              {isPlaying ? '● AUDIO BROADCASTING' : '○ STANDBY'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
