import React, { useState, useMemo } from 'react';
import { GradeLevel, Lesson, Chapter, GradeCurriculum } from './types/curriculum';
import {
  loadAllCurriculum,
  saveLesson,
  deleteLesson,
  exportCurriculumJSON,
  importCurriculumJSON,
  resetToDefaultCurriculum,
} from './data';
import { CyberHeader } from './components/CyberHeader';
import { CyberHero } from './components/CyberHero';
import { CyberFooter } from './components/CyberFooter';
import { CyberAudioDeck } from './components/CyberAudioDeck';
import { LessonDetailModal } from './components/LessonDetailModal';
import { TeacherEditorModal } from './components/TeacherEditorModal';
import { Grade9ExamView } from './components/Grade9ExamView';
import { SmartHomeSimulator } from './components/simulators/SmartHomeSimulator';
import { IrrigationSimulator } from './components/simulators/IrrigationSimulator';
import { CircuitSimulator } from './components/simulators/CircuitSimulator';
import { CareerSimulator } from './components/simulators/CareerSimulator';
import {
  BookOpen,
  ChevronRight,
  Plus,
  Terminal,
  HelpCircle,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  Compass,
  Award,
} from 'lucide-react';
import { playCyberBeep, playLaserChirp, toggleSound, isSoundEnabled } from './utils/audio';

