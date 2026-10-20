import { GradeLevel } from '../types/curriculum';

export interface MultipleChoiceQuestion {
  id: number;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}

export interface EssayQuestion {
  id: number;
  question: string;
  suggestedAnswer: string[];
}

export interface GradeExamSet {
  grade: GradeLevel;
  title: string;
  subTitle: string;
  multipleChoice: MultipleChoiceQuestion[];
  essay: EssayQuestion[];
}

export interface StudentSubmission {
  id: string;
  grade: GradeLevel;
  studentName: string;
  nickname?: string;
  studentClass: string;
  submittedAt: string;
  durationMinutes: number;
  multipleChoiceAnswers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  essayAnswers: Record<number, string>;
  correctCount: number;
  totalMC: number;
  mcScoreOn10: number;
  teacherEssayScores?: Record<number, number>;
  teacherFeedback?: string;
  finalScore?: number;
  status: 'submitted' | 'graded';
}

export const TEACHER_PASSWORDS = ['giaovienfscbn', 'taind93'];
export const TEACHER_EXAM_PASS = 'giaovienfscbn';

export const isTeacherPasswordValid = (input: string): boolean => {
  if (!input) return false;
  const trimmed = input.trim();
  return TEACHER_PASSWORDS.includes(trimmed);
};

export const EXAM_STORAGE_KEY = 'cong_nghe_thcs_exam_submissions_v2';

