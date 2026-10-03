import React, { useState } from 'react';
import { Compass, Sparkles, Brain, Award, Binary, ChevronRight } from 'lucide-react';
import { playCyberBeep, playSuccessChirp } from '../../utils/audio';

export const CareerSimulator: React.FC = () => {
  const [logicScore, setLogicScore] = useState(8);
  const [handsOnScore, setHandsOnScore] = useState(7);
  const [spatialScore, setSpatialScore] = useState(6);
  const [leadershipScore, setLeadershipScore] = useState(5);

  const getMatchedCareer = () => {
    if (logicScore >= 8 && spatialScore >= 7) {
      return {
        title: 'Kỹ sư Thiết kế Vi mạch & Phần mềm AI',
        field: 'Công nghệ cao & Trí tuệ nhân tạo',
        desc: 'Nghiên cứu kiến trúc chip bán dẫn, lập trình mô hình học sâu và hệ thống phần mềm nhúng.',
        subjects: 'Toán học, Vật lý, Tin học, Tiếng Anh kỹ thuật',
        fitRate: 96,
      };
    } else if (handsOnScore >= 8 && logicScore >= 6) {
      return {
        title: 'Kỹ sư Robot & Cơ điện tử (Mechatronics)',
        field: 'Tự động hóa công nghiệp',
        desc: 'Chế tạo cánh tay robot, lập trình bộ điều khiển PLC và dây chuyền tự động hóa thông minh.',
        subjects: 'Vật lý cơ - điện, Công nghệ kỹ thuật, Lập trình C/C++',
        fitRate: 94,
      };
    } else if (spatialScore >= 8 && handsOnScore >= 6) {
      return {
        title: 'Kiến trúc sư & Kỹ sư Thiết kế Cơ khí CAD/CAM',
        field: 'Thiết kế kết cấu & Tạo mẫu',
        desc: 'Dựng mô hình 3D, tính toán sức bền vật liệu và lập trình máy phay tiện CNC chính xác cao.',
        subjects: 'Hình học họa hình, Vẽ kỹ thuật, Sức bền vật liệu',
        fitRate: 92,
      };
    } else {
      return {
        title: 'Kỹ sư Quản lý Năng lượng & An toàn Điện',
        field: 'Hệ thống điện hạ thế & Năng lượng tái tạo',
        desc: 'Vận hành lưới điện thông minh, trạm điện mặt trời và thi công mạng điện công trình an toàn.',
        subjects: 'Kỹ thuật điện, An toàn lao động, Quản lý dự án',
        fitRate: 88,
      };
    }
  };

  const matched = getMatchedCareer();

  const handleSlider = (setter: React.Dispatch<React.SetStateAction<number>>, val: number) => {
    setter(val);
    playCyberBeep(450 + val * 40, 'sine', 0.03);
  };

  const triggerAnalysis = () => {
    playSuccessChirp();
  };

  return (
    <div className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-5 font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-purple-900/40 mb-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-purple-400" />
          <h4 className="font-cyber font-bold text-purple-200 tracking-wide text-sm">
            CAREER PATHFINDER DECODER // THUẬT TOÁN ĐỊNH HƯỚNG NGHỀ KỸ THUẬT
          </h4>
        </div>
        <span className="text-xs font-mono text-purple-400/80 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800">
          IKIGAI STEM MATRIX
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sliders */}
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-lg border border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-purple-400" /> Tự đánh giá năng khiếu bản thân (Thang 1 - 10)
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Tư duy logic & toán học:</span>
              <span className="font-mono text-purple-300 font-bold">{logicScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={logicScore}
              onChange={(e) => handleSlider(setLogicScore, Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Khéo léo thực hành & tháo lắp máy móc:</span>
              <span className="font-mono text-purple-300 font-bold">{handsOnScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={handsOnScore}
              onChange={(e) => handleSlider(setHandsOnScore, Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Tưởng tượng không gian & vẽ kỹ thuật:</span>
              <span className="font-mono text-purple-300 font-bold">{spatialScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={spatialScore}
              onChange={(e) => handleSlider(setSpatialScore, Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Kỹ năng làm việc nhóm & giao tiếp:</span>
              <span className="font-mono text-purple-300 font-bold">{leadershipScore}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={leadershipScore}
              onChange={(e) => handleSlider(setLeadershipScore, Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Output Match */}
        <div className="bg-slate-950/90 rounded-lg p-4 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-slate-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> Kết quả giải mã nghề nghiệp phù hợp
              </span>
              <span className="font-mono text-xs bg-purple-900/60 text-purple-300 px-2 py-0.5 rounded border border-purple-700">
                ĐỘ PHÙ HỢP: {matched.fitRate}%
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-purple-950/40 border border-purple-700/50 space-y-2">
              <div className="text-xs font-mono text-purple-300 uppercase tracking-wide">
                {matched.field}
              </div>
              <div className="font-cyber font-bold text-base text-slate-100">
                {matched.title}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {matched.desc}
              </p>
            </div>

            <div className="text-xs space-y-1">
              <div className="text-slate-400 font-mono text-[11px]">CÁC MÔN HỌC TRỌNG TÂM CẦN RÈN LUYỆN:</div>
              <div className="text-purple-300 font-medium">{matched.subjects}</div>
            </div>
          </div>

          <button
            onClick={triggerAnalysis}
            className="mt-4 w-full py-2 bg-purple-900/80 hover:bg-purple-800 text-purple-200 border border-purple-500/60 rounded text-xs font-cyber font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <Award className="w-4 h-4" /> LƯU KẾT QUẢ ĐỊNH HƯỚNG VÀO HỒ SƠ NGHỀ
          </button>
        </div>
      </div>
    </div>
  );
};
