import React, { useState, useEffect, useMemo } from 'react';
import { GradeLevel } from '../types/curriculum';
import {
  ALL_GRADE_EXAMS,
  StudentSubmission,
  TEACHER_EXAM_PASS,
  TEACHER_PASSWORDS,
  isTeacherPasswordValid,
  EXAM_STORAGE_KEY,
} from '../data/examData';
import {
  FileText,
  CheckCircle2,
  Clock,
  Send,
  Lock,
  Unlock,
  Award,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  BookOpen,
  Filter,
  X,
  HelpCircle,
  Sparkles,
  Printer,
  XCircle,
  AlertCircle,
  Check,
  Cloud,
  Wifi,
  ChevronDown,
  ChevronUp,
  Table,
  Trophy,
} from 'lucide-react';
import { playLaserChirp, playSuccessChirp, playCyberBeep } from '../utils/audio';
import {
  saveSubmissionToCloud,
  subscribeToSubmissions,
  updateSubmissionInCloud,
  deleteSubmissionFromCloud,
} from '../services/firebase';
import { VisitorLeaderboardView } from './VisitorLeaderboardView';

interface THCSExamViewProps {
  initialGrade?: GradeLevel;
  selectedGrade?: GradeLevel;
  onSelectGrade?: (grade: GradeLevel) => void;
  onBackToCurriculum?: () => void;
}

