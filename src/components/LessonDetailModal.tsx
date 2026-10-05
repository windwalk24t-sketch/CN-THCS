import React, { useState, useEffect } from 'react';
import { Lesson, GradeCurriculum } from '../types/curriculum';
import {
  X,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Code,
  FolderGit2,
  FileText,
  Edit,
  Sparkles,
  ArrowRight,
  Cpu,
  Save,
  Check,
} from 'lucide-react';
import { SmartHomeSimulator } from './simulators/SmartHomeSimulator';
import { IrrigationSimulator } from './simulators/IrrigationSimulator';
import { CircuitSimulator } from './simulators/CircuitSimulator';
import { CareerSimulator } from './simulators/CareerSimulator';
import { playCyberBeep, playLaserChirp, playSuccessChirp } from '../utils/audio';

interface LessonDetailModalProps {
  lesson: Lesson | null;
  onClose: () => void;
  gradeInfo: GradeCurriculum;
  onEditLesson: (lesson: Lesson) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  onClose,
  gradeInfo,
  onEditLesson,
}) => {
  if (!lesson) return null;

  const [activeTab, setActiveTab] = useState<'theory' | 'quiz' | 'simulation' | 'project' | 'notes'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [studentNote, setStudentNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // Load student note from localStorage
  useEffect(() => {
    if (!lesson) return;
    const key = `student_note_${lesson.id}`;
    const saved = localStorage.getItem(key);
    setStudentNote(saved || '');
    setSelectedAnswers({});
    setQuizSubmitted(false);
  }, [lesson]);

  const handleSaveNote = () => {
    if (!lesson) return;
    localStorage.setItem(`student_note_${lesson.id}`, studentNote);
    playSuccessChirp();
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    playCyberBeep(500 + optIndex * 100, 'sine', 0.04);
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    playSuccessChirp();
    setQuizSubmitted(true);
  };

  const calculateScore = () => {
    if (!lesson.quiz || lesson.quiz.length === 0) return 0;
    let correct = 0;
    lesson.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) correct++;
    });
    return Math.round((correct / lesson.quiz.length) * 10);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        {/* Header Bar */}
        <div className="px-5 py-4 bg-slate-950 border-b border-cyan-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800">
              {lesson.moduleCode}
            </span>
            <div className="text-xs text-slate-400 font-cyber">
              {gradeInfo.title} · {lesson.chapterTitle}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playCyberBeep(700, 'sine', 0.05);
                onEditLesson(lesson);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs flex items-center gap-1 transition-colors"
              title="Chỉnh sửa bài học này (Dành cho GV Tài)"
            >
              <Edit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chỉnh sửa</span>
            </button>
            <button
              onClick={() => {
                playLaserChirp();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Title & Description */}
        <div className="p-5 pb-3 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shrink-0 border-b border-slate-800/80">
          <h2 className="font-cyber font-bold text-xl sm:text-2xl text-slate-100 flex items-center gap-2">
            <span className="text-cyan-400">#</span> {lesson.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 gap-1 sm:gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => {
              playCyberBeep(500, 'sine', 0.03);
              setActiveTab('theory');
            }}
            className={`py-3 px-3 sm:px-4 text-xs font-cyber tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'theory'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Kiến thức trọng tâm
          </button>

          <button
            onClick={() => {
              playCyberBeep(600, 'sine', 0.03);
              setActiveTab('quiz');
            }}
            className={`py-3 px-3 sm:px-4 text-xs font-cyber tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'quiz'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-amber-400" /> Trắc nghiệm ({lesson.quiz?.length || 0})
          </button>

          <button
            onClick={() => {
              playCyberBeep(700, 'sine', 0.03);
              setActiveTab('simulation');
            }}
            className={`py-3 px-3 sm:px-4 text-xs font-cyber tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'simulation'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-purple-400" /> Mô phỏng &amp; Code
          </button>

          {lesson.practicalProject && (
            <button
              onClick={() => {
                playCyberBeep(800, 'sine', 0.03);
                setActiveTab('project');
              }}
              className={`py-3 px-3 sm:px-4 text-xs font-cyber tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
                activeTab === 'project'
                  ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FolderGit2 className="w-4 h-4 text-emerald-400" /> Dự án thực tế
            </button>
          )}

          <button
            onClick={() => {
              playCyberBeep(900, 'sine', 0.03);
              setActiveTab('notes');
            }}
            className={`py-3 px-3 sm:px-4 text-xs font-cyber tracking-wider border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'notes'
                ? 'border-cyan-400 text-cyan-300 font-semibold bg-cyan-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-cyan-400" /> Sổ tay ghi chú
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-200 text-sm">
          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              {/* Summary Points */}
              <div className="space-y-3">
                <h3 className="font-cyber font-bold text-sm tracking-wider text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> TÓM TẮT NỘI DUNG BÀI HỌC
                </h3>
                <div className="space-y-2.5">
                  {lesson.summary.map((point, index) => (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 leading-relaxed text-slate-300 text-xs sm:text-sm flex gap-3 items-start"
                    >
                      <span className="font-mono text-cyan-400 font-bold shrink-0">0{index + 1}.</span>
                      <p className="whitespace-pre-line">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-cyber font-bold text-sm tracking-wider text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> ĐIỂM CỐT LÕI CẦN GHI NHỚ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications Matrix */}
              {lesson.specs && lesson.specs.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-cyber font-bold text-sm tracking-wider text-purple-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" /> QUY CHUẨN KỸ THUẬT &amp; THÔNG SỐ
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                        <tr>
                          <th className="px-4 py-2.5">Hạng mục kỹ thuật</th>
                          <th className="px-4 py-2.5">Quy chuẩn / Giá trị tương ứng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-sans">
                        {lesson.specs.map((spec, index) => (
                          <tr key={index} className="hover:bg-slate-950/40">
                            <td className="px-4 py-2.5 font-medium text-slate-300">{spec.label}</td>
                            <td className="px-4 py-2.5 text-cyan-300 font-mono">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: QUIZ */}
          {activeTab === 'quiz' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-cyber font-bold text-base text-amber-300">
                    TRẮC NGHIỆM KỸ THUẬT CÔNG NGHỆ
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kiểm tra và củng cố kiến thức bài học cùng Robot Bot-Tài.
                  </p>
                </div>
                {quizSubmitted && (
                  <div className="text-right">
                    <div className="text-xs font-mono text-slate-400">KẾT QUẢ ĐIỂM SỐ</div>
                    <div className="font-cyber font-extrabold text-2xl text-cyan-400">
                      {calculateScore()} / 10
                    </div>
                  </div>
                )}
              </div>

              {lesson.quiz.map((q, qIndex) => {
                const isAnswered = selectedAnswers[qIndex] !== undefined;
                const isCorrect = selectedAnswers[qIndex] === q.answerIndex;

                return (
                  <div
                    key={qIndex}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3"
                  >
                    <div className="font-medium text-sm text-slate-100 flex items-start gap-2">
                      <span className="font-mono text-cyan-400 font-bold shrink-0">
                        Câu {qIndex + 1}:
                      </span>
                      <span>{q.question}</span>
                    </div>

                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => {
                        const isSelected = selectedAnswers[qIndex] === optIndex;
                        let optionStyle =
                          'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                        if (quizSubmitted) {
                          if (optIndex === q.answerIndex) {
                            optionStyle =
                              'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                          } else if (isSelected && !isCorrect) {
                            optionStyle =
                              'bg-rose-950/80 border-rose-500 text-rose-200 line-through';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.3)]';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectAnswer(qIndex, optIndex)}
                            className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                          >
                            <span>
                              <span className="font-mono text-slate-500 mr-2">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              {option}
                            </span>
                            {quizSubmitted && optIndex === q.answerIndex && (
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <div className="font-mono text-[11px] text-cyan-400 font-semibold">
                          GIẢI THÍCH CHI TIẾT TỪ GV NGUYỄN ĐỨC TÀI:
                        </div>
                        <p>{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {!quizSubmitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-cyber font-bold tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-40 transition-all cursor-pointer"
                >
                  NỘP BÀI &amp; CHẤM ĐIỂM TỰ ĐỘNG
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSelectedAnswers({});
                    setQuizSubmitted(false);
                    playLaserChirp();
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-cyber rounded-xl border border-slate-700 transition-colors"
                >
                  LÀM LẠI BÀI TRẮC NGHIỆM
                </button>
              )}
            </div>
          )}

          {/* TAB 3: SIMULATION & CODE */}
          {activeTab === 'simulation' && (
            <div className="space-y-5">
              {/* Contextual Interactive Simulator */}
              {lesson.grade === 6 && lesson.id === 'cn6-b3' ? (
                <SmartHomeSimulator />
              ) : lesson.grade === 7 && lesson.id === 'cn7-b3' ? (
                <IrrigationSimulator />
              ) : (lesson.grade === 8 && lesson.id === 'cn8-b12') || (lesson.grade === 9 && lesson.id === 'cn9-b8') ? (
                <CircuitSimulator />
              ) : lesson.grade === 9 && lesson.id === 'cn9-b4' ? (
                <CareerSimulator />
              ) : (
                /* Fallback smart simulation for any lesson */
                <div className="space-y-4">
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-900/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-cyber font-bold text-sm text-cyan-200">
                          {lesson.codeSimulation?.title || 'MÃ LỆNH ĐIỀU KHIỂN &amp; THUẬT TOÁN KỸ THUẬT'}
                        </h4>
                      </div>
                      <span className="text-xs font-mono bg-cyan-950 px-2 py-0.5 rounded text-cyan-400 border border-cyan-800">
                        {lesson.codeSimulation?.lang.toUpperCase() || 'C++ ARDUINO'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">
                      {lesson.codeSimulation?.description ||
                        'Đoạn mã lập trình mô phỏng quá trình điều khiển và tự động hóa kỹ thuật liên quan đến bài học.'}
                    </p>

                    <div className="relative rounded-lg bg-slate-950 p-4 border border-slate-800 font-code text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                      <pre>
                        {lesson.codeSimulation?.code ||
                          `// KNTT THCS TECH CONTROLLER - LESSON ${lesson.lessonNumber}
// GV NGUYEN DUC TAI
#include <TechSystem.h>

void setup() {
  System.init("${lesson.moduleCode}");
  Serial.begin(115200);
  Serial.println("[SYSTEM OK] Module online.");
}

void loop() {
  // Thực thi chu trình giám sát thông số kỹ thuật
  float metric = System.readParameter();
  System.optimizeParameters(metric);
  delay(1000);
}`}
                      </pre>
                    </div>
                  </div>

                  {/* Fallback to one of the main simulators for interactive fun */}
                  <SmartHomeSimulator />
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROJECT */}
          {activeTab === 'project' && lesson.practicalProject && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <FolderGit2 className="w-5 h-5" />
                  <h3 className="font-cyber font-bold text-base">HƯỚNG DẪN DỰ ÁN THỰC HÀNH TRẢI NGHIỆM</h3>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {lesson.practicalProject}
                </p>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 font-mono">
                  &gt; HỌC ĐI ĐÔI VỚI HÀNH: Thực hiện sản phẩm thực tế, chụp ảnh hoặc quay video ngắn thuyết minh gửi lên nhóm học tập của Thầy Nguyễn Đức Tài để nhận điểm đánh giá thường xuyên.
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cyber font-bold text-sm text-cyan-300 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-400" /> SỔ TAY GHI CHÚ BÀI HỌC
                  </h3>
                  <p className="text-xs text-slate-400">
                    Ghi lại những ý tưởng, bài tập hoặc câu hỏi em cần Thầy Tài giải đáp.
                  </p>
                </div>
                <button
                  onClick={handleSaveNote}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-cyber font-bold text-xs transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  {noteSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {noteSaved ? 'ĐÃ LƯU' : 'LƯU GHI CHÚ'}
                </button>
              </div>

              <textarea
                value={studentNote}
                onChange={(e) => setStudentNote(e.target.value)}
                placeholder="Nhập ghi chú cá nhân của em tại đây (Dữ liệu sẽ tự động lưu lại trên máy tính)..."
                rows={8}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs sm:text-sm font-sans focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
