import React, { useState } from 'react';
import { GradeCurriculum, GradeLevel, Lesson, Chapter, QuizQuestion } from '../types/curriculum';
import {
  X,
  Save,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Bot,
  Check,
} from 'lucide-react';
import { playCyberBeep, playLaserChirp, playSuccessChirp } from '../utils/audio';

interface TeacherEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  curricula: Record<GradeLevel, GradeCurriculum>;
  initialEditLesson?: Lesson | null;
  onSaveLesson: (lesson: Lesson) => void;
  onDeleteLesson: (grade: GradeLevel, lessonId: string) => void;
  onExportJSON: () => void;
  onImportJSON: (jsonStr: string) => void;
  onResetDefault: () => void;
}

export const TeacherEditorModal: React.FC<TeacherEditorModalProps> = ({
  isOpen,
  onClose,
  curricula,
  initialEditLesson,
  onSaveLesson,
  onDeleteLesson,
  onExportJSON,
  onImportJSON,
  onResetDefault,
}) => {
  if (!isOpen) return null;

  const [targetGrade, setTargetGrade] = useState<GradeLevel>(initialEditLesson ? initialEditLesson.grade : 6);
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    initialEditLesson ? initialEditLesson.chapterId : curricula[targetGrade]?.chapters[0]?.id || ''
  );

  const [title, setTitle] = useState<string>(initialEditLesson ? initialEditLesson.title : 'Bài: ');
  const [moduleCode, setModuleCode] = useState<string>(initialEditLesson ? initialEditLesson.moduleCode : 'TECH_MOD_01');
  const [description, setDescription] = useState<string>(
    initialEditLesson ? initialEditLesson.description : 'Tóm tắt nội dung bài học.'
  );

  const [summaryList, setSummaryList] = useState<string[]>(
    initialEditLesson ? initialEditLesson.summary : ['Ý chính 1 của bài học', 'Ý chính 2 của bài học']
  );
  const [keyPointsList, setKeyPointsList] = useState<string[]>(
    initialEditLesson ? initialEditLesson.keyPoints : ['Ghi nhớ quan trọng 1']
  );
  const [practicalProject, setPracticalProject] = useState<string>(
    initialEditLesson?.practicalProject || 'Thực hành chế tạo sản phẩm.'
  );

  const [quizList, setQuizList] = useState<QuizQuestion[]>(
    initialEditLesson?.quiz || [
      {
        question: 'Câu hỏi trắc nghiệm kiểm tra bài học?',
        options: ['Đáp án A (Đúng)', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
        answerIndex: 0,
        explanation: 'Giải thích chi tiết của GV Nguyễn Đức Tài.',
      },
    ]
  );

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const currentChapters = curricula[targetGrade]?.chapters || [];

  const handleGradeChange = (grade: GradeLevel) => {
    setTargetGrade(grade);
    const firstChapter = curricula[grade]?.chapters[0]?.id || '';
    setSelectedChapterId(firstChapter);
    playCyberBeep(650, 'sine', 0.03);
  };

  const handleSave = () => {
    const chapter = currentChapters.find((c: Chapter) => c.id === selectedChapterId);
    const newLesson: Lesson = {
      id: initialEditLesson ? initialEditLesson.id : `custom-b-${Date.now()}`,
      grade: targetGrade,
      chapterId: selectedChapterId,
      chapterTitle: chapter ? chapter.title : 'Chương học phần',
      lessonNumber: initialEditLesson ? initialEditLesson.lessonNumber : 1,
      title: title.trim(),
      moduleCode: moduleCode.trim().toUpperCase(),
      description: description.trim(),
      summary: summaryList.filter((s) => s.trim() !== ''),
      keyPoints: keyPointsList.filter((k) => k.trim() !== ''),
      specs: initialEditLesson?.specs || [
        { label: 'Quy chuẩn kỹ thuật', value: 'Theo chương trình KNTT' },
      ],
      practicalProject: practicalProject.trim(),
      quiz: quizList,
      isCustomAdded: true,
    };

    onSaveLesson(newLesson);
    playSuccessChirp();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        onImportJSON(text);
        playSuccessChirp();
        setImportStatus('Nhập dữ liệu thành công!');
        setTimeout(() => setImportStatus(null), 3000);
      } catch (err: any) {
        setImportStatus(`Lỗi: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-cyan-900/50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cyber font-bold text-sm sm:text-base text-slate-100">
                BIÊN SOẠN NỘI DUNG // GV NGUYỄN ĐỨC TÀI
              </h2>
              <p className="text-[11px] text-slate-400 font-mono">
                {initialEditLesson ? 'Cập nhật bài học hiện tại' : 'Thêm bài học mới vào bộ Kết Nối Tri Thức'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playLaserChirp();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-5 py-2 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={onExportJSON}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-mono"
            >
              <Download className="w-3.5 h-3.5" /> Sao lưu JSON
            </button>
            <label className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-mono cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Khôi phục JSON
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
            <button
              onClick={() => {
                if (window.confirm('Khôi phục lại toàn bộ dữ liệu mặc định?')) {
                  onResetDefault();
                  playLaserChirp();
                }
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-300 border border-slate-700 font-mono"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Mặc định
            </button>
          </div>
          {importStatus && <span className="text-emerald-400 font-mono text-[11px]">{importStatus}</span>}
        </div>

        {/* Form fields */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Grade Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-mono mb-1">Khối lớp:</label>
              <div className="flex gap-1.5">
                {([6, 7, 8, 9] as GradeLevel[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleGradeChange(g)}
                    className={`flex-1 py-1.5 rounded font-cyber font-bold border ${
                      targetGrade === g
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Lớp {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-mono mb-1">Chương / Chủ đề:</label>
              <select
                value={selectedChapterId}
                onChange={(e) => setSelectedChapterId(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
              >
                {currentChapters.map((ch: Chapter) => (
                  <option key={ch.id} value={ch.id}>
                    {ch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Title & Code */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8">
              <label className="block text-slate-400 font-mono mb-1">Tên bài học:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
              />
            </div>
            <div className="sm:col-span-4">
              <label className="block text-slate-400 font-mono mb-1">Mã Module:</label>
              <input
                type="text"
                value={moduleCode}
                onChange={(e) => setModuleCode(e.target.value)}
                className="w-full py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-mono mb-1">Mô tả tóm tắt bài học:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
            />
          </div>

          {/* Summary points */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-400 font-mono">Tóm tắt kiến thức trọng tâm:</label>
              <button
                type="button"
                onClick={() => setSummaryList([...summaryList, 'Ý kiến thức bổ sung'])}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm ý
              </button>
            </div>
            {summaryList.map((pt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => {
                    const c = [...summaryList];
                    c[i] = e.target.value;
                    setSummaryList(c);
                  }}
                  className="flex-1 py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                {summaryList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSummaryList(summaryList.filter((_, idx) => idx !== i))}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Key points */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-400 font-mono">Ghi nhớ cốt lõi:</label>
              <button
                type="button"
                onClick={() => setKeyPointsList([...keyPointsList, 'Ghi nhớ bổ sung'])}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm ghi nhớ
              </button>
            </div>
            {keyPointsList.map((pt, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={pt}
                  onChange={(e) => {
                    const c = [...keyPointsList];
                    c[i] = e.target.value;
                    setKeyPointsList(c);
                  }}
                  className="flex-1 py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200"
                />
                {keyPointsList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setKeyPointsList(keyPointsList.filter((_, idx) => idx !== i))}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Practical project */}
          <div>
            <label className="block text-slate-400 font-mono mb-1">Dự án thực hành trải nghiệm:</label>
            <textarea
              value={practicalProject}
              onChange={(e) => setPracticalProject(e.target.value)}
              rows={2}
              className="w-full py-1.5 px-2.5 rounded bg-slate-950 border border-slate-800 text-slate-200 font-sans"
            />
          </div>

          {/* Quiz questions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-amber-400 font-mono font-bold">Câu hỏi trắc nghiệm ({quizList.length}):</label>
              <button
                type="button"
                onClick={() =>
                  setQuizList([
                    ...quizList,
                    {
                      question: 'Câu hỏi mới?',
                      options: ['Đáp án A (Đúng)', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
                      answerIndex: 0,
                      explanation: 'Giải thích chi tiết của GV Nguyễn Đức Tài.',
                    },
                  ])
                }
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm câu hỏi
              </button>
            </div>

            {quizList.map((q, qIdx) => (
              <div key={qIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 font-bold">Câu hỏi #{qIdx + 1}</span>
                  {quizList.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setQuizList(quizList.filter((_, idx) => idx !== qIdx))}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    const c = [...quizList];
                    c[qIdx].question = e.target.value;
                    setQuizList(c);
                  }}
                  className="w-full py-1 px-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-1.5">
                      <input
                        type="radio"
                        name={`correct-${qIdx}`}
                        checked={q.answerIndex === optIdx}
                        onChange={() => {
                          const c = [...quizList];
                          c[qIdx].answerIndex = optIdx;
                          setQuizList(c);
                        }}
                        className="accent-emerald-400 cursor-pointer"
                        title="Đánh dấu đáp án đúng"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const c = [...quizList];
                          c[qIdx].options[optIdx] = e.target.value;
                          setQuizList(c);
                        }}
                        className={`w-full py-1 px-2 rounded border ${
                          q.answerIndex === optIdx
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
          {initialEditLesson && (
            <button
              onClick={() => {
                if (window.confirm(`Xóa bài học "${initialEditLesson.title}"?`)) {
                  onDeleteLesson(initialEditLesson.grade, initialEditLesson.id);
                  playLaserChirp();
                  onClose();
                }
              }}
              className="text-rose-400 hover:text-rose-300 text-xs font-mono flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Xóa bài học
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-cyber"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-cyber font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saveSuccess ? 'ĐÃ LƯU!' : 'LƯU BÀI HỌC'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
