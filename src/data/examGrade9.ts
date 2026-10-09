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

export interface StudentSubmission {
  id: string;
  studentName: string;
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

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 1,
    question: 'Tầm quan trọng của nghề nghiệp đối với con người và xã hội',
    suggestedAnswer: [
      'Đối với con người: Tạo thu nhập, bảo đảm cuộc sống, phát huy năng lực và sở trường.',
      'Đối với xã hội: Tạo ra sản phẩm, dịch vụ, đáp ứng nhu cầu và thúc đẩy phát triển kinh tế – xã hội.',
    ],
  },
  {
    id: 2,
    question: 'Các hướng đi sau khi tốt nghiệp THCS',
    suggestedAnswer: [
      'Hướng 1: Học sơ cấp, trung cấp nghề thuộc lĩnh vực kĩ thuật, công nghệ.',
      'Hướng 2: Học tại Trung tâm GDNN – GDTX, vừa học THPT vừa học nghề.',
      'Hướng 3: Học THPT, sau đó học cao đẳng hoặc đại học ngành kĩ thuật, công nghệ.',
    ],
  },
  {
    id: 3,
    question: 'Vai trò của thị trường lao động trong định hướng nghề nghiệp',
    suggestedAnswer: [
      'Cung cấp thông tin về nhu cầu tuyển dụng, việc làm.',
      'Cho biết yêu cầu về trình độ và kĩ năng của nghề.',
      'Giúp lựa chọn ngành học, nghề nghiệp phù hợp.',
    ],
  },
  {
    id: 4,
    question: 'Quy trình lựa chọn nghề nghiệp',
    suggestedAnswer: [
      'Gồm 3 bước cơ bản:',
      '1. Đánh giá bản thân: Xác định sở thích, năng lực, tính cách, sức khỏe.',
      '2. Tìm hiểu thị trường lao động: Tìm hiểu nhu cầu nhân lực, việc làm và yêu cầu của nghề.',
      '3. Ra quyết định: Đối chiếu bản thân với yêu cầu của nghề để chọn nghề phù hợp.',
    ],
  },
];

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
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
];

export const TEACHER_EXAM_PASS = 'taind93';
export const EXAM_STORAGE_KEY = 'cong_nghe_9_exam_submissions_v1';
