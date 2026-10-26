import React, { useState, useMemo } from 'react';
import { GradeLevel } from '../types/curriculum';
import {
  StudentSubmission,
  ALL_GRADE_EXAMS,
  RankTier,
  RANK_TIER_CONFIG,
  getSubmissionDisplayScore,
  getRankTier,
} from '../data/examData';
import {
  Trophy,
  Crown,
  Award,
  Zap,
  Shield,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  FileText,
  Sparkles,
  Clock,
  BookOpen,
  X,
  RefreshCw,
  Users,
  ChevronDown,
  Info,
} from 'lucide-react';
import { playLaserChirp, playCyberBeep } from '../utils/audio';

interface VisitorLeaderboardViewProps {
  submissions: StudentSubmission[];
  isCloudConnected?: boolean;
  onRefresh?: () => void;
}

export const VisitorLeaderboardView: React.FC<VisitorLeaderboardViewProps> = ({
  submissions,
  isCloudConnected = true,
  onRefresh,
}) => {
  // Filters & Search
  const [selectedGrade, setSelectedGrade] = useState<'ALL' | GradeLevel>('ALL');
  const [selectedClass, setSelectedClass] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<'ALL' | RankTier>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'score_desc' | 'score_asc' | 'newest' | 'name'>('score_desc');

  // Selected Submission for Read-Only Modal
  const [viewingSubmission, setViewingSubmission] = useState<StudentSubmission | null>(null);
  const [modalMCFilter, setModalMCFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Available classes: ensuring full A1 to A5 for all grades
  const visitorClassOptions = useMemo(() => {
    const defaultSuffixes = ['A1', 'A2', 'A3', 'A4', 'A5'];
    if (selectedGrade !== 'ALL') {
      const standard = defaultSuffixes.map((s) => `${selectedGrade}${s}`);
      const extra = Array.from(
        new Set(
          submissions
            .filter((s) => s.grade === selectedGrade)
            .map((s) => s.studentClass)
            .filter((c) => Boolean(c) && !standard.includes(c))
        )
      );
      return {
        isGrouped: false,
        grade: selectedGrade,
        classes: [...standard, ...extra],
      };
    } else {
      const groups = ([6, 7, 8, 9] as GradeLevel[]).map((g) => {
        const standard = defaultSuffixes.map((s) => `${g}${s}`);
        const extra = Array.from(
          new Set(
            submissions
              .filter((s) => s.grade === g)
              .map((s) => s.studentClass)
              .filter((c) => Boolean(c) && !standard.includes(c))
          )
        );
        return {
          grade: g,
          classes: [...standard, ...extra],
        };
      });
      return {
        isGrouped: true,
        groups,
      };
    }
  }, [selectedGrade, submissions]);

  // Compute enriched submissions with calculated score & rank tier
  const enrichedSubmissions = useMemo(() => {
    return submissions.map((sub) => {
      const score = getSubmissionDisplayScore(sub);
      const tier = getRankTier(score);
      return {
        ...sub,
        computedScore: score,
        rankTier: tier,
      };
    });
  }, [submissions]);

  // Overall Statistics by Rank Tier
  const tierCounts = useMemo(() => {
    const counts: Record<RankTier, number> = {
      nguyen_soai: 0,
      tuong_quan: 0,
      cao_thu: 0,
      tan_thu: 0,
    };
    // If grade filter is applied, count within that grade, else all
    enrichedSubmissions.forEach((sub) => {
      if (selectedGrade === 'ALL' || sub.grade === selectedGrade) {
        counts[sub.rankTier]++;
      }
    });
    return counts;
  }, [enrichedSubmissions, selectedGrade]);

  // Filtered & Sorted Submissions
  const filteredSubmissions = useMemo(() => {
    return enrichedSubmissions
      .filter((sub) => {
        // Grade filter
        if (selectedGrade !== 'ALL' && sub.grade !== selectedGrade) {
          return false;
        }
        // Class filter
        if (selectedClass !== 'ALL' && sub.studentClass !== selectedClass) {
          return false;
        }
        // Rank Tier filter
        if (selectedTier !== 'ALL' && sub.rankTier !== selectedTier) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = sub.studentName.toLowerCase().includes(q);
          const matchClass = sub.studentClass.toLowerCase().includes(q);
          const matchNick = (sub.nickname || '').toLowerCase().includes(q);
          if (!matchName && !matchClass && !matchNick) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'score_desc') {
          if (b.computedScore !== a.computedScore) {
            return b.computedScore - a.computedScore;
          }
          return b.correctCount - a.correctCount;
        }
        if (sortBy === 'score_asc') {
          return a.computedScore - b.computedScore;
        }
        if (sortBy === 'newest') {
          return (b.id || '').localeCompare(a.id || '');
        }
        if (sortBy === 'name') {
          return a.studentName.localeCompare(b.studentName, 'vi');
        }
        return 0;
      });
  }, [enrichedSubmissions, selectedGrade, selectedTier, searchQuery, sortBy]);

  // Total students in current view
  const totalSubmissionsInFilter = filteredSubmissions.length;

  return (
    <div className="space-y-6">
      {/* Top Banner for Visitors */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900/90 to-purple-950/40 border border-amber-500/40 shadow-[0_0_30px_rgba(251,191,36,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-400 text-amber-300 text-xs font-cyber font-bold tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>ĐẠI SẢNH VINH DANH · KHÁCH THAM QUAN</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cyber font-extrabold text-slate-100 flex items-center gap-2.5">
              <span>BẢNG KẾT QUẢ ÔN TẬP CÔNG NGHỆ THCS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Chào mừng quý phụ huynh, thầy cô và khách tham quan! Bạn có thể xem kết quả làm bài, tra cứu theo khối lớp và theo dõi bảng xếp hạng 4 mốc danh hiệu vinh danh học sinh.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono">
              <span
                className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  isCloudConnected ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400'
                }`}
              />
              <span className="text-slate-300">
                {isCloudConnected ? 'Đồng bộ trực tuyến' : 'Bộ nhớ cục bộ'}
              </span>
            </div>

            {onRefresh && (
              <button
                onClick={() => {
                  playLaserChirp();
                  onRefresh();
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs font-cyber flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Làm mới bảng xếp hạng"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Cập nhật</span>
              </button>
            )}
          </div>
        </div>

        {/* Read-Only Notice Badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300/90 font-cyber">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Chế độ khách tham quan: Bạn có thể xem chi tiết từng bài làm nhưng không thể sửa điểm hay xóa bài (chỉ giáo viên mới có quyền quản lý).
          </span>
        </div>
      </div>

      {/* 4 Rank Tier Cards (Interactive Summary) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Tier 1: Nguyên soái (10 tuyệt đối) */}
        <button
          onClick={() => {
            playCyberBeep(650, 'sine', 0.04);
            setSelectedTier(selectedTier === 'nguyen_soai' ? 'ALL' : 'nguyen_soai');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            selectedTier === 'nguyen_soai'
              ? 'bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)] ring-2 ring-amber-400/50'
              : 'bg-slate-900/70 border-amber-500/40 hover:border-amber-400/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-xl bg-amber-950 border border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              <Crown className="w-5 h-5 text-amber-400" />
            </span>
            <span className="text-2xl font-cyber font-black text-amber-300">
              {tierCounts.nguyen_soai}
            </span>
          </div>
          <div className="font-cyber font-bold text-sm text-amber-200">
            👑 NGUYÊN SOÁI
          </div>
          <div className="text-[11px] font-mono text-amber-400/80 mt-0.5">
            10 điểm tuyệt đối
          </div>
          <div className="text-[10px] text-slate-400 mt-2 line-clamp-1">
            Đỉnh cao xuất sắc toàn diện
          </div>
        </button>

        {/* Tier 2: Tướng quân (9.0 - 9.9) */}
        <button
          onClick={() => {
            playCyberBeep(600, 'sine', 0.04);
            setSelectedTier(selectedTier === 'tuong_quan' ? 'ALL' : 'tuong_quan');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            selectedTier === 'tuong_quan'
              ? 'bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] ring-2 ring-purple-400/50'
              : 'bg-slate-900/70 border-purple-500/40 hover:border-purple-400/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-xl bg-purple-950 border border-purple-400 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              <Award className="w-5 h-5 text-purple-400" />
            </span>
            <span className="text-2xl font-cyber font-black text-purple-300">
              {tierCounts.tuong_quan}
            </span>
          </div>
          <div className="font-cyber font-bold text-sm text-purple-200">
            🎖️ TƯỚNG QUÂN
          </div>
          <div className="text-[11px] font-mono text-purple-400/80 mt-0.5">
            Từ 9 đến dưới 10 điểm
          </div>
          <div className="text-[10px] text-slate-400 mt-2 line-clamp-1">
            Thủ lĩnh công nghệ bản lĩnh
          </div>
        </button>

        {/* Tier 3: Cao thủ (8.0 - 8.9) */}
        <button
          onClick={() => {
            playCyberBeep(550, 'sine', 0.04);
            setSelectedTier(selectedTier === 'cao_thu' ? 'ALL' : 'cao_thu');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            selectedTier === 'cao_thu'
              ? 'bg-gradient-to-br from-cyan-950 via-slate-900 to-cyan-950 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.35)] ring-2 ring-cyan-400/50'
              : 'bg-slate-900/70 border-cyan-500/40 hover:border-cyan-400/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Zap className="w-5 h-5 text-cyan-400" />
            </span>
            <span className="text-2xl font-cyber font-black text-cyan-300">
              {tierCounts.cao_thu}
            </span>
          </div>
          <div className="font-cyber font-bold text-sm text-cyan-200">
            ⚔️ CAO THỦ
          </div>
          <div className="text-[11px] font-mono text-cyan-400/80 mt-0.5">
            Từ 8 đến dưới 9 điểm
          </div>
          <div className="text-[10px] text-slate-400 mt-2 line-clamp-1">
            Nắm vững lý thuyết & thực hành
          </div>
        </button>

        {/* Tier 4: Làng tân thủ (< 8.0) */}
        <button
          onClick={() => {
            playCyberBeep(500, 'sine', 0.04);
            setSelectedTier(selectedTier === 'tan_thu' ? 'ALL' : 'tan_thu');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group ${
            selectedTier === 'tan_thu'
              ? 'bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-950 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.35)] ring-2 ring-emerald-400/50'
              : 'bg-slate-900/70 border-emerald-700/50 hover:border-emerald-500/80 hover:bg-slate-900'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300">
              <Shield className="w-5 h-5 text-emerald-400" />
            </span>
            <span className="text-2xl font-cyber font-black text-emerald-300">
              {tierCounts.tan_thu}
            </span>
          </div>
          <div className="font-cyber font-bold text-sm text-emerald-200">
            🛡️ LÀNG TÂN THỦ
          </div>
          <div className="text-[11px] font-mono text-emerald-400/80 mt-0.5">
            Dưới 8 điểm
          </div>
          <div className="text-[10px] text-slate-400 mt-2 line-clamp-1">
            Đang rèn luyện, hoàn thiện kỹ năng
          </div>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        {/* Row 1: Grade Selection Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-cyber text-slate-300">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>LỌC THEO KHỐI LỚP:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setSelectedGrade('ALL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedGrade === 'ALL'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              TẤT CẢ CÁC KHỐI
            </button>
            {([6, 7, 8, 9] as GradeLevel[]).map((g) => (
              <button
                key={g}
                onClick={() => {
                  setSelectedGrade(g);
                  if (selectedClass !== 'ALL' && !selectedClass.startsWith(`${g}`)) {
                    setSelectedClass('ALL');
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedGrade === g
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                KHỐI {g}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Search, Class Dropdown (A1 to A5), Tier Dropdown, Sorting */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-slate-800/80">
          {/* Search Box */}
          <div className="sm:col-span-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, lớp, biệt danh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Class Filter Dropdown (A1 to A5) */}
          <div className="sm:col-span-3">
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors"
            >
              <option value="ALL" className="bg-slate-900 text-slate-100">
                {selectedGrade === 'ALL'
                  ? 'Tất cả các lớp (A1 → A5)'
                  : `Tất cả lớp Khối ${selectedGrade} (A1 → A5)`}
              </option>
              {visitorClassOptions.isGrouped && visitorClassOptions.groups
                ? visitorClassOptions.groups.map((grp) => (
                    <optgroup
                      key={grp.grade}
                      label={`--- Khối ${grp.grade} ---`}
                      className="bg-slate-900 text-cyan-400 font-bold"
                    >
                      {grp.classes.map((cls) => (
                        <option
                          key={cls}
                          value={cls}
                          className="bg-slate-900 text-slate-200 font-normal"
                        >
                          Lớp {cls}
                        </option>
                      ))}
                    </optgroup>
                  ))
                : visitorClassOptions.classes?.map((cls) => (
                    <option
                      key={cls}
                      value={cls}
                      className="bg-slate-900 text-slate-200"
                    >
                      Lớp {cls}
                    </option>
                  ))}
            </select>
          </div>

          {/* Tier Filter Dropdown */}
          <div className="sm:col-span-3">
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors"
            >
              <option value="ALL">Tất cả danh hiệu ({enrichedSubmissions.length})</option>
              <option value="nguyen_soai">👑 Nguyên soái (10 điểm)</option>
              <option value="tuong_quan">🎖️ Tướng quân (9 - 9.9 điểm)</option>
              <option value="cao_thu">⚔️ Cao thủ (8 - 8.9 điểm)</option>
              <option value="tan_thu">🛡️ Làng tân thủ (&lt; 8 điểm)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors font-mono"
            >
              <option value="score_desc">Điểm cao nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="name">Tên A-Z</option>
              <option value="score_asc">Điểm tăng dần</option>
            </select>
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 pt-1 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span>
              Tìm thấy: <strong className="text-amber-300 font-bold">{totalSubmissionsInFilter}</strong> bài thi
            </span>
            {selectedClass !== 'ALL' && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[11px] font-cyber flex items-center gap-1">
                Lớp: {selectedClass}
                <button
                  onClick={() => setSelectedClass('ALL')}
                  className="hover:text-rose-400 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedTier !== 'ALL' && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-[11px] font-cyber flex items-center gap-1">
                Đang lọc: {RANK_TIER_CONFIG[selectedTier].badge}
                <button
                  onClick={() => setSelectedTier('ALL')}
                  className="hover:text-rose-400 ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {selectedGrade !== 'ALL' && (
            <span className="text-cyan-400 font-cyber">Khối {selectedGrade}</span>
          )}
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      {filteredSubmissions.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="inline-flex p-3 rounded-full bg-slate-800 text-slate-500">
            <Users className="w-8 h-8" />
          </div>
          <p className="text-sm font-cyber text-slate-300">
            Không tìm thấy bài làm nào phù hợp với bộ lọc hiện tại.
          </p>
          <p className="text-xs text-slate-500">
            Hãy thử chọn &quot;Tất cả các khối&quot; hoặc xóa từ khóa tìm kiếm.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-950/90 text-slate-400 font-cyber text-[11px] uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Hạng</th>
                  <th className="py-3.5 px-3 sm:px-4">Học sinh &amp; Lớp</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Khối</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Mốc danh hiệu</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Điểm số</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center hidden md:table-cell">Trắc nghiệm</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center hidden sm:table-cell">Thời gian nộp</th>
                  <th className="py-3.5 px-3 sm:px-4 text-center">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredSubmissions.map((sub, idx) => {
                  const rankNum = idx + 1;
                  const tier = sub.rankTier;
                  const tierConfig = RANK_TIER_CONFIG[tier];

                  // Top 3 badges
                  let rankBadge = (
                    <span className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center font-bold mx-auto">
                      #{rankNum}
                    </span>
                  );
                  if (rankNum === 1) {
                    rankBadge = (
                      <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-cyber text-xs flex items-center justify-center font-bold mx-auto shadow-[0_0_12px_rgba(251,191,36,0.6)]">
                        🥇 1
                      </span>
                    );
                  } else if (rankNum === 2) {
                    rankBadge = (
                      <span className="w-7 h-7 rounded-lg bg-slate-300 text-slate-950 font-cyber text-xs flex items-center justify-center font-bold mx-auto shadow-[0_0_10px_rgba(203,213,225,0.5)]">
                        🥈 2
                      </span>
                    );
                  } else if (rankNum === 3) {
                    rankBadge = (
                      <span className="w-7 h-7 rounded-lg bg-amber-700 text-amber-100 font-cyber text-xs flex items-center justify-center font-bold mx-auto shadow-[0_0_10px_rgba(180,83,9,0.5)]">
                        🥉 3
                      </span>
                    );
                  }

                  return (
                    <tr
                      key={sub.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        rankNum <= 3 ? 'bg-slate-900/40' : ''
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 sm:px-4 text-center">{rankBadge}</td>

                      {/* Student info */}
                      <td className="py-3 px-3 sm:px-4">
                        <div className="font-semibold text-slate-100 flex items-center gap-1.5 flex-wrap">
                          <span>{sub.studentName}</span>
                          {sub.nickname && sub.nickname !== 'cute student' && (
                            <span className="text-[11px] font-mono text-cyan-300">
                              (@{sub.nickname})
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {sub.studentClass}
                        </div>
                      </td>

                      {/* Grade */}
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs font-bold">
                          Lớp {sub.grade}
                        </span>
                      </td>

                      {/* Rank Tier Badge */}
                      <td className="py-3 px-3 sm:px-4 text-center">
                        {tier === 'nguyen_soai' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-950/80 border border-amber-400 text-amber-300 text-xs font-cyber font-bold shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>Nguyên soái</span>
                          </span>
                        )}
                        {tier === 'tuong_quan' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-purple-950/80 border border-purple-400 text-purple-300 text-xs font-cyber font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                            <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                            <span>Tướng quân</span>
                          </span>
                        )}
                        {tier === 'cao_thu' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-xs font-cyber font-bold shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Cao thủ</span>
                          </span>
                        )}
                        {tier === 'tan_thu' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-cyber font-bold">
                            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Làng tân thủ</span>
                          </span>
                        )}
                      </td>

                      {/* Score */}
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <div className="font-mono text-base font-bold text-amber-300">
                          {sub.computedScore.toFixed(1)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {sub.status === 'graded' ? (
                            <span className="text-emerald-400">Đã chấm TL</span>
                          ) : (
                            <span>Điểm TN</span>
                          )}
                        </div>
                      </td>

                      {/* MC Correct / Total */}
                      <td className="py-3 px-3 sm:px-4 text-center font-mono text-xs hidden md:table-cell">
                        <span className="text-cyan-400 font-bold">{sub.correctCount}</span>
                        <span className="text-slate-500">/{sub.totalMC}</span>
                        <span className="text-slate-500 text-[10px] block">
                          ({sub.mcScoreOn10} đ)
                        </span>
                      </td>

                      {/* Submitted At */}
                      <td className="py-3 px-3 sm:px-4 text-center font-mono text-[11px] text-slate-400 hidden sm:table-cell">
                        {sub.submittedAt}
                      </td>

                      {/* Action: View Read-Only Details */}
                      <td className="py-3 px-3 sm:px-4 text-center">
                        <button
                          onClick={() => {
                            playLaserChirp();
                            setViewingSubmission(sub);
                            setModalMCFilter('all');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-cyan-950 text-cyan-300 border border-cyan-800/80 hover:border-cyan-400 text-xs font-cyber font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Xem bài</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* MODAL: READ-ONLY STUDENT SUBMISSION FOR GUESTS / VISITORS  */}
      {/* ========================================================== */}
      {viewingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-amber-500/50 shadow-[0_0_40px_rgba(251,191,36,0.25)] overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-950 border border-amber-500 text-amber-300">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 text-[10px] font-cyber font-bold border border-amber-500">
                      CHẾ ĐỘ XEM CHỈ ĐỌC · KHÁCH THAM QUAN
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Khối {viewingSubmission.grade}
                    </span>
                  </div>
                  <h3 className="font-cyber font-bold text-base sm:text-lg text-slate-100 flex items-center gap-2">
                    <span>Học sinh: {viewingSubmission.studentName}</span>
                    {viewingSubmission.nickname && (
                      <span className="text-xs text-cyan-300 font-mono font-normal">
                        (@{viewingSubmission.nickname})
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">
                      — Lớp {viewingSubmission.studentClass}
                    </span>
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setViewingSubmission(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              {/* Score & Tier Banner */}
              {(() => {
                const score = getSubmissionDisplayScore(viewingSubmission);
                const tier = getRankTier(score);
                const config = RANK_TIER_CONFIG[tier];

                return (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-950 to-purple-950/40 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-2xl bg-slate-900 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                        {tier === 'nguyen_soai' && <Crown className="w-7 h-7 text-amber-400" />}
                        {tier === 'tuong_quan' && <Award className="w-7 h-7 text-purple-400" />}
                        {tier === 'cao_thu' && <Zap className="w-7 h-7 text-cyan-400" />}
                        {tier === 'tan_thu' && <Shield className="w-7 h-7 text-emerald-400" />}
                      </div>

                      <div>
                        <div className="font-cyber font-extrabold text-lg text-slate-100">
                          {config.badge}
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {config.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                          <span>Nộp lúc: {viewingSubmission.submittedAt}</span>
                          <span>•</span>
                          <span>Làm bài trong: {viewingSubmission.durationMinutes} phút</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-start sm:self-auto">
                      <div className="text-right">
                        <div className="text-[10px] font-cyber text-slate-400 uppercase">
                          Tổng điểm ghi nhận
                        </div>
                        <div className="text-3xl font-cyber font-black text-amber-300">
                          {score.toFixed(1)}
                          <span className="text-xs font-mono text-slate-400 font-normal"> / 10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Part 1: Multiple Choice Results */}
              {(() => {
                const subExam = ALL_GRADE_EXAMS[viewingSubmission.grade];
                if (!subExam) return null;

                const wrongQuestions = subExam.multipleChoice.filter(
                  (q) => viewingSubmission.multipleChoiceAnswers[q.id] !== q.correctAnswer
                );
                const correctQuestions = subExam.multipleChoice.filter(
                  (q) => viewingSubmission.multipleChoiceAnswers[q.id] === q.correctAnswer
                );

                const displayedQuestions = subExam.multipleChoice.filter((q) => {
                  const isCorrect =
                    viewingSubmission.multipleChoiceAnswers[q.id] === q.correctAnswer;
                  if (modalMCFilter === 'wrong') return !isCorrect;
                  if (modalMCFilter === 'correct') return isCorrect;
                  return true;
                });

                return (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/60">
                      <div>
                        <h4 className="font-cyber font-bold text-sm text-cyan-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          PHẦN I: KẾT QUẢ TRẮC NGHIỆM ({viewingSubmission.correctCount}/{viewingSubmission.totalMC} CÂU ĐÚNG)
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Đúng hiển thị <strong className="text-emerald-400">Màu xanh</strong> · Sai hiển thị <strong className="text-rose-400">Màu đỏ</strong> kèm đáp án chuẩn
                        </p>
                      </div>

                      {/* MC Filter tabs */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setModalMCFilter('all')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold transition-all cursor-pointer ${
                            modalMCFilter === 'all'
                              ? 'bg-cyan-500 text-slate-950'
                              : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Tất cả ({subExam.multipleChoice.length})
                        </button>
                        <button
                          onClick={() => setModalMCFilter('wrong')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold transition-all cursor-pointer ${
                            modalMCFilter === 'wrong'
                              ? 'bg-rose-500 text-slate-950'
                              : 'bg-slate-950 text-rose-400 hover:text-rose-200'
                          }`}
                        >
                          Câu sai ({wrongQuestions.length})
                        </button>
                        <button
                          onClick={() => setModalMCFilter('correct')}
                          className={`px-2.5 py-1 rounded-lg text-xs font-cyber font-bold transition-all cursor-pointer ${
                            modalMCFilter === 'correct'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-950 text-emerald-400 hover:text-emerald-200'
                          }`}
                        >
                          Câu đúng ({correctQuestions.length})
                        </button>
                      </div>
                    </div>

                    {/* Question Cards */}
                    <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                      {displayedQuestions.map((q) => {
                        const userChoice = viewingSubmission.multipleChoiceAnswers[q.id];
                        const isCorrect = userChoice === q.correctAnswer;
                        const userOptObj = q.options.find((o) => o.key === userChoice);
                        const correctOptObj = q.options.find((o) => o.key === q.correctAnswer);

                        return (
                          <div
                            key={q.id}
                            className={`p-4 rounded-xl border transition-all ${
                              isCorrect
                                ? 'bg-slate-950/70 border-emerald-900/50'
                                : 'bg-slate-950/90 border-rose-900/60'
                            }`}
                          >
                            {/* Question Title & Status */}
                            <div className="flex items-start justify-between gap-3 mb-2.5">
                              <div className="flex items-start gap-2.5">
                                <span
                                  className={`px-2 py-0.5 rounded font-mono text-xs font-bold shrink-0 ${
                                    isCorrect
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                      : 'bg-rose-950 text-rose-300 border border-rose-700'
                                  }`}
                                >
                                  Câu {q.id}
                                </span>
                                <p className="font-sans text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                                  {q.question}
                                </p>
                              </div>

                              <span
                                className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-cyber font-bold ${
                                  isCorrect
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                                    : 'bg-rose-950 text-rose-300 border border-rose-600'
                                }`}
                              >
                                {isCorrect ? '✓ Đúng' : '✗ Sai'}
                              </span>
                            </div>

                            {/* 4 Options Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2.5">
                              {q.options.map((opt) => {
                                const isUserPick = opt.key === userChoice;
                                const isCorrectAnswer = opt.key === q.correctAnswer;

                                let optCardClass = 'bg-slate-900/60 border-slate-800 text-slate-300';
                                if (isCorrectAnswer) {
                                  optCardClass =
                                    'bg-emerald-950/70 border-emerald-600/90 text-emerald-200 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]';
                                } else if (isUserPick && !isCorrect) {
                                  optCardClass =
                                    'bg-rose-950/80 border-rose-600 text-rose-200 font-semibold shadow-[0_0_10px_rgba(244,63,94,0.15)]';
                                }

                                return (
                                  <div
                                    key={opt.key}
                                    className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${optCardClass}`}
                                  >
                                    <div className="flex items-center gap-2">
                                      <span
                                        className={`w-5 h-5 rounded font-mono font-bold text-[11px] flex items-center justify-center shrink-0 ${
                                          isCorrectAnswer
                                            ? 'bg-emerald-500 text-slate-950'
                                            : isUserPick
                                            ? 'bg-rose-500 text-white'
                                            : 'bg-slate-800 text-slate-400'
                                        }`}
                                      >
                                        {opt.key}
                                      </span>
                                      <span className="leading-snug">{opt.text}</span>
                                    </div>

                                    {isCorrectAnswer && (
                                      <span className="text-[10px] font-cyber text-emerald-400 font-bold shrink-0">
                                        ✓ Đáp án đúng
                                      </span>
                                    )}
                                    {!isCorrect && isUserPick && (
                                      <span className="text-[10px] font-cyber text-rose-400 font-bold shrink-0">
                                        ✗ Thí sinh chọn
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Comparison explanation */}
                            <div className="text-xs pt-2 border-t border-slate-900 text-slate-400 font-sans">
                              {!isCorrect ? (
                                <span className="text-rose-300 flex items-center gap-1.5">
                                  <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                                  <span>
                                    Thí sinh chọn [{userChoice || 'Để trống'}] — Đáp án chuẩn là{' '}
                                    <strong className="text-emerald-300">
                                      [{q.correctAnswer}] {correctOptObj?.text}
                                    </strong>
                                  </span>
                                </span>
                              ) : (
                                <span className="text-emerald-300 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                  <span>Thí sinh đã trả lời chính xác đáp án [{q.correctAnswer}].</span>
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}

              {/* Part 2: Essay Questions */}
              {(() => {
                const subExam = ALL_GRADE_EXAMS[viewingSubmission.grade];
                if (!subExam || !subExam.essay || subExam.essay.length === 0) return null;

                return (
                  <div className="space-y-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 flex items-center justify-between">
                      <h4 className="font-cyber font-bold text-sm text-purple-300 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        PHẦN II: BÀI LÀM TỰ LUẬN ({subExam.essay.length} CÂU)
                      </h4>
                      <span className="text-xs font-mono text-purple-400">
                        {viewingSubmission.status === 'graded'
                          ? 'Đã được Tổ STEM chấm điểm'
                          : 'Đang chờ giáo viên chấm'}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {subExam.essay.map((q) => {
                        const studentAnswer = viewingSubmission.essayAnswers[q.id];
                        const score = viewingSubmission.teacherEssayScores?.[q.id];

                        return (
                          <div
                            key={q.id}
                            className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-purple-900/40 space-y-3"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2.5">
                                <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-700 text-purple-300 font-cyber text-xs font-bold shrink-0">
                                  Câu {q.id} (Tự luận)
                                </span>
                                <h5 className="font-sans text-sm font-bold text-slate-100">
                                  {q.question}
                                </h5>
                              </div>

                              {score !== undefined && (
                                <span className="px-2.5 py-1 rounded-xl bg-purple-900 text-purple-200 font-mono text-xs font-bold border border-purple-600 shrink-0">
                                  {score} điểm
                                </span>
                              )}
                            </div>

                            {/* Student written answer */}
                            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                              <span className="text-[10px] font-cyber text-slate-400 block uppercase">
                                ✍️ Câu trả lời của thí sinh:
                              </span>
                              <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                                {studentAnswer?.trim() ? (
                                  studentAnswer
                                ) : (
                                  <span className="italic text-slate-500">
                                    (Thí sinh để trống câu này khi làm bài)
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Standard suggested answer from Tổ STEM FSCBN */}
                            <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 space-y-1.5">
                              <span className="text-[10px] font-cyber font-bold text-purple-300 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                Hướng dẫn chấm &amp; Đáp án chuẩn từ Tổ STEM FSCBN:
                              </span>
                              <ul className="list-disc pl-4 space-y-1 text-xs text-purple-200 font-sans">
                                {q.suggestedAnswer.map((line, idx) => (
                                  <li key={idx}>{line}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Teacher Feedback if available */}
                    {viewingSubmission.teacherFeedback && (
                      <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1.5">
                        <span className="text-xs font-cyber font-bold text-amber-400 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          LỜI NHẬN XÉT TỪ TỔ STEM FSCBN:
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
                          &quot;{viewingSubmission.teacherFeedback}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">
                Mã bài làm: {viewingSubmission.id}
              </span>
              <button
                onClick={() => setViewingSubmission(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-cyber text-xs transition-colors cursor-pointer"
              >
                Đóng cửa sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
