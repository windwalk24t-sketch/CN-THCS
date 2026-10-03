import React, { useState } from 'react';
import { Home, Lightbulb, Wind, Lock, Sun, ShieldAlert, Cpu } from 'lucide-react';
import { playCyberBeep } from '../../utils/audio';

export const SmartHomeSimulator: React.FC = () => {
  const [hasMotion, setHasMotion] = useState(true);
  const [lightLux, setLightLux] = useState(240);
  const [isDoorLocked, setIsDoorLocked] = useState(true);
  const [acTemp, setAcTemp] = useState(25);
  const [systemArmed, setSystemArmed] = useState(true);

  // Automated logic
  const isLightAutoOn = hasMotion && lightLux < 350;
  const isAcRunning = acTemp < 28 && hasMotion;

  const toggleMotion = () => {
    playCyberBeep(700, 'sine', 0.05);
    setHasMotion(!hasMotion);
  };

  const toggleDoorLock = () => {
    playCyberBeep(isDoorLocked ? 900 : 450, 'sawtooth', 0.08);
    setIsDoorLocked(!isDoorLocked);
  };

  const toggleSystemArmed = () => {
    playCyberBeep(850, 'square', 0.06);
    setSystemArmed(!systemArmed);
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-5 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-cyan-900/40 mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-cyan-400" />
          <h4 className="font-cyber font-bold text-cyan-200 tracking-wide text-sm">
            SMART HOME IoT CONTROLLER // NODE-ESP32
          </h4>
        </div>
        <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
          LOGIC: ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Controls and Sensors */}
        <div className="space-y-4">
          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Sun className="w-4 h-4 text-amber-400" /> Cảm biến quang trở (LDR Lux):
              </span>
              <span className="font-mono text-cyan-300 font-bold">{lightLux} Lux</span>
            </div>
            <input
              type="range"
              min="50"
              max="800"
              value={lightLux}
              onChange={(e) => {
                setLightLux(Number(e.target.value));
                playCyberBeep(400 + Number(e.target.value), 'sine', 0.02);
              }}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>Đêm tối (&lt;300 Lux)</span>
              <span>Ban ngày (Sáng)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={toggleMotion}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                hasMotion
                  ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase">Cảm biến PIR</div>
              <div className="font-cyber font-bold mt-1 text-sm">
                {hasMotion ? '● Phát hiện người' : '○ Phòng trống'}
              </div>
            </button>

            <button
              onClick={toggleDoorLock}
              className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                isDoorLocked
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : 'bg-amber-950/70 border-amber-500 text-amber-200'
              }`}
            >
              <div className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Lock className="w-3 h-3" /> Khóa vân tay
              </div>
              <div className="font-cyber font-bold mt-1 text-sm">
                {isDoorLocked ? 'ĐÃ KHÓA AN TOÀN' : 'ĐANG MỞ KHÓA'}
              </div>
            </button>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1.5 font-medium">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Hệ thống an ninh báo động:
            </span>
            <button
              onClick={toggleSystemArmed}
              className={`px-3 py-1 rounded text-xs font-mono font-bold border ${
                systemArmed
                  ? 'bg-rose-950 text-rose-300 border-rose-600'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {systemArmed ? 'ARMED' : 'DISARMED'}
            </button>
          </div>
        </div>

        {/* Actuators & Virtual House Status */}
        <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Home className="w-4 h-4 text-cyan-400" /> Trạng thái thiết bị chấp hành
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Lightbulb
                    className={`w-5 h-5 transition-colors ${
                      isLightAutoOn ? 'text-amber-300 filter drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]' : 'text-slate-600'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Đèn chiếu sáng thông minh</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Logic: PIR && Lux &lt; 350
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isLightAutoOn
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-500/50'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isLightAutoOn ? 'ON (SÁNG)' : 'OFF (TẮT)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Wind
                    className={`w-5 h-5 transition-colors ${
                      isAcRunning ? 'text-cyan-300 animate-spin' : 'text-slate-600'
                    }`}
                  />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Điều hòa Inverter Eco</div>
                    <div className="text-[11px] text-slate-400 font-mono">Set: {acTemp}°C (Auto Comfort)</div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isAcRunning
                      ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isAcRunning ? 'CHẠY TIẾT KIỆM' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded bg-cyan-950/40 border border-cyan-800/60 text-[11px] text-cyan-300 font-mono leading-relaxed">
            &gt; CPU STATUS: Tự động tối ưu hóa điện năng. Khi trời sáng hoặc không có người, hệ thống ngắt đèn và điều hòa để bảo vệ năng lượng.
          </div>
        </div>
      </div>
    </div>
  );
};