// ==========================================
// CÔNG NGHỆ 8 - BỘ ĐỀ ÔN THI TRỌNG TÂM
// ==========================================
export const GRADE_8_EXAM: GradeExamSet = {
  grade: 8,
  title: 'Công Nghệ 8',
  subTitle: 'Vẽ kĩ thuật & Vật liệu cơ khí, gia công cơ khí',
  multipleChoice: [
    {
      id: 1,
      question: 'Lõi dây điện thường được làm từ vật liệu nào sau đây?',
      options: [
        { key: 'A', text: 'Chất dẻo' },
        { key: 'B', text: 'Đồng' },
        { key: 'C', text: 'Cao su' },
        { key: 'D', text: 'Nhựa' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 2,
      question: 'Đặc điểm của kim loại đen là:',
      options: [
        { key: 'A', text: 'Cứng, chắc, có từ tính và dễ bị gỉ sét.' },
        { key: 'B', text: 'Không bị oxi hóa, ít bị mài mòn.' },
        { key: 'C', text: 'Có tính chống ăn mòn, dễ gia công.' },
        { key: 'D', text: 'Có độ bền cao, ít bị oxi hóa.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 3,
      question: 'Đơn vị đo kích thước dài mặc định trên bản vẽ kĩ thuật cơ khí là gì?',
      options: [
        { key: 'A', text: 'Mét (m)' },
        { key: 'B', text: 'Đềximét (dm)' },
        { key: 'C', text: 'Milimét (mm)' },
        { key: 'D', text: 'Xăngtimét (cm)' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 4,
      question: 'Nét liền mảnh dùng để vẽ:',
      options: [
        { key: 'A', text: 'Cạnh thấy' },
        { key: 'B', text: 'Đường kích thước' },
        { key: 'C', text: 'Cạnh khuất' },
        { key: 'D', text: 'Đường trục' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 5,
      question: 'Nét gạch dài chấm mảnh dùng để vẽ:',
      options: [
        { key: 'A', text: 'Cạnh thấy' },
        { key: 'B', text: 'Đường gióng' },
        { key: 'C', text: 'Cạnh khuất' },
        { key: 'D', text: 'Đường tâm' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 6,
      question: 'Hình cắt dùng để làm gì?',
      options: [
        { key: 'A', text: 'Dùng để biểu diễn rõ hơn hình dạng bên trong của vật thể' },
        { key: 'B', text: 'Dùng để biểu diễn hình dạng bên ngoài của vật thể' },
        { key: 'C', text: 'Dùng để biểu diễn phần vật thể bị cắt' },
        { key: 'D', text: 'Dùng để biểu diễn phần vật thể còn lại' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 7,
      question: 'Cạnh thấy được vẽ bằng nét nào?',
      options: [
        { key: 'A', text: 'Nét liền đậm' },
        { key: 'B', text: 'Nét liền mảnh' },
        { key: 'C', text: 'Nét đứt mảnh' },
        { key: 'D', text: 'Nét gạch chấm mảnh' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 8,
      question: 'Bước đầu tiên khi đọc bản vẽ nhà là gì?',
      options: [
        { key: 'A', text: 'Xác định kích thước cửa sổ' },
        { key: 'B', text: 'Xác định tỷ lệ bản vẽ' },
        { key: 'C', text: 'Đọc khung tên của bản vẽ' },
        { key: 'D', text: 'Xác định vật liệu xây dựng' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 9,
      question: 'Hình chiếu cạnh có vị trí như thế nào so với hình chiếu đứng:',
      options: [
        { key: 'A', text: 'Phía trên' },
        { key: 'B', text: 'Phía dưới' },
        { key: 'C', text: 'Bên phải' },
        { key: 'D', text: 'Bên trái' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 10,
      question: 'Hình chiếu đứng có vị trí như thế nào so với hình chiếu bằng:',
      options: [
        { key: 'A', text: 'Phía trên' },
        { key: 'B', text: 'Phía dưới' },
        { key: 'C', text: 'Bên phải' },
        { key: 'D', text: 'Bên trái' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 11,
      question: 'Khối đa diện là:',
      options: [
        { key: 'A', text: 'Hình hộp chữ nhật' },
        { key: 'B', text: 'Hình lăng trụ đều' },
        { key: 'C', text: 'Hình chóp đều' },
        { key: 'D', text: 'Hình hộp chữ nhật, hình lăng trụ đều, hình chóp đều' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 12,
      question: 'Hình nào sau đây không thuộc khối tròn xoay?',
      options: [
        { key: 'A', text: 'Hình trụ' },
        { key: 'B', text: 'Hình nón' },
        { key: 'C', text: 'Hình lăng trụ đều' },
        { key: 'D', text: 'Hình cầu' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 13,
      question: 'Quy trình vẽ hình chiếu vuông góc của vật thể gồm mấy bước?',
      options: [
        { key: 'A', text: '1' },
        { key: 'B', text: '2' },
        { key: 'C', text: '3' },
        { key: 'D', text: '4' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 14,
      question: 'Bước 1 của quy trình vẽ hình chiếu vuông góc của vật thể là:',
      options: [
        { key: 'A', text: 'Phân tích vật thể thành các khối đơn giản' },
        { key: 'B', text: 'Chọn các hướng chiếu' },
        { key: 'C', text: 'Vẽ các hình chiếu các bộ phận của vật thể bằng nét liền mảnh.' },
        { key: 'D', text: 'Hoàn thiện các nét vẽ và ghi kích thước' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 15,
      question: 'Bước 3 của quy trình vẽ hình chiếu vuông góc của vật thể là:',
      options: [
        { key: 'A', text: 'Phân tích vật thể thành các khối đơn giản.' },
        { key: 'B', text: 'Chọn các hướng chiếu' },
        { key: 'C', text: 'Vẽ các hình chiếu các bộ phận của vật thể bằng nét liền mảnh.' },
        { key: 'D', text: 'Hoàn thiện các nét vẽ và ghi kích thước' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 16,
      question: 'Công dụng của bản vẽ chi tiết là:',
      options: [
        { key: 'A', text: 'Dùng để chế tạo chi tiết' },
        { key: 'B', text: 'Dùng để kiểm tra chi tiết' },
        { key: 'C', text: 'Dùng để chế tạo và kiểm tra chi tiết' },
        { key: 'D', text: 'Đáp án khác' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 17,
      question: 'Đặc điểm của đường gióng là:',
      options: [
        { key: 'A', text: 'Vẽ bằng nét liền đậm' },
        { key: 'B', text: 'Hai đầu mút vẽ mũi tên' },
        { key: 'C', text: 'Song song với đoạn cần ghi kích thước' },
        { key: 'D', text: 'Vẽ bằng nét liền mảnh' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 18,
      question: 'Quy trình đọc bản vẽ lắp gồm mấy bước?',
      options: [
        { key: 'A', text: '3' },
        { key: 'B', text: '5' },
        { key: 'C', text: '6' },
        { key: 'D', text: '8' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 19,
      question: 'Bước 1 của quy trình đọc bản vẽ chi tiết là:',
      options: [
        { key: 'A', text: 'Khung tên' },
        { key: 'B', text: 'Hình biểu diễn' },
        { key: 'C', text: 'Kích thước' },
        { key: 'D', text: 'Yêu cầu kĩ thuật' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 20,
      question: 'Trong các dụng cụ sau, dụng cụ gia công nào dùng để làm nhẵn vật thể?',
      options: [
        { key: 'A', text: 'Đục' },
        { key: 'B', text: 'Búa' },
        { key: 'C', text: 'Cưa' },
        { key: 'D', text: 'Dũa' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 21,
      question: 'Nội dung khung tên của bản vẽ chi tiết có:',
      options: [
        { key: 'A', text: 'Tên gọi chi tiết' },
        { key: 'B', text: 'Tên gọi hình chiếu' },
        { key: 'C', text: 'Kích thước chung' },
        { key: 'D', text: 'Xử lí bề mặt' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 22,
      question: 'Nội dung hình biểu diễn của bản vẽ chi tiết có:',
      options: [
        { key: 'A', text: 'Vật liệu' },
        { key: 'B', text: 'Các hình biểu diễn' },
        { key: 'C', text: 'Kích thước chung' },
        { key: 'D', text: 'Kích thước riêng' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 23,
      question: 'Bản vẽ lắp khác bản vẽ chi tiết ở chỗ có:',
      options: [
        { key: 'A', text: 'Khung tên' },
        { key: 'B', text: 'Hình biểu diễn' },
        { key: 'C', text: 'Bảng kê' },
        { key: 'D', text: 'Kích thước' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 24,
      question: 'Đặc điểm đường kích thước:',
      options: [
        { key: 'A', text: 'Vẽ bằng nét liền đậm' },
        { key: 'B', text: 'Vẽ bằng nét đứt mảnh' },
        { key: 'C', text: 'Vẽ bằng nét liền mảnh' },
        { key: 'D', text: 'Vuông góc với cạnh cần ghi kích thước' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 25,
      question: 'Tỉ lệ nguyên hình kí hiệu là:',
      options: [
        { key: 'A', text: '1 : 1' },
        { key: 'B', text: '1 : 2' },
        { key: 'C', text: '3 : 1' },
        { key: 'D', text: '4 : 1' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 26,
      question: 'Thép thuộc nhóm vật liệu nào sau đây?',
      options: [
        { key: 'A', text: 'Kim loại màu' },
        { key: 'B', text: 'Kim loại đen' },
        { key: 'C', text: 'Phi kim loại' },
        { key: 'D', text: 'Hợp kim màu' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 27,
      question: 'Gang có đặc điểm nổi bật nào?',
      options: [
        { key: 'A', text: 'Dẻo, dễ rèn' },
        { key: 'B', text: 'Cứng, giòn' },
        { key: 'C', text: 'Mềm, dễ uốn' },
        { key: 'D', text: 'Nhẹ như nhôm' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 28,
      question: 'Nhôm thường được dùng trong chế tạo vỏ máy bay vì:',
      options: [
        { key: 'A', text: 'Nhôm rất cứng và nặng' },
        { key: 'B', text: 'Nhôm dẫn điện kém' },
        { key: 'C', text: 'Nhôm nhẹ, chống gỉ tốt' },
        { key: 'D', text: 'Nhôm khó gia công' },
      ],
      correctAnswer: 'C',
    },
  ],
  essay: [
    {
      id: 1,
      question: 'Vật liệu cơ khí là gì? Hãy nêu một vài loại vật liệu cơ khí thường gặp trong đời sống.',
      suggestedAnswer: [
        'Vật liệu cơ khí là những nguyên vật liệu được dùng trong ngành cơ khí để chế tạo các chi tiết, máy móc và sản phẩm cơ khí.',
        'Ví dụ thường gặp trong đời sống:',
        '• Thép: làm dao, kéo, chi tiết máy…',
        '• Nhôm: chế tạo máy, vỏ khung, …',
        '• Đồng: dây dẫn điện…',
      ],
    },
    {
      id: 2,
      question: 'Em hãy trình bày các bước để đọc bản vẽ nhà? Mặt nào của ngôi nhà thể hiện được diện tích đất xây dựng ngôi nhà.',
      suggestedAnswer: [
        'Các bước để đọc bản vẽ nhà:',
        '• Bước 1: Khung tên: tên gọi ngôi nhà, tỉ lệ.',
        '• Bước 2: Hình biểu diễn: mặt đứng, mặt bằng, mặt cắt.',
        '• Bước 3: Kích thước: kích thước chung, kích thước bộ phận.',
        '• Bước 4: Các bộ phận: Số phòng, số cửa đi và cửa sổ.',
        '👉 Để xác định diện tích đất xây dựng nhà ở ta đọc số liệu kích thước ở mặt bằng.',
      ],
    },
    {
      id: 3,
      question: 'Vật liệu phi kim loại có những loại nào? Em hãy kể tên một số đồ dùng sản phẩm sử dụng vật liệu phi kim.',
      suggestedAnswer: [
        'Vật liệu phi kim có: chất dẻo, cao su, gốm sứ, thuỷ tinh, chất dẻo nhiệt, chất dẻo nhiệt rắn, cao su nhân tạo, cao su tự nhiên…',
        'Các sản phẩm dùng vật liệu phi kim loại là: dép cao su, dép nhựa, rổ, cốc, ly, săm lốp…',
      ],
    },
    {
      id: 4,
      question: 'Em hãy trình bày nội dung của bản vẽ chi tiết? Để biết người thiết kế bản vẽ, chúng ta cần đọc thông tin ở phần nào?',
      suggestedAnswer: [
        'Nội dung của bản vẽ chi tiết:',
        '- Hình biểu diễn: gồm hình chiếu và hình cắt',
        '- Kích thước: kích thước chung và kích thước thành phần',
        '- Yêu cầu kĩ thuật: các chỉ dẫn gia công, xử lí bề mặt',
        '- Khung tên: tên gọi chi tiết, vật liệu, tỉ lệ, tên người có trách nhiệm với bản vẽ.',
        '👉 Để biết người thiết kế bản vẽ, chúng ta cần đọc thông tin ở phần khung tên.',
      ],
    },
  ],
};

// ==========================================
// CÔNG NGHỆ 9 - BỘ ĐỀ ÔN THI TRỌNG TÂM
// ==========================================
export const GRADE_9_EXAM: GradeExamSet = {
  grade: 9,
  title: 'Công Nghệ 9',
  subTitle: 'Định hướng nghề nghiệp & Thị trường lao động',
  multipleChoice: [
    {
      id: 1,
      question: 'Nghề nghiệp được hiểu là gì?',
      options: [
        { key: 'A', text: 'Tập hợp các công việc được xã hội công nhận.' },
        { key: 'B', text: 'Những công việc chỉ được thực hiện trong gia đình.' },
        { key: 'C', text: 'Hoạt động vui chơi, giải trí của con người.' },
        { key: 'D', text: 'Công việc được thực hiện trong thời gian rảnh rỗi.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 2,
      question: 'Đặc điểm nào sau đây thường gắn với nghề nghiệp?',
      options: [
        { key: 'A', text: 'Chỉ thực hiện trong thời gian ngắn.' },
        { key: 'B', text: 'Có tính chất ổn định, gắn bó lâu dài với mỗi người.' },
        { key: 'C', text: 'Không cần được đào tạo hoặc rèn luyện.' },
        { key: 'D', text: 'Không mang lại thu nhập cho người lao động.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 3,
      question: 'Việc lựa chọn nghề nghiệp phù hợp với năng lực, sở thích và tính cách có ý nghĩa gì đối với cá nhân?',
      options: [
        { key: 'A', text: 'Giúp tránh phải học tập và rèn luyện.' },
        { key: 'B', text: 'Giúp không cần thích ứng với môi trường làm việc.' },
        { key: 'C', text: 'Tạo nền tảng để thành công, hài lòng và hạnh phúc trong công việc.' },
        { key: 'D', text: 'Đảm bảo không gặp bất cứ khó khăn nào trong nghề nghiệp.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 4,
      question: 'Lựa chọn nghề nghiệp phù hợp với năng lực và sở thích giúp người lao động điều gì?',
      options: [
        { key: 'A', text: 'Nhanh chóng thích ứng và phát triển nghề nghiệp.' },
        { key: 'B', text: 'Không cần nâng cao trình độ chuyên môn.' },
        { key: 'C', text: 'Có thể làm việc mà không cần kiến thức, kĩ năng.' },
        { key: 'D', text: 'Không cần quan tâm đến yêu cầu của nghề nghiệp.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 5,
      question: 'Đối với xã hội, việc học sinh lựa chọn nghề nghiệp theo định hướng, phân luồng trong giáo dục có ý nghĩa gì?',
      options: [
        { key: 'A', text: 'Làm giảm nhu cầu đào tạo lao động.' },
        { key: 'B', text: 'Giúp mọi người lựa chọn cùng một nghề nghiệp.' },
        { key: 'C', text: 'Giảm nhu cầu về lao động có trình độ chuyên môn.' },
        { key: 'D', text: 'Góp phần bảo đảm các quy hoạch và phát triển thị trường lao động, tạo ra nguồn nhân lực chất lượng cao.' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 6,
      question: 'Đặc điểm nào sau đây thuộc về môi trường làm việc của các ngành nghề trong lĩnh vực kĩ thuật, công nghệ?',
      options: [
        { key: 'A', text: 'Môi trường làm việc ổn định, ít thay đổi và không có thách thức.' },
        { key: 'B', text: 'Môi trường làm việc năng động, hiện đại, luôn biến đổi và đầy thử thách.' },
        { key: 'C', text: 'Chỉ làm việc trong môi trường văn phòng, không tiếp xúc với máy móc.' },
        { key: 'D', text: 'Không phải tiếp xúc với các thiết bị có nguy cơ tai nạn cao.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 7,
      question: 'Nội dung nào sau đây là yêu cầu về phẩm chất đối với người lao động trong lĩnh vực kĩ thuật, công nghệ?',
      options: [
        { key: 'A', text: 'Chỉ cần có trình độ chuyên môn, không cần tuân thủ quy định.' },
        { key: 'B', text: 'Có khả năng làm việc độc lập nhưng không cần làm việc theo nhóm.' },
        { key: 'C', text: 'Có tính kỉ luật, ý thức tuân thủ quy định, quy tắc trong quy trình làm việc và ý thức bảo đảm an toàn lao động.' },
        { key: 'D', text: 'Chỉ cần sức khỏe tốt, không cần học tập và rèn luyện chuyên môn.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 8,
      question: 'Cơ cấu hệ thống giáo dục quốc dân Việt Nam bao gồm:',
      options: [
        { key: 'A', text: 'Chỉ có giáo dục chính quy.' },
        { key: 'B', text: 'Chỉ có giáo dục thường xuyên.' },
        { key: 'C', text: 'Giáo dục chính quy và giáo dục thường xuyên.' },
        { key: 'D', text: 'Giáo dục phổ thông và giáo dục đại học.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 9,
      question: 'Giáo dục phổ thông có những thời điểm phân luồng nào?',
      options: [
        { key: 'A', text: 'Sau tiểu học và sau THCS.' },
        { key: 'B', text: 'Sau THCS và sau THPT.' },
        { key: 'C', text: 'Sau THPT và sau đại học.' },
        { key: 'D', text: 'Sau tiểu học và sau THPT.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 10,
      question: 'Sau khi tốt nghiệp THCS, học sinh muốn học nghề thuộc lĩnh vực kĩ thuật, công nghệ ở trình độ sơ cấp hoặc trung cấp có thể học tại đâu?',
      options: [
        { key: 'A', text: 'Cơ sở giáo dục nghề nghiệp.' },
        { key: 'B', text: 'Chỉ tại trường đại học.' },
        { key: 'C', text: 'Chỉ tại trường THPT.' },
        { key: 'D', text: 'Chỉ tại các trung tâm ngoại ngữ.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 11,
      question: 'Sau khi tốt nghiệp THPT, học sinh có thể lựa chọn học nghề thuộc lĩnh vực kĩ thuật, công nghệ ở trình độ nào sau đây?',
      options: [
        { key: 'A', text: 'Chỉ trình độ sơ cấp.' },
        { key: 'B', text: 'Chỉ trình độ trung cấp.' },
        { key: 'C', text: 'Sơ cấp, trung cấp, cao đẳng và đại học.' },
        { key: 'D', text: 'Chỉ trình độ đại học.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 12,
      question: 'Một học sinh sau khi tốt nghiệp THCS muốn vừa học chương trình THPT vừa học một nghề thuộc lĩnh vực kĩ thuật, công nghệ. Hướng đi phù hợp là:',
      options: [
        { key: 'A', text: 'Học tại trung tâm Giáo dục nghề nghiệp – Giáo dục thường xuyên.' },
        { key: 'B', text: 'Chỉ học tại trường đại học.' },
        { key: 'C', text: 'Chỉ tham gia lao động mà không cần học nghề.' },
        { key: 'D', text: 'Học tại trường tiểu học.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 13,
      question: 'Sau khi tốt nghiệp THCS, học sinh muốn trở thành kĩ sư trong lĩnh vực kĩ thuật, công nghệ thì hướng đi phù hợp nhất là:',
      options: [
        { key: 'A', text: 'Học sơ cấp rồi tham gia lao động ngay.' },
        { key: 'B', text: 'Học trung cấp và không cần học tiếp.' },
        { key: 'C', text: 'Tiếp tục học THPT, sau đó có thể học cao đẳng hoặc đại học ngành kĩ thuật, công nghệ.' },
        { key: 'D', text: 'Tham gia lao động ngay sau khi tốt nghiệp THCS.' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 14,
      question: 'Thị trường lao động là nơi diễn ra hoạt động nào sau đây?',
      options: [
        { key: 'A', text: 'Trao đổi, mua bán các sản phẩm công nghệ.' },
        { key: 'B', text: 'Trao đổi hàng hóa sức lao động giữa người lao động và người sử dụng lao động.' },
        { key: 'C', text: 'Trao đổi các loại máy móc, thiết bị.' },
        { key: 'D', text: 'Mua bán các sản phẩm nông nghiệp.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 15,
      question: 'Yếu tố nào sau đây có thể ảnh hưởng đến thị trường lao động?',
      options: [
        { key: 'A', text: 'Sự phát triển của khoa học và công nghệ.' },
        { key: 'B', text: 'Màu sắc của đồng phục học sinh.' },
        { key: 'C', text: 'Sở thích về các môn thể thao.' },
        { key: 'D', text: 'Thời gian nghỉ giữa các tiết học.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 16,
      question: 'Sự phát triển nhanh của khoa học và công nghệ có thể làm cho thị trường lao động thay đổi theo hướng nào?',
      options: [
        { key: 'A', text: 'Không làm thay đổi nhu cầu về lao động.' },
        { key: 'B', text: 'Làm xuất hiện những nghề mới và yêu cầu người lao động có kiến thức, kĩ năng mới.' },
        { key: 'C', text: 'Làm tất cả các nghề truyền thống biến mất.' },
        { key: 'D', text: 'Làm người lao động không cần học tập, nâng cao trình độ.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 17,
      question: 'Tìm hiểu thị trường lao động giúp học sinh lựa chọn nghề nghiệp trong lĩnh vực kĩ thuật, công nghệ chủ yếu dựa trên:',
      options: [
        { key: 'A', text: 'Nhu cầu của thị trường và năng lực, sở thích của bản thân.' },
        { key: 'B', text: 'Nghề nào có tên gọi dài nhất.' },
        { key: 'C', text: 'Nghề được nhiều bạn lựa chọn nhất.' },
        { key: 'D', text: 'Nghề không yêu cầu học tập, rèn luyện.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 18,
      question: 'Một trong những vấn đề của thị trường lao động Việt Nam hiện nay là:',
      options: [
        { key: 'A', text: 'Chất lượng lao động còn thấp, phân bổ nguồn lao động không đồng đều.' },
        { key: 'B', text: 'Tất cả người lao động đều có trình độ và kĩ năng như nhau.' },
        { key: 'C', text: 'Thị trường lao động không có sự thay đổi.' },
        { key: 'D', text: 'Nhu cầu lao động ở mọi ngành nghề luôn giống nhau.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 19,
      question: 'Khi tìm kiếm thông tin về thị trường lao động trong lĩnh vực kĩ thuật và công nghệ, nguồn thông tin nào sau đây là phù hợp?',
      options: [
        { key: 'A', text: 'Các trang thông tin tuyển dụng, cơ quan quản lí lao động và doanh nghiệp.' },
        { key: 'B', text: 'Chỉ dựa vào lời truyền miệng của bạn bè.' },
        { key: 'C', text: 'Chỉ dựa vào quảng cáo trên mạng xã hội.' },
        { key: 'D', text: 'Chỉ dựa vào sở thích cá nhân.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 20,
      question: 'Khi tìm hiểu một nghề thuộc lĩnh vực kĩ thuật, công nghệ, thông tin nào sau đây là cần thiết nhất để định hướng nghề nghiệp?',
      options: [
        { key: 'A', text: 'Nhu cầu tuyển dụng và yêu cầu đối với người lao động.' },
        { key: 'B', text: 'Tên gọi của doanh nghiệp có nhiều chữ nhất.' },
        { key: 'C', text: 'Màu sắc logo của doanh nghiệp.' },
        { key: 'D', text: 'Số lượng người theo dõi doanh nghiệp trên mạng xã hội.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 21,
      question: 'Bước đầu tiên trong quy trình lựa chọn nghề nghiệp là gì?',
      options: [
        { key: 'A', text: 'Tìm hiểu thị trường lao động.' },
        { key: 'B', text: 'Đánh giá bản thân.' },
        { key: 'C', text: 'Tìm kiếm việc làm.' },
        { key: 'D', text: 'Thực hiện kế hoạch nghề nghiệp.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 22,
      question: 'Khi đánh giá bản thân để lựa chọn nghề nghiệp, học sinh cần xem xét những yếu tố nào?',
      options: [
        { key: 'A', text: 'Sở thích, năng lực, tính cách và sức khỏe.' },
        { key: 'B', text: 'Chỉ dựa vào sở thích của bạn bè.' },
        { key: 'C', text: 'Chỉ dựa vào mức thu nhập của nghề.' },
        { key: 'D', text: 'Chỉ dựa vào ý kiến của người khác.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 23,
      question: 'Vì sao cần tìm hiểu thị trường lao động trước khi lựa chọn nghề nghiệp?',
      options: [
        { key: 'A', text: 'Để biết nhu cầu nhân lực và yêu cầu của nghề trong thực tế.' },
        { key: 'B', text: 'Để lựa chọn nghề có tên gọi hay nhất.' },
        { key: 'C', text: 'Để chọn nghề theo số đông.' },
        { key: 'D', text: 'Để không cần đánh giá năng lực của bản thân.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 24,
      question: 'Sau khi đánh giá bản thân và tìm hiểu thị trường lao động, học sinh cần làm gì?',
      options: [
        { key: 'A', text: 'Lựa chọn nghề nghiệp phù hợp với bản thân và nhu cầu của xã hội.' },
        { key: 'B', text: 'Chọn ngay nghề có thu nhập cao nhất.' },
        { key: 'C', text: 'Chọn nghề mà bạn bè đang theo học.' },
        { key: 'D', text: 'Không cần xác định mục tiêu nghề nghiệp.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 25,
      question: 'Một học sinh yêu thích công nghệ, có năng lực về Toán và Tin học, đồng thời tìm hiểu thấy ngành công nghệ thông tin đang có nhu cầu nhân lực cao. Hành động nào sau đây phù hợp nhất với quy trình lựa chọn nghề nghiệp?',
      options: [
        { key: 'A', text: 'Lựa chọn nghề ngay mà không cần tìm hiểu thêm.' },
        { key: 'B', text: 'Đối chiếu năng lực, sở thích của bản thân với yêu cầu nghề và xây dựng kế hoạch học tập phù hợp.' },
        { key: 'C', text: 'Chọn nghề theo mong muốn của bạn bè.' },
        { key: 'D', text: 'Không cần quan tâm đến yêu cầu của nghề.' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 26,
      question: 'Khi tự đánh giá mức độ phù hợp của bản thân với một ngành nghề thuộc lĩnh vực kĩ thuật, công nghệ, yếu tố nào sau đây cần được xem xét?',
      options: [
        { key: 'A', text: 'Sở thích, năng lực, tính cách và sức khỏe của bản thân.' },
        { key: 'B', text: 'Chỉ xem xét mức lương của nghề.' },
        { key: 'C', text: 'Chỉ xem xét nghề đó có nhiều người theo học hay không.' },
        { key: 'D', text: 'Chỉ xem xét ý kiến của bạn bè.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 27,
      question: 'Một học sinh có khả năng tư duy logic, yêu thích máy tính, kiên trì và có hứng thú với việc lập trình. Những đặc điểm này cho thấy học sinh có thể phù hợp với ngành nghề nào sau đây?',
      options: [
        { key: 'A', text: 'Công nghệ thông tin và lập trình.' },
        { key: 'B', text: 'Trồng trọt.' },
        { key: 'C', text: 'Chăn nuôi.' },
        { key: 'D', text: 'Nuôi trồng thủy sản.' },
      ],
      correctAnswer: 'A',
    },
  ],
  essay: [
    {
      id: 1,
      question: 'Em hãy trình bày tầm quan trọng của nghề nghiệp đối với con người và xã hội.',
      suggestedAnswer: [
        'Tầm quan trọng của nghề nghiệp đối với con người và xã hội:',
        '• Đối với con người: Tạo thu nhập, bảo đảm cuộc sống, phát huy năng lực và sở trường.',
        '• Đối với xã hội: Tạo ra sản phẩm, dịch vụ, đáp ứng nhu cầu và thúc đẩy phát triển kinh tế – xã hội.',
      ],
    },
    {
      id: 2,
      question: 'Em hãy trình bày các hướng đi sau khi tốt nghiệp THCS trong lĩnh vực kĩ thuật công nghệ.',
      suggestedAnswer: [
        'Các hướng đi sau khi tốt nghiệp THCS:',
        '• Hướng 1: Học sơ cấp, trung cấp nghề thuộc lĩnh vực kĩ thuật, công nghệ.',
        '• Hướng 2: Học tại Trung tâm GDNN – GDTX, vừa học THPT vừa học nghề.',
        '• Hướng 3: Học THPT, sau đó học cao đẳng hoặc đại học ngành kĩ thuật, công nghệ.',
      ],
    },
    {
      id: 3,
      question: 'Em hãy trình bày vai trò của thị trường lao động trong định hướng nghề nghiệp.',
      suggestedAnswer: [
        'Vai trò của thị trường lao động trong định hướng nghề nghiệp:',
        '• Cung cấp thông tin về nhu cầu tuyển dụng, việc làm.',
        '• Cho biết yêu cầu về trình độ và kĩ năng của nghề.',
        '• Giúp lựa chọn ngành học, nghề nghiệp phù hợp..',
      ],
    },
    {
      id: 4,
      question: 'Em hãy trình bày quy trình lựa chọn nghề nghiệp.',
      suggestedAnswer: [
        'Gồm 3 bước cơ bản:',
        '1. Đánh giá bản thân: Xác định sở thích, năng lực, tính cách, sức khỏe.',
        '2. Tìm hiểu thị trường lao động: Tìm hiểu nhu cầu nhân lực, việc làm và yêu cầu của nghề.',
        '3. Ra quyết định: Đối chiếu bản thân với yêu cầu của nghề để chọn nghề phù hợp.',
      ],
    },
  ],
};

// ==========================================
// CÔNG NGHỆ 6 - BỘ ĐỀ ÔN THI TRỌNG TÂM
// ==========================================
export const GRADE_6_EXAM: GradeExamSet = {
  grade: 6,
  title: 'Công Nghệ 6',
  subTitle: 'Nhà ở, Vật liệu xây dựng & Ngôi nhà thông minh, Dinh dưỡng',
  multipleChoice: [
    {
      id: 1,
      question: 'Cấu tạo nhà ở thường bao gồm bao nhiêu phần chính?',
      options: [
        { key: 'A', text: '5' },
        { key: 'B', text: '6' },
        { key: 'C', text: '7' },
        { key: 'D', text: '8' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 2,
      question: 'Phần nào sau đây của ngôi nhà ở vị trí cao nhất?',
      options: [
        { key: 'A', text: 'Mái nhà' },
        { key: 'B', text: 'Khung nhà' },
        { key: 'C', text: 'Móng nhà' },
        { key: 'D', text: 'Sàn nhà' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 3,
      question: 'Tính vùng miền của nhà ở không phụ thuộc vào yếu tố nào sau đây?',
      options: [
        { key: 'A', text: 'Vị trí địa lí' },
        { key: 'B', text: 'Khí hậu' },
        { key: 'C', text: 'Giới tính' },
        { key: 'D', text: 'Kinh tế' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 4,
      question: 'Em hãy cho biết, kiểu nhà nào sau đây thuộc kiến trúc nhà ở các khu vực đặc thù?',
      options: [
        { key: 'A', text: 'Nhà ở chung cư' },
        { key: 'B', text: 'Nhà nổi' },
        { key: 'C', text: 'Nhà ba gian' },
        { key: 'D', text: 'Nhà ở mặt phố' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 5,
      question: 'Em hãy cho biết, trong các thực phẩm sau thực phẩm nào cung cấp chất đạm?',
      options: [
        { key: 'A', text: 'Rau cải' },
        { key: 'B', text: 'Bơ' },
        { key: 'C', text: 'Cá hồi' },
        { key: 'D', text: 'Súp lơ xanh' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 6,
      question: 'Em hãy cho biết, kiến trúc nhà ở đặc trưng của Việt Nam có mấy loại?',
      options: [
        { key: 'A', text: '1' },
        { key: 'B', text: '2' },
        { key: 'C', text: '3' },
        { key: 'D', text: '4' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 7,
      question: 'Nhà ở các khu vực đặc thù được chia làm mấy loại?',
      options: [
        { key: 'A', text: '4' },
        { key: 'B', text: '3' },
        { key: 'C', text: '2' },
        { key: 'D', text: '1' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 8,
      question: 'Trong các vật liệu sau, vật liệu nào có sẵn trong thiên nhiên?',
      options: [
        { key: 'A', text: 'Gạch nung' },
        { key: 'B', text: 'Cát' },
        { key: 'C', text: 'Kính' },
        { key: 'D', text: 'Thạch cao' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 9,
      question: 'Trong các vật liệu sau, vật liệu nào là vật liệu nhân tạo?',
      options: [
        { key: 'A', text: 'Đất' },
        { key: 'B', text: 'Tre' },
        { key: 'C', text: 'Thép' },
        { key: 'D', text: 'Gỗ' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 10,
      question: 'Trong xây dựng nhà ở, người ta sử dụng loại vật liệu nào sau đây?',
      options: [
        { key: 'A', text: 'Vật liệu tự nhiên' },
        { key: 'B', text: 'Vật liệu nhân tạo' },
        { key: 'C', text: 'Chỉ dùng gỗ và tre' },
        { key: 'D', text: 'Vật liệu tự nhiên và vật liệu nhân tạo' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 11,
      question: 'Hãy chỉ ra thứ tự các bước chính xây dựng nhà ở?',
      options: [
        { key: 'A', text: 'Thi công thô, Thiết kế, Hoàn thiện' },
        { key: 'B', text: 'Thiết kế, Thi công thô, Hoàn thiện' },
        { key: 'C', text: 'Thiết kế, Hoàn thiện, Thi công thô' },
        { key: 'D', text: 'Thi công thô, Hoàn thiện, Thiết kế' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 12,
      question: 'Công việc nào sau đây không thuộc bước hoàn thiện của ngôi nhà?',
      options: [
        { key: 'A', text: 'Trát tường' },
        { key: 'B', text: 'Lắp đặt quạt trần' },
        { key: 'C', text: 'Lắp đặt bình nóng lạnh' },
        { key: 'D', text: 'Dự trù kinh phí' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 13,
      question: 'Trong các ý sau đây ý nào không thể hiện thói quen ăn uống khoa học?',
      options: [
        { key: 'A', text: 'Ăn đúng bữa, đủ chất' },
        { key: 'B', text: 'Uống đủ nước' },
        { key: 'C', text: 'Thích ăn gì thì ăn' },
        { key: 'D', text: 'Đảm bảo vệ sinh an toàn thực phẩm' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 14,
      question: 'Để tạo ra bê tông, người ta dùng vật liệu nào?',
      options: [
        { key: 'A', text: 'Đá/sỏi nhỏ' },
        { key: 'B', text: 'Xi măng' },
        { key: 'C', text: 'Nước' },
        { key: 'D', text: 'Cả 3 đáp án trên đúng' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 15,
      question: 'Nhà ở khu vực nào của Việt Nam có đặc điểm như sau: "Làm bằng lá, chia thành các vách, gian nhà, có thể xây dựng gần bờ sông, kênh rạch, có hệ thống phao di động được"?',
      options: [
        { key: 'A', text: 'Vùng đồng bằng' },
        { key: 'B', text: 'Vùng Trung du' },
        { key: 'C', text: 'Vùng Nam bộ' },
        { key: 'D', text: 'Cả 3 đáp án trên đều đúng' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 16,
      question: 'Chọn phát biểu đúng về thiết kế:',
      options: [
        { key: 'A', text: 'Là bước chuẩn bị quan trọng trước khi nhà ở được thi công' },
        { key: 'B', text: 'Là bước hình thành khung cho mỗi ngôi nhà.' },
        { key: 'C', text: 'Là công đoạn góp phần tạo nên không gian sống với đầy đủ công năng sử dụng và tính thẩm mĩ của ngôi nhà.' },
        { key: 'D', text: 'Không có đáp án nào hợp lý.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 17,
      question: 'Ngôi nhà thông minh có đặc điểm nào sau đây?',
      options: [
        { key: 'A', text: 'Tiện nghi hơn' },
        { key: 'B', text: 'An toàn và an ninh' },
        { key: 'C', text: 'Tiết kiệm năng lượng' },
        { key: 'D', text: 'Tiện nghi hơn; an ninh, an toàn và tiết kiệm năng lượng' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 18,
      question: 'Khu vực nào trong ngôi nhà giúp các thành viên thể hiện tấm lòng "uống nước nhớ nguồn"?',
      options: [
        { key: 'A', text: 'Khu vực vệ sinh' },
        { key: 'B', text: 'Khu vực sinh hoạt chung' },
        { key: 'C', text: 'Khu vực thờ cúng' },
        { key: 'D', text: 'Khu vực nghỉ ngơi' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 19,
      question: 'Trong các thực phẩm sau, thực phẩm nào thuộc nhóm thực phẩm giàu chất tinh bột, chất đường và chất xơ?',
      options: [
        { key: 'A', text: 'Thịt, rau cải, mật ong' },
        { key: 'B', text: 'Rau xanh, bơ, ngũ cốc' },
        { key: 'C', text: 'Bánh mì, ngũ cốc, cá hồi' },
        { key: 'D', text: 'Ngũ cốc, mật ong, rau xanh' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 20,
      question: 'Cảnh báo nào sau đây của thiết bị không phải đặc điểm đảm bảo tính an ninh, an toàn cho ngôi nhà thông minh?',
      options: [
        { key: 'A', text: 'Có người lạ đột nhập' },
        { key: 'B', text: 'Quên đóng cửa' },
        { key: 'C', text: 'Tự động mở kênh truyền hình yêu thích' },
        { key: 'D', text: 'Cảnh báo nguy cơ cháy nổ' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 21,
      question: 'Thiết bị được lắp đặt đảm bảo tính an ninh, an toàn trong ngôi nhà thông minh cảnh báo đến chủ nhà bằng hình thức nào sau đây?',
      options: [
        { key: 'A', text: 'Đèn báo' },
        { key: 'B', text: 'Chuông báo' },
        { key: 'C', text: 'Tin nhắn tự động' },
        { key: 'D', text: 'Đèn báo, chuông báo, tin nhắn tự động.' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 22,
      question: 'Ngôi nhà thông minh tận dụng nguồn năng lượng tự nhiên nào?',
      options: [
        { key: 'A', text: 'Năng lượng gió' },
        { key: 'B', text: 'Năng lượng mặt trời' },
        { key: 'C', text: 'Năng lượng gió và năng lượng mặt trời' },
        { key: 'D', text: 'Điện năng sản xuất từ lưới điện' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 23,
      question: 'Ý nghĩa của việc lắp đặt hệ thống năng lượng mặt trời trên mái nhà là:',
      options: [
        { key: 'A', text: 'Tạo ra nguồn năng lượng sạch' },
        { key: 'B', text: 'Làm tăng mức tiêu thụ điện' },
        { key: 'C', text: 'Giảm ánh sáng tự nhiên vào nhà' },
        { key: 'D', text: 'Tạo ra nguồn năng lượng sạch, thân thiện với môi trường và tiết kiệm tiền điện' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 24,
      question: 'Mô tả sau đây: "Trước khi có người về, nhiệt độ phòng giảm xuống cho đủ mát." tương ứng với hệ thống nào trong ngôi nhà thông minh?',
      options: [
        { key: 'A', text: 'Giải trí thông minh' },
        { key: 'B', text: 'Hệ thống kiểm soát nhiệt độ' },
        { key: 'C', text: 'Hệ thống camera giám sát an ninh' },
        { key: 'D', text: 'Cả 3 đáp án trên đều đúng' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 25,
      question: 'Kiến trúc đặc trưng của nhà ở Việt Nam có:',
      options: [
        { key: 'A', text: 'Nhà ở nông thôn' },
        { key: 'B', text: 'Nhà ở thành thị' },
        { key: 'C', text: 'Nhà ở khu vực đặc thù' },
        { key: 'D', text: 'Cả 3 đáp án trên' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 26,
      question: 'Loại nhà ở nào được xây dựng tại các khu đô thị, thành phố lớn đông dân?',
      options: [
        { key: 'A', text: 'Nhà tranh' },
        { key: 'B', text: 'Nhà gỗ' },
        { key: 'C', text: 'Căn hộ chung cư' },
        { key: 'D', text: 'Nhà nổi' },
      ],
      correctAnswer: 'C',
    },
  ],
  essay: [
    {
      id: 1,
      question: 'Em hãy trình bày vai trò của nhà ở đối với đời sống con người?',
      suggestedAnswer: [
        'Nhà ở có các vai trò đó là:',
        '- Nơi trú ngụ và bảo vệ: là nơi an toàn, bảo vệ con người trước thời tiết, thiên nhiên và môi trường.',
        '- Đáp ứng nhu cầu sinh hoạt: ăn uống, học tập và làm việc.',
        '- Nơi nghỉ ngơi và phục hồi sức khỏe: nghỉ ngơi, thư giãn.',
        '- Không gian gắn kết gia đình.',
      ],
    },
    {
      id: 2,
      question: 'Em hãy kể tên một số loại vật liệu xây dựng để làm nhà ở và cho biết vật liệu đó làm được bộ phận nào của ngôi nhà?',
      suggestedAnswer: [
        'Vật liệu để làm nhà là:',
        '- Gỗ: Dùng làm khung, mái, sàn nhà và đồ nội thất.',
        '- Gạch, ngói: Dùng để xây tường bao che và làm mái nhà.',
        '- Thép: làm khung nhà, cột, dầm, kèo.',
        '- Xi măng: Dùng để kết hợp với cát, nước tạo thành vữa.',
        '- Đá, sỏi: kết hợp xi măng, cát, nước để tạo thành bê tông.',
        '- Kính: cửa sổ, cửa ra vào, mặt bàn.',
      ],
    },
    {
      id: 3,
      question: 'Em hãy nêu tên một số nhóm hệ thống được lắp đặt trong ngôi nhà thông minh?',
      suggestedAnswer: [
        'Các nhóm hệ thống được lắp đặt trong ngôi nhà thông minh gồm:',
        '- Hệ thống an ninh, an toàn: camera, cảm biến hồng ngoại.',
        '- Hệ thống kiểm soát nhiệt độ: máy lạnh, máy sưởi.',
        '- Hệ thống chiếu sáng thông minh: đèn, rèm cửa.',
        '- Hệ thống giải trí thông minh: điều khiển tv, loa, đài.',
        '- Hệ thống điều khiển đồ gia dụng: tủ lạnh, máy giặt.',
      ],
    },
  ],
};

// ==========================================
// CÔNG NGHỆ 7 - BỘ ĐỀ ÔN THI TRỌNG TÂM
// ==========================================
export const GRADE_7_EXAM: GradeExamSet = {
  grade: 7,
  title: 'Công Nghệ 7',
  subTitle: 'Kĩ thuật trồng trọt & Nhân giống, phòng trừ sâu bệnh hại',
  multipleChoice: [
    {
      id: 1,
      question: 'Nên tưới nước cho cây trồng vào thời gian nào trong ngày?',
      options: [
        { key: 'A', text: 'Buổi sáng sớm hoặc buổi trưa' },
        { key: 'B', text: 'Buổi trưa hoặc buổi chiều muộn' },
        { key: 'C', text: 'Vào bất kì thời gian nào trong ngày' },
        { key: 'D', text: 'Buổi sáng sớm hoặc chiều muộn' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 2,
      question: 'Khi nào cần dặm cây?',
      options: [
        { key: 'A', text: 'Cây trồng bị thiếu ánh sáng' },
        { key: 'B', text: 'Cây mọc quá dày' },
        { key: 'C', text: 'Cây mọc quá thưa' },
        { key: 'D', text: 'Cây trồng bị thừa dinh dưỡng' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 3,
      question: 'Mô tả nào sau đây là của biện pháp phòng trừ sâu, bệnh hại thủ công?',
      options: [
        { key: 'A', text: 'Thay giống cũ bằng giống mới có khả năng kháng sâu, bệnh hại.' },
        { key: 'B', text: 'Vệ sinh đồng ruộng' },
        { key: 'C', text: 'Sử dụng các vi sinh vật có lợi (ong mắt đỏ, bọ rùa, …) để tiêu diệt sâu hại' },
        { key: 'D', text: 'Dùng bẫy đèn, bả độc để diệt sâu hại' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 4,
      question: 'Bón phân thúc cho cây trồng có vai trò nào sau đây?',
      options: [
        { key: 'A', text: 'Bổ sung nguồn dinh dưỡng cần thiết cho từng giai đoạn sinh trưởng, phát triển của cây trồng.' },
        { key: 'B', text: 'Ngăn ngừa sự phát triển của sâu bệnh hại cây trồng.' },
        { key: 'C', text: 'Ngăn ngừa sự phát triển của cỏ dại.' },
        { key: 'D', text: 'Rút ngắn thời gian sinh trưởng, phát triển của cây trồng.' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 5,
      question: 'Khi trồng cây con, để giúp cây đứng vững cần phải:',
      options: [
        { key: 'A', text: 'Bón phân cho cây ngay sau khi trồng' },
        { key: 'B', text: 'Vun gốc ngay sau khi trồng' },
        { key: 'C', text: 'Đào hố thật sâu' },
        { key: 'D', text: 'Trồng cây với mật độ thật dày' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 6,
      question: 'Khi gieo trồng cần đảm bảo yêu cầu về:',
      options: [
        { key: 'A', text: 'Thời vụ' },
        { key: 'B', text: 'Mật độ' },
        { key: 'C', text: 'Khoảng cách và độ nông sâu' },
        { key: 'D', text: 'Cả 3 đáp án trên đều đúng' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 7,
      question: 'Ngành trồng trọt cung cấp chủ yếu:',
      options: [
        { key: 'A', text: 'Chip điện tử' },
        { key: 'B', text: 'Gỗ và than' },
        { key: 'C', text: 'Lương thực, thực phẩm cho con người' },
        { key: 'D', text: 'Đồ chơi trẻ em' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 8,
      question: 'Vai trò của trồng trọt trong bảo vệ môi trường là:',
      options: [
        { key: 'A', text: 'Đốt rừng làm nương rẫy' },
        { key: 'B', text: 'Trồng cây giúp tăng độ che phủ đất' },
        { key: 'C', text: 'Dùng nhiều hóa chất' },
        { key: 'D', text: 'Chặt cây để lấy đất' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 9,
      question: 'Có mấy nguyên tắc phòng trừ sâu, bệnh?',
      options: [
        { key: 'A', text: '1' },
        { key: 'B', text: '2' },
        { key: 'C', text: '3' },
        { key: 'D', text: '4' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 10,
      question: 'Nhân giống vô tính là gì?',
      options: [
        { key: 'A', text: 'Tạo cây mới từ hạt' },
        { key: 'B', text: 'Thụ phấn cho hoa' },
        { key: 'C', text: 'Tạo cây mới từ một bộ phận của cây mẹ' },
        { key: 'D', text: 'Gieo hạt để cây nảy mầm' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 11,
      question: 'Ưu điểm của nhân giống vô tính là:',
      options: [
        { key: 'A', text: 'Cây con khác biệt hoàn toàn cây mẹ' },
        { key: 'B', text: 'Cây phát triển chậm' },
        { key: 'C', text: 'Giữ nguyên đặc tính tốt của cây mẹ' },
        { key: 'D', text: 'Tạo cây yếu hơn' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 12,
      question: 'Phương pháp giâm cành thuộc:',
      options: [
        { key: 'A', text: 'Nhân giống bằng hạt' },
        { key: 'B', text: 'Phương pháp lai giống' },
        { key: 'C', text: 'Nhân giống vô tính' },
        { key: 'D', text: 'Trồng cây bằng củ' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 13,
      question: 'Có phương pháp nhân giống vô tính nào?',
      options: [
        { key: 'A', text: 'Giâm cành' },
        { key: 'B', text: 'Ghép' },
        { key: 'C', text: 'Chiết cành' },
        { key: 'D', text: 'Cả 3 đáp án trên' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 14,
      question: 'Yêu cầu đối với cành giâm là gì?',
      options: [
        { key: 'A', text: 'Không quá già (cành bánh tẻ)' },
        { key: 'B', text: 'Già' },
        { key: 'C', text: 'Càng già càng tốt' },
        { key: 'D', text: 'Đáp án khác' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 15,
      question: 'Người ta sử dụng loại đất nào để trồng rau sạch trong thùng xốp?',
      options: [
        { key: 'A', text: 'Đất có nguồn gốc tự nhiên' },
        { key: 'B', text: 'Đất trồng rau hữu cơ' },
        { key: 'C', text: 'Cả A và B đều đúng' },
        { key: 'D', text: 'Đáp án khác' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 16,
      question: 'Đâu không phải cách bón phân lót?',
      options: [
        { key: 'A', text: 'bón theo hàng' },
        { key: 'B', text: 'bón theo hốc trồng' },
        { key: 'C', text: 'bón phun lá' },
        { key: 'D', text: 'bón lên mặt ruộng' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 17,
      question: 'Thành phần chất rắn của đất trồng có vai trò nào sau đây?',
      options: [
        { key: 'A', text: 'Cung cấp chất dinh dưỡng cần thiết cho cây trồng' },
        { key: 'B', text: 'Cung cấp nước cho cây trồng' },
        { key: 'C', text: 'Cung cấp khí oxygen cho cây trồng' },
        { key: 'D', text: 'Cung cấp khí carbon dioxide cho cây trồng' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 18,
      question: 'Những nhóm cây trồng nào sau đây đều là cây công nghiệp?',
      options: [
        { key: 'A', text: 'Chè, cà phê, cao su' },
        { key: 'B', text: 'Bông, hồ tiêu, vải' },
        { key: 'C', text: 'Hoa hồng, hoa lan, hoa cúc' },
        { key: 'D', text: 'Bưởi, nhãn, chôm chôm' },
      ],
      correctAnswer: 'A',
    },
    {
      id: 19,
      question: 'Đâu không phải ưu điểm của trồng trọt ngoài tự nhiên?',
      options: [
        { key: 'A', text: 'Đơn giản' },
        { key: 'B', text: 'Dễ thực hiện' },
        { key: 'C', text: 'Tránh được tác động của sâu bệnh' },
        { key: 'D', text: 'Thực hiện trên diện tích lớn' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 20,
      question: 'Đâu là triển vọng của trồng trọt ở Việt Nam?',
      options: [
        { key: 'A', text: 'Phát triển các vùng chuyên canh tập trung cho các loại cây trồng chủ lực theo từng vị trí địa lý' },
        { key: 'B', text: 'Áp dụng phương thức, công nghệ trồng trọt tiên tiến giúp nâng cao năng suất, chất lượng sản phẩm' },
        { key: 'C', text: 'Nông dân sáng tạo, ham học hỏi giúp nâng cao vị thế của sản xuất nông nghiệp Việt Nam' },
        { key: 'D', text: 'Cả 3 đáp án trên đều đúng' },
      ],
      correctAnswer: 'D',
    },
    {
      id: 21,
      question: 'Nên bón phân lót cho cây trồng bằng loại phân nào?',
      options: [
        { key: 'A', text: 'Phân chuồng ủ hoai' },
        { key: 'B', text: 'Phân hoá học là đủ' },
        { key: 'C', text: 'Phân hữu cơ kết hợp phân hoá học' },
        { key: 'D', text: 'Phân hữu cơ và phân vi lượng' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 22,
      question: 'Ngành trồng trọt chủ yếu cung cấp:',
      options: [
        { key: 'A', text: 'Máy móc và thiết bị' },
        { key: 'B', text: 'Năng lượng điện' },
        { key: 'C', text: 'Lương thực, rau quả và cây công nghiệp' },
        { key: 'D', text: 'Quần áo may mặc' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 23,
      question: 'Người làm nghề trồng trọt cần có kỹ năng nào?',
      options: [
        { key: 'A', text: 'Sửa chữa điện tử' },
        { key: 'B', text: 'Buôn bán đồ gia dụng' },
        { key: 'C', text: 'Nhận biết giống, chăm sóc và phòng trừ sâu bệnh' },
        { key: 'D', text: 'Thiết kế bản vẽ' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 24,
      question: 'Thu hoạch thủ công bằng tay có ưu điểm gì?',
      options: [
        { key: 'A', text: 'Rất nhanh và không cần người' },
        { key: 'B', text: 'Cẩn thận, ít làm hỏng sản phẩm' },
        { key: 'C', text: 'Tốn ít nhân lực' },
        { key: 'D', text: 'Chỉ dùng cho diện tích lớn' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 25,
      question: 'Thu hoạch bằng máy thích hợp với:',
      options: [
        { key: 'A', text: 'Ruộng nhỏ, sản lượng ít' },
        { key: 'B', text: 'Diện tích lớn, cần thu hoạch nhanh' },
        { key: 'C', text: 'Thu hoạch trong rừng' },
        { key: 'D', text: 'Thu hoạch hoa trong chậu' },
      ],
      correctAnswer: 'B',
    },
    {
      id: 26,
      question: 'Tại sao cần thu hoạch đúng thời điểm?',
      options: [
        { key: 'A', text: 'Không ảnh hưởng năng suất' },
        { key: 'B', text: 'Làm sản phẩm xấu hơn' },
        { key: 'C', text: 'Đảm bảo chất lượng tốt và năng suất cao' },
        { key: 'D', text: 'Để sản phẩm bị già quá' },
      ],
      correctAnswer: 'C',
    },
    {
      id: 27,
      question: 'Công việc nào sau đây thuộc ngành nghề trồng trọt?',
      options: [
        { key: 'A', text: 'Đánh cá ngoài biển' },
        { key: 'B', text: 'Sửa máy tính' },
        { key: 'C', text: 'Gieo hạt, tưới cây, bón phân' },
        { key: 'D', text: 'Làm nội thất gỗ' },
      ],
      correctAnswer: 'C',
    },
  ],
  essay: [
    {
      id: 1,
      question: 'Em hãy trình bày một số phương pháp thu hoạch sản phẩm trồng trọt (thu hoạch nông sản) ở địa phương?',
      suggestedAnswer: [
        'Phương pháp thu hoạch sản phẩm trồng trọt ở địa phương em:',
        '- Đào/dỡ: khoai, sắn',
        '- Hái: cà chua, xoài, ổi, ngô',
        '- Nhổ: cà rốt, củ cải',
        '- Gặt: lúa, bông',
        '- Cắt: hoa hồng',
      ],
    },
    {
      id: 2,
      question: 'Em hãy kể tên các phương thức trồng trọt phổ biến ở Việt Nam và lấy ví dụ về loại cây trồng sử dụng phương thức đó.',
      suggestedAnswer: [
        'Các phương thức trồng trọt phổ biến ở Việt Nam là:',
        '- Trồng trọt ngoài tự nhiên: lúa, ngô, khoai',
        '- Trồng trọt trong nhà có mái che: rau bắp cải, súp lơ, cà chua',
        '- Trồng trọt kết hợp: các loại rau kết hợp',
      ],
    },
    {
      id: 3,
      question: 'Em hãy trình bày nguyên tắc phòng trừ sâu bệnh hại cây trồng?',
      suggestedAnswer: [
        'Có 3 nguyên tắc phòng trừ sâu bệnh hại cây trồng đó là:',
        '- Phòng là chính',
        '- Trừ sớm, kịp thời, nhanh chóng và triệt để',
        '- Sử dụng tổng hợp các biện pháp phòng trừ sâu bệnh',
      ],
    },
    {
      id: 4,
      question: 'Em hãy nêu các phương pháp nhân giống vô tính cho cây trồng? Mỗi phương pháp cho ví dụ về loại cây sử dụng phương pháp đó.',
      suggestedAnswer: [
        'Các phương pháp nhân giống vô tính cho cây trồng là:',
        '- Giâm cành: sắn, mía, khoai lang',
        '- Chiết cành: hoa hồng, các loại cây cảnh, cà phê…',
        '- Ghép cành: bưởi, ổi, cam, táo…',
      ],
    },
  ],
};

export const ALL_GRADE_EXAMS: Record<GradeLevel, GradeExamSet> = {
  6: GRADE_6_EXAM,
  7: GRADE_7_EXAM,
  8: GRADE_8_EXAM,
  9: GRADE_9_EXAM,
};