export default function App() {
  const [curricula, setCurricula] = useState<Record<GradeLevel, GradeCurriculum>>(() =>
    loadAllCurriculum()
  );
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(6);
  const [activeView, setActiveView] = useState<'curriculum' | 'lab' | 'exam'>('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  // Modals state
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundActive(next);
  };

  const handleOpenAddLesson = () => {
    setLessonToEdit(null);
    setIsEditorOpen(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setLessonToEdit(lesson);
    setIsEditorOpen(true);
  };

  const handleSaveLesson = (lesson: Lesson) => {
    const updated = saveLesson(curricula, lesson);
    setCurricula(updated);
    if (selectedLesson && selectedLesson.id === lesson.id) {
      setSelectedLesson(lesson);
    }
  };

  const handleDeleteLesson = (grade: GradeLevel, lessonId: string) => {
    const updated = deleteLesson(curricula, grade, lessonId);
    setCurricula(updated);
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson(null);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = exportCurriculumJSON(curricula);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cong_nghe_thcs_gv_nguyen_duc_tai_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (jsonStr: string) => {
    const imported = importCurriculumJSON(jsonStr);
    setCurricula(imported);
  };

  const handleResetDefault = () => {
    const defaultData = resetToDefaultCurriculum();
    setCurricula(defaultData);
  };

  // Total lessons count
  const totalLessonsCount = useMemo(() => {
    let count = 0;
    Object.values(curricula).forEach((g) => {
      g.chapters.forEach((ch) => {
        count += ch.lessons.length;
      });
    });
    return count;
  }, [curricula]);

  // Current grade data
  const currentGradeData = curricula[selectedGrade];

  // Search filtering
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) {
      return currentGradeData.chapters;
    }
    const q = searchQuery.toLowerCase().trim();

    return currentGradeData.chapters
      .map((ch) => {
        const matchingLessons = ch.lessons.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.moduleCode.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q) ||
            l.summary.some((s) => s.toLowerCase().includes(q))
        );
        return {
          ...ch,
          lessons: matchingLessons,
        };
      })
      .filter((ch) => ch.lessons.length > 0);
  }, [currentGradeData, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Cyber Navigation Header */}
      <CyberHeader
        currentGrade={selectedGrade}
        onSelectGrade={(g) => {
          setSelectedGrade(g);
          setSearchQuery('');
        }}
        activeView={activeView}
        setActiveView={setActiveView}
        soundEnabled={soundActive}
        onToggleSound={handleToggleSound}
      />

      {/* Hero Banner with Avatar & Live Code Stream */}
      <CyberHero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalLessonsCount={totalLessonsCount}
        onOpenLab={() => setActiveView('lab')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* VIEW 1: CURRICULUM EXPLORER */}
        {activeView === 'curriculum' && (
          <div className="space-y-8">
            {/* Grade Selector & Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-900">
              {/* Segmented Grade Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 self-start overflow-x-auto max-w-full">
                {([6, 7, 8, 9] as GradeLevel[]).map((g) => {
                  const isActive = selectedGrade === g;
                  return (
                    <button
                      key={g}
                      onClick={() => {
                        playCyberBeep(550 + g * 60, 'sine', 0.04);
                        setSelectedGrade(g);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-cyber font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      LỚP {g}
                    </button>
                  );
                })}
              </div>

              {/* Action: Add Lesson for Teacher Tài */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    playCyberBeep(800, 'sine', 0.05);
                    handleOpenAddLesson();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-cyber font-semibold text-cyan-300 bg-cyan-950/70 border border-cyan-500/50 rounded-xl hover:bg-cyan-900/80 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm bài học mới</span>
                </button>
              </div>
            </div>

            {/* Current Grade Title Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-cyber font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-3">
                  <span className="text-cyan-400">#</span> {currentGradeData.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>{currentGradeData.subTitle}</span>
                  <span>·</span>
                  <span>Giáo viên: Nguyễn Đức Tài</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-cyan-400/80 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-900/50">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{currentGradeData.chapters.length} Chương học phần</span>
              </div>
            </div>

            {/* Special Banner for Grade 9 Exam */}
            {selectedGrade === 9 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-purple-950/60 to-slate-950 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-950 border border-amber-500 text-amber-300">
                    <Award className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-cyber font-bold text-[10px] px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-700">
                        HỆ THỐNG MỚI
                      </span>
                      <h3 className="font-cyber font-bold text-sm sm:text-base text-slate-100">
                        PHẦN ÔN THI &amp; KIỂM TRA ĐÁNH GIÁ CÔNG NGHỆ 9
                      </h3>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Bao gồm 27 câu trắc nghiệm (tự động chấm điểm) và 4 câu tự luận trọng tâm. Học sinh làm bài trực tiếp &amp; nộp bài cho Thầy Tài.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      playCyberBeep(900, 'triangle', 0.05);
                      setActiveView('exam');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:brightness-110 text-slate-950 font-cyber font-bold text-xs tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <Award className="w-4 h-4" />
                    VÀO LÀM BÀI ÔN THI NGAY
                  </button>
                </div>
              </div>
            )}

            {/* Search Results Hint */}
            {searchQuery && (
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/50 text-xs text-cyan-300 font-mono flex items-center justify-between">
                <span>
                  Đang lọc theo từ khóa: &quot;<strong>{searchQuery}</strong>&quot;
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-200 underline"
                >
                  Hủy lọc
                </button>
              </div>
            )}

            {/* Chapters & Lessons Listing */}
            {filteredChapters.length === 0 ? (
              <div className="py-16 text-center space-y-3 bg-slate-900/30 rounded-2xl border border-slate-800/80">
                <Bot className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="font-cyber text-lg text-slate-300">Không tìm thấy bài học phù hợp</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Thử tìm kiếm với từ khóa khác hoặc Thầy Tài có thể bấm &quot;Thêm bài học mới&quot; để biên soạn nội dung này.
                </p>
                <button
                  onClick={handleOpenAddLesson}
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-cyber font-bold text-xs"
                >
                  Thêm bài học ngay
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 space-y-5 relative overflow-hidden"
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/70">
                      <div>
                        <div className="font-mono text-[11px] text-cyan-400 uppercase tracking-widest">
                          {chapter.code}
                        </div>
                        <h3 className="font-cyber font-bold text-lg sm:text-xl text-slate-100 mt-0.5">
                          {chapter.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{chapter.description}</p>
                      </div>
                      <span className="font-mono text-xs text-slate-500 self-start sm:self-center">
                        {chapter.lessons.length} Bài học
                      </span>
                    </div>

                    {/* Lesson Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="group relative flex flex-col justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
                        >
                          <div>
                            {/* Card Top: Code badge & Lesson number */}
                            <div className="flex items-center justify-between text-xs mb-2">
                              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800 group-hover:border-cyan-800/80 transition-colors">
                                {lesson.moduleCode}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">
                                Bài {lesson.lessonNumber}
                              </span>
                            </div>

                            {/* Lesson Title */}
                            <h4 className="font-cyber font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-2">
                              {lesson.title}
                            </h4>

                            {/* Description */}
                            <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                              {lesson.description}
                            </p>

                            {/* Highlights pill-free row */}
                            <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-3 pt-2 border-t border-slate-900">
                              <span className="flex items-center gap-1 text-slate-400">
                                <HelpCircle className="w-3 h-3 text-amber-400" />
                                {lesson.quiz?.length || 0} câu hỏi
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1 text-slate-400">
                                <Cpu className="w-3 h-3 text-cyan-400" />
                                Mô phỏng
                              </span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-900">
                            <button
                              onClick={() => {
                                playCyberBeep(700, 'sine', 0.04);
                                setSelectedLesson(lesson);
                              }}
                              className="flex items-center gap-1.5 text-xs font-cyber font-semibold text-cyan-400 hover:text-cyan-200 transition-colors cursor-pointer"
                            >
                              <span>VÀO BÀI HỌC</span>
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                playCyberBeep(850, 'sine', 0.03);
                                handleOpenEditLesson(lesson);
                              }}
                              className="text-[11px] text-slate-500 hover:text-slate-300 font-mono"
                              title="Chỉnh sửa nội dung bài này"
                            >
                              Sửa
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: ROBOT TECH & SIMULATOR LAB */}
        {activeView === 'lab' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-900">
              <div>
                <h2 className="font-cyber font-extrabold text-2xl sm:text-3xl text-slate-100 flex items-center gap-2">
                  <Terminal className="w-7 h-7 text-purple-400" />
                  PHÒNG THÍ NGHIỆM MÔ PHỎNG &amp; MÃ HÓA
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Môi trường mô phỏng trực quan các giải pháp kỹ thuật, mạch điện và tự động hóa trong bộ sách Công nghệ THCS.
                </p>
              </div>

              <button
                onClick={() => {
                  playCyberBeep(600, 'sine', 0.04);
                  setActiveView('curriculum');
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-cyber self-start cursor-pointer"
              >
                &larr; Trở lại giáo trình
              </button>
            </div>

            {/* Cyber Audio Intro & Deck (With copyright checker) */}
            <CyberAudioDeck />

            <div className="space-y-10">
              {/* Simulator 1: Smart Home (Grade 6) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>CÔNG NGHỆ 6 // BÀI 3. NGÔI NHÀ THÔNG MINH</span>
                </div>
                <SmartHomeSimulator />
              </div>

              {/* Simulator 2: Drip Irrigation (Grade 7) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <span>CÔNG NGHỆ 7 // BÀI 3. TƯỚI NƯỚC TỰ ĐỘNG THÔNG MINH (AGRI-TECH)</span>
                </div>
                <IrrigationSimulator />
              </div>

              {/* Simulator 3: Circuit & Breaker (Grade 8 & 9) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>CÔNG NGHỆ 8 &amp; 9 // MẠCH ĐIỆN VÀ APTOMAT BẢO VỆ 220V</span>
                </div>
                <CircuitSimulator />
              </div>

              {/* Simulator 4: Career Matrix (Grade 9) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                  <span>CÔNG NGHỆ 9 // BÀI 4. THUẬT TOÁN ĐỊNH HƯỚNG NGHỀ KỸ THUẬT STEM</span>
                </div>
                <CareerSimulator />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GRADE 9 EXAM CENTER */}
        {activeView === 'exam' && (
          <Grade9ExamView onBackToCurriculum={() => setActiveView('curriculum')} />
        )}
      </main>

      {/* Lesson Detail Viewer Modal */}
      <LessonDetailModal
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        gradeInfo={currentGradeData}
        onEditLesson={(lesson) => {
          setSelectedLesson(null);
          handleOpenEditLesson(lesson);
        }}
      />

      {/* Teacher Content Management & Editor Modal */}
      <TeacherEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        curricula={curricula}
        initialEditLesson={lessonToEdit}
        onSaveLesson={handleSaveLesson}
        onDeleteLesson={handleDeleteLesson}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetDefault={handleResetDefault}
      />

      {/* Cyber Footer */}
      <CyberFooter />
    </div>
  );
}
