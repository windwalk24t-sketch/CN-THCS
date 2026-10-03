import React, { useState } from 'react';
import { Zap, Power, ShieldCheck, AlertOctagon, Lightbulb } from 'lucide-react';
import { playCyberBeep, playLaserChirp } from '../../utils/audio';

export const CircuitSimulator: React.FC = () => {
  const [breakerOn, setBreakerOn] = useState(true);
  const [switchOn, setSwitchOn] = useState(false);
  const [applianceCount, setApplianceCount] = useState(1);
  const [isTripped, setIsTripped] = useState(false);

  // Rated max load: 3 appliances before overload trip
  const currentAmps = breakerOn && switchOn ? (applianceCount * 3.5).toFixed(1) : '0.0';
  const isOverloaded = applianceCount > 3;

  const toggleBreaker = () => {
    if (isTripped) {
      // Reset breaker
      setIsTripped(false);
      setBreakerOn(true);
      playLaserChirp();
      return;
    }
    const nextState = !breakerOn;
    setBreakerOn(nextState);
    playCyberBeep(nextState ? 750 : 300, 'square', 0.08);
  };

  const toggleSwitch = () => {
    if (!breakerOn || isTripped) return;
    const nextState = !switchOn;
    setSwitchOn(nextState);
    playCyberBeep(nextState ? 880 : 440, 'triangle', 0.05);

    if (nextState && isOverloaded) {
      // Overload trigger!
      setTimeout(() => {
        setIsTripped(true);
        setBreakerOn(false);
        setSwitchOn(false);
        playLaserChirp();
      }, 350);
    }
  };

  const addAppliance = () => {
    const next = applianceCount + 1;
    setApplianceCount(next);
    playCyberBeep(500 + next * 80, 'sine', 0.04);
    if (next > 3 && switchOn && breakerOn) {
      setTimeout(() => {
        setIsTripped(true);
        setBreakerOn(false);
        setSwitchOn(false);
        playLaserChirp();
      }, 400);
    }
  };

  const removeAppliance = () => {
    if (applianceCount > 1) {
      setApplianceCount((prev) => prev - 1);
      playCyberBeep(400, 'sine', 0.04);
    }
  };

  const isLampGlowing = breakerOn && switchOn && !isTripped;

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-5 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-amber-900/40 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h4 className="font-cyber font-bold text-amber-200 tracking-wide text-sm">
            AC 220V POWER GRID // MẠCH ĐIỆN VÀ APTOMAT BẢO VỆ
          </h4>
        </div>
        <span className="text-xs font-mono text-amber-400/80 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
          U_RMS: 220V AC
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls */}
        <div className="space-y-3">
          {/* Breaker MCB */}
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Aptomat tự động (MCB 10A)
              </div>
              <div className="text-[11px] text-slate-400 font-mono">
                {isTripped
                  ? 'ĐÃ NHẢ LẪY DO QUÁ TẢI (TRIP)'
                  : breakerOn
                  ? 'ĐANG ĐÓNG NGUỒN ĐIỆN'
                  : 'NGẮT AN TOÀN'}
              </div>
            </div>
            <button
              onClick={toggleBreaker}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                isTripped
                  ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                  : breakerOn
                  ? 'bg-amber-950 text-amber-300 border-amber-500'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {isTripped ? 'RESET APTOMAT' : breakerOn ? 'ON (ĐÓNG)' : 'OFF (CẮT)'}
            </button>
          </div>

          {/* SPST Switch */}
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Power className="w-4 h-4 text-cyan-400" /> Công tắc đơn 2 cực (SPST)
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Mắc nối tiếp trên Dây Pha (L)</div>
            </div>
            <button
              onClick={toggleSwitch}
              disabled={!breakerOn || isTripped}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all disabled:opacity-40 ${
                switchOn
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {switchOn ? 'BẬT (ON)' : 'TẮT (OFF)'}
            </button>
          </div>

          {/* Load Adjuster */}
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Số thiết bị tải cắm vào ổ điện:</span>
              <span className="font-mono text-amber-300 font-bold">{applianceCount} thiết bị</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={removeAppliance}
                disabled={applianceCount <= 1}
                className="flex-1 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs disabled:opacity-30"
              >
                - Giảm tải
              </button>
              <button
                onClick={addAppliance}
                disabled={applianceCount >= 5}
                className="flex-1 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded text-xs disabled:opacity-30"
              >
                + Tăng tải (&gt;3 gây nhảy Aptomat)
              </button>
            </div>
          </div>
        </div>

        {/* Visual Circuit Diagram & Telemetry */}
        <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>ĐỒNG HỒ VẠN NĂNG (DMM)</span>
              <span className="text-amber-400 font-bold">{currentAmps} A</span>
            </div>

            <div className="flex items-center justify-center p-6 bg-slate-900/60 rounded-lg border border-slate-800/80 relative">
              <Lightbulb
                className={`w-16 h-16 transition-all duration-300 ${
                  isLampGlowing
                    ? 'text-amber-300 filter drop-shadow-[0_0_24px_rgba(251,191,36,0.9)] scale-110'
                    : 'text-slate-700'
                }`}
              />
              {isLampGlowing && (
                <div className="absolute bottom-2 text-xs font-mono text-amber-300 font-semibold animate-pulse">
                  220V // CÔNG SUẤT: {applianceCount * 750} W
                </div>
              )}
            </div>

            {isTripped && (
              <div className="flex items-center gap-2 p-2 rounded bg-rose-950/60 border border-rose-600/80 text-rose-200 text-xs">
                <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                <span>
                  BẢO VỆ NGẮT MẠCH! Cường độ dòng điện vượt quá 10A định mức, Aptomat tự động nhảy chốt để chống cháy nổ dây dẫn.
                </span>
              </div>
            )}
          </div>

          <div className="mt-3 p-2 rounded bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300 font-mono">
            &gt; AN TOÀN ĐIỆN: Công tắc luôn ngắt dây pha. Aptomat là chốt chặn tự động bảo vệ ngôi nhà khi có sự cố quá tải hoặc ngắn mạch.
          </div>
        </div>
      </div>
    </div>
  );
};
