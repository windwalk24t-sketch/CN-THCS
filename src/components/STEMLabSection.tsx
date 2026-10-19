import React, { useState } from 'react';
import {
  Bot,
  Zap,
  Home,
  Droplets,
  Compass,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { RobotLab } from './simulators/RobotLab';
import { CircuitSimulator } from './simulators/CircuitSimulator';
import { SmartHomeSimulator } from './simulators/SmartHomeSimulator';
import { IrrigationSimulator } from './simulators/IrrigationSimulator';
import { CareerSimulator } from './simulators/CareerSimulator';
import { playCyberBeep } from '../utils/audio';

type ActiveSimType = 'robot_lab' | 'circuit' | 'smart_home' | 'irrigation' | 'career';

interface STEMLabSectionProps {
  initialSimulator?: ActiveSimType;
}

export const STEMLabSection: React.FC<STEMLabSectionProps> = ({ initialSimulator = 'robot_lab' }) => {
  const [activeSim, setActiveSim] = useState<ActiveSimType>(initialSimulator);

  const simulators: {
    id: ActiveSimType;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    color: string;
    glowColor: string;
  }[] = [
    {
      id: 'robot_lab',
      label: 'Robot Lab STEM',
      subLabel: 'Mô phỏng Rover & Cảm biến',
      icon: <Bot className="w-4 h-4" />,
      color: 'border-cyan-500/50 text-cyan-300 bg-cyan-950/60',
      glowColor: 'shadow-[0_0_15px_rgba(6,182,212,0.25)]',
    },
    {
      id: 'circuit',
      label: 'Mạch Điện & Quá Tải',
      subLabel: 'Aptomat an toàn (CN 8 - 9)',
      icon: <Zap className="w-4 h-4" />,
      color: 'border-amber-500/50 text-amber-300 bg-amber-950/60',
      glowColor: 'shadow-[0_0_15px_rgba(245,158,11,0.25)]',
    },
    {
      id: 'smart_home',
      label: 'Nhà Thông Minh IoT',
      subLabel: 'ESP32 cảm biến PIR (CN 6 - 9)',
      icon: <Home className="w-4 h-4" />,
      color: 'border-blue-500/50 text-blue-300 bg-blue-950/60',
      glowColor: 'shadow-[0_0_15px_rgba(59,130,246,0.25)]',
    },
    {
      id: 'irrigation',
      label: 'Tưới Tiêu Tự Động',
      subLabel: 'Nông nghiệp IoT (CN 7)',
      icon: <Droplets className="w-4 h-4" />,
      color: 'border-emerald-500/50 text-emerald-300 bg-emerald-950/60',
      glowColor: 'shadow-[0_0_15px_rgba(16,185,129,0.25)]',
    },
    {
      id: 'career',
      label: 'Trắc Nghiệm Nghề STEM',
      subLabel: 'Định hướng kỹ thuật (CN 9)',
      icon: <Compass className="w-4 h-4" />,
      color: 'border-purple-500/50 text-purple-300 bg-purple-950/60',
      glowColor: 'shadow-[0_0_15px_rgba(168,85,247,0.25)]',
    },
  ];

  return (
    <section id="stem-lab-section" className="space-y-6 pt-6 border-t border-cyan-900/40">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/90 border border-cyan-500/60 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-cyber font-bold text-lg sm:text-xl text-slate-100 tracking-wider">
                PHÒNG THÍ NGHIỆM ROBOT LAB & TRÌNH MÔ PHỎNG PHỤ
              </h2>
              <span className="hidden sm:inline-flex text-[10px] font-cyber px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                TỔ STEM FSCBN
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Trải nghiệm thực hành vi mạch, nhà thông minh, hệ thống tưới tiêu và định hướng nghề nghiệp STEM.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-cyber text-slate-400">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>Mô Phỏng Trực Quan 100%</span>
        </div>
      </div>

      {/* Simulator Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {simulators.map((s) => {
          const isSelected = activeSim === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                playCyberBeep(700, 'sine', 0.03);
                setActiveSim(s.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${s.color} ${s.glowColor} font-bold ring-1 ring-cyan-400/50`
                  : 'bg-slate-900/70 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {s.icon}
                <span className="text-xs font-cyber tracking-wider truncate">{s.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-sans truncate">{s.subLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Simulator Content Area */}
      <div className="transition-all">
        {activeSim === 'robot_lab' && <RobotLab />}

        {activeSim === 'circuit' && (
          <div className="space-y-4">
            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs text-amber-200/90 flex items-center justify-between">
              <span>⚡ MÔ PHỎNG AN TOÀN ĐIỆN: Kiểm tra nguyên lý hoạt động của Cầu dao tự động (Aptomat) khi xảy ra quá tải thiết bị.</span>
              <span className="font-mono text-[10px] text-amber-400">CÔNG NGHỆ 8 & 9</span>
            </div>
            <CircuitSimulator />
          </div>
        )}

        {activeSim === 'smart_home' && (
          <div className="space-y-4">
            <div className="p-3 bg-blue-950/40 border border-blue-500/40 rounded-xl text-xs text-blue-200/90 flex items-center justify-between">
              <span>🏠 MÔ PHỎNG NHÀ THÔNG MINH IoT: Hệ thống cảm biến quang trở, hồng ngoại và điều hòa tự động tiết kiệm năng lượng.</span>
              <span className="font-mono text-[10px] text-blue-400">CÔNG NGHỆ 6 & 9</span>
            </div>
            <SmartHomeSimulator />
          </div>
        )}

        {activeSim === 'irrigation' && (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-xs text-emerald-200/90 flex items-center justify-between">
              <span>🌱 MÔ PHỎNG NÔNG NGHIỆP CÔNG NGHỆ CAO: Hệ thống cảm biến độ ẩm đất và tưới nhỏ giọt tự động.</span>
              <span className="font-mono text-[10px] text-emerald-400">CÔNG NGHỆ 7</span>
            </div>
            <IrrigationSimulator />
          </div>
        )}

        {activeSim === 'career' && (
          <div className="space-y-4">
            <div className="p-3 bg-purple-950/40 border border-purple-500/40 rounded-xl text-xs text-purple-200/90 flex items-center justify-between">
              <span>🧭 TRẮC NGHIỆM ĐỊNH HƯỚNG NGHỀ NGHIỆP STEM: Khám phá độ phù hợp với ngành Cơ điện tử, Vi mạch, Thiết kế CAD hay Năng lượng.</span>
              <span className="font-mono text-[10px] text-purple-400">CÔNG NGHỆ 9</span>
            </div>
            <CareerSimulator />
          </div>
        )}
      </div>
    </section>
  );
};
