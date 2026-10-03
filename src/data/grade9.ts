import { GradeCurriculum } from '../types/curriculum';

export const grade9Data: GradeCurriculum = {
  grade: 9,
  title: 'Công Nghệ 9',
  subTitle: 'Bộ Sách Kết Nối Tri Thức Với Cuộc Sống',
  colorScheme: {
    primary: 'purple-400',
    border: 'border-purple-500/40',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-800',
    accent: '#a855f7',
  },
  chapters: [
    {
      id: 'cn9-c1',
      grade: 9,
      title: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
      code: 'CN9_MODULE_CAREER_GUIDANCE',
      description: 'Định hình tương lai: Hệ sinh thái nghề nghiệp kỹ thuật - công nghệ, hệ thống giáo dục quốc dân, thị trường lao động và ma trận lựa chọn nghề.',
      lessons: [
        {
          id: 'cn9-b1',
          grade: 9,
          chapterId: 'cn9-c1',
          chapterTitle: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
          lessonNumber: 1,
          title: 'Bài 1. Nghề nghiệp trong lĩnh vực kĩ thuật và công nghệ',
          moduleCode: 'CAREER_TECH_01',
          description: 'Tổng quan các nhóm nghề STEM: Kỹ sư cơ khí, kỹ sư điện - điện tử, kỹ sư phần mềm công nghệ thông tin, công nghệ sinh học.',
          summary: [
            'Lĩnh vực kỹ thuật và công nghệ là động lực tăng trưởng kinh tế then chốt trong kỷ nguyên số 4.0.',
            'Các nhóm nghề chính: Cơ khí - chế tạo máy; Điện - điện tử - viễn thông; Công nghệ thông tin - phần mềm - AI; Xây dựng - kiến trúc; Công nghệ sinh học & thực phẩm.',
            'Đặc điểm môi trường làm việc: Tiếp xúc máy móc, phần mềm mô phỏng, phòng thí nghiệm hiện đại, yêu cầu làm việc nhóm và tư duy giải quyết vấn đề.',
          ],
          keyPoints: [
            'Nghề kỹ thuật luôn đòi hỏi kiến thức Toán - Lý - Tin học vững vàng kết hợp kỹ năng thực hành.',
            'Sự bùng nổ của trí tuệ nhân tạo (AI) và tự động hóa mở ra hàng loạt vị trí việc làm mới.',
          ],
          specs: [
            { label: 'Các trụ cột nghề nghiệp', value: 'Cơ điện tử, Trí tuệ nhân tạo, Tự động hóa, Vi mạch bán dẫn' },
            { label: 'Phẩm chất cốt lõi', value: 'Tư duy logic, tính chính xác, tính sáng tạo, học tập suốt đời' },
          ],
          quiz: [
            {
              question: 'Nghề nghiệp nào sau đây phụ trách trực tiếp việc nghiên cứu thuật toán, viết code điều khiển cánh tay robot công nghiệp?',
              options: [
                'Kỹ sư Robot & Tự động hóa / Kỹ sư Phần mềm nhúng',
                'Kỹ sư lâm nghiệp trồng rừng',
                'Bác sĩ thú y tiêm phòng cho gia súc',
                'Thợ cắt tóc nghệ thuật',
              ],
              answerIndex: 0,
              explanation: 'Kỹ sư Robot và Tự động hóa kết hợp cơ khí, điện tử và khoa học máy tính để điều khiển cánh tay cơ khí thông minh.',
            },
          ],
        },
        {
          id: 'cn9-b2',
          grade: 9,
          chapterId: 'cn9-c1',
          chapterTitle: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
          lessonNumber: 2,
          title: 'Bài 2. Cơ cấu hệ thống giáo dục quốc dân',
          moduleCode: 'EDU_SYSTEM_02',
          description: 'Khung cơ cấu hệ thống giáo dục Việt Nam: Các luồng phân luồng sau THCS (THPT, Trung cấp nghề, Cao đẳng, Đại học).',
          summary: [
            'Khung cơ cấu giáo dục quốc dân phân định rõ ràng các bậc học: Giáo dục mầm non, Giáo dục phổ thông (Tiểu học, THCS, THPT), Giáo dục nghề nghiệp (Sơ cấp, Trung cấp, Cao đẳng) và Giáo dục đại học (Cử nhân, Thạc sĩ, Tiến sĩ).',
            'Phân luồng sau THCS: Học sinh tốt nghiệp lớp 9 có thể học tiếp lên THPT hoặc lựa chọn học Trung cấp nghề (kết hợp vừa học văn hóa vừa học nghề) để sớm gia nhập thị trường lao động.',
          ],
          keyPoints: [
            'Học nghề sớm giúp trang bị tay nghề thực tế vững chắc, tiết kiệm thời gian và chi phí cho gia đình.',
            'Hệ thống giáo dục mở cho phép liên thông linh hoạt từ Trung cấp lên Cao đẳng và Đại học.',
          ],
          specs: [
            { label: 'Bậc sau THCS', value: 'Lớp 10 THPT hoặc Trường Trung cấp nghề (hệ 9+)' },
            { label: 'Cơ hội liên thông', value: 'Trung cấp -> Cao đẳng -> Đại học' },
          ],
          quiz: [
            {
              question: 'Sau khi tốt nghiệp lớp 9 (THCS), học sinh có những hướng đi cơ bản nào trong hệ thống giáo dục quốc dân?',
              options: [
                'Thi vào lớp 10 THPT hoặc đăng ký học trường Trung cấp nghề (vừa học văn hóa vừa học nghề)',
                'Bắt buộc phải đi làm ngay không được học tiếp',
                'Chỉ có con đường duy nhất là vào đại học ngay',
                'Không được phép học nghề cho đến năm 30 tuổi',
              ],
              answerIndex: 0,
              explanation: 'Sau THCS là giai đoạn phân luồng quan trọng, học sinh có quyền chọn học THPT hoặc trường đào tạo nghề phù hợp năng lực.',
            },
          ],
        },
        {
          id: 'cn9-b3',
          grade: 9,
          chapterId: 'cn9-c1',
          chapterTitle: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
          lessonNumber: 3,
          title: 'Bài 3. Thị trường lao động kĩ thuật, công nghệ tại Việt Nam',
          moduleCode: 'LABOR_MARKET_03',
          description: 'Cung - cầu nhân lực, làn sóng chuyển đổi số, cơ hội việc làm trong các tập đoàn công nghệ và khu công nghệ cao.',
          summary: [
            'Thị trường lao động kỹ thuật - công nghệ tại Việt Nam đang thiếu hụt trầm trọng nhân lực chất lượng cao trong các ngành: Công nghệ vi mạch bán dẫn, Lập trình viên AI, Kỹ sư năng lượng tái tạo, Cơ điện tử.',
            'Yêu cầu của nhà tuyển dụng thời kỳ 4.0: Vững tay nghề chuyên môn, có khả năng giao tiếp tiếng Anh, kỷ luật tác phong công nghiệp và kỹ năng số.',
          ],
          keyPoints: [
            'Chuyển đổi số và dòng vốn FDI đổ vào Việt Nam tạo cơ hội mức lương hấp dẫn cho kỹ sư kỹ thuật.',
          ],
          specs: [
            { label: 'Ngành khan hiếm nhân lực', value: 'Thiết kế vi mạch (IC design), Trí tuệ nhân tạo, Tự động hóa' },
            { label: 'Kỹ năng vàng', value: 'Ngoại ngữ, Tư duy số, Kỹ năng giải quyết vấn đề phức tạp' },
          ],
          quiz: [
            {
              question: 'Đâu là ngành công nghệ mũi nhọn mà Việt Nam đang ưu tiên thu hút đầu tư và đào tạo nguồn nhân lực chiến lược?',
              options: [
                'Công nghiệp bán dẫn và thiết kế vi mạch điện tử',
                'Khai thác than thủ công bằng cuốc xẻng',
                'Sản xuất đầu băng video VHS',
                'Đúc đồ gốm thô sơ thời cổ đại',
              ],
              answerIndex: 0,
              explanation: 'Công nghiệp bán dẫn và vi mạch là trọng tâm chiến lược quốc gia mở ra tương lai công nghệ cao cho đất nước.',
            },
          ],
        },
        {
          id: 'cn9-b4',
          grade: 9,
          chapterId: 'cn9-c1',
          chapterTitle: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
          lessonNumber: 4,
          title: 'Bài 4. Quy trình lựa chọn nghề nghiệp',
          moduleCode: 'CAREER_CHOICE_04',
          description: 'Mô hình tam giác chọn nghề: Năng lực bản thân (Tôi có thể làm gì) - Sở thích đam mê (Tôi thích gì) - Nhu cầu xã hội (Xã hội cần gì).',
          summary: [
            'Quy trình 4 bước chọn nghề khoa học: 1. Tự thấu hiểu bản thân (tính cách, năng khiếu, sở trường) -> 2. Khám phá thế giới nghề nghiệp -> 3. So sánh đối chiếu sự phù hợp -> 4. Lập kế hoạch học tập và rèn luyện kỹ năng.',
            'Tránh các sai lầm phổ biến: Chọn nghề theo trào lưu bạn bè rủ rê; chọn nghề chỉ vì danh tiếng ảo mà không hợp năng lực; phó mặc cho sự may rủi.',
          ],
          keyPoints: [
            'Điểm giao thoa giữa Sở thích + Năng lực + Nhu cầu thị trường chính là sự nghiệp lý tưởng (mô hình Ikigai).',
          ],
          specs: [
            { label: '3 đỉnh tam giác chọn nghề', value: 'Sở thích & Đam mê, Năng lực bản thân, Nhu cầu thị trường lao động' },
            { label: 'Quy trình', value: 'Thấu hiểu bản thân -> Tìm hiểu nghề -> Đánh giá đối chiếu -> Quyết định & Hành động' },
          ],
          codeSimulation: {
            title: 'Thuật toán Định hướng nghề nghiệp STEM (Career Pathfinder Decoder)',
            lang: 'python',
            interactiveType: 'career_matrix',
            description: 'Giải thuật phân tích trọng số trắc nghiệm năng khiếu (Tư duy không gian, logic toán, khéo tay, giao tiếp) để gợi ý nhóm ngành kỹ thuật phù hợp.',
            code: `# STEM CAREER MATCHING ALGORITHM
def evaluate_career_fit(logic_score, hands_on_score, space_score):
    if logic_score >= 8 and space_score >= 8:
        return "Kỹ sư Thiết kế Vi mạch & Phần mềm AI"
    elif hands_on_score >= 8 and logic_score >= 6:
        return "Kỹ sư Tự động hóa & Kỹ thuật Robot Mechatronics"
    elif space_score >= 8 and hands_on_score >= 6:
        return "Kiến trúc sư & Kỹ sư Thiết kế Cơ khí CAD/CAM"
    else:
        return "Kỹ thuật viên Vận hành Hệ thống Mạng & An toàn Điện"`,
          },
          quiz: [
            {
              question: 'Mô hình tam giác chọn nghề khoa học yêu cầu người học sinh phải cân nhắc sự giao thoa của 3 yếu tố nào?',
              options: [
                'Sở thích đam mê + Năng lực bản thân + Nhu cầu việc làm của xã hội',
                'Ý kiến bạn thân + Độ nổi tiếng trên mạng xã hội + May rủi',
                'Nghề nào nhàn rỗi nhất + Ăn ngon nhất + Ngủ nhiều nhất',
                'Chọn nghề theo phong trào người khác làm gì mình làm đó',
              ],
              answerIndex: 0,
              explanation: 'Giao thoa giữa sở thích cá nhân, năng lực thực tế và nhu cầu của xã hội tạo nên sự nghiệp bền vững, thành công.',
            },
          ],
        },
        {
          id: 'cn9-b5',
          grade: 9,
          chapterId: 'cn9-c1',
          chapterTitle: 'Chủ Đề I: Định Hướng Nghề Nghiệp',
          lessonNumber: 5,
          title: 'Bài 5. Dự án: Tự đánh giá mức độ phù hợp của bản thân với một số ngành nghề trong lĩnh vực kĩ thuật, công nghệ',
          moduleCode: 'PROJECT_CAREER_FIT_05',
          description: 'Xây dựng hồ sơ nghề nghiệp cá nhân (Career Portfolio), làm bài test tính cách nghề và lập lộ trình học tập 3 năm THPT.',
          summary: [
            'Học sinh thực hiện bài tự đánh giá toàn diện: Điểm mạnh điểm yếu các môn KHTN (Toán, Lý, Hóa, Tin, Công nghệ); mức độ khéo léo của đôi tay; sự kiên trì nhẫn nại khi giải quyết sự cố.',
            'Lập kế hoạch hành động: Đặt mục tiêu điểm số các môn thi vào lớp 10, tham gia câu lạc bộ STEM robot hoặc tìm hiểu thực tế tại doanh nghiệp.',
          ],
          keyPoints: [
            'Hiểu mình trước khi chọn nghề là chìa khóa tránh việc học nhầm ngành gây lãng phí thanh xuân.',
          ],
          specs: [
            { label: 'Sản phẩm dự án', value: 'Bản đồ lộ trình nghề nghiệp cá nhân (Personal Career Roadmap)' },
            { label: 'Khung thời gian', value: 'Lộ trình định hướng 3 năm cấp 3 và 4 năm đại học/cao đẳng' },
          ],
          practicalProject: 'Lập bản đồ tư duy "Tôi là ai trong tương lai 2030" gắn liền với một nghề nghiệp kỹ thuật mà em mơ ước.',
          quiz: [
            {
              question: 'Mục đích lớn nhất của việc làm hồ sơ tự đánh giá nghề nghiệp bản thân là gì?',
              options: [
                'Nhận diện rõ điểm mạnh, điểm yếu và sở trường để chủ động lập kế hoạch học tập rèn luyện phù hợp',
                'Để so sánh hơn thua với bạn bè trong lớp',
                'Để nộp lấy điểm thưởng mà không cần đọc lại',
                'Để biết mình không cần phải cố gắng học thêm môn nào nữa',
              ],
              answerIndex: 0,
              explanation: 'Đánh giá bản thân giúp người học chủ động lấp đầy các kỹ năng còn thiếu và chuẩn bị nền tảng tốt cho tương lai.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn9-c2',
      grade: 9,
      title: 'Chủ Đề II: Lắp Đặt Mạng Điện Trong Nhà',
      code: 'CN9_MODULE_HOME_ELECTRICS',
      description: 'Thực hành kỹ thuật lắp ráp tủ điện gia đình: Thiết bị đóng cắt bảo vệ, phụ kiện đi dây luồn ống và mạch điều khiển cơ bản.',
      lessons: [
        {
          id: 'cn9-b6',
          grade: 9,
          chapterId: 'cn9-c2',
          chapterTitle: 'Chủ Đề II: Lắp Đặt Mạng Điện Trong Nhà',
          lessonNumber: 6,
          title: 'Bài 6. Thiết bị đóng cắt và lấy điện',
          moduleCode: 'ELEC_SWITCH_OUTLET_06',
          description: 'Cầu dao, công tắc một chiều, công tắc hai chiều (công tắc đảo chiều cầu thang), ổ cắm điện và phích cắm điện.',
          summary: [
            'Thiết bị đóng cắt: Cầu dao (đóng cắt đồng thời cả 2 cực pha và trung tính), công tắc (đóng cắt dòng điện vào tải, có loại 2 cực và loại 3 cực chuyển mạch).',
            'Thiết bị lấy điện: Ổ cắm điện (cố định trên tường/bảng điện), phích cắm điện (nối di động vào đồ dùng điện).',
            'Thông số định mức: Điện áp định mức (220V), Cường độ dòng điện định mức (ví dụ 10A, 16A). Không dùng quá công suất định mức gây chảy nhựa chập cháy.',
          ],
          keyPoints: [
            'Công tắc 3 cực (công tắc đảo chiều) thường dùng để lắp mạch đèn cầu thang bật tắt 2 vị trí độc lập.',
          ],
          specs: [
            { label: 'Loại công tắc', value: 'Công tắc 2 cực (1 vị trí), Công tắc 3 cực (đảo chiều cầu thang)' },
            { label: 'Tiêu chuẩn ổ cắm', value: 'Có màn che bảo vệ an toàn trẻ em và chân tiếp địa PE' },
          ],
          quiz: [
            {
              question: 'Để lắp đặt mạch điện điều khiển một bóng đèn cầu thang có thể bật và tắt ở cả tầng 1 và tầng 2, ta cần dùng loại công tắc nào?',
              options: [
                'Hai công tắc 3 cực (công tắc đảo chiều)',
                'Một công tắc 2 cực duy nhất',
                'Một cầu dao 2 cực',
                'Không có thiết bị nào làm được',
              ],
              answerIndex: 0,
              explanation: 'Hai công tắc 3 cực kết nối đảo cực cho phép đảo trạng thái đóng/ngắt đèn từ cả 2 vị trí đầu và cuối cầu thang.',
            },
          ],
        },
        {
          id: 'cn9-b7',
          grade: 9,
          chapterId: 'cn9-c2',
          chapterTitle: 'Chủ Đề II: Lắp Đặt Mạng Điện Trong Nhà',
          lessonNumber: 7,
          title: 'Bài 7. Dụng cụ lắp đặt mạng điện',
          moduleCode: 'ELEC_INSTALL_TOOLS_07',
          description: 'Kìm tuốt dây điện tự động, kìm bấm cos, tua vít thử điện, máy khoan bê tông cầm tay và đồng hồ đo vạn năng VOM.',
          summary: [
            'Dụng cụ đo và kiểm tra: Đồng hồ vạn năng DMM (đo điện áp V, dòng điện A, thông mạch Ω), bút thử điện.',
            'Dụng cụ cơ khí lắp điện: Kìm cắt chéo, kìm nhọn, kìm tuốt dây, tua vít 2 cạnh và 4 cạnh cách điện 1000V.',
            'Dụng cụ thi công: Máy khoan cầm tay, thước thủy nivo cân bằng bảng điện.',
          ],
          keyPoints: [
            'Tay cầm của mọi dụng cụ thợ điện đều phải được bọc lớp nhựa hoặc cao su cách điện đạt chứng chỉ an toàn.',
          ],
          specs: [
            { label: 'Đồng hồ đo', value: 'Digital Multimeter (VOM kỹ thuật số)' },
            { label: 'Cấp bảo vệ dụng cụ', value: 'Cách điện an toàn 1000V AC' },
          ],
          quiz: [
            {
              question: 'Dụng cụ nào giúp người thợ điện bóc tách lớp vỏ bọc cách điện PVC của dây điện nhanh gọn mà không làm đứt sợi lõi đồng bên trong?',
              options: ['Kìm tuốt dây điện chuyên dụng', 'Búa đinh', 'Cưa sắt kim loại', 'Kéo cắt giấy học sinh'],
              answerIndex: 0,
              explanation: 'Kìm tuốt dây có các cỡ lỗ chuẩn xác ôm vừa khít đường kính vỏ ngoài giúp tách vỏ mà không gây xước lõi đồng dẫn điện.',
            },
          ],
        },
        {
          id: 'cn9-b8',
          grade: 9,
          chapterId: 'cn9-c2',
          chapterTitle: 'Chủ Đề II: Lắp Đặt Mạng Điện Trong Nhà',
          lessonNumber: 8,
          title: 'Bài 8. Thiết kế và lắp đặt mạch điện điều khiển cơ bản',
          moduleCode: 'ELEC_CIRCUIT_DESIGN_08',
          description: 'Quy trình 5 bước lắp bảng điện gia đình: Vạch dấu -> Khoan lỗ -> Lắp thiết bị vào bảng -> Nối dây mạch điện -> Kiểm tra thông mạch.',
          summary: [
            'Mạch điện gồm: 1 Aptomat bảo vệ, 1 ổ cắm lấy điện, 1 công tắc đơn điều khiển 1 đèn sợi đốt/LED.',
            'Quy trình 5 bước thi công chuẩn công nghệ:',
            '1. Vạch dấu vị trí thiết bị trên bảng nhựa.',
            '2. Khoan lỗ bắt vít và lỗ luồn dây dẫn điện.',
            '3. Lắp cố định các khí cụ điện lên bảng.',
            '4. Đi dây theo sơ đồ lắp đặt (dây pha vào Aptomat trước, qua công tắc tới đuôi đèn; dây trung tính về đuôi đèn).',
            '5. Kiểm tra thông mạch bằng đồng hồ vạn năng VOM trước khi đóng điện thử tải.',
          ],
          keyPoints: [
            'Bắt buộc kiểm tra nguội (thông mạch, chống ngắn mạch) trước khi cắm nguồn điện 220V thực tế.',
          ],
          specs: [
            { label: 'Quy trình 5 bước', value: 'Vạch dấu -> Khoan lỗ -> Lắp thiết bị -> Đấu dây -> Kiểm tra thông mạch' },
            { label: 'Quy tắc an toàn', value: 'Cắt nguồn hoàn toàn khi đấu nối dây' },
          ],
          quiz: [
            {
              question: 'Tại sao sau khi đấu nối mạch điện xong, người thợ điện bắt buộc phải dùng đồng hồ đo điện kiểm tra nguội trước khi đóng cầu dao cấp điện?',
              options: [
                'Để phát hiện sớm nguy cơ chạm chập ngắn mạch (pha chạm trung tính), tránh nổ cầu dao và cháy dây dẫn',
                'Để làm sạch bụi bẩn trên bảng điện',
                'Để làm cho đèn sáng hơn',
                'Không cần thiết, có thể cắm điện ngay',
              ],
              answerIndex: 0,
              explanation: 'Kiểm tra thông mạch khi chưa cấp điện (kiểm tra nguội) đảm bảo không có sự đoản mạch giữa dây pha và dây mát, ngăn ngừa nổ chập điện.',
            },
          ],
        },
        {
          id: 'cn9-b9',
          grade: 9,
          chapterId: 'cn9-c2',
          chapterTitle: 'Chủ Đề II: Lắp Đặt Mạng Điện Trong Nhà',
          lessonNumber: 9,
          title: 'Bài 9. Dự án: Lắp đặt mạng điện mô hình',
          moduleCode: 'PROJECT_ELEC_MODEL_09',
          description: 'Thi công hoàn chỉnh bảng điện mô hình điều khiển phòng khách và hành lang chiếu sáng, đánh giá độ thẩm mỹ và an toàn.',
          summary: [
            'Học sinh thực hành theo nhóm trên bảng nhựa thực hành thí nghiệm kỹ thuật.',
            'Nội dung dự án: Lắp đặt mạch gồm Aptomat tổng, công tắc đơn điều khiển đèn phòng ngủ, cặp công tắc 3 cực điều khiển đèn cầu thang hành lang, và ổ cắm đôi có tiếp địa.',
            'Tiêu chí nghiệm thu: Mạch hoạt động đúng logic, đường dây đi vuông vức ghém vào máng gen thẩm mỹ, mối nối chắc chắn bọc gen co nhiệt an toàn.',
          ],
          keyPoints: [
            'Rèn luyện kỹ năng thực hành, tác phong công nghiệp và tinh thần hợp tác làm việc nhóm.',
          ],
          specs: [
            { label: 'Thiết bị thực hành', value: 'Bảng điện gỗ/nhựa 20x30cm, Aptomat MCB 10A, Công tắc 3 cực, Ống gen nẹp dây' },
            { label: 'Tiêu chí nghiệm thu', value: 'Chính xác chức năng, an toàn điện tuyệt đối, thẩm mỹ gọn gàng' },
          ],
          practicalProject: 'Lắp ráp hoàn chỉnh mô hình mạch điện gia đình thu nhỏ trên sa bàn gỗ, thuyết minh nguyên lý vận hành trước lớp.',
          quiz: [
            {
              question: 'Trong tiêu chuẩn nghiệm thu dự án lắp mạng điện thực tế, yếu tố nào dưới đây là bắt buộc hàng đầu?',
              options: [
                'An toàn cách điện tuyệt đối, không rò rỉ điện ra vỏ kim loại',
                'Dây điện phải càng loằng ngoằng càng tốt',
                'Bảng điện phải có thật nhiều màu sơn sặc sỡ',
                'Phải dùng dây điện kích cỡ nhỏ nhất có thể',
              ],
              answerIndex: 0,
              explanation: 'An toàn tính mạng của người sử dụng luôn là tiêu chuẩn số 1 trong mọi công trình cơ điện kỹ thuật.',
            },
          ],
        },
      ],
    },
  ],
};
