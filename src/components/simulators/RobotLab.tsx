import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  Play,
  Pause,
  RotateCw,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Shield,
  Zap,
  Activity,
  Gauge,
  Compass,
  Radio,
  Sliders,
  RefreshCw,
  Terminal,
  Volume2,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { playCyberBeep, playLaserChirp, playSuccessChirp } from '../../utils/audio';
import { CyberAudioDeck } from '../CyberAudioDeck';

interface RobotState {
  x: number;
  y: number;
  angle: number; // in degrees: 0 is facing right, 90 down, 180 left, 270 up
  speed: number;
  gripperClosed: boolean;
  radarDistance: number;
  leftLineSensor: boolean;
  rightLineSensor: boolean;
  battery: number;
  mode: 'manual' | 'avoid_obstacle' | 'line_follow';
  isMoving: boolean;
  lastAction: string;
}

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  name: string;
}

export const RobotLab: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [robot, setRobot] = useState<RobotState>({
    x: 140,
    y: 130,
    angle: 0,
    speed: 180, // PWM 0-255
    gripperClosed: false,
    radarDistance: 45,
    leftLineSensor: false,
    rightLineSensor: false,
    battery: 96,
    mode: 'manual',
    isMoving: false,
    lastAction: 'Robot sẵn sàng tại vị trí xuất phát',
  });

  const [activeTab, setActiveTab] = useState<'arena' | 'audio' | 'code'>('arena');
  const [speedPwm, setSpeedPwm] = useState(180);

  // Arena obstacles
  const obstacles: Obstacle[] = [
    { x: 260, y: 70, w: 40, h: 40, color: '#f59e0b', name: 'Hộp linh kiện cơ khí' },
    { x: 320, y: 160, w: 45, h: 45, color: '#ef4444', name: 'Vật cản tĩnh' },
    { x: 100, y: 190, w: 35, h: 35, color: '#06b6d4', name: 'Trạm sạc tự động' },
    { x: 220, y: 20, w: 30, h: 30, color: '#a855f7', name: 'Module cảm biến' },
  ];

  // Helper to calculate distance to nearest obstacle
  const getDistanceToObstacles = (rx: number, ry: number, rAngle: number) => {
    const rad = (rAngle * Math.PI) / 180;
    const forwardX = Math.cos(rad);
    const forwardY = Math.sin(rad);

    let minDistance = 120; // max sensor range 120cm

    obstacles.forEach((obs) => {
      const centerX = obs.x + obs.w / 2;
      const centerY = obs.y + obs.h / 2;
      const dx = centerX - rx;
      const dy = centerY - ry;

      // Project onto forward vector
      const dot = dx * forwardX + dy * forwardY;
      if (dot > 0 && dot < minDistance) {
        // Distance perpendicular to line of sight
        const perpDist = Math.abs(-forwardY * dx + forwardX * dy);
        if (perpDist < 35) {
          minDistance = Math.min(minDistance, Math.round(dot));
        }
      }
    });

    return Math.max(8, minDistance);
  };

  // Movement handler
  const handleMove = (type: 'forward' | 'backward' | 'left' | 'right' | 'rotate360' | 'stop') => {
    setRobot((prev) => {
      let { x, y, angle } = prev;
      let lastAction = prev.lastAction;
      const step = 14;

      if (type === 'forward') {
        const rad = (angle * Math.PI) / 180;
        const nextX = Math.max(25, Math.min(375, x + Math.cos(rad) * step));
        const nextY = Math.max(25, Math.min(235, y + Math.sin(rad) * step));
        x = nextX;
        y = nextY;
        lastAction = 'Tiến lên 1 bước (PWM: ' + speedPwm + ')';
        playCyberBeep(650, 'sine', 0.05);
      } else if (type === 'backward') {
        const rad = (angle * Math.PI) / 180;
        const nextX = Math.max(25, Math.min(375, x - Math.cos(rad) * step));
        const nextY = Math.max(25, Math.min(235, y - Math.sin(rad) * step));
        x = nextX;
        y = nextY;
        lastAction = 'Lùi lại 1 bước';
        playCyberBeep(450, 'sine', 0.05);
      } else if (type === 'left') {
        angle = (angle - 30 + 360) % 360;
        lastAction = 'Rẽ trái 30°';
        playCyberBeep(520, 'triangle', 0.05);
      } else if (type === 'right') {
        angle = (angle + 30) % 360;
        lastAction = 'Rẽ phải 30°';
        playCyberBeep(580, 'triangle', 0.05);
      } else if (type === 'rotate360') {
        angle = (angle + 180) % 360;
        lastAction = 'Xoay ngược hướng 180°';
        playLaserChirp();
      } else if (type === 'stop') {
        lastAction = 'Phanh dừng khẩn cấp';
        playCyberBeep(300, 'square', 0.08);
      }

      const dist = getDistanceToObstacles(x, y, angle);
      return {
        ...prev,
        x,
        y,
        angle,
        radarDistance: dist,
        lastAction,
        isMoving: type !== 'stop',
      };
    });
  };

  const toggleGripper = () => {
    setRobot((prev) => {
      const next = !prev.gripperClosed;
      playSuccessChirp();
      return {
        ...prev,
        gripperClosed: next,
        lastAction: next ? 'Cánh tay Servo: KẸP VẬT THỂ (Góc 90°)' : 'Cánh tay Servo: NHẢ VẬT THỂ (Góc 0°)',
      };
    });
  };

  const resetRobot = () => {
    playLaserChirp();
    setRobot({
      x: 80,
      y: 130,
      angle: 0,
      speed: speedPwm,
      gripperClosed: false,
      radarDistance: 65,
      leftLineSensor: false,
      rightLineSensor: false,
      battery: 98,
      mode: 'manual',
      isMoving: false,
      lastAction: 'Đã đưa Robot về vạch xuất phát ban đầu',
    });
  };

  // Autonomous mode loop
  useEffect(() => {
    if (robot.mode === 'manual') return;

    const interval = setInterval(() => {
      setRobot((prev) => {
        let { x, y, angle } = prev;
        const rad = (angle * Math.PI) / 180;
        let dist = getDistanceToObstacles(x, y, angle);
        let action = prev.lastAction;

        if (prev.mode === 'avoid_obstacle') {
          if (dist < 30) {
            // Obstacle too close! Turn right
            angle = (angle + 45) % 360;
            action = `Phát hiện vật cản ở ${dist}cm! Rẽ tránh 45°`;
            playCyberBeep(800, 'square', 0.03);
          } else {
            // Keep going forward
            x = Math.max(25, Math.min(375, x + Math.cos(rad) * 6));
            y = Math.max(25, Math.min(235, y + Math.sin(rad) * 6));
            action = `Tự hành an toàn: Khoảng cách phía trước ${dist}cm`;
          }
        } else if (prev.mode === 'line_follow') {
          // Line following simulation around an oval track
          angle = (angle + 8) % 360;
          x = 200 + Math.cos((angle * Math.PI) / 180) * 110;
          y = 130 + Math.sin((angle * Math.PI) / 180) * 75;
          action = 'Cảm biến IR bám theo quỹ đạo line đen';
        }

        dist = getDistanceToObstacles(x, y, angle);
        return {
          ...prev,
          x,
          y,
          angle,
          radarDistance: dist,
          lastAction: action,
        };
      });
    }, 250);

    return () => clearInterval(interval);
  }, [robot.mode]);

  // Render Canvas Arena
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    // Background grid
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, W, H);

    // Cyber grid lines
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Line track (for line following)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.ellipse(200, 130, 110, 75, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(14, 165, 233, 0.7)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.ellipse(200, 130, 110, 75, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Obstacles
    obstacles.forEach((obs) => {
      ctx.fillStyle = obs.color;
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px monospace';
      ctx.fillText(obs.name.split(' ')[0], obs.x + 3, obs.y + obs.h / 2 + 3);
    });

    // Draw Radar Scan Beam from Robot
    const rad = (robot.angle * Math.PI) / 180;
    const radarReach = Math.min(robot.radarDistance * 2.5, 120);

    const beamLeftRad = rad - 0.25;
    const beamRightRad = rad + 0.25;

    ctx.fillStyle =
      robot.radarDistance < 25
        ? 'rgba(239, 68, 68, 0.25)'
        : robot.radarDistance < 40
        ? 'rgba(245, 158, 11, 0.2)'
        : 'rgba(6, 182, 212, 0.15)';
    ctx.beginPath();
    ctx.moveTo(robot.x, robot.y);
    ctx.arc(robot.x, robot.y, radarReach, beamLeftRad, beamRightRad);
    ctx.closePath();
    ctx.fill();

    // Radar laser line
    ctx.strokeStyle =
      robot.radarDistance < 25 ? '#ef4444' : robot.radarDistance < 40 ? '#f59e0b' : '#06b6d4';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(robot.x, robot.y);
    ctx.lineTo(robot.x + Math.cos(rad) * radarReach, robot.y + Math.sin(rad) * radarReach);
    ctx.stroke();

    // Draw Robot Rover Body
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(rad);

    // Wheels (treads)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(-18, -16, 36, 6);
    ctx.fillRect(-18, 10, 36, 6);

    // Main Chassis
    ctx.fillStyle = '#0f172a';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-15, -12, 30, 24, 4);
    ctx.fill();
    ctx.stroke();

    // Head / Eye Sensor
    ctx.fillStyle = robot.radarDistance < 25 ? '#ef4444' : '#22d3ee';
    ctx.beginPath();
    ctx.arc(8, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    // Forward Direction Arrow
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(6, -4);
    ctx.lineTo(6, 4);
    ctx.closePath();
    ctx.fill();

    // Gripper Arm at Front
    ctx.strokeStyle = robot.gripperClosed ? '#a855f7' : '#94a3b8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    if (robot.gripperClosed) {
      // Clamped
      ctx.moveTo(14, -6);
      ctx.lineTo(20, -2);
      ctx.moveTo(14, 6);
      ctx.lineTo(20, 2);
    } else {
      // Open
      ctx.moveTo(14, -4);
      ctx.lineTo(20, -7);
      ctx.moveTo(14, 4);
      ctx.lineTo(20, 7);
    }
    ctx.stroke();

    ctx.restore();
  }, [robot]);

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-cyan-500/40 p-4 sm:p-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-900/50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-cyber font-bold text-base sm:text-lg text-slate-100 tracking-wider">
                PHÒNG THÍ NGHIỆM ROBOT LAB // TỔ STEM FSCBN
              </h3>
              <span className="text-[10px] font-cyber px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 font-semibold shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                STEM ROVER READY
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Mô phỏng robot tự hành, cảm biến siêu âm HC-SR04, cánh tay kẹp gắp servo và âm thanh điều khiển.
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              playCyberBeep(600, 'sine', 0.03);
              setActiveTab('arena');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'arena'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Sa Bàn Rover</span>
          </button>

          <button
            onClick={() => {
              playCyberBeep(700, 'sine', 0.03);
              setActiveTab('audio');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'audio'
                ? 'bg-purple-950 text-purple-300 border border-purple-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Cyber Audio Deck</span>
          </button>

          <button
            onClick={() => {
              playCyberBeep(800, 'sine', 0.03);
              setActiveTab('code');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-cyber tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/50 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Mã Lệnh STEM</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'arena' && (
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Canvas Sa Bàn (Left / Top) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between text-xs font-cyber text-slate-400 mb-2">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                SA BÀN TRẮC ĐỊA & CHƯỚNG NGẠI VẬT (400 x 260 PX)
              </span>
              <button
                onClick={resetRobot}
                className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" /> Đặt lại vị trí
              </button>
            </div>

            <div className="relative border-2 border-cyan-500/40 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-slate-950 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={400}
                height={260}
                className="w-full max-w-[480px] h-auto aspect-[400/260] block cursor-crosshair"
              />

              {/* Status overlay badge on canvas */}
              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-sm border border-cyan-800/80 rounded-md px-2 py-1 text-[11px] font-mono text-cyan-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>
                  X:{Math.round(robot.x)} Y:{Math.round(robot.y)} Góc:{Math.round(robot.angle)}°
                </span>
              </div>

              {/* Warning if too close */}
              {robot.radarDistance < 25 && (
                <div className="absolute top-2 right-2 bg-red-950/90 border border-red-500/80 rounded-md px-2.5 py-1 text-[11px] font-cyber text-red-300 font-bold animate-bounce flex items-center gap-1">
                  <span>⚠️ CẢNH BÁO VẬT CẢN: {robot.radarDistance} CM</span>
                </div>
              )}
            </div>

            {/* Live action log */}
            <div className="mt-2.5 bg-slate-950/70 border border-slate-800 rounded-lg p-2 text-xs font-mono text-cyan-300 flex items-center justify-between">
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-slate-500">Log:</span>
                <span className="truncate">{robot.lastAction}</span>
              </div>
              <span className="text-[10px] text-slate-500 shrink-0">PWM {speedPwm}</span>
            </div>
          </div>

          {/* Control Deck & Telemetry (Right / Bottom) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {/* Mode Selectors */}
            <div className="space-y-1.5">
              <label className="text-xs font-cyber text-slate-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                CHẾ ĐỘ VẬN HÀNH ROBOT:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    playLaserChirp();
                    setRobot((p) => ({ ...p, mode: 'manual', lastAction: 'Chuyển sang chế độ THỦ CÔNG' }));
                  }}
                  className={`p-2 rounded-lg text-xs font-cyber transition-all border text-center cursor-pointer ${
                    robot.mode === 'manual'
                      ? 'bg-cyan-950 text-cyan-200 border-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Thủ Công
                </button>
                <button
                  onClick={() => {
                    playLaserChirp();
                    setRobot((p) => ({ ...p, mode: 'avoid_obstacle', lastAction: 'Khởi động TỰ HÀNH NÉ VẬT CẢN' }));
                  }}
                  className={`p-2 rounded-lg text-xs font-cyber transition-all border text-center cursor-pointer ${
                    robot.mode === 'avoid_obstacle'
                      ? 'bg-emerald-950 text-emerald-200 border-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Né Vật Cản
                </button>
                <button
                  onClick={() => {
                    playLaserChirp();
                    setRobot((p) => ({ ...p, mode: 'line_follow', lastAction: 'Khởi động DÒ ĐƯỜNG THEO QUỸ ĐẠO' }));
                  }}
                  className={`p-2 rounded-lg text-xs font-cyber transition-all border text-center cursor-pointer ${
                    robot.mode === 'line_follow'
                      ? 'bg-purple-950 text-purple-200 border-purple-400 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Dò Line IR
                </button>
              </div>
            </div>

            {/* Telemetry Sensor Dashboard */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2.5">
              <div className="text-xs font-cyber text-slate-400 flex items-center justify-between border-b border-slate-800/80 pb-1.5">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Gauge className="w-3.5 h-3.5" />
                  THÔNG SỐ CẢM BIẾN THỜI GIAN THỰC
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">Pin: {robot.battery}% (7.4V)</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {/* Distance */}
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Cảm biến siêu âm</div>
                  <div
                    className={`font-bold text-sm ${
                      robot.radarDistance < 25
                        ? 'text-red-400 animate-pulse'
                        : robot.radarDistance < 40
                        ? 'text-amber-400'
                        : 'text-cyan-300'
                    }`}
                  >
                    {robot.radarDistance} cm
                  </div>
                </div>

                {/* Gripper */}
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500 uppercase">Tay gắp Servo</div>
                  <div className={`font-bold text-sm ${robot.gripperClosed ? 'text-purple-400' : 'text-slate-300'}`}>
                    {robot.gripperClosed ? 'KẸP (90°)' : 'MỞ (0°)'}
                  </div>
                </div>
              </div>

              {/* Speed Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Tốc độ Motor PWM:</span>
                  <span className="text-cyan-300 font-bold">{speedPwm} / 255</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={255}
                  value={speedPwm}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSpeedPwm(val);
                    setRobot((p) => ({ ...p, speed: val }));
                  }}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* D-Pad Controller */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center">
              <div className="text-xs font-cyber text-slate-400 mb-2 flex items-center justify-between w-full">
                <span>ĐIỀU KHIỂN D-PAD THỦ CÔNG:</span>
                <span className="text-[10px] text-cyan-400 font-mono">BẤM HOẶC PHÍM MŨI TÊN</span>
              </div>

              <div className="grid grid-cols-3 gap-2 w-44">
                <div className="col-span-1" />
                <button
                  onClick={() => handleMove('forward')}
                  title="Tiến lên"
                  className="p-3 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <div className="col-span-1" />

                <button
                  onClick={() => handleMove('left')}
                  title="Rẽ trái 30 độ"
                  className="p-3 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleMove('stop')}
                  title="Phanh dừng"
                  className="p-2.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/60 text-red-300 flex items-center justify-center text-xs font-cyber font-bold transition-all cursor-pointer shadow-md active:scale-95"
                >
                  DỪNG
                </button>

                <button
                  onClick={() => handleMove('right')}
                  title="Rẽ phải 30 độ"
                  className="p-3 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => handleMove('rotate360')}
                  title="Xoay ngược hướng"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 flex items-center justify-center text-xs font-mono transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleMove('backward')}
                  title="Lùi lại"
                  className="p-3 rounded-lg bg-slate-900 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 text-cyan-300 flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>

                <button
                  onClick={toggleGripper}
                  title="Đóng / mở cánh tay kẹp"
                  className={`p-2 rounded-lg border flex items-center justify-center text-xs font-cyber transition-all cursor-pointer shadow-md active:scale-95 ${
                    robot.gripperClosed
                      ? 'bg-purple-950 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      : 'bg-slate-900 border-slate-700 text-slate-300'
                  }`}
                >
                  {robot.gripperClosed ? 'Nhả' : 'Gắp'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cyber Audio Deck Tab */}
      {activeTab === 'audio' && (
        <div className="mt-5">
          <CyberAudioDeck />
        </div>
      )}

      {/* STEM Code Snippet Tab */}
      {activeTab === 'code' && (
        <div className="mt-5 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-cyan-400 font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Arduino / ESP32 Robot Obstacle Avoidance Code (C++)
              </span>
              <span className="text-slate-500 text-[11px]">TỔ STEM FSCBN // THCS</span>
            </div>

            <pre className="text-cyan-200/90 overflow-x-auto p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 leading-relaxed">
{`// === PHÒNG THÍ NGHIỆM ROBOT LAB - TỔ STEM FSCBN ===
#include <Servo.h>

const int TRIG_PIN = 9;   // Chân phát siêu âm
const int ECHO_PIN = 10;  // Chân nhận siêu âm
const int MOTOR_PWM = 6;  // Tốc độ động cơ
Servo gripperServo;       // Điều khiển tay gắp

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  gripperServo.attach(11);
  Serial.begin(9600);
  Serial.println("Robot STEM FSCBN Ready!");
}

long getDistanceCM() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2;
}

void loop() {
  long distance = getDistanceCM();
  if (distance < 25) {
    // Vật cản quá gần: Dừng và rẽ tránh
    brakeRobot();
    turnRight(45);
  } else {
    // An toàn: Tiến về phía trước
    moveForward(${speedPwm});
  }
  delay(100);
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
