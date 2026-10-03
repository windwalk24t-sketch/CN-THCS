import React, { useState } from 'react';
import { Droplets, Sprout, Gauge, Activity, AlertTriangle } from 'lucide-react';
import { playCyberBeep } from '../../utils/audio';

export const IrrigationSimulator: React.FC = () => {
  const [moisture, setMoisture] = useState(32);
  const [threshold] = useState(40);
  const [pumpManualOverride, setPumpManualOverride] = useState(false);
  const [waterTankLevel, setWaterTankLevel] = useState(85);

  const isPumpActive = moisture < threshold || pumpManualOverride;

  const handleMoistureChange = (val: number) => {
    setMoisture(val);
    playCyberBeep(350 + val * 6, 'triangle', 0.02);
  };

  const handleManualWatering = () => {
    playCyberBeep(600, 'sine', 0.1);
    setPumpManualOverride(true);
    setTimeout(() => {
      setMoisture((prev) => Math.min(prev + 25, 95));
      setWaterTankLevel((prev) => Math.max(prev - 5, 10));
      setPumpManualOverride(false);
    }, 1200);
  };

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-5 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/40 mb-4">
        <div className="flex items-center gap-2">
          <Sprout className="w-5 h-5 text-emerald-400" />
          <h4 className="font-cyber font-bold text-emerald-200 tracking-wide text-sm">
            SMART AGRI-TECH // HỆ THỐNG TƯỚI NHỎ GIỌT IoT
          </h4>
        </div>
        <span className="text-xs font-mono text-emerald-400/80 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
          CHẾ ĐỘ: TỰ ĐỘNG
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sensor Adjuster */}
        <div className="space-y-4">
          <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Gauge className="w-4 h-4 text-emerald-400" /> Cảm biến độ ẩm đất (% VWC):
              </span>
              <span
                className={`font-mono font-bold text-sm ${
                  moisture < threshold ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {moisture}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              value={moisture}
              onChange={(e) => handleMoistureChange(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span className="text-amber-400/80">Khô hạn (&lt;40%)</span>
              <span className="text-emerald-400/80">Độ ẩm tối ưu (50-70%)</span>
              <span>Đẫm nước (&gt;80%)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Mực nước bể chứa</div>
              <div className="font-cyber font-bold text-base text-cyan-300 mt-1 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-cyan-400" /> {waterTankLevel}%
              </div>
            </div>

            <button
              onClick={handleManualWatering}
              disabled={pumpManualOverride}
              className="bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 border border-emerald-600/70 p-3 rounded-lg font-medium text-xs transition-all disabled:opacity-50 text-left"
            >
              <div className="text-[10px] font-mono text-emerald-400 uppercase">Kích hoạt tưới</div>
              <div className="font-cyber font-bold mt-1">
                {pumpManualOverride ? 'ĐANG BƠM...' : 'BƠM THỦ CÔNG'}
              </div>
            </button>
          </div>
        </div>

        {/* Node Actuator Status */}
        <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" /> Trạng thái máy bơm & van tưới
            </div>

            <div
              className={`p-3 rounded-lg border transition-all ${
                isPumpActive
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets
                    className={`w-5 h-5 ${
                      isPumpActive ? 'text-emerald-400 animate-bounce' : 'text-slate-600'
                    }`}
                  />
                  <div>
                    <div className="font-semibold text-xs text-slate-200">Máy bơm tưới nhỏ giọt 12V</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {isPumpActive ? 'Áp suất 1.5 Bar - Đang cấp nước vào gốc' : 'Hệ thống ngắt - Đất đủ ẩm'}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isPumpActive
                      ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-500'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isPumpActive ? 'RUNNING' : 'IDLE'}
                </span>
              </div>
            </div>

            {moisture < 25 && (
              <div className="flex items-center gap-2 text-[11px] text-amber-300 bg-amber-950/40 border border-amber-800/60 p-2 rounded">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Cảnh báo: Đất quá khô cằn, rễ cây cần nước khẩn cấp để quang hợp!</span>
              </div>
            )}
          </div>

          <div className="mt-4 p-2.5 rounded bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-300 font-mono">
            &gt; NGUYÊN LÝ NÔNG NGHIỆP 4.0: Tưới chính xác theo độ ẩm thực tế của rễ, giảm 50% lượng nước bay hơi và không rửa trôi dinh dưỡng đất.
          </div>
        </div>
      </div>
    </div>
  );
};