export const THCSExamView: React.FC<THCSExamViewProps> = ({
  initialGrade = 8,
  selectedGrade: propSelectedGrade,
  onSelectGrade,
  onBackToCurriculum,
}) => {
  // Mode: student exam vs visitor leaderboard vs teacher dashboard
  const [activeTab, setActiveTab] = useState<'student' | 'visitor' | 'teacher'>('student');

  // Selected Grade for the exam
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    propSelectedGrade ?? initialGrade
  );
  const currentExam = ALL_GRADE_EXAMS[selectedGrade];

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentNickname, setStudentNickname] = useState('cute student');
  const [studentClass, setStudentClass] = useState(`${selectedGrade}A1`);
  const [examStarted, setExamStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Student Answers
  const [mcAnswers, setMcAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({});

  // Submitted result state for student
  const [submittedResult, setSubmittedResult] = useState<StudentSubmission | null>(null);
  const [studentReviewTab, setStudentReviewTab] = useState<'all' | 'mc' | 'essay' | 'wrong'>('all');

  // Teacher State
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);
  const [teacherPasswordInput, setTeacherPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);

  // Teacher grading modal state
  const [gradingEssayScores, setGradingEssayScores] = useState<Record<number, number>>({});
  const [gradingFeedback, setGradingFeedback] = useState('');
  const [teacherMCFilter, setTeacherMCFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [teacherMCExpanded, setTeacherMCExpanded] = useState(true);
  const [expandedTableSubId, setExpandedTableSubId] = useState<string | null>(null);

  // Teacher Filter
  const [filterGrade, setFilterGrade] = useState<'ALL' | GradeLevel>('ALL');
  const [filterClass, setFilterClass] = useState('ALL');
  const [searchStudent, setSearchStudent] = useState('');

  // Live Cloud Connection State
  const [isCloudConnected, setIsCloudConnected] = useState(true);

  // Update default student class when grade changes
  useEffect(() => {
    if (!examStarted) {
      setStudentClass(`${selectedGrade}A1`);
    }
  }, [selectedGrade, examStarted]);

  // Load submissions from localStorage
  const loadSubmissions = () => {
    try {
      const raw = localStorage.getItem(EXAM_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSubmissions(parsed);
        }
      }
    } catch (err) {
      console.warn('Failed to load submissions', err);
    }
  };

  useEffect(() => {
    // 1. Initial load from local cache
    loadSubmissions();

    // 2. Real-time Cloud Firestore subscription across all devices
    const unsubscribe = subscribeToSubmissions(
      (liveSubmissions) => {
        setSubmissions(liveSubmissions);
        setIsCloudConnected(true);
      },
      (err) => {
        console.warn('Real-time sync issue, fallback to local', err);
        setIsCloudConnected(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Timer for student exam
  useEffect(() => {
    let interval: any = null;
    if (examStarted && !submittedResult) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, submittedResult]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Sync with prop if provided
  useEffect(() => {
    if (propSelectedGrade !== undefined && propSelectedGrade !== selectedGrade) {
      if (!examStarted) {
        setSelectedGrade(propSelectedGrade);
        setSubmittedResult(null);
        setMcAnswers({});
        setEssayAnswers({});
        setElapsedSeconds(0);
      }
    }
  }, [propSelectedGrade]);

  // Student switch grade before starting
  const handleSelectGradeTab = (grade: GradeLevel) => {
    if (examStarted) {
      if (!window.confirm('Em đang trong bài thi. Đổi khối lớp sẽ làm mới bài làm của em?')) {
        return;
      }
    }
    playCyberBeep(600 + grade * 50, 'sine', 0.04);
    setSelectedGrade(grade);
    onSelectGrade?.(grade);
    setExamStarted(false);
    setSubmittedResult(null);
    setMcAnswers({});
    setEssayAnswers({});
    setElapsedSeconds(0);
  };

  // Student start exam
  const handleStartExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      alert('Vui lòng nhập Họ và Tên của học sinh trước khi bắt đầu.');
      return;
    }
    playSuccessChirp();
    setExamStarted(true);
    setElapsedSeconds(0);
    setMcAnswers({});
    const initEssay: Record<number, string> = {};
    currentExam.essay.forEach((q) => {
      initEssay[q.id] = '';
    });
    setEssayAnswers(initEssay);
    setSubmittedResult(null);
  };

  // Student Submit Exam
  const handleSubmitExam = () => {
    const answeredCount = Object.keys(mcAnswers).length;
    const totalMC = currentExam.multipleChoice.length;
    const answeredEssayCount = Object.values(essayAnswers).filter((t) => t && t.trim().length > 0).length;
    const totalEssay = currentExam.essay.length;

    const nickLabel = studentNickname.trim() ? ` (${studentNickname.trim()})` : '';
    let confirmMsg = `Thí sinh ${studentName}${nickLabel} - Lớp ${studentClass} (Khối ${selectedGrade}) có chắc chắn muốn nộp bài?`;
    if (answeredCount < totalMC) {
      confirmMsg += `\n⚠️ Trắc nghiệm: Em mới làm ${answeredCount}/${totalMC} câu!`;
    }
    if (answeredEssayCount < totalEssay) {
      confirmMsg += `\n⚠️ Tự luận: Em mới làm ${answeredEssayCount}/${totalEssay} câu (còn ${totalEssay - answeredEssayCount} câu tự luận chưa làm)!`;
    }

    if (!window.confirm(confirmMsg)) {
      return;
    }

    // Calculate MC Score
    let correct = 0;
    currentExam.multipleChoice.forEach((q) => {
      if (mcAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const mcScore10 = Number(((correct / totalMC) * 10).toFixed(2));
    const duration = Math.max(1, Math.round(elapsedSeconds / 60));

    const newSubmission: StudentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      grade: selectedGrade,
      studentName: studentName.trim(),
      nickname: (studentNickname.trim() || 'cute student'),
      studentClass,
      submittedAt: new Date().toLocaleString('vi-VN'),
      durationMinutes: duration,
      multipleChoiceAnswers: mcAnswers,
      essayAnswers,
      correctCount: correct,
      totalMC,
      mcScoreOn10: mcScore10,
      status: 'submitted',
    };

    // Save to Cloud Firestore & LocalStorage for multi-device sync
    saveSubmissionToCloud(newSubmission)
      .then(() => setIsCloudConnected(true))
      .catch((err) => {
        console.warn('Saved locally, cloud sync pending:', err);
      });

    playLaserChirp();
    setSubmittedResult(newSubmission);
    setStudentReviewTab('all');
  };

  // Teacher Authentication
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isTeacherPasswordValid(teacherPasswordInput)) {
      playSuccessChirp();
      setIsTeacherAuthenticated(true);
      setPasswordError('');
      loadSubmissions();
    } else {
      playCyberBeep(300, 'sawtooth', 0.1);
      setPasswordError('Mật khẩu không chính xác! Vui lòng thử lại.');
    }
  };

  // Teacher Save Grade & Feedback
  const handleSaveTeacherGrade = () => {
    if (!selectedSubmission) return;

    let totalEssay = 0;
    Object.values(gradingEssayScores).forEach((s) => (totalEssay += s));
    const finalScore = Number(
      (selectedSubmission.mcScoreOn10 * 0.7 + totalEssay * 0.3).toFixed(2)
    );

    const updatedList = submissions.map((sub) => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          teacherEssayScores: gradingEssayScores,
          teacherFeedback: gradingFeedback,
          finalScore,
          status: 'graded' as const,
        };
      }
      return sub;
    });

    localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updatedList));
    setSubmissions(updatedList);

    // Sync to Firestore Cloud Database
    updateSubmissionInCloud(selectedSubmission.id, {
      teacherEssayScores: gradingEssayScores,
      teacherFeedback: gradingFeedback,
      finalScore,
      status: 'graded',
    }).catch((err) => console.warn('Cloud update fallback to local', err));

    setSelectedSubmission(null);
    playSuccessChirp();
    alert('Đã lưu kết quả chấm điểm và nhận xét của TỔ STEM FSCBN thành công!');
  };

  // Delete submission
  const handleDeleteSubmission = (id: string, name: string) => {
    if (window.confirm(`Thầy có chắc chắn muốn xóa bài thi của học sinh: ${name}?`)) {
      const updated = submissions.filter((s) => s.id !== id);
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated));
      setSubmissions(updated);

      // Sync delete to Firestore Cloud Database
      deleteSubmissionFromCloud(id).catch((err) =>
        console.warn('Cloud delete fallback to local', err)
      );

      playCyberBeep(400, 'square', 0.05);
    }
  };

  // Export submissions to CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('Chưa có bài thi nào để xuất.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
    csvContent +=
      'STT,Khối lớp,Họ và tên,Biệt danh,Lớp,Thời gian nộp,Số câu trắc nghiệm đúng,Điểm TN (hệ 10),Trạng thái,Nhận xét của GV\n';

    submissions.forEach((sub, idx) => {
      const row = [
        idx + 1,
        `"Lớp ${sub.grade}"`,
        `"${sub.studentName}"`,
        `"${sub.nickname || 'cute student'}"`,
        `"${sub.studentClass}"`,
        `"${sub.submittedAt}"`,
        `"${sub.correctCount}/${sub.totalMC}"`,
        sub.mcScoreOn10,
        sub.status === 'graded' ? 'Đã chấm' : 'Chưa chấm tự luận',
        `"${sub.teacherFeedback || ''}"`,
      ].join(',');
      csvContent += row + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Bang_diem_Cong_nghe_THCS_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic class options for teacher filter: always ensuring full A1 to A5 for all grades
  const teacherClassOptions = useMemo(() => {
    const defaultSuffixes = ['A1', 'A2', 'A3', 'A4', 'A5'];
    if (filterGrade !== 'ALL') {
      const standard = defaultSuffixes.map((s) => `${filterGrade}${s}`);
      const extra = Array.from(
        new Set(
          submissions
            .filter((s) => s.grade === filterGrade)
            .map((s) => s.studentClass)
            .filter((c) => Boolean(c) && !standard.includes(c))
        )
      );
      return {
        isGrouped: false,
        grade: filterGrade,
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
  }, [filterGrade, submissions]);

  // Filtered submissions for teacher
  const filteredSubmissions = submissions.filter((sub) => {
    const matchGrade = filterGrade === 'ALL' || sub.grade === filterGrade;
    const matchClass = filterClass === 'ALL' || sub.studentClass === filterClass;
    const q = searchStudent.toLowerCase().trim();
    const matchName =
      !q ||
      sub.studentName.toLowerCase().includes(q) ||
      (sub.nickname && sub.nickname.toLowerCase().includes(q));
    return matchGrade && matchClass && matchName;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-8 px-3 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  CÔNG NGHỆ THCS
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-cyber font-medium bg-emerald-950/90 text-emerald-300 border border-emerald-600/80 flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <Cloud className="w-3 h-3 text-emerald-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ĐỒNG BỘ ĐÁM MÂY LIÊN MÁY TỨC THÌ</span>
                </span>
                <h1 className="font-cyber font-bold text-lg sm:text-xl text-slate-100 tracking-wide w-full sm:w-auto">
                  HỆ THỐNG ÔN THI &amp; KIỂM TRA ĐÁNH GIÁ (LỚP 6 · 7 · 8 · 9)
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ngân hàng đề ôn tập chuẩn sách Kết Nối Tri Thức · Tự động chấm điểm trắc nghiệm &amp; nộp bài lên Đám mây cho TỔ STEM FSCBN
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onBackToCurriculum && (
              <button
                onClick={onBackToCurriculum}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-cyber border border-slate-700 transition-colors cursor-pointer"
              >
                ← Quay lại Bài học
              </button>
            )}

            <div className="flex p-1 rounded-xl bg-slate-900/90 border border-slate-800">
              <button
                onClick={() => {
                  playCyberBeep(600, 'sine', 0.04);
                  setActiveTab('student');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'student'
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Học sinh làm bài</span>
              </button>

              <button
                onClick={() => {
                  playCyberBeep(650, 'sine', 0.04);
                  setActiveTab('visitor');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'visitor'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(251,191,36,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Khách tham quan</span>
              </button>

              <button
                onClick={() => {
                  playCyberBeep(700, 'sine', 0.04);
                  setActiveTab('teacher');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-purple-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Bàn giáo viên</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grade Selector Tabs for Exam (6, 7, 8, 9) */}
        {activeTab === 'student' && !examStarted && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center gap-2 text-xs font-cyber text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>CHỌN KHỐI LỚP ÔN THI:</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {([6, 7, 8, 9] as GradeLevel[]).map((g) => {
                const isCurrent = selectedGrade === g;
                return (
                  <button
                    key={g}
                    onClick={() => handleSelectGradeTab(g)}
                    className={`px-4 py-2 rounded-xl text-xs font-cyber font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isCurrent
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                        : 'bg-slate-950/70 text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800'
                    }`}
                  >
                    <span>LỚP {g}</span>
                    <span className="text-[10px] opacity-75 font-mono">
                      ({ALL_GRADE_EXAMS[g].multipleChoice.length} TN + {ALL_GRADE_EXAMS[g].essay.length} TL)
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 1: STUDENT VIEW                                       */}
        {/* ========================================================== */}
        {activeTab === 'student' && (
          <div className="space-y-6">
            {/* Step 1: Student Information Form before starting */}
            {!examStarted && !submittedResult && (
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] max-w-xl mx-auto">
                <div className="text-center space-y-2 mb-6">
                  <div className="inline-flex p-3 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h2 className="font-cyber font-bold text-xl text-slate-100">
                    ĐĂNG KÝ BẮT ĐẦU ÔN THI {currentExam.title.toUpperCase()}
                  </h2>
                  <p className="text-xs text-cyan-300 font-mono">
                    {currentExam.subTitle}
                  </p>
                  <p className="text-xs text-slate-400">
                    Cấu trúc đề: {currentExam.multipleChoice.length} câu trắc nghiệm khách quan + {currentExam.essay.length} câu tự luận trọng tâm
                  </p>
                </div>

                <form onSubmit={handleStartExam} className="space-y-4">
                  <div>
                    <label className="block text-xs font-cyber text-slate-300 mb-1.5">
                      HỌ VÀ TÊN HỌC SINH <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn An"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cyber text-slate-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        BIỆT DANH (NICKNAME)
                      </span>
                      <span className="text-[11px] font-mono text-cyan-400">
                        Mặc định: cute student
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="cute student"
                        value={studentNickname}
                        onChange={(e) => setStudentNickname(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-colors"
                      />
                      {studentNickname !== 'cute student' && (
                        <button
                          type="button"
                          onClick={() => setStudentNickname('cute student')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-[10px] font-cyber bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="Đặt lại biệt danh mặc định"
                        >
                          Mặc định
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-cyber text-slate-300 mb-1.5">
                        KHỐI LỚP THI
                      </label>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(parseInt(e.target.value) as GradeLevel)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-colors"
                      >
                        <option value={6}>Công nghệ 6</option>
                        <option value={7}>Công nghệ 7</option>
                        <option value={8}>Công nghệ 8</option>
                        <option value={9}>Công nghệ 9</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-cyber text-slate-300 mb-1.5">
                        LỚP HỌC <span className="text-rose-400">*</span>
                      </label>
                      <select
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-colors"
                      >
                        <option value={`${selectedGrade}A1`}>Lớp {selectedGrade}A1</option>
                        <option value={`${selectedGrade}A2`}>Lớp {selectedGrade}A2</option>
                        <option value={`${selectedGrade}A3`}>Lớp {selectedGrade}A3</option>
                        <option value={`${selectedGrade}A4`}>Lớp {selectedGrade}A4</option>
                        <option value={`${selectedGrade}A5`}>Lớp {selectedGrade}A5</option>
                        <option value={`${selectedGrade}A6`}>Lớp {selectedGrade}A6</option>
                        <option value="Khác">Lớp khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
                    <div className="text-cyan-300 font-semibold font-cyber flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Hướng dẫn làm bài:
                    </div>
                    <p>• Trắc nghiệm: Bấm chọn đáp án đúng nhất (A, B, C hoặc D).</p>
                    <p>• Tự luận: Trình bày câu trả lời ngắn gọn, rõ ý vào từng khung.</p>
                    <p>• Sau khi nộp, hệ thống sẽ tự chấm điểm trắc nghiệm và gửi bài về Bàn giáo viên TỔ STEM FSCBN.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 text-slate-950 font-cyber font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    BẮT ĐẦU LÀM BÀI THI LỚP {selectedGrade}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Student Doing Exam */}
            {examStarted && !submittedResult && (
              <div className="space-y-6">
                {/* Floating Exam Info Bar */}
                <div className="sticky top-16 z-30 p-3 sm:p-4 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-cyber font-bold text-sm text-cyan-300">
                      Lớp {selectedGrade} · Thí sinh: {studentName}{' '}
                      <span className="text-amber-300 font-normal font-mono text-xs">
                        (@{studentNickname.trim() || 'cute student'})
                      </span>{' '}
                      ({studentClass})
                    </span>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300">
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      <span>{formatTime(elapsedSeconds)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
                      <span>
                        TN:{' '}
                        <span className="text-cyan-400 font-bold">
                          {Object.keys(mcAnswers).length}/{currentExam.multipleChoice.length}
                        </span>
                      </span>
                      <span className="text-slate-600">|</span>
                      <span>
                        TL:{' '}
                        <span className="text-purple-400 font-bold">
                          {Object.values(essayAnswers).filter((t) => t && t.trim().length > 0).length}/{currentExam.essay.length}
                        </span>
                      </span>
                    </div>

                    <button
                      onClick={handleSubmitExam}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 text-slate-950 font-cyber font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>NỘP BÀI THI</span>
                    </button>
                  </div>
                </div>

                {/* Quick Navigation Numbers */}
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div>
                    <div className="text-xs font-cyber text-slate-400 mb-2">
                      DANH SÁCH CÂU TRẮC NGHIỆM ({currentExam.multipleChoice.length} CÂU) - BẤM SỐ ĐỂ CHUYỂN NHANH:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {currentExam.multipleChoice.map((q) => {
                        const isAnswered = !!mcAnswers[q.id];
                        return (
                          <a
                            key={q.id}
                            href={`#question-${q.id}`}
                            className={`w-7 h-7 rounded-lg text-xs font-mono flex items-center justify-center transition-all ${
                              isAnswered
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 font-bold'
                                : 'bg-slate-950 text-slate-500 border border-slate-800 hover:text-slate-300'
                            }`}
                          >
                            {q.id}
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Essay Quick Navigation */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-xs font-cyber text-purple-300 mb-2 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      DANH SÁCH CÂU TỰ LUẬN ({currentExam.essay.length} CÂU) - BẤM ĐỂ CHUYỂN NHANH:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentExam.essay.map((q) => {
                        const isDone = !!essayAnswers[q.id]?.trim();
                        return (
                          <a
                            key={q.id}
                            href={`#essay-${q.id}`}
                            className={`px-3 py-1.5 rounded-xl text-xs font-cyber flex items-center gap-2 transition-all ${
                              isDone
                                ? 'bg-purple-950 text-purple-200 border border-purple-500 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                                : 'bg-slate-950 text-purple-400/80 border border-purple-900/60 hover:text-purple-200 hover:border-purple-600'
                            }`}
                          >
                            <span>Câu {q.id} TL</span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isDone ? 'bg-emerald-400' : 'bg-amber-400/60'
                              }`}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* PART 1: MULTIPLE CHOICE QUESTIONS */}
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-between">
                    <h3 className="font-cyber font-bold text-sm text-cyan-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      PHẦN I: TRẮC NGHIỆM KHÁCH QUAN ({currentExam.multipleChoice.length} CÂU)
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">Chọn 1 đáp án đúng</span>
                  </div>

                  <div className="space-y-4">
                    {currentExam.multipleChoice.map((q) => {
                      const selected = mcAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          id={`question-${q.id}`}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            selected
                              ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                              : 'bg-slate-900/50 border-slate-800'
                          }`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold shrink-0">
                              Câu {q.id}
                            </span>
                            <p className="font-sans text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                              {q.question}
                            </p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                            {q.options.map((opt) => {
                              const isChecked = selected === opt.key;
                              return (
                                <button
                                  key={opt.key}
                                  type="button"
                                  onClick={() => {
                                    playCyberBeep(700, 'sine', 0.02);
                                    setMcAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: opt.key,
                                    }));
                                  }}
                                  className={`p-3 rounded-xl text-left text-xs sm:text-sm font-sans flex items-start gap-2.5 transition-all cursor-pointer ${
                                    isChecked
                                      ? 'bg-cyan-950/80 border border-cyan-400 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-medium'
                                      : 'bg-slate-950/70 border border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs shrink-0 ${
                                      isChecked
                                        ? 'bg-cyan-400 text-slate-950 font-bold'
                                        : 'bg-slate-800 text-slate-400'
                                    }`}
                                  >
                                    {opt.key}
                                  </span>
                                  <span className="leading-relaxed">{opt.text}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PART 2: ESSAY QUESTIONS */}
                <div className="space-y-4 pt-4">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/50 flex items-center justify-between">
                    <h3 className="font-cyber font-bold text-sm text-purple-300 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-400" />
                      PHẦN II: TỰ LUẬN TRỌNG TÂM ({currentExam.essay.length} CÂU)
                    </h3>
                    <span className="text-xs font-mono text-purple-400">Trình bày câu trả lời của em</span>
                  </div>

                  <div className="space-y-4">
                    {currentExam.essay.map((q) => {
                      const isFilled = !!essayAnswers[q.id]?.trim();
                      return (
                        <div
                          key={q.id}
                          id={`essay-${q.id}`}
                          className={`p-4 sm:p-5 rounded-2xl bg-slate-900/60 border transition-all space-y-3 ${
                            isFilled
                              ? 'border-purple-600/60 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                              : 'border-purple-900/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-700 text-purple-300 font-cyber text-xs font-bold shrink-0">
                                Câu {q.id} / {currentExam.essay.length} (Tự luận)
                              </span>
                              <p className="font-sans text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                                {q.question}
                              </p>
                            </div>

                            <span
                              className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-cyber font-bold border ${
                                isFilled
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                  : 'bg-amber-950/80 text-amber-300 border-amber-700'
                              }`}
                            >
                              {isFilled ? '✓ Đã viết bài' : 'Chưa viết'}
                            </span>
                          </div>

                          <textarea
                            rows={4}
                            value={essayAnswers[q.id] || ''}
                            onChange={(e) =>
                              setEssayAnswers((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            placeholder="Nhập câu trả lời của em tại đây..."
                            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors leading-relaxed font-sans"
                          />

                          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span>Hãy trình bày rõ ràng, đủ ý theo yêu cầu đề bài</span>
                            <span>{essayAnswers[q.id]?.trim().length || 0} ký tự</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Submit button bar */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-3">
                  <p className="text-xs text-slate-400">
                    Hãy kiểm tra lại các câu trả lời trước khi nhấn nút Nộp bài thi.
                  </p>
                  <button
                    onClick={handleSubmitExam}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 hover:brightness-110 text-slate-950 font-cyber font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    HOÀN THÀNH &amp; NỘP BÀI THI CHO TỔ STEM FSCBN
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Student View Submitted Result & Detailed Feedback */}
            {submittedResult && (() => {
              const wrongCount = currentExam.multipleChoice.filter(
                (q) => submittedResult.multipleChoiceAnswers[q.id] !== q.correctAnswer
              ).length;
              const mcScore = submittedResult.mcScoreOn10;
              const ratingText =
                mcScore >= 9
                  ? 'Xuất sắc ⭐⭐⭐'
                  : mcScore >= 8
                  ? 'Giỏi ⭐⭐'
                  : mcScore >= 6.5
                  ? 'Khá ⭐'
                  : mcScore >= 5
                  ? 'Đạt trung bình'
                  : 'Cần cố gắng ôn thêm';

              const mcScoreBadgeColor =
                mcScore >= 8
                  ? 'text-emerald-400 border-emerald-500/60 bg-emerald-950/30'
                  : mcScore >= 5
                  ? 'text-cyan-400 border-cyan-500/60 bg-cyan-950/30'
                  : 'text-amber-400 border-amber-500/60 bg-amber-950/30';

              const displayedMCQuestions =
                studentReviewTab === 'wrong'
                  ? currentExam.multipleChoice.filter(
                      (q) => submittedResult.multipleChoiceAnswers[q.id] !== q.correctAnswer
                    )
                  : currentExam.multipleChoice;

              return (
                <div className="space-y-6 animate-fadeIn">
                  {/* Result Hero Banner */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 border border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] text-center space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <div>
                      <h2 className="font-cyber font-bold text-2xl sm:text-3xl text-slate-100">
                        BÀI THI CÔNG NGHỆ {submittedResult.grade} ĐÃ NỘP THÀNH CÔNG!
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                        <span>
                          Thí sinh: <strong className="text-cyan-300">{submittedResult.studentName}</strong>
                        </span>
                        <span className="text-amber-300 font-mono">
                          (@{submittedResult.nickname || 'cute student'})
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>
                          Lớp: <strong className="text-cyan-300">{submittedResult.studentClass}</strong>
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>
                          Thời gian nộp: <span className="font-mono text-slate-300">{submittedResult.submittedAt}</span>
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>
                          Thời gian làm: <span className="font-mono text-amber-300">{submittedResult.durationMinutes} phút</span>
                        </span>
                      </p>
                    </div>

                    {/* Score Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 max-w-3xl mx-auto">
                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                        <div className="text-[10px] font-cyber text-slate-400 uppercase">
                          KẾT QUẢ TRẮC NGHIỆM
                        </div>
                        <div className="text-xl sm:text-2xl font-cyber font-bold text-cyan-300 mt-0.5">
                          {submittedResult.correctCount} / {submittedResult.totalMC} CÂU
                        </div>
                        <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                          Đúng {Math.round((submittedResult.correctCount / submittedResult.totalMC) * 100)}%
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-2xl border shadow-[0_0_15px_rgba(16,185,129,0.2)] ${mcScoreBadgeColor}`}>
                        <div className="text-[10px] font-cyber text-slate-400 uppercase">
                          ĐIỂM TRẮC NGHIỆM
                        </div>
                        <div className="text-xl sm:text-2xl font-cyber font-bold mt-0.5">
                          {submittedResult.mcScoreOn10} / 10 ĐIỂM
                        </div>
                        <div className="text-[10px] font-mono opacity-80 mt-0.5">
                          Hệ 10 tự động chấm
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <div className="text-[10px] font-cyber text-slate-400 uppercase">
                          PHẦN TỰ LUẬN
                        </div>
                        <div className="text-xl sm:text-2xl font-cyber font-bold text-purple-300 mt-0.5">
                          {currentExam.essay.length} CÂU HỎI
                        </div>
                        <div className="text-[10px] font-mono text-purple-300 mt-0.5">
                          Đã lưu &amp; có gợi ý chuẩn
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <div className="text-[10px] font-cyber text-slate-400 uppercase">
                          XẾP LOẠI NHANH
                        </div>
                        <div className="text-sm sm:text-base font-cyber font-bold text-amber-300 mt-1">
                          {ratingText}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {wrongCount === 0 ? 'Tuyệt đối 100%' : `Sai ${wrongCount} câu TN`}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-800/60 text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
                      <p>
                        📢 Bài làm phần tự luận của em đã được chuyển đến hệ thống của{' '}
                        <strong className="text-cyan-300">TỔ STEM FSCBN</strong> để chấm điểm và nhận xét chi tiết.
                        Em hãy đối chiếu bài làm với <strong>ĐÁP ÁN TRẮC NGHIỆM</strong> và{' '}
                        <strong>GỢI Ý ĐÁP ÁN TỰ LUẬN</strong> chi tiết bên dưới để ôn tập và củng cố kiến thức!
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                      <button
                        onClick={() => {
                          setExamStarted(false);
                          setSubmittedResult(null);
                          setMcAnswers({});
                          setEssayAnswers({});
                        }}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Làm bài thi ôn tập lượt mới
                      </button>

                      <button
                        onClick={() => window.print()}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-cyber border border-slate-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                      >
                        <Printer className="w-4 h-4 text-cyan-400" />
                        In / Lưu bảng kết quả bài làm (PDF)
                      </button>
                    </div>
                  </div>

                  {/* Review Navigation Sub-Tabs */}
                  <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2 text-xs font-cyber text-slate-400">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>CHẾ ĐỘ XEM ĐÁP ÁN &amp; GỢI Ý:</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => setStudentReviewTab('all')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                          studentReviewTab === 'all'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Tất cả (Trắc nghiệm &amp; Tự luận)</span>
                      </button>

                      <button
                        onClick={() => setStudentReviewTab('mc')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                          studentReviewTab === 'mc'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Đáp án Trắc nghiệm ({submittedResult.totalMC} câu)</span>
                      </button>

                      <button
                        onClick={() => setStudentReviewTab('essay')}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                          studentReviewTab === 'essay'
                            ? 'bg-purple-950 text-purple-300 border border-purple-400 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                        <span>Gợi ý Tự luận ({currentExam.essay.length} câu)</span>
                      </button>

                      {wrongCount > 0 && (
                        <button
                          onClick={() => setStudentReviewTab('wrong')}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5 ${
                            studentReviewTab === 'wrong'
                              ? 'bg-rose-950 text-rose-300 border border-rose-400 font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                              : 'bg-slate-950 text-rose-400 hover:bg-rose-950/40 border border-rose-900/40'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Xem câu làm sai ({wrongCount} câu)</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ========================================================== */}
                  {/* PART 1 REVIEW: MULTIPLE CHOICE QUESTIONS                  */}
                  {/* ========================================================== */}
                  {(studentReviewTab === 'all' ||
                    studentReviewTab === 'mc' ||
                    studentReviewTab === 'wrong') && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h3 className="font-cyber font-bold text-sm sm:text-base text-cyan-300 flex items-center gap-2">
                            <HelpCircle className="w-5 h-5 text-cyan-400" />
                            ĐÁP ÁN CHI TIẾT PHẦN TRẮC NGHIỆM ({displayedMCQuestions.length} CÂU)
                          </h3>
                          <p className="text-xs text-slate-400 mt-0.5">
                            {studentReviewTab === 'wrong'
                              ? `Đang lọc danh sách ${displayedMCQuestions.length} câu em làm chưa đúng để rút kinh nghiệm.`
                              : `Đối chiếu kết quả: Đúng ${submittedResult.correctCount} câu · Sai ${wrongCount} câu.`}
                          </p>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-cyber">
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Đáp án đúng
                          </span>
                          <span className="flex items-center gap-1.5 text-rose-400">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Em chọn (Sai)
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3.5">
                        {displayedMCQuestions.map((q) => {
                          const userChoice = submittedResult.multipleChoiceAnswers[q.id];
                          const isCorrect = userChoice === q.correctAnswer;
                          const hasAnswered = !!userChoice;
                          const correctOptObj = q.options.find((o) => o.key === q.correctAnswer);

                          return (
                            <div
                              key={q.id}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                                isCorrect
                                  ? 'bg-emerald-950/15 border-emerald-500/40'
                                  : 'bg-rose-950/20 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="font-semibold text-slate-100 flex items-start gap-2.5 text-sm sm:text-base">
                                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-cyan-400 font-bold shrink-0 text-xs">
                                    Câu {q.id}
                                  </span>
                                  <span className="leading-snug">{q.question}</span>
                                </div>

                                <div className="shrink-0">
                                  {isCorrect ? (
                                    <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" /> ĐÚNG (+{(10 / submittedResult.totalMC).toFixed(2)}đ)
                                    </span>
                                  ) : hasAnswered ? (
                                    <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-rose-950 text-rose-300 border border-rose-700 flex items-center gap-1">
                                      <X className="w-3.5 h-3.5" /> CHƯA ĐÚNG (0đ)
                                    </span>
                                  ) : (
                                    <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-amber-950 text-amber-300 border border-amber-700 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5" /> CHƯA CHỌN (0đ)
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* 4 Options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-sans">
                                {q.options.map((opt) => {
                                  const isUserPick = userChoice === opt.key;
                                  const isCorrectAnswer = q.correctAnswer === opt.key;

                                  let optStyles = 'bg-slate-950/60 text-slate-400 border-slate-800/80';
                                  if (isCorrectAnswer) {
                                    optStyles =
                                      'bg-emerald-950/80 text-emerald-100 border-emerald-500/80 font-medium shadow-[0_0_12px_rgba(16,185,129,0.25)]';
                                  } else if (isUserPick && !isCorrect) {
                                    optStyles =
                                      'bg-rose-950/80 text-rose-100 border-rose-500/80 font-medium shadow-[0_0_12px_rgba(244,63,94,0.25)]';
                                  }

                                  return (
                                    <div
                                      key={opt.key}
                                      className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${optStyles}`}
                                    >
                                      <span
                                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                          isCorrectAnswer
                                            ? 'bg-emerald-400 text-slate-950'
                                            : isUserPick
                                            ? 'bg-rose-500 text-slate-950'
                                            : 'bg-slate-800 text-slate-400'
                                        }`}
                                      >
                                        {opt.key}
                                      </span>

                                      <div className="flex-1 leading-relaxed">
                                        <span>{opt.text}</span>
                                      </div>

                                      {/* Badges on the right */}
                                      {isCorrectAnswer && (
                                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-emerald-900 text-emerald-200 border border-emerald-600">
                                          ✓ Đáp án đúng
                                        </span>
                                      )}
                                      {!isCorrect && isUserPick && (
                                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-rose-900 text-rose-200 border border-rose-600">
                                          ✗ Em đã chọn
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {/* Question Summary Review Bar */}
                              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                                {!isCorrect ? (
                                  <div className="text-amber-300 font-sans flex items-center gap-1.5">
                                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                                    <span>
                                      <strong>Ghi nhớ:</strong> Em chọn{' '}
                                      <span className="font-mono font-bold text-rose-300">[{userChoice || 'Chưa chọn'}]</span>,{' '}
                                      đáp án chuẩn là{' '}
                                      <span className="font-mono font-bold text-emerald-300">
                                        [{q.correctAnswer}] {correctOptObj?.text}
                                      </span>
                                    </span>
                                  </div>
                                ) : (
                                  <div className="text-emerald-400 font-sans flex items-center gap-1.5">
                                    <Check className="w-4 h-4 shrink-0" />
                                    <span>Xuất sắc! Em đã chọn chính xác đáp án [{q.correctAnswer}].</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ========================================================== */}
                  {/* PART 2 REVIEW: ESSAY QUESTIONS & SUGGESTED ANSWERS        */}
                  {/* ========================================================== */}
                  {(studentReviewTab === 'all' || studentReviewTab === 'essay') && (
                    <div className="space-y-4 pt-2">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-950 to-purple-950/60 border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-purple-950 text-purple-300 border border-purple-700">
                              HƯỚNG DẪN CHUẨN
                            </span>
                            <h3 className="font-cyber font-bold text-sm sm:text-base text-purple-200 flex items-center gap-2">
                              <BookOpen className="w-5 h-5 text-purple-400" />
                              GỢI Ý ĐÁP ÁN TỰ LUẬN TRỌNG TÂM CÔNG NGHỆ {submittedResult.grade}
                            </h3>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">
                            TỔ STEM FSCBN cung cấp hướng dẫn chấm và đáp án chuẩn để học sinh đối chiếu bài viết của mình.
                          </p>
                        </div>

                        <span className="px-3 py-1 rounded-xl text-xs font-cyber font-bold bg-purple-900/80 text-purple-200 border border-purple-600 shrink-0 self-start sm:self-auto">
                          {currentExam.essay.length} CÂU TỰ LUẬN
                        </span>
                      </div>

                      <div className="space-y-5">
                        {currentExam.essay.map((q) => (
                          <div
                            key={q.id}
                            className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-purple-900/60 shadow-[0_0_20px_rgba(168,85,247,0.12)] space-y-4"
                          >
                            {/* Question Title */}
                            <div className="flex items-start gap-3">
                              <span className="px-3 py-1 rounded-xl bg-purple-950 border border-purple-700 text-purple-300 font-cyber text-xs font-bold shrink-0">
                                CÂU {q.id} (TỰ LUẬN)
                              </span>
                              <h4 className="font-sans text-sm sm:text-base font-bold text-slate-100 leading-snug">
                                {q.question}
                              </h4>
                            </div>

                            {/* Two-block comparison: Student Answer & Suggested Answer */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Left / Block 1: Student's Actual Answer */}
                              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 flex flex-col justify-between">
                                <div>
                                  <div className="text-[11px] font-cyber font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2 pb-1.5 border-b border-slate-800">
                                    <span>✍️ BÀI LÀM CỦA THÍ SINH:</span>
                                    <span className="text-cyan-300 font-bold">{submittedResult.studentName}</span>
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                                    {submittedResult.essayAnswers[q.id]?.trim() ? (
                                      submittedResult.essayAnswers[q.id]
                                    ) : (
                                      <span className="italic text-slate-500">
                                        (Em chưa nhập câu trả lời cho câu hỏi này khi làm bài)
                                      </span>
                                    )}
                                  </p>
                                </div>

                                <div className="text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-900 flex items-center justify-between">
                                  <span>Trạng thái: Đã gửi giáo viên</span>
                                  <span>Độ dài: {submittedResult.essayAnswers[q.id]?.length || 0} ký tự</span>
                                </div>
                              </div>

                              {/* Right / Block 2: Standard Suggested Answer from TỔ STEM FSCBN */}
                              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-purple-950/40 via-slate-950 to-purple-950/20 border border-purple-500/60 shadow-[0_0_15px_rgba(168,85,247,0.15)] space-y-2.5">
                                <div className="text-xs font-cyber font-bold text-purple-300 flex items-center justify-between pb-2 border-b border-purple-900/50">
                                  <span className="flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    GỢI Ý ĐÁP ÁN CHUẨN (TỔ STEM FSCBN)
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-900 text-purple-200 border border-purple-700">
                                    Thang chuẩn
                                  </span>
                                </div>

                                <div className="text-xs sm:text-sm text-purple-100 space-y-2 font-sans leading-relaxed">
                                  {q.suggestedAnswer.map((line, idx) => {
                                    const isSubBullet =
                                      line.startsWith('•') ||
                                      line.startsWith('-') ||
                                      line.startsWith('+');
                                    const isArrow = line.startsWith('👉');
                                    const isStep =
                                      line.startsWith('1.') ||
                                      line.startsWith('2.') ||
                                      line.startsWith('3.') ||
                                      line.startsWith('Bước');

                                    if (isArrow) {
                                      return (
                                        <div
                                          key={idx}
                                          className="p-2 rounded-lg bg-purple-950/60 border border-purple-700/60 text-amber-300 font-semibold flex items-start gap-2"
                                        >
                                          <span className="shrink-0">{line}</span>
                                        </div>
                                      );
                                    }

                                    if (isStep) {
                                      return (
                                        <div
                                          key={idx}
                                          className="font-semibold text-cyan-300 pl-2 border-l-2 border-cyan-500 py-0.5"
                                        >
                                          {line}
                                        </div>
                                      );
                                    }

                                    if (isSubBullet) {
                                      return (
                                        <div key={idx} className="pl-3 text-slate-200 flex items-start gap-2">
                                          <span className="text-purple-400 font-bold shrink-0">▸</span>
                                          <span>{line.replace(/^[•\-+]\s*/, '')}</span>
                                        </div>
                                      );
                                    }

                                    return (
                                      <div key={idx} className="font-semibold text-purple-200">
                                        {line}
                                      </div>
                                    );
                                  })}
                                </div>

                                <div className="mt-3 pt-2 border-t border-purple-900/50 text-[11px] text-slate-400 italic flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                  <span>
                                    Lời khuyên: Đối chiếu các ý chính và từ khóa trong bài làm của em với gợi ý trên để tự đánh giá mức độ hoàn thiện.
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: VISITOR LEADERBOARD & RESULTS (KHÁCH THAM QUAN)     */}
        {/* ========================================================== */}
        {activeTab === 'visitor' && (
          <VisitorLeaderboardView
            submissions={submissions}
            isCloudConnected={isCloudConnected}
            onRefresh={() => {
              loadSubmissions();
            }}
          />
        )}

        {/* ========================================================== */}
        {/* TAB 3: TEACHER DASHBOARD (taind93)                         */}
        {/* ========================================================== */}
        {activeTab === 'teacher' && (
          <div className="space-y-6">
            {!isTeacherAuthenticated ? (
              // Teacher Password Screen
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)] max-w-md mx-auto text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-purple-950 border border-purple-500 text-purple-300">
                  <Lock className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-cyber font-bold text-lg text-slate-100">
                    BÀN LÀM VIỆC GIÁO VIÊN
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Vui lòng nhập mật khẩu bàn giáo viên để xem danh sách bài nộp và chấm điểm các khối 6, 7, 8, 9
                  </p>
                </div>

                <form onSubmit={handleTeacherLogin} className="space-y-3">
                  <input
                    type="password"
                    autoFocus
                    placeholder="Nhập mật khẩu..."
                    value={teacherPasswordInput}
                    onChange={(e) => setTeacherPasswordInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-purple-400 text-slate-100 text-sm outline-none text-center font-mono tracking-widest"
                  />

                  {passwordError && (
                    <div className="text-xs text-rose-400 font-mono">{passwordError}</div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 hover:brightness-110 text-slate-950 font-cyber font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-4 h-4" />
                    MỞ KHÓA HỆ THỐNG
                  </button>
                </form>
              </div>
            ) : (
              // Teacher Workspace
              <div className="space-y-6">
                {/* Cloud Sync Status Banner */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/50 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300">
                      <Cloud className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <div className="font-cyber font-bold text-xs sm:text-sm text-emerald-300 flex items-center gap-2">
                        <span>ĐỒNG BỘ ĐÁM MÂY (FIREBASE REALTIME SYNC)</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Tất cả bài thi học sinh nộp từ mọi máy tính, máy tính bảng và điện thoại đều tự động đẩy về đây tức thì theo thời gian thực!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1 rounded-full text-[11px] font-cyber font-bold bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span>KẾT NỐI TRỰC TUYẾN</span>
                    </span>
                  </div>
                </div>

                {/* Stats & Action Toolbar for All 4 Grades */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-cyber text-slate-400">TỔNG BÀI NỘP</div>
                    <div className="text-xl font-cyber font-bold text-cyan-300 mt-1">
                      {submissions.length} bài
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-cyber text-slate-400">KHỐI 6 NỘP</div>
                    <div className="text-xl font-cyber font-bold text-blue-400 mt-1">
                      {submissions.filter((s) => s.grade === 6).length} bài
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-cyber text-slate-400">KHỐI 7 NỘP</div>
                    <div className="text-xl font-cyber font-bold text-emerald-400 mt-1">
                      {submissions.filter((s) => s.grade === 7).length} bài
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-cyber text-slate-400">KHỐI 8 NỘP</div>
                    <div className="text-xl font-cyber font-bold text-amber-400 mt-1">
                      {submissions.filter((s) => s.grade === 8).length} bài
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] font-cyber text-slate-400">KHỐI 9 NỘP</div>
                    <div className="text-xl font-cyber font-bold text-purple-400 mt-1">
                      {submissions.filter((s) => s.grade === 9).length} bài
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-cyber text-slate-400">ĐIỂM TN TB</div>
                    <div className="text-xl font-cyber font-bold text-teal-400 mt-1">
                      {submissions.length > 0
                        ? (
                            submissions.reduce((acc, cur) => acc + cur.mcScoreOn10, 0) /
                            submissions.length
                          ).toFixed(1)
                        : '0'}
                      /10
                    </div>
                  </div>
                </div>

                {/* Search & Export Toolbar */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Filter Grade */}
                    <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                      <span className="text-slate-400 font-cyber">Khối:</span>
                      <select
                        value={filterGrade}
                        onChange={(e) => {
                          const val =
                            e.target.value === 'ALL'
                              ? 'ALL'
                              : (parseInt(e.target.value) as GradeLevel);
                          setFilterGrade(val);
                          // Auto reset class if the class doesn't belong to the newly selected grade
                          if (
                            filterClass !== 'ALL' &&
                            val !== 'ALL' &&
                            !filterClass.startsWith(`${val}`)
                          ) {
                            setFilterClass('ALL');
                          }
                        }}
                        className="bg-transparent text-slate-200 outline-none cursor-pointer"
                      >
                        <option value="ALL" className="bg-slate-900 text-slate-100">Tất cả các khối</option>
                        <option value={6} className="bg-slate-900 text-slate-100">Khối 6</option>
                        <option value={7} className="bg-slate-900 text-slate-100">Khối 7</option>
                        <option value={8} className="bg-slate-900 text-slate-100">Khối 8</option>
                        <option value={9} className="bg-slate-900 text-slate-100">Khối 9</option>
                      </select>
                    </div>

                    {/* Filter Class */}
                    <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400 font-cyber">Lớp:</span>
                      <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="bg-transparent text-slate-200 outline-none cursor-pointer max-w-[170px] sm:max-w-none"
                      >
                        <option value="ALL" className="bg-slate-900 text-slate-100">
                          {filterGrade === 'ALL'
                            ? 'Tất cả các lớp (A1 → A5)'
                            : `Tất cả lớp Khối ${filterGrade} (A1 → A5)`}
                        </option>
                        {teacherClassOptions.isGrouped && teacherClassOptions.groups
                          ? teacherClassOptions.groups.map((grp) => (
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
                          : teacherClassOptions.classes?.map((cls) => (
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

                    {/* Search student name */}
                    <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Tìm tên học sinh..."
                        value={searchStudent}
                        onChange={(e) => setSearchStudent(e.target.value)}
                        className="bg-transparent text-slate-200 outline-none w-36 sm:w-44"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/50 text-xs font-cyber transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Xuất bảng điểm (Excel/CSV)</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsTeacherAuthenticated(false);
                        setTeacherPasswordInput('');
                      }}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-cyber transition-colors cursor-pointer"
                    >
                      Khóa lại [Thoát]
                    </button>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-950 text-slate-400 font-cyber text-[11px] border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">KHỐI</th>
                          <th className="p-3.5">HỌ VÀ TÊN</th>
                          <th className="p-3.5">LỚP</th>
                          <th className="p-3.5">THỜI GIAN NỘP</th>
                          <th className="p-3.5 text-center">TRẮC NGHIỆM</th>
                          <th className="p-3.5 text-center">ĐIỂM TN (HỆ 10)</th>
                          <th className="p-3.5 text-center">TRẠNG THÁI</th>
                          <th className="p-3.5 text-right">THAO TÁC</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {filteredSubmissions.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-slate-500">
                              Chưa có học sinh nào nộp bài (hoặc không khớp bộ lọc).
                            </td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((sub) => {
                            const subExam = ALL_GRADE_EXAMS[sub.grade];
                            const mcList = subExam?.multipleChoice || [];
                            const wrongQuestions = mcList.filter(
                              (q) => sub.multipleChoiceAnswers[q.id] !== q.correctAnswer
                            );
                            const isExpanded = expandedTableSubId === sub.id;

                            return (
                              <React.Fragment key={sub.id}>
                                <tr className="hover:bg-slate-800/40 transition-colors">
                                  <td className="p-3.5 font-cyber text-amber-400 font-bold">
                                    Lớp {sub.grade}
                                  </td>
                                  <td className="p-3.5 font-semibold text-slate-100">
                                    <div>{sub.studentName}</div>
                                    <div className="text-[11px] font-mono text-cyan-400 font-normal flex items-center gap-1 mt-0.5">
                                      <span className="text-slate-500">🏷️</span>
                                      <span>{sub.nickname || 'cute student'}</span>
                                    </div>
                                  </td>
                                  <td className="p-3.5 font-mono text-cyan-400">
                                    {sub.studentClass}
                                  </td>
                                  <td className="p-3.5 text-slate-400 font-mono text-xs">
                                    {sub.submittedAt}
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <div className="flex flex-col items-center gap-1">
                                      <div className="flex items-center gap-1 font-mono text-xs">
                                        <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-600/70 font-bold flex items-center gap-1">
                                          <Check className="w-3 h-3 text-emerald-400" /> {sub.correctCount} Đúng
                                        </span>
                                        {wrongQuestions.length > 0 ? (
                                          <span className="px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-600/70 font-bold flex items-center gap-1">
                                            <X className="w-3 h-3 text-rose-400" /> {wrongQuestions.length} Sai
                                          </span>
                                        ) : (
                                          <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 text-[10px] font-bold">
                                            100%
                                          </span>
                                        )}
                                      </div>

                                      {/* Highlight specific wrong question numbers */}
                                      {wrongQuestions.length > 0 ? (
                                        <div className="text-[11px] font-mono text-rose-300 flex items-center gap-1">
                                          <span className="text-slate-400 text-[10px]">Sai câu:</span>
                                          <span className="font-bold underline decoration-rose-500">
                                            C{wrongQuestions.map((q) => q.id).join(', C')}
                                          </span>
                                        </div>
                                      ) : (
                                        <span className="text-[10px] text-emerald-400 font-sans">
                                          Đúng toàn bộ {sub.totalMC} câu
                                        </span>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() => setExpandedTableSubId(isExpanded ? null : sub.id)}
                                        className="text-[10px] font-cyber text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-0.5 cursor-pointer mt-0.5"
                                      >
                                        {isExpanded ? (
                                          <>Đóng kết quả từng câu <ChevronUp className="w-3 h-3" /></>
                                        ) : (
                                          <>Xem kết quả từng câu <ChevronDown className="w-3 h-3" /></>
                                        )}
                                      </button>
                                    </div>
                                  </td>
                                  <td className="p-3.5 text-center font-mono text-emerald-400 font-bold text-base">
                                    {sub.mcScoreOn10}đ
                                  </td>
                                  <td className="p-3.5 text-center">
                                    <span
                                      className={`px-2 py-0.5 rounded text-[10px] font-cyber ${
                                        sub.status === 'graded'
                                          ? 'bg-purple-950 text-purple-300 border border-purple-700'
                                          : 'bg-amber-950 text-amber-300 border border-amber-700'
                                      }`}
                                    >
                                      {sub.status === 'graded' ? 'Đã chấm tự luận' : 'Chờ chấm'}
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                                    <button
                                      onClick={() => {
                                        setSelectedSubmission(sub);
                                        setTeacherMCFilter('all');
                                        setTeacherMCExpanded(true);
                                        if (sub.teacherEssayScores) {
                                          setGradingEssayScores(sub.teacherEssayScores);
                                        } else {
                                          const defaultScores: Record<number, number> = {};
                                          const subExam = ALL_GRADE_EXAMS[sub.grade];
                                          const perQuestion = subExam?.essay?.length
                                            ? 10 / subExam.essay.length
                                            : 2.5;
                                          subExam?.essay?.forEach((q) => {
                                            defaultScores[q.id] = parseFloat(perQuestion.toFixed(1));
                                          });
                                          setGradingEssayScores(defaultScores);
                                        }
                                        setGradingFeedback(sub.teacherFeedback || '');
                                      }}
                                      className="px-2.5 py-1 rounded-lg bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700 text-xs font-cyber inline-flex items-center gap-1 cursor-pointer"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>Xem &amp; Chấm</span>
                                    </button>

                                    <button
                                      onClick={() => handleDeleteSubmission(sub.id, sub.studentName)}
                                      className="p-1 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer inline-flex items-center"
                                      title="Xóa bài thi này"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>

                                {/* Inline Expanded Row: Question Cards with Full Prompt & 4 Options */}
                                {isExpanded && (
                                  <tr className="bg-slate-950/95 border-b border-slate-800">
                                    <td colSpan={8} className="p-4 sm:p-5">
                                      <div className="rounded-2xl border border-cyan-800/60 bg-slate-900/95 p-4 sm:p-5 space-y-4 shadow-xl">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                                          <div>
                                            <div className="flex items-center gap-2">
                                              <span className="px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-xs font-cyber font-bold border border-cyan-700">
                                                CHI TIẾT ĐỀ BÀI &amp; 4 ĐÁP ÁN
                                              </span>
                                              <span className="font-cyber font-bold text-sm sm:text-base text-slate-100">
                                                Học sinh: {sub.studentName} ({sub.studentClass})
                                              </span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">
                                              Đúng hiển thị <strong className="text-emerald-400">Màu Xanh</strong> · Sai hiển thị <strong className="text-rose-400">Màu Đỏ</strong> kèm đối chiếu rõ ràng
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-2.5 text-xs">
                                            <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-600 font-mono font-bold flex items-center gap-1">
                                              <Check className="w-3.5 h-3.5 text-emerald-400" /> {sub.correctCount} Đúng
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-rose-950/90 text-rose-300 border border-rose-600 font-mono font-bold flex items-center gap-1">
                                              <X className="w-3.5 h-3.5 text-rose-400" /> {wrongQuestions.length} Sai
                                            </span>
                                          </div>
                                        </div>

                                        {/* Full Question Cards matching Student View */}
                                        <div className="max-h-[560px] overflow-y-auto space-y-4 pr-1.5">
                                          {mcList.map((q) => {
                                            const userChoice = sub.multipleChoiceAnswers[q.id];
                                            const isCorrect = userChoice === q.correctAnswer;
                                            const hasAnswered = !!userChoice;
                                            const correctOptObj = q.options.find((o) => o.key === q.correctAnswer);
                                            const userOptObj = q.options.find((o) => o.key === userChoice);

                                            return (
                                              <div
                                                key={q.id}
                                                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                                                  isCorrect
                                                    ? 'bg-emerald-950/15 border-emerald-500/50'
                                                    : 'bg-rose-950/20 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.12)]'
                                                }`}
                                              >
                                                {/* Prompt Header */}
                                                <div className="flex items-start justify-between gap-3 mb-3.5">
                                                  <div className="font-semibold text-slate-100 flex items-start gap-2.5 text-sm sm:text-base leading-snug">
                                                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-cyan-400 font-bold shrink-0 text-xs mt-0.5">
                                                      Câu {q.id}
                                                    </span>
                                                    <span>{q.question}</span>
                                                  </div>

                                                  <div className="shrink-0">
                                                    {isCorrect ? (
                                                      <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center gap-1">
                                                        <Check className="w-3.5 h-3.5" /> ĐÚNG (+{(10 / sub.totalMC).toFixed(2)}đ)
                                                      </span>
                                                    ) : hasAnswered ? (
                                                      <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-rose-950 text-rose-300 border border-rose-600 flex items-center gap-1">
                                                        <X className="w-3.5 h-3.5" /> SAI (0đ)
                                                      </span>
                                                    ) : (
                                                      <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-amber-950 text-amber-300 border border-amber-600 flex items-center gap-1">
                                                        <AlertCircle className="w-3.5 h-3.5" /> CHƯA LÀM (0đ)
                                                      </span>
                                                    )}
                                                  </div>
                                                </div>

                                                {/* 4 Options: Full text, wrapping naturally without truncation */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-sans">
                                                  {q.options.map((opt) => {
                                                    const isUserPick = userChoice === opt.key;
                                                    const isCorrectAnswer = q.correctAnswer === opt.key;

                                                    let optStyles = 'bg-slate-950/60 text-slate-300 border-slate-800/80';
                                                    if (isCorrectAnswer) {
                                                      optStyles =
                                                        'bg-emerald-950/80 text-emerald-100 border-emerald-500/80 font-medium shadow-[0_0_12px_rgba(16,185,129,0.25)]';
                                                    } else if (isUserPick && !isCorrect) {
                                                      optStyles =
                                                        'bg-rose-950/80 text-rose-100 border-rose-500/80 font-medium shadow-[0_0_12px_rgba(244,63,94,0.25)]';
                                                    }

                                                    return (
                                                      <div
                                                        key={opt.key}
                                                        className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${optStyles}`}
                                                      >
                                                        <span
                                                          className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                                            isCorrectAnswer
                                                              ? 'bg-emerald-400 text-slate-950'
                                                              : isUserPick
                                                              ? 'bg-rose-500 text-slate-950'
                                                              : 'bg-slate-800 text-slate-400'
                                                          }`}
                                                        >
                                                          {opt.key}
                                                        </span>

                                                        <div className="flex-1 leading-relaxed break-words">
                                                          <span>{opt.text}</span>
                                                        </div>

                                                        {isCorrectAnswer && (
                                                          <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-emerald-900 text-emerald-200 border border-emerald-600">
                                                            ✓ Đáp án đúng
                                                          </span>
                                                        )}
                                                        {!isCorrect && isUserPick && (
                                                          <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-rose-900 text-rose-200 border border-rose-600">
                                                            ✗ Học sinh chọn
                                                          </span>
                                                        )}
                                                      </div>
                                                    );
                                                  })}
                                                </div>

                                                {/* Comparison Review Bar */}
                                                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs font-sans">
                                                  {!isCorrect ? (
                                                    <div className="text-rose-300 flex items-center gap-1.5 leading-relaxed">
                                                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                                      <span>
                                                        <strong>Thí sinh chọn:</strong> [{userChoice || 'Để trống'}] {userOptObj?.text || ''}{' '}
                                                        — <strong className="text-emerald-300">Đáp án chuẩn:</strong> [{q.correctAnswer}] {correctOptObj?.text}
                                                      </span>
                                                    </div>
                                                  ) : (
                                                    <div className="text-emerald-300 flex items-center gap-1.5 leading-relaxed">
                                                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                      <span>
                                                        <strong>Chính xác:</strong> Thí sinh chọn đúng đáp án [{q.correctAnswer}]: {correctOptObj?.text}
                                                      </span>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            );
                                          })}
                                        </div>

                                        <div className="flex justify-end pt-1">
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedSubmission(sub);
                                              setTeacherMCFilter('all');
                                              setTeacherMCExpanded(true);
                                              if (sub.teacherEssayScores) {
                                                setGradingEssayScores(sub.teacherEssayScores);
                                              } else {
                                                const defaultScores: Record<number, number> = {};
                                                const subExam = ALL_GRADE_EXAMS[sub.grade];
                                                const perQuestion = subExam?.essay?.length
                                                  ? 10 / subExam.essay.length
                                                  : 2.5;
                                                subExam?.essay?.forEach((q) => {
                                                  defaultScores[q.id] = parseFloat(perQuestion.toFixed(1));
                                                });
                                                setGradingEssayScores(defaultScores);
                                              }
                                              setGradingFeedback(sub.teacherFeedback || '');
                                            }}
                                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:brightness-110 text-slate-950 font-cyber font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-lg"
                                          >
                                            <FileText className="w-4 h-4" />
                                            <span>Mở toàn bộ giao diện Chấm Tự Luận của thí sinh này</span>
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Modal: View & Grade Student Submission */}
                {selectedSubmission && (
                  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn">
                    <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl">
                      {/* Modal Header */}
                      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-cyber text-xs border border-amber-800">
                              KHỐI {selectedSubmission.grade}
                            </span>
                            <h3 className="font-cyber font-bold text-base text-slate-100">
                              BÀI THI: {selectedSubmission.studentName}
                            </h3>
                            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 font-mono text-xs border border-amber-800">
                              @{selectedSubmission.nickname || 'cute student'}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-800">
                              Lớp {selectedSubmission.studentClass}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">
                            Nộp lúc: {selectedSubmission.submittedAt} · Thời gian làm: {selectedSubmission.durationMinutes} phút
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedSubmission(null)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Modal Body */}
                      <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
                        {/* PART I: MULTIPLE CHOICE DETAILS FOR TEACHER */}
                        {(() => {
                          const subExam = ALL_GRADE_EXAMS[selectedSubmission.grade];
                          const mcList = subExam?.multipleChoice || [];
                          const wrongMCList = mcList.filter(
                            (q) => selectedSubmission.multipleChoiceAnswers[q.id] !== q.correctAnswer
                          );
                          const correctMCList = mcList.filter(
                            (q) => selectedSubmission.multipleChoiceAnswers[q.id] === q.correctAnswer
                          );

                          const filteredMCList =
                            teacherMCFilter === 'wrong'
                              ? wrongMCList
                              : teacherMCFilter === 'correct'
                              ? correctMCList
                              : mcList;

                          return (
                            <div className="space-y-3.5 rounded-2xl bg-slate-950/80 border border-cyan-800/60 p-4 sm:p-5 shadow-lg">
                              {/* Header & Stats Banner */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                                      PHẦN I
                                    </span>
                                    <h4 className="font-cyber font-bold text-sm sm:text-base text-cyan-200 flex items-center gap-2">
                                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                                      KẾT QUẢ CHI TIẾT TỪNG CÂU TRẮC NGHIỆM ({selectedSubmission.totalMC} CÂU)
                                    </h4>
                                  </div>
                                  <p className="text-xs text-slate-400 mt-1">
                                    Chi tiết từng câu: đánh dấu Đúng/Sai rõ ràng, đối chiếu lựa chọn của học sinh và đáp án chuẩn.
                                  </p>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="text-xl font-cyber font-bold text-emerald-400 font-mono">
                                      {selectedSubmission.mcScoreOn10} / 10 ĐIỂM
                                    </div>
                                    <div className="text-[11px] font-mono text-cyan-300">
                                      Đúng {selectedSubmission.correctCount}/{selectedSubmission.totalMC} câu ({Math.round((selectedSubmission.correctCount / selectedSubmission.totalMC) * 100)}%)
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => setTeacherMCExpanded(!teacherMCExpanded)}
                                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
                                    title={teacherMCExpanded ? 'Thu gọn danh sách câu' : 'Mở rộng danh sách câu'}
                                  >
                                    {teacherMCExpanded ? (
                                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-cyan-400" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              {/* Metric Cards Row */}
                              <div className="grid grid-cols-3 gap-2.5">
                                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                                  <span className="text-[10px] font-cyber text-slate-400 block uppercase">Tổng số câu</span>
                                  <span className="font-mono font-bold text-cyan-300 text-base">{selectedSubmission.totalMC} câu</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center">
                                  <span className="text-[10px] font-cyber text-emerald-400 block uppercase">Số câu Đúng</span>
                                  <span className="font-mono font-bold text-emerald-300 text-base flex items-center justify-center gap-1">
                                    <Check className="w-4 h-4 text-emerald-400" />
                                    {selectedSubmission.correctCount} câu
                                  </span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-center">
                                  <span className="text-[10px] font-cyber text-rose-400 block uppercase">Số câu Sai</span>
                                  <span className="font-mono font-bold text-rose-300 text-base flex items-center justify-center gap-1">
                                    <X className="w-4 h-4 text-rose-400" />
                                    {wrongMCList.length} câu
                                  </span>
                                </div>
                              </div>

                              {/* Bubble Sheet Matrix (1 đến N) for instant teacher inspection */}
                              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                                <div className="flex items-center justify-between text-[11px] font-cyber text-slate-400">
                                  <span>BẢNG TỔNG QUAN PHIẾU TRẢ LỜI CỦA THÍ SINH:</span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-emerald-400 font-sans flex items-center gap-1">
                                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Đúng
                                    </span>
                                    <span className="text-rose-400 font-sans flex items-center gap-1">
                                      <span className="w-2 h-2 rounded-full bg-rose-500"></span> Sai
                                    </span>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-1.5 pt-1 max-h-36 overflow-y-auto">
                                  {mcList.map((q) => {
                                    const userChoice = selectedSubmission.multipleChoiceAnswers[q.id];
                                    const isCorrect = userChoice === q.correctAnswer;
                                    return (
                                      <a
                                        key={q.id}
                                        href={`#teacher-mc-q-${q.id}`}
                                        className={`px-2 py-1 rounded-lg font-mono text-[11px] flex items-center gap-1 border transition-all ${
                                          isCorrect
                                            ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300'
                                            : userChoice
                                            ? 'bg-rose-950/80 border-rose-500/60 text-rose-300 font-bold'
                                            : 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                                        }`}
                                        title={`Câu ${q.id}: Học sinh chọn [${userChoice || 'Để trống'}] - Đáp án đúng [${q.correctAnswer}]`}
                                      >
                                        <span>C{q.id}:</span>
                                        <span>{userChoice || '-'}</span>
                                        {isCorrect ? (
                                          <Check className="w-3 h-3 text-emerald-400" />
                                        ) : (
                                          <span className="text-rose-400 font-bold text-[10px]">({q.correctAnswer})</span>
                                        )}
                                      </a>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Wrong Questions Callout Box for Rapid Inspection */}
                              {wrongMCList.length > 0 ? (
                                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/50 space-y-2">
                                  <div className="flex items-center justify-between text-xs font-cyber text-rose-300">
                                    <span className="flex items-center gap-1.5 font-bold">
                                      <X className="w-4 h-4 text-rose-400" />
                                      CÁC CÂU HỌC SINH LÀM SAI ({wrongMCList.length} CÂU):
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-sans">
                                      Bấm vào từng câu để xem đối chiếu đáp án chi tiết
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {wrongMCList.map((q) => {
                                      const userChoice = selectedSubmission.multipleChoiceAnswers[q.id];
                                      return (
                                        <button
                                          key={q.id}
                                          type="button"
                                          onClick={() => {
                                            setTeacherMCFilter('wrong');
                                            setTeacherMCExpanded(true);
                                          }}
                                          className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-600/80 text-rose-200 text-xs font-mono flex items-center gap-1.5 hover:bg-rose-900 transition-colors cursor-pointer"
                                        >
                                          <span className="font-bold text-rose-400">Câu {q.id}:</span>
                                          <span>HS chọn [{userChoice || 'Để trống'}] ✗</span>
                                          <span className="text-emerald-400 font-bold">→ Chuẩn [{q.correctAnswer}] ✓</span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center gap-2 text-xs text-emerald-300 font-cyber">
                                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                  <span>XUẤT SẮC: Thí sinh trả lời ĐÚNG 100% toàn bộ {selectedSubmission.totalMC} câu trắc nghiệm!</span>
                                </div>
                              )}

                              {/* Filter buttons */}
                              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => setTeacherMCFilter('all')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer ${
                                      teacherMCFilter === 'all'
                                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                                    }`}
                                  >
                                    Tất cả ({mcList.length} câu)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setTeacherMCFilter('wrong')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1 ${
                                      teacherMCFilter === 'wrong'
                                        ? 'bg-rose-950 text-rose-300 border border-rose-400 font-bold shadow-[0_0_8px_rgba(244,63,94,0.3)]'
                                        : 'bg-slate-900 text-rose-400 border border-rose-900/40 hover:bg-rose-950/40'
                                    }`}
                                  >
                                    <X className="w-3.5 h-3.5" />
                                    Chỉ xem câu Sai ({wrongMCList.length} câu)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setTeacherMCFilter('correct')}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-cyber transition-all cursor-pointer flex items-center gap-1 ${
                                      teacherMCFilter === 'correct'
                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-400 font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                                        : 'bg-slate-900 text-emerald-400 border border-emerald-900/40 hover:bg-emerald-950/40'
                                    }`}
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                    Chỉ xem câu Đúng ({correctMCList.length} câu)
                                  </button>
                                </div>

                                <span className="text-[11px] font-mono text-slate-400">
                                  Đang hiển thị: <strong className="text-cyan-300">{filteredMCList.length}</strong> / {mcList.length} câu
                                </span>
                              </div>

                              {/* Question Cards: Exact layout as Student View, with full prompt and 4 full options */}
                              {teacherMCExpanded && (
                                <div className="space-y-4 pt-2 max-h-[520px] overflow-y-auto pr-1">
                                  {filteredMCList.length === 0 ? (
                                    <div className="p-5 text-center text-slate-400 italic bg-slate-900/60 rounded-xl border border-slate-800">
                                      Không có câu nào trong bộ lọc này.
                                    </div>
                                  ) : (
                                    filteredMCList.map((q) => {
                                      const userChoice = selectedSubmission.multipleChoiceAnswers[q.id];
                                      const isCorrect = userChoice === q.correctAnswer;
                                      const hasAnswered = !!userChoice;
                                      const correctOptObj = q.options.find((o) => o.key === q.correctAnswer);
                                      const userOptObj = q.options.find((o) => o.key === userChoice);

                                      return (
                                        <div
                                          key={q.id}
                                          id={`teacher-mc-q-${q.id}`}
                                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                                            isCorrect
                                              ? 'bg-emerald-950/15 border-emerald-500/50'
                                              : 'bg-rose-950/20 border-rose-500/60 shadow-[0_0_15px_rgba(244,63,94,0.12)]'
                                          }`}
                                        >
                                          {/* Prompt Header */}
                                          <div className="flex items-start justify-between gap-3 mb-3.5">
                                            <div className="font-semibold text-slate-100 flex items-start gap-2.5 text-sm sm:text-base leading-snug">
                                              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-cyan-400 font-bold shrink-0 text-xs mt-0.5">
                                                Câu {q.id}
                                              </span>
                                              <span className="font-sans">{q.question}</span>
                                            </div>

                                            <div className="shrink-0">
                                              {isCorrect ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-emerald-950 text-emerald-300 border border-emerald-600 flex items-center gap-1">
                                                  <Check className="w-3.5 h-3.5" /> ĐÚNG (+{(10 / selectedSubmission.totalMC).toFixed(2)}đ)
                                                </span>
                                              ) : hasAnswered ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-rose-950 text-rose-300 border border-rose-600 flex items-center gap-1">
                                                  <X className="w-3.5 h-3.5" /> SAI (0đ)
                                                </span>
                                              ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-cyber font-bold bg-amber-950 text-amber-300 border border-amber-600 flex items-center gap-1">
                                                  <AlertCircle className="w-3.5 h-3.5" /> CHƯA LÀM (0đ)
                                                </span>
                                              )}
                                            </div>
                                          </div>

                                          {/* 4 Options: Full text, wrapping naturally without truncation */}
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm font-sans">
                                            {q.options.map((opt) => {
                                              const isUserPick = userChoice === opt.key;
                                              const isCorrectAnswer = q.correctAnswer === opt.key;

                                              let optStyles = 'bg-slate-950/60 text-slate-300 border-slate-800/80';
                                              if (isCorrectAnswer) {
                                                optStyles =
                                                  'bg-emerald-950/80 text-emerald-100 border-emerald-500/80 font-medium shadow-[0_0_12px_rgba(16,185,129,0.25)]';
                                              } else if (isUserPick && !isCorrect) {
                                                optStyles =
                                                  'bg-rose-950/80 text-rose-100 border-rose-500/80 font-medium shadow-[0_0_12px_rgba(244,63,94,0.25)]';
                                              }

                                              return (
                                                <div
                                                  key={opt.key}
                                                  className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${optStyles}`}
                                                >
                                                  <span
                                                    className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                                                      isCorrectAnswer
                                                        ? 'bg-emerald-400 text-slate-950'
                                                        : isUserPick
                                                        ? 'bg-rose-500 text-slate-950'
                                                        : 'bg-slate-800 text-slate-400'
                                                    }`}
                                                  >
                                                    {opt.key}
                                                  </span>

                                                  <div className="flex-1 leading-relaxed break-words">
                                                    <span>{opt.text}</span>
                                                  </div>

                                                  {isCorrectAnswer && (
                                                    <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-emerald-900 text-emerald-200 border border-emerald-600">
                                                      ✓ Đáp án đúng
                                                    </span>
                                                  )}
                                                  {!isCorrect && isUserPick && (
                                                    <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-cyber font-bold bg-rose-900 text-rose-200 border border-rose-600">
                                                      ✗ Học sinh chọn
                                                    </span>
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>

                                          {/* Comparison Review Bar */}
                                          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs font-sans">
                                            {!isCorrect ? (
                                              <div className="text-rose-300 flex items-center gap-1.5 leading-relaxed">
                                                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                                <span>
                                                  <strong>Thí sinh chọn:</strong> [{userChoice || 'Để trống'}] {userOptObj?.text || ''}{' '}
                                                  — <strong className="text-emerald-300">Đáp án chuẩn:</strong> [{q.correctAnswer}] {correctOptObj?.text}
                                                </span>
                                              </div>
                                            ) : (
                                              <div className="text-emerald-300 flex items-center gap-1.5 leading-relaxed">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                                <span>
                                                  <strong>Chính xác:</strong> Thí sinh chọn đúng đáp án [{q.correctAnswer}]: {correctOptObj?.text}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        {/* Essay Questions Grading Section */}
                        <div className="space-y-4">
                          <div className="font-cyber font-bold text-purple-300 flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-purple-400" />
                            CHẤM BÀI TỰ LUẬN CỦA HỌC SINH (LỚP {selectedSubmission.grade})
                          </div>

                          {(ALL_GRADE_EXAMS[selectedSubmission.grade]?.essay || []).map((q) => (
                            <div
                              key={q.id}
                              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5"
                            >
                              <div className="font-cyber font-bold text-slate-200">
                                Câu {q.id}. {q.question}
                              </div>

                              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-sans text-slate-300 whitespace-pre-line leading-relaxed">
                                <span className="text-[10px] font-cyber text-slate-500 block mb-1">
                                  Học sinh viết:
                                </span>
                                {selectedSubmission.essayAnswers[q.id] || '(Học sinh để trống)'}
                              </div>

                              {/* Standard suggested answer for teacher reference */}
                              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200 space-y-1">
                                <span className="text-[10px] font-cyber font-bold text-purple-300 block mb-1 flex items-center gap-1.5">
                                  <Sparkles className="w-3 h-3 text-purple-400" /> Gợi ý đáp án chuẩn của TỔ STEM FSCBN:
                                </span>
                                <ul className="list-disc pl-4 space-y-0.5 text-xs text-purple-200 font-sans">
                                  {q.suggestedAnswer.map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                  ))}
                                </ul>
                              </div>

                              <div className="flex items-center gap-3 pt-1">
                                <span className="text-xs font-cyber text-purple-300">
                                  Điểm câu {q.id}:
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.25"
                                  value={gradingEssayScores[q.id] ?? 2.5}
                                  onChange={(e) =>
                                    setGradingEssayScores((prev) => ({
                                      ...prev,
                                      [q.id]: parseFloat(e.target.value) || 0,
                                    }))
                                  }
                                  className="w-20 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-purple-200 text-center font-mono outline-none focus:border-purple-400"
                                />
                                <span className="text-xs text-slate-400 font-mono">điểm</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Teacher Feedback Note */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-cyber text-slate-300">
                            LỜI NHẬN XÉT CỦA TỔ STEM FSCBN DÀNH CHO HỌC SINH:
                          </label>
                          <textarea
                            rows={3}
                            value={gradingFeedback}
                            onChange={(e) => setGradingFeedback(e.target.value)}
                            placeholder="Ví dụ: Nắm vững kiến thức bài học, trình bày tự luận rõ ràng mạch lạc..."
                            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-purple-400 text-slate-200 outline-none text-xs"
                          />
                        </div>
                      </div>

                      {/* Modal Footer */}
                      <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedSubmission(null)}
                          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-cyber cursor-pointer"
                        >
                          Đóng
                        </button>

                        <button
                          onClick={handleSaveTeacherGrade}
                          className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-slate-950 font-cyber font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
                        >
                          LƯU ĐIỂM &amp; NHẬN XÉT
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
