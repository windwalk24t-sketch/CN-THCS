import React, { useState, useEffect } from 'react';
import { Bot, Terminal, Award, CheckCircle, Sparkles, QrCode } from 'lucide-react';
import { GradeLevel } from '../types/curriculum';
import { ALL_GRADE_EXAMS } from '../data/examData';
import robotHeroImg from '../assets/images/cyber_robot_hero_1791029757334.jpg';
import robotAvatarImg from '../assets/images/robot_avatar_mentor_1791029771859.jpg';
import { playCyberBeep } from '../utils/audio';
import { CyberQRCard } from './CyberQRCard';

interface CyberHeroProps {
  selectedGrade: GradeLevel;
  onSelectGrade: (grade: GradeLevel) => void;
  onOpenQRModal?: () => void;
}

const EXAM_TERMINAL_LOGS = [
  'HỆ THỐNG ĐANG MỞ ĐỀ ÔN TẬP: KHỐI 6 · KHỐI 7 · KHỐI 8 · KHỐI 9',
  'CÔNG NGHỆ 6: NHÀ Ở · VẬT LIỆU XÂY DỰNG · NHÀ THÔNG MINH · DINH DƯỠNG (15 TN + 3 TL)',
  'CÔNG NGHỆ 7: THU HOẠCH NÔNG SẢN · TRỒNG TRỌT · PHÒNG TRỪ SÂU BỆNH · NHÂN GIỐNG VÔ TÍNH (15 TN + 4 TL)',
  'CÔNG NGHỆ 8: VẬT LIỆU CƠ KHÍ · BẢN VẼ KỸ THUẬT · HÌNH CHIẾU · KHỐI TRÒN XOAY · AN TOÀN ĐIỆN (15 TN + 4 TL)',
  'CÔNG NGHỆ 9: THIẾT BỊ ĐIỆN DÂN DỤNG · ĐỊNH HƯỚNG NGHỀ KỸ THUẬT STEM (15 TN + 3 TL)',
  'TỰ ĐỘNG CHẤM ĐIỂM TRẮC NGHIỆM · HỌC SINH NỘP BÀI TRỰC TIẾP VỀ BÀN GIÁO VIÊN',
  'GIÁO VIÊN NGUYỄN ĐỨC TÀI: SẴN SÀNG ĐÁNH GIÁ, CHẤM TỰ LUẬN & XUẤT BẢNG ĐIỂM',
];

export const CyberHero: React.FC<CyberHeroProps> = ({
  selectedGrade,
  onSelectGrade,
  onOpenQRModal,
}) => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % EXAM_TERMINAL_LOGS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const gradeConfigs: {
    level: GradeLevel;
    label: string;
    topics: string;
  }[] = [
    {
      level: 6,
      label: 'Khối 6',
      topics: 'Nhà ở & Nhà thông minh',
    },
    {
      level: 7,
      label: 'Khối 7',
      topics: 'Trồng trọt & Nông sản',
    },
    {
      level: 8,
      label: 'Khối 8',
      topics: 'Bản vẽ kỹ thuật & Điện',
    },
    {
      level: 9,
      label: 'Khối 9',
      topics: 'Hệ thống điện & Hướng nghiệp',
    },
  ];

  return (
    <div className="relative overflow-hidden border-b border-cyan-950/60 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Headlines & Grade Quick Buttons */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            {/* Teacher Badge & Status */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-cyber tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <img
                src={robotAvatarImg}
                alt="Robot Mentor Avatar"
                className="w-5 h-5 rounded-full border border-cyan-400 object-cover"
                referrerPolicy="no-referrer"
              />
              <span>TỔ STEM FSCBN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>

            <div>
              <h1 className="font-cyber font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight text-slate-100 leading-tight">
                HỆ THỐNG ÔN THI
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-cyan-400 mt-1">
                  CÔNG NGHỆ THCS (KHỐI 6 · 7 · 8 · 9)
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Bộ sách Kết Nối Tri Thức Với Cuộc Sống. Học sinh đăng ký họ tên, biệt danh để làm bài trực tuyến; hệ thống tự động chấm điểm trắc nghiệm khách quan và gửi toàn bộ bài làm về Bàn giáo viên TỔ STEM FSCBN.
              </p>
            </div>

            {/* Terminal Live Stream Ticker */}
            <div className="p-3 rounded-xl bg-slate-950/90 border border-cyan-900/60 font-mono text-xs text-cyan-400/90 flex items-center gap-2 overflow-hidden shadow-inner">
              <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-500 shrink-0">&gt;</span>
              <span className="truncate transition-all duration-300 font-cyber">
                {EXAM_TERMINAL_LOGS[logIndex]}
              </span>
              <span className="w-2 h-4 bg-cyan-400/80 animate-pulse ml-auto shrink-0" />
            </div>

            {/* Quick Grade Selection Cards */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2 text-xs font-cyber text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>CHỌN NHANH ĐỀ ÔN TẬP THEO KHỐI LỚP:</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {gradeConfigs.map((g) => {
                  const isCurrent = selectedGrade === g.level;
                  const examInfo = ALL_GRADE_EXAMS[g.level];
                  return (
                    <button
                      key={g.level}
                      onClick={() => {
                        playCyberBeep(650 + g.level * 40, 'triangle', 0.04);
                        onSelectGrade(g.level);
                      }}
                      className={`p-2.5 sm:p-3 rounded-xl border transition-all text-left cursor-pointer group flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/50'
                          : 'bg-slate-900/70 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-cyber font-bold text-xs sm:text-sm tracking-wider ${
                          isCurrent ? 'text-cyan-300' : 'text-slate-200 group-hover:text-cyan-300'
                        }`}>
                          LỚP {g.level}
                        </span>
                        <Award className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-400' : 'text-slate-600'}`} />
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-1 truncate">
                        {g.topics}
                      </div>
                      <div className="text-[10px] font-mono text-cyan-400/80 mt-1.5 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        <span>{examInfo.multipleChoice.length} TN + {examInfo.essay.length} TL</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Asset & Scannable QR Code */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-[0_0_35px_rgba(6,182,212,0.25)] group">
              <img
                src={robotHeroImg}
                alt="Robot Teacher Nguyễn Đức Tài - Hệ thống Ôn thi Công nghệ THCS"
                className="w-full h-48 sm:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Overlay HUD Badges */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span className="font-cyber text-slate-200 font-semibold">BOT-TÀI 4.0</span>
                </div>
                <div className="font-mono text-[11px] text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>ĐANG MỞ ĐỀ ÔN THI</span>
                </div>
              </div>
            </div>

            {/* Embedded Scannable QR Code Card */}
            {onOpenQRModal && <CyberQRCard onOpenModal={onOpenQRModal} />}
          </div>
        </div>
      </div>
    </div>
  );
};
