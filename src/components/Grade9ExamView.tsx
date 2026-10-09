import React, { useState, useEffect } from 'react';
import {
  MULTIPLE_CHOICE_QUESTIONS,
  ESSAY_QUESTIONS,
  StudentSubmission,
  TEACHER_EXAM_PASS,
  EXAM_STORAGE_KEY,
} from '../data/examGrade9';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
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
  Check,
  X,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { playLaserChirp, playSuccessChirp, playCyberBeep } from '../utils/audio';

interface Grade9ExamViewProps {
  onBackToCurriculum?: () => void;
}

export const Grade9ExamView: React.FC<Grade9ExamViewProps> = ({ onBackToCurriculum }) => {
  // Mode: student exam vs teacher dashboard
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('9A1');
  const [examStarted, setExamStarted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Student Answers
  const [mcAnswers, setMcAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [essayAnswers, setEssayAnswers] = useState<Record<number, string>>({
    1: '',
    2: '',
    3: '',
    4: '',
  });

  // Submitted result state for student
  const [submittedResult, setSubmittedResult] = useState<StudentSubmission | null>(null);

  // Teacher State
  const [isTeacherAuthenticated, setIsTeacherAuthenticated] = useState(false);
  const [teacherPasswordInput, setTeacherPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submissions, setSubmissions] = useState<StudentSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);

  // Teacher grading modal state
  const [gradingEssayScores, setGradingEssayScores] = useState<Record<number, number>>({
    1: 2.5,
    2: 2.5,
    3: 2.5,
    4: 2.5,
  });
  const [gradingFeedback, setGradingFeedback] = useState('');

  // Teacher Filter
  const [filterClass, setFilterClass] = useState('ALL');
  const [searchStudent, setSearchStudent] = useState('');

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
    loadSubmissions();
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
    setEssayAnswers({ 1: '', 2: '', 3: '', 4: '' });
    setSubmittedResult(null);
  };

  // Student Submit Exam
  const handleSubmitExam = () => {
    const answeredCount = Object.keys(mcAnswers).length;
    const totalMC = MULTIPLE_CHOICE_QUESTIONS.length;

    let confirmMsg = `Thí sinh ${studentName} - Lớp ${studentClass} có chắc chắn muốn nộp bài?`;
    if (answeredCount < totalMC) {
      confirmMsg += `\nLưu ý: Bạn mới hoàn thành ${answeredCount}/${totalMC} câu trắc nghiệm!`;
    }

    if (!window.confirm(confirmMsg)) {
      return;
    }

    // Calculate MC Score
    let correct = 0;
    MULTIPLE_CHOICE_QUESTIONS.forEach((q) => {
      if (mcAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const mcScore10 = Number(((correct / totalMC) * 10).toFixed(2));
    const duration = Math.max(1, Math.round(elapsedSeconds / 60));

    const newSubmission: StudentSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      studentName: studentName.trim(),
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

    // Save to localStorage
    try {
      const currentList: StudentSubmission[] = JSON.parse(
        localStorage.getItem(EXAM_STORAGE_KEY) || '[]'
      );
      const updatedList = [newSubmission, ...currentList];
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updatedList));
      setSubmissions(updatedList);
    } catch (err) {
      console.error('Failed to save submission', err);
    }

    playLaserChirp();
    setSubmittedResult(newSubmission);
  };

  // Teacher Authentication
  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherPasswordInput === TEACHER_EXAM_PASS) {
      playSuccessChirp();
      setIsTeacherAuthenticated(true);
      setPasswordError('');
      loadSubmissions();
    } else {
      playCyberBeep(300, 'sawtooth', 0.1);
      setPasswordError('Mật khẩu không chính xác! (Mật khẩu Thầy Tài: taind93)');
    }
  };

  // Teacher Save Grade & Feedback
  const handleSaveTeacherGrade = () => {
    if (!selectedSubmission) return;

    let totalEssay = 0;
    Object.values(gradingEssayScores).forEach((s) => (totalEssay += s));
    const finalScore = Number(((selectedSubmission.mcScoreOn10 * 0.7) + (totalEssay * 0.3)).toFixed(2));

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
    setSelectedSubmission(null);
    playSuccessChirp();
    alert('Đã lưu kết quả chấm điểm và nhận xét của Thầy Tài thành công!');
  };

  // Delete submission
  const handleDeleteSubmission = (id: string, name: string) => {
    if (window.confirm(`Thầy có chắc chắn muốn xóa bài thi của học sinh: ${name}?`)) {
      const updated = submissions.filter((s) => s.id !== id);
      localStorage.setItem(EXAM_STORAGE_KEY, JSON.stringify(updated));
      setSubmissions(updated);
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
    csvContent += 'STT,Họ và tên,Lớp,Thời gian nộp,Số câu trắc nghiệm đúng,Điểm TN (hệ 10),Trạng thái,Nhận xét của GV\n';

    submissions.forEach((sub, idx) => {
      const row = [
        idx + 1,
        `"${sub.studentName}"`,
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
    link.setAttribute('download', `Bang_diem_Cong_nghe_9_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const matchClass = filterClass === 'ALL' || sub.studentClass === filterClass;
    const matchName = sub.studentName.toLowerCase().includes(searchStudent.toLowerCase());
    return matchClass && matchName;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 sm:py-8 px-3 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-900/40 border border-purple-500/50 text-purple-300">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-cyber font-semibold bg-purple-950 text-purple-300 border border-purple-800">
                  CÔNG NGHỆ 9
                </span>
                <h1 className="font-cyber font-bold text-lg sm:text-xl text-slate-100 tracking-wide">
                  HỆ THỐNG ÔN THI &amp; KIỂM TRA ĐÁNH GIÁ
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Chủ đề Định hướng nghề nghiệp &amp; Thị trường lao động (Trắc nghiệm 27 câu + Tự luận 4 câu)
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
                <span>Bàn làm việc Thầy Tài</span>
              </button>
            </div>
          </div>
        </div>

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
                    ĐĂNG KÝ BẮT ĐẦU LÀM BÀI ÔN THI
                  </h2>
                  <p className="text-xs text-slate-400">
                    Cấu trúc đề: 27 câu trắc nghiệm 4 lựa chọn + 4 câu tự luận trọng tâm
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
                    <label className="block text-xs font-cyber text-slate-300 mb-1.5">
                      LỚP HỌC <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition-colors"
                    >
                      <option value="9A1">Lớp 9A1</option>
                      <option value="9A2">Lớp 9A2</option>
                      <option value="9A3">Lớp 9A3</option>
                      <option value="9A4">Lớp 9A4</option>
                      <option value="9A5">Lớp 9A5</option>
                      <option value="9A6">Lớp 9A6</option>
                      <option value="Khác">Lớp khác</option>
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 space-y-1.5 leading-relaxed">
                    <div className="text-cyan-300 font-semibold font-cyber flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Hướng dẫn làm bài:
                    </div>
                    <p>• Trắc nghiệm: Bấm chọn đáp án đúng nhất (A, B, C hoặc D).</p>
                    <p>• Tự luận: Trình bày câu trả lời ngắn gọn, rõ ý vào từng khung bên dưới.</p>
                    <p>• Sau khi nộp, hệ thống sẽ tự chấm điểm trắc nghiệm và gửi bài về cho Thầy Tài.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:brightness-110 text-slate-950 font-cyber font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    BẮT ĐẦU LÀM BÀI THI NGAY
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
                      Học sinh: {studentName} ({studentClass})
                    </span>
                    <span className="hidden sm:inline text-slate-600">|</span>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300">
                      <Clock className="w-3.5 h-3.5 animate-pulse" />
                      <span>{formatTime(elapsedSeconds)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-slate-300">
                      Đã làm:{' '}
                      <span className="text-cyan-400 font-bold">
                        {Object.keys(mcAnswers).length}/{MULTIPLE_CHOICE_QUESTIONS.length}
                      </span>{' '}
                      câu TN
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
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs font-cyber text-slate-400 mb-2">
                    DANH SÁCH CÂU TRẮC NGHIỆM (Bấm số để chuyển nhanh):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MULTIPLE_CHOICE_QUESTIONS.map((q) => {
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

                {/* PART 1: MULTIPLE CHOICE QUESTIONS */}
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-between">
                    <h3 className="font-cyber font-bold text-sm text-cyan-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      PHẦN I: TRẮC NGHIỆM KHÁCH QUAN (27 CÂU)
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">Chọn 1 đáp án đúng</span>
                  </div>

                  <div className="space-y-4">
                    {MULTIPLE_CHOICE_QUESTIONS.map((q) => {
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
                      PHẦN II: TỰ LUẬN TRỌNG TÂM (4 CÂU)
                    </h3>
                    <span className="text-xs font-mono text-purple-400">Trình bày câu trả lời của em</span>
                  </div>

                  <div className="space-y-4">
                    {ESSAY_QUESTIONS.map((q) => (
                      <div
                        key={q.id}
                        className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-purple-900/40 space-y-2.5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="px-2.5 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                            Câu {q.id} (Tự luận)
                          </span>
                          <p className="font-sans text-sm sm:text-base font-semibold text-slate-100">
                            {q.question}
                          </p>
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
                          className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-purple-400 text-slate-200 text-xs sm:text-sm outline-none transition-colors leading-relaxed"
                        />
                      </div>
                    ))}
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
                    HOÀN THÀNH &amp; NỘP BÀI THI CHO THẦY TÀI
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Student View Submitted Result & Detailed Feedback */}
            {submittedResult && (
              <div className="space-y-6 animate-fadeIn">
                {/* Result Hero Banner */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/60 to-slate-950 border border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] text-center space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300">
                    <CheckCircle2 className="w-10 h-10 animate-bounce" />
                  </div>
                  <div>
                    <h2 className="font-cyber font-bold text-2xl text-slate-100">
                      BÀI THI ĐÃ NỘP THÀNH CÔNG!
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Thí sinh: <strong className="text-cyan-300">{submittedResult.studentName}</strong> | Lớp:{' '}
                      <strong className="text-cyan-300">{submittedResult.studentClass}</strong> | Thời gian làm bài:{' '}
                      <span className="font-mono text-amber-300">{submittedResult.durationMinutes} phút</span>
                    </p>
                  </div>

                  {/* Score Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-4 py-2">
                    <div className="px-6 py-3 rounded-2xl bg-slate-900/90 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <div className="text-[11px] font-cyber text-slate-400 uppercase">
                        KẾT QUẢ TRẮC NGHIỆM
                      </div>
                      <div className="text-2xl sm:text-3xl font-cyber font-bold text-cyan-300 mt-0.5">
                        {submittedResult.correctCount} / {submittedResult.totalMC} CÂU
                      </div>
                    </div>

                    <div className="px-6 py-3 rounded-2xl bg-slate-900/90 border border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <div className="text-[11px] font-cyber text-slate-400 uppercase">
                        ĐIỂM TRẮC NGHIỆM (HỆ 10)
                      </div>
                      <div className="text-2xl sm:text-3xl font-cyber font-bold text-emerald-400 mt-0.5">
                        {submittedResult.mcScoreOn10} / 10 ĐIỂM
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 max-w-lg mx-auto">
                    Bài làm phần tự luận của em đã được chuyển đến hệ thống của <strong>Thầy Tài</strong> để chấm điểm và nhận xét chi tiết. Em có thể đối chiếu bài làm với đáp án chuẩn bên dưới.
                  </p>

                  <button
                    onClick={() => {
                      setExamStarted(false);
                      setSubmittedResult(null);
                      setMcAnswers({});
                      setEssayAnswers({ 1: '', 2: '', 3: '', 4: '' });
                    }}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-cyber border border-slate-700 transition-colors cursor-pointer inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Làm bài thi ôn tập lượt mới
                  </button>
                </div>

                {/* Review MC Questions */}
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <h3 className="font-cyber font-bold text-sm text-cyan-300 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400" />
                      CHI TIẾT ĐÁP ÁN TRẮC NGHIỆM (ĐỐI CHIẾU KẾT QUẢ)
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {MULTIPLE_CHOICE_QUESTIONS.map((q) => {
                      const userChoice = submittedResult.multipleChoiceAnswers[q.id];
                      const isCorrect = userChoice === q.correctAnswer;
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border text-xs sm:text-sm ${
                            isCorrect
                              ? 'bg-emerald-950/20 border-emerald-500/40'
                              : 'bg-rose-950/20 border-rose-500/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="font-semibold text-slate-100 flex items-start gap-2">
                              <span className="font-mono text-cyan-400 font-bold shrink-0">
                                Câu {q.id}:
                              </span>
                              <span>{q.question}</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono shrink-0 font-bold ${
                                isCorrect
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-300 border border-rose-800'
                              }`}
                            >
                              {isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mt-2 font-sans">
                            {q.options.map((opt) => {
                              const isUserPick = userChoice === opt.key;
                              const isCorrectAnswer = q.correctAnswer === opt.key;
                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2 rounded-lg flex items-center gap-2 ${
                                    isCorrectAnswer
                                      ? 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/60 font-semibold'
                                      : isUserPick
                                      ? 'bg-rose-950/80 text-rose-200 border border-rose-500/60 font-semibold'
                                      : 'bg-slate-950/60 text-slate-400'
                                  }`}
                                >
                                  <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center font-mono text-[10px] shrink-0">
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                  {isCorrectAnswer && (
                                    <span className="ml-auto text-[10px] text-emerald-300">
                                      (Đáp án đúng)
                                    </span>
                                  )}
                                  {!isCorrect && isUserPick && (
                                    <span className="ml-auto text-[10px] text-rose-300">
                                      (Em đã chọn)
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Essay Questions with Suggested Answers */}
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800 flex items-center justify-between">
                    <h3 className="font-cyber font-bold text-sm text-purple-300 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      ĐÁP ÁN CHUẨN PHẦN TỰ LUẬN (GỢI Ý CỦA THẦY TÀI)
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {ESSAY_QUESTIONS.map((q) => (
                      <div
                        key={q.id}
                        className="p-5 rounded-2xl bg-slate-900/80 border border-purple-900/50 space-y-3"
                      >
                        <div className="font-cyber font-bold text-sm text-purple-200">
                          Câu {q.id}. {q.question}
                        </div>

                        {/* Student's answer */}
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                          <div className="text-[11px] font-cyber text-slate-400">
                            Bài làm của em:
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
                            {submittedResult.essayAnswers[q.id] || '(Em chưa ghi câu trả lời)'}
                          </p>
                        </div>

                        {/* Standard suggested answer */}
                        <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/40 space-y-1.5">
                          <div className="text-xs font-cyber font-bold text-purple-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Đáp án chuẩn / Hướng dẫn chấm:
                          </div>
                          <ul className="text-xs sm:text-sm text-purple-200 space-y-1 list-disc pl-4 leading-relaxed font-sans">
                            {q.suggestedAnswer.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================== */}
        {/* TAB 2: TEACHER DASHBOARD (taind93)                         */}
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
                    BÀN LÀM VIỆC GIÁO VIÊN // THẦY TÀI
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Vui lòng nhập mật khẩu quản trị để xem danh sách bài nộp và chấm điểm
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
                {/* Stats & Action Toolbar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-cyber text-slate-400">TỔNG SỐ BÀI ĐÃ NỘP</div>
                    <div className="text-2xl font-cyber font-bold text-cyan-300 mt-1">
                      {submissions.length} bài
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-cyber text-slate-400">ĐIỂM TRẮC NGHIỆM TB</div>
                    <div className="text-2xl font-cyber font-bold text-emerald-400 mt-1">
                      {submissions.length > 0
                        ? (
                            submissions.reduce((acc, cur) => acc + cur.mcScoreOn10, 0) /
                            submissions.length
                          ).toFixed(1)
                        : '0'}
                      /10
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[11px] font-cyber text-slate-400">TRẠNG THÁI HỆ THỐNG</div>
                    <div className="text-sm font-cyber font-bold text-purple-300 mt-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ĐANG NHẬN BÀI THI
                    </div>
                  </div>
                </div>

                {/* Search & Export Toolbar */}
                <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Filter Class */}
                    <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <select
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="bg-transparent text-slate-200 outline-none cursor-pointer"
                      >
                        <option value="ALL">Tất cả các lớp</option>
                        <option value="9A1">Lớp 9A1</option>
                        <option value="9A2">Lớp 9A2</option>
                        <option value="9A3">Lớp 9A3</option>
                        <option value="9A4">Lớp 9A4</option>
                        <option value="9A5">Lớp 9A5</option>
                        <option value="9A6">Lớp 9A6</option>
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
                            <td colSpan={7} className="p-8 text-center text-slate-500">
                              Chưa có học sinh nào nộp bài (hoặc không khớp bộ lọc).
                            </td>
                          </tr>
                        ) : (
                          filteredSubmissions.map((sub) => (
                            <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                              <td className="p-3.5 font-semibold text-slate-100">
                                {sub.studentName}
                              </td>
                              <td className="p-3.5 font-mono text-cyan-400">
                                {sub.studentClass}
                              </td>
                              <td className="p-3.5 text-slate-400 font-mono text-xs">
                                {sub.submittedAt}
                              </td>
                              <td className="p-3.5 text-center font-mono text-cyan-300 font-bold">
                                {sub.correctCount}/{sub.totalMC}
                              </td>
                              <td className="p-3.5 text-center font-mono text-emerald-400 font-bold">
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
                                    if (sub.teacherEssayScores) {
                                      setGradingEssayScores(sub.teacherEssayScores);
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
                          ))
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
                            <h3 className="font-cyber font-bold text-base text-slate-100">
                              BÀI THI: {selectedSubmission.studentName}
                            </h3>
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
                        {/* MC Score Banner */}
                        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-between">
                          <div>
                            <div className="font-cyber font-bold text-cyan-300">
                              KẾT QUẢ PHẦN TRẮC NGHIỆM (27 CÂU)
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              Đúng {selectedSubmission.correctCount}/{selectedSubmission.totalMC} câu
                            </div>
                          </div>
                          <div className="text-xl font-cyber font-bold text-emerald-400 font-mono">
                            {selectedSubmission.mcScoreOn10} / 10 ĐIỂM
                          </div>
                        </div>

                        {/* Essay Questions Grading Section */}
                        <div className="space-y-4">
                          <div className="font-cyber font-bold text-purple-300 flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-purple-400" />
                            CHẤM BÀI TỰ LUẬN CỦA HỌC SINH
                          </div>

                          {ESSAY_QUESTIONS.map((q) => (
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

                              <div className="flex items-center gap-3 pt-1">
                                <span className="text-xs font-cyber text-purple-300">
                                  Điểm câu {q.id} (Thang 2.5đ):
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  max="2.5"
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
                                <span className="text-xs text-slate-400 font-mono">/ 2.5 điểm</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Teacher Feedback Note */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-cyber text-slate-300">
                            LỜI NHẬN XÉT CỦA THẦY TÀI DÀNH CHO HỌC SINH:
                          </label>
                          <textarea
                            rows={3}
                            value={gradingFeedback}
                            onChange={(e) => setGradingFeedback(e.target.value)}
                            placeholder="Ví dụ: Nắm vững kiến thức bài 3, trình bày tự luận rõ ràng mạch lạc..."
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
