import { GradeCurriculum } from '../types/curriculum';

export const grade8Data: GradeCurriculum = {
  grade: 8,
  title: 'Công Nghệ 8',
  subTitle: 'Bộ Sách Kết Nối Tri Thức Với Cuộc Sống',
  colorScheme: {
    primary: 'amber-400',
    border: 'border-amber-500/40',
    glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-800',
    accent: '#f59e0b',
  },
  chapters: [
    {
      id: 'cn8-c1',
      grade: 8,
      title: 'Chương I: Vẽ Kỹ Thuật',
      code: 'CN8_MODULE_TECH_DRAWING',
      description: 'Ngôn ngữ của kỹ sư: Khổ giấy, tỷ lệ, 3 hình chiếu vuông góc, bản vẽ chi tiết, bản vẽ lắp và bản vẽ nhà.',
      lessons: [
        {
          id: 'cn8-b1',
          grade: 8,
          chapterId: 'cn8-c1',
          chapterTitle: 'Chương I: Vẽ Kỹ Thuật',
          lessonNumber: 1,
          title: 'Bài 1. Tiêu chuẩn bản vẽ kĩ thuật',
          moduleCode: 'DRAWING_STD_01',
          description: 'Hệ thống tiêu chuẩn TCVN và ISO: Khổ giấy vẽ (A0 đến A4), tỉ lệ hình vẽ, các loại nét vẽ và ghi kích thước chuẩn.',
          summary: [
            'Bản vẽ kỹ thuật là ngôn ngữ chung trong kỹ thuật sản xuất, chế tạo và thi công xây dựng.',
            'Các khổ giấy chính lập từ A0 (1189 x 841 mm), mỗi khổ kế tiếp bằng một nửa khổ trước đó (A1, A2, A3, A4 là 297 x 210 mm).',
            'Nét vẽ: Nét liền đậm (đường bao thấy), nét đứt mảnh (đường bao khuất), nét gạch chấm mảnh (đường tâm, đường trục đối xứng).',
          ],
          keyPoints: [
            'Khung vẽ và khung tên luôn nằm ở góc dưới bên phải bản vẽ.',
            'Ghi kích thước: Con số kích thước ghi trên đường kích thước, không phụ thuộc vào tỉ lệ bản vẽ.',
          ],
          specs: [
            { label: 'Khổ giấy học tập A4', value: '297 mm x 210 mm' },
            { label: 'Các loại tỉ lệ', value: 'Tỉ lệ nguyên hình (1:1), thu nhỏ (1:2, 1:5), phóng to (2:1, 5:1)' },
          ],
          quiz: [
            {
              question: 'Để biểu diễn đường bao khuất hoặc cạnh khuất của vật thể trên bản vẽ, ta sử dụng loại nét vẽ nào?',
              options: ['Nét đứt mảnh', 'Nét liền đậm', 'Nét gạch chấm mảnh', 'Nét lượn sóng'],
              answerIndex: 0,
              explanation: 'Theo TCVN, nét đứt mảnh quy định chuyên dùng để biểu diễn các đường bao và cạnh khuất.',
            },
          ],
        },
        {
          id: 'cn8-b2',
          grade: 8,
          chapterId: 'cn8-c1',
          chapterTitle: 'Chương I: Vẽ Kỹ Thuật',
          lessonNumber: 2,
          title: 'Bài 2. Hình chiếu vuông góc',
          moduleCode: 'PROJECTION_ORTHO_02',
          description: 'Phương pháp chiếu góc thứ nhất: Mặt phẳng chiếu đứng, bằng, cạnh; vị trí và mối quan hệ giữa 3 hình chiếu.',
          summary: [
            '3 mặt phẳng chiếu vuông góc: Mặt phẳng chiếu đứng (chính diện), mặt phẳng chiếu bằng (nằm ngang), mặt phẳng chiếu cạnh (bên phải).',
            'Bố cục 3 hình chiếu trên mặt phẳng: Hình chiếu bằng nằm ở dưới hình chiếu đứng; hình chiếu cạnh nằm ở bên phải hình chiếu đứng.',
          ],
          keyPoints: [
            'Hình chiếu đứng thể hiện chiều cao và chiều dài.',
            'Hình chiếu bằng thể hiện chiều dài và chiều rộng.',
            'Hình chiếu cạnh thể hiện chiều rộng và chiều cao.',
          ],
          specs: [
            { label: 'Hướng chiếu đứng', value: 'Từ trước tới' },
            { label: 'Hướng chiếu bằng', value: 'Từ trên xuống' },
            { label: 'Hướng chiếu cạnh', value: 'Từ trái sang' },
          ],
          quiz: [
            {
              question: 'Trên bản vẽ kỹ thuật theo phương pháp góc chiếu thứ nhất, hình chiếu bằng nằm ở vị trí nào so với hình chiếu đứng?',
              options: ['Ở ngay phía dưới hình chiếu đứng', 'Ở phía trên hình chiếu đứng', 'Ở bên trái hình chiếu đứng', 'Ở bên phải hình chiếu đứng'],
              answerIndex: 0,
              explanation: 'Mặt phẳng chiếu bằng được mở xoay xuống dưới 90 độ, do đó hình chiếu bằng nằm ngay dưới hình chiếu đứng.',
            },
          ],
        },
        {
          id: 'cn8-b3',
          grade: 8,
          chapterId: 'cn8-c1',
          chapterTitle: 'Chương I: Vẽ Kỹ Thuật',
          lessonNumber: 3,
          title: 'Bài 3. Bản vẽ chi tiết',
          moduleCode: 'DRAWING_DETAIL_03',
          description: 'Nội dung bản vẽ chi tiết (hình biểu diễn, kích thước, yêu cầu kỹ thuật, khung tên) và quy trình 4 bước đọc hiểu.',
          summary: [
            'Bản vẽ chi tiết bao gồm đầy đủ thông tin để chế tạo và kiểm tra một chi tiết máy độc lập.',
            'Trình tự 4 bước đọc: 1. Khung tên -> 2. Hình biểu diễn -> 3. Kích thước -> 4. Yêu cầu kĩ thuật (độ nhám, mạ bề mặt, dung sai).',
          ],
          keyPoints: [
            'Bản vẽ chi tiết là văn kiện công nghệ pháp lý trong nhà xưởng chế tạo cơ khí.',
          ],
          specs: [
            { label: '4 thành phần cốt lõi', value: 'Khung tên, Hình biểu diễn, Kích thước, Yêu cầu kỹ thuật' },
            { label: 'Trình tự đọc chuẩn', value: 'Khung tên -> Hình biểu diễn -> Kích thước -> Yêu cầu kỹ thuật' },
          ],
          quiz: [
            {
              question: 'Bước đầu tiên trong quy trình đọc bản vẽ chi tiết là gì?',
              options: ['Đọc Khung tên (tên chi tiết, vật liệu, tỉ lệ, người vẽ)', 'Đo đạc kích thước', 'Đọc yêu cầu xử lý nhiệt', 'Xem hình chiếu cạnh'],
              answerIndex: 0,
              explanation: 'Đọc khung tên trước tiên giúp nắm bắt tổng quát tên gọi chi tiết, công dụng, vật liệu chế tạo và tỷ lệ vẽ.',
            },
          ],
        },
        {
          id: 'cn8-b4',
          grade: 8,
          chapterId: 'cn8-c1',
          chapterTitle: 'Chương I: Vẽ Kỹ Thuật',
          lessonNumber: 4,
          title: 'Bài 4. Bản vẽ lắp',
          moduleCode: 'DRAWING_ASSEMBLY_04',
          description: 'Bản vẽ lắp ráp cụm máy, bảng kê các chi tiết số hiệu và quy trình đọc bản vẽ lắp ráp thiết bị.',
          summary: [
            'Bản vẽ lắp diễn tả hình dạng, kết cấu của một sản phẩm gồm nhiều chi tiết máy ghép nối lại với nhau.',
            'Nội dung bổ sung đặc biệt so với bản vẽ chi tiết là Bảng kê (danh mục số thứ tự, tên gọi, số lượng, vật liệu từng chi tiết).',
          ],
          keyPoints: [
            'Trình tự đọc: Khung tên -> Bảng kê -> Hình biểu diễn -> Kích thước -> Phân tích chi tiết -> Tổng hợp quy trình lắp ráp/tháo rời.',
          ],
          specs: [
            { label: 'Điểm đặc trưng', value: 'Có Bảng kê chi tiết (Part List)' },
            { label: 'Ứng dụng', value: 'Lắp ráp, kiểm tra, bảo trì cụm chi tiết máy' },
          ],
          quiz: [
            {
              question: 'Nội dung nào dưới đây có trong bản vẽ lắp mà KHÔNG có trong bản vẽ chi tiết đơn lẻ?',
              options: ['Bảng kê danh mục các chi tiết cấu thành', 'Khung tên bản vẽ', 'Kích thước chung', 'Hình biểu diễn'],
              answerIndex: 0,
              explanation: 'Bảng kê liệt kê số thứ tự, tên gọi, số lượng, vật liệu của từng chi tiết trong cụm lắp ráp.',
            },
          ],
        },
        {
          id: 'cn8-b5',
          grade: 8,
          chapterId: 'cn8-c1',
          chapterTitle: 'Chương I: Vẽ Kỹ Thuật',
          lessonNumber: 5,
          title: 'Bài 5. Bản vẽ nhà',
          moduleCode: 'DRAWING_HOUSE_05',
          description: 'Mặt bằng, mặt đứng, mặt cắt của ngôi nhà; các ký hiệu quy ước kiến trúc (cửa sổ, cầu thang, vách ngăn).',
          summary: [
            'Mặt bằng: Hình cắt bằng ngôi nhà bằng mặt phẳng cắt tưởng tượng nằm ngang cách sàn khoảng 1.5m, thể hiện vị trí các phòng, cửa đi, cửa sổ.',
            'Mặt đứng: Hình chiếu vuông góc các mặt ngoài ngôi nhà, thể hiện vẻ đẹp hình khối kiến trúc bên ngoài.',
            'Mặt cắt: Thể hiện các lớp kết cấu sàn, mái, chiều cao các tầng và cầu thang.',
          ],
          keyPoints: [
            'Mặt bằng là hình biểu diễn quan trọng nhất trong toàn bộ tập hồ sơ thiết kế ngôi nhà.',
          ],
          specs: [
            { label: 'Hình biểu diễn chính', value: 'Mặt bằng, Mặt đứng, Mặt cắt' },
            { label: 'Mặt phẳng cắt mặt bằng', value: 'Mặt phẳng nằm ngang cắt qua các cửa sổ (~1.5m)' },
          ],
          quiz: [
            {
              question: 'Hình biểu diễn quan trọng nhất của bản vẽ ngôi nhà thể hiện cách bố trí các phòng và lối đi là gì?',
              options: ['Mặt bằng ngôi nhà', 'Mặt đứng bên hông', 'Mặt cắt dọc', 'Phối cảnh mái ngói'],
              answerIndex: 0,
              explanation: 'Mặt bằng cho thấy diện tích sử dụng, vị trí các phòng ngủ, bếp, vệ sinh và hệ thống cửa thông phòng.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn8-c2',
      grade: 8,
      title: 'Chương II: Cơ Khí',
      code: 'CN8_MODULE_MECHANICAL',
      description: 'Vật liệu cơ khí, gia công nguội bằng tay, nguyên lý truyền động cơ học và định hướng ngành nghề cơ điện tử.',
      lessons: [
        {
          id: 'cn8-b6',
          grade: 8,
          chapterId: 'cn8-c2',
          chapterTitle: 'Chương II: Cơ Khí',
          lessonNumber: 6,
          title: 'Bài 6. Vật liệu cơ khí',
          moduleCode: 'MECH_MATERIAL_06',
          description: 'Phân loại kim loại (đen, màu), phi kim loại (chất dẻo nhiệt, dẻo nhiệt rắn, cao su) và cơ tính (độ bền, độ cứng, độ dẻo).',
          summary: [
            'Kim loại đen gồm gang (hàm lượng carbon > 2.14%) và thép (carbon <= 2.14%). Thép có độ bền chịu kéo cao, gang có tính đúc tốt.',
            'Kim loại màu (nhôm, đồng, titan): Dẫn điện dẫn nhiệt tốt, chống ăn mòn hóa học cao, dễ dát mỏng.',
            'Phi kim loại: Chất dẻo nhiệt (tái sinh được), chất dẻo nhiệt rắn (không nóng chảy lại được), cao su có độ đàn hồi cực đại.',
          ],
          keyPoints: [
            'Cơ tính quyết định khả năng làm việc của chi tiết dưới tác dụng của ngoại lực (độ bền, độ cứng, độ dẻo, độ dai va đập).',
          ],
          specs: [
            { label: 'Kim loại đen', value: 'Gang trắng, gang xám, thép cacbon, thép hợp kim' },
            { label: 'Kim loại màu', value: 'Đồng đỏ, đồng thau, hợp kim nhôm Duralumin' },
          ],
          quiz: [
            {
              question: 'Chất dẻo nào có đặc tính khi gia nhiệt bị nóng chảy thành chất lỏng và khi nguội thì đóng rắn lại, có thể tái sinh nhiều lần?',
              options: ['Chất dẻo nhiệt (Thermoplastics)', 'Chất dẻo nhiệt rắn (Thermosets)', 'Gốm sứ kỹ thuật', 'Cao su lưu hóa'],
              answerIndex: 0,
              explanation: 'Chất dẻo nhiệt (như PE, PP, PVC) có thể nấu chảy và tái sinh định hình nhiều chu kỳ mà không bị phân hủy liên kết phân tử.',
            },
          ],
        },
        {
          id: 'cn8-b7',
          grade: 8,
          chapterId: 'cn8-c2',
          chapterTitle: 'Chương II: Cơ Khí',
          lessonNumber: 7,
          title: 'Bài 7. Gia công cơ khí bằng tay',
          moduleCode: 'MECH_MANUAL_07',
          description: 'Phương pháp gia công nguội: Đo lấy dấu, cưa kim loại, đục và dũa kim loại; các quy tắc an toàn xưởng.',
          summary: [
            'Dụng cụ lấy dấu: Mũi vạch, chấm dấu, thước lá kim loại, compa đo dấu.',
            'Kỹ thuật cưa kim loại: Lắp lưỡi cưa hướng răng về phía trước; tư thế đứng chân trước chân sau vững chắc; khi đẩy ấn lực, khi kéo về không ấn.',
            'Dũa kim loại: Dùng để làm phẳng, bóng bề mặt gia công sau khi cưa hoặc đục.',
          ],
          keyPoints: [
            'An toàn là trên hết: Đeo kính bảo hộ mắt, kẹp chi tiết chặt vào êtô, không dùng dũa gãy cán.',
          ],
          specs: [
            { label: 'Dụng cụ chính', value: 'Êtô bàn nguội, Khung cưa tay, Bộ dũa dẹt/tròn, Búa nguội' },
            { label: 'An toàn lao động', value: 'Kính bảo hộ, găng tay, kẹp phôi chắc chắn' },
          ],
          quiz: [
            {
              question: 'Khi thao tác cưa kim loại bằng khung cưa tay, lực ấn của tay tác động vào lưỡi cưa ở hành trình nào?',
              options: ['Hành trình đẩy lưỡi cưa về phía trước', 'Hành trình kéo lùi cưa về sau', 'Cả hai hành trình đẩy và kéo như nhau', 'Không ấn lực nào cả'],
              answerIndex: 0,
              explanation: 'Răng cưa được thiết kế hướng mũi vát về phía trước, nên chỉ tác dụng lực cắt khi đẩy tiến lên.',
            },
          ],
        },
        {
          id: 'cn8-b8',
          grade: 8,
          chapterId: 'cn8-c2',
          chapterTitle: 'Chương II: Cơ Khí',
          lessonNumber: 8,
          title: 'Bài 8. Truyền và biến đổi chuyển động',
          moduleCode: 'MECH_MOTION_08',
          description: 'Cơ cấu truyền động đai, bánh răng, xích và cơ cấu biến đổi chuyển động (tay quay con trượt, cơ cấu trục vít).',
          summary: [
            'Tại sao cần truyền động: Động cơ thường có tốc độ quay cố định và vị trí cách xa bộ phận công tác, cần thay đổi tốc độ và mô-men xoắn.',
            'Công thức tỉ số truyền i: i = n1 / n2 = D2 / D1 (truyền động đai) hoặc i = Z2 / Z1 (truyền động bánh răng / xích).',
            'Biến đổi chuyển động: Chuyển chuyển động quay tròn của động cơ thành chuyển động tịnh tiến qua lại (pittông xe máy, máy may).',
          ],
          keyPoints: [
            'Nếu i > 1: Bộ truyền giảm tốc (tăng mô-men xoắn lực kéo).',
            'Nếu i < 1: Bộ truyền tăng tốc.',
          ],
          specs: [
            { label: 'Cơ cấu truyền động', value: 'Truyền động ma sát (đai), Truyền động ăn khớp (bánh răng, xích)' },
            { label: 'Cơ cấu biến đổi', value: 'Cơ cấu tay quay - con trượt, Cơ cấu tay quay - thanh lắc' },
          ],
          quiz: [
            {
              question: 'Một bộ truyền động bánh răng có bánh dẫn 20 răng (Z1 = 20) và bánh bị dẫn 60 răng (Z2 = 60). Tỉ số truyền i là bao nhiêu?',
              options: ['i = 3 (giảm tốc 3 lần, tăng lực mô-men xoắn)', 'i = 0.33', 'i = 1', 'i = 40'],
              answerIndex: 0,
              explanation: 'Tỉ số truyền i = Z2 / Z1 = 60 / 20 = 3. Bánh bị dẫn quay chậm hơn 3 lần nhưng có lực kéo gấp 3 lần.',
            },
          ],
        },
        {
          id: 'cn8-b9',
          grade: 8,
          chapterId: 'cn8-c2',
          chapterTitle: 'Chương II: Cơ Khí',
          lessonNumber: 9,
          title: 'Bài 9. Một số ngành nghề cơ khí',
          moduleCode: 'MECH_CAREERS_09',
          description: 'Tổng quan nghề kỹ sư cơ khí, thợ tiện phay CNC, thợ nguội lắp ráp, kỹ thuật viên bảo trì máy móc công nghiệp.',
          summary: [
            'Ngành cơ khí là xương sống của công nghiệp hóa hiện đại hóa đất nước.',
            'Các ngành nghề tiêu biểu: Kỹ sư thiết kế chế tạo máy (sử dụng phần mềm CAD/CAM), Kỹ thuật viên gia công máy CNC, Thợ hàn công nghệ cao, Kỹ sư bảo trì dây chuyền robot tự động.',
          ],
          keyPoints: [
            'Yêu cầu phẩm chất: Tính cẩn thận, tư duy không gian tốt, kỷ luật an toàn lao động cao và khả năng đọc bản vẽ.',
          ],
          specs: [
            { label: 'Công cụ làm việc hiện đại', value: 'Phần mềm SolidWorks, AutoCAD, Máy phay/tiện CNC 5 trục' },
            { label: 'Nhu cầu nhân lực', value: 'Rất cao trong các khu công nghiệp chế tạo' },
          ],
          quiz: [
            {
              question: 'Chuyên gia cơ khí điều khiển và lập trình các cỗ máy gia công chi tiết tự động với độ chính xác cao được gọi là gì?',
              options: ['Kỹ thuật viên / Lập trình viên máy CNC', 'Thợ xây dựng', 'Kỹ thuật viên chế biến thực phẩm', 'Chuyên viên tài chính'],
              answerIndex: 0,
              explanation: 'Máy CNC (Computer Numerical Control) dùng máy tính lập trình mã code G-code để cắt gọt kim loại chính xác từng micromet.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn8-c3',
      grade: 8,
      title: 'Chương III: An Toàn Điện',
      code: 'CN8_MODULE_ELEC_SAFETY',
      description: 'Cơ chế tác động sinh học của dòng điện, nguyên nhân tai nạn và các dụng cụ trang bị bảo vệ điện hạ thế.',
      lessons: [
        {
          id: 'cn8-b10',
          grade: 8,
          chapterId: 'cn8-c3',
          chapterTitle: 'Chương III: An Toàn Điện',
          lessonNumber: 10,
          title: 'Bài 10. Nguyên nhân gây tai nạn điện & Biện pháp an toàn',
          moduleCode: 'ELEC_ACCIDENT_10',
          description: 'Chạm trực tiếp dây pha mang điện, chạm gián tiếp vỏ thiết bị rò điện, vi phạm khoảng cách an toàn lưới điện cao thế.',
          summary: [
            'Các nguyên nhân chính: Chạm trực tiếp vào dây dẫn trần hoặc dây hở cách điện; chạm vào vỏ kim loại của thiết bị bị rò điện; phóng điện hồ quang khi lại gần lưới điện cao thế.',
            'Biện pháp an toàn: Cách điện hoàn hảo dây dẫn; nối đất bảo vệ vỏ máy giặt, bình nóng lạnh; ngắt cầu dao (Aptomat) trước khi sửa chữa.',
            'Quy trình sơ cứu người bị điện giật: Ngắt ngay nguồn điện (cắt cầu dao/rút phích cắm) -> Dùng vật cách điện gạt dây điện ra -> Hô hấp nhân tạo và ép tim ngoài lồng ngực.',
          ],
          keyPoints: [
            'Tuyệt đối không dùng tay không lôi nạn nhân đang bị điện giật khi chưa cắt nguồn điện!',
          ],
          specs: [
            { label: 'Điện áp an toàn người', value: 'Dưới 40V (trong điều kiện khô ráo bình thường)' },
            { label: 'Dòng điện nguy hiểm chết người', value: 'Trên 50 - 100 mA (0.05 - 0.1A)' },
          ],
          quiz: [
            {
              question: 'Hành động đầu tiên và khẩn cấp nhất khi phát hiện một người đang bị dòng điện giật là gì?',
              options: [
                'Nhanh chóng ngắt cầu dao, Aptomat hoặc rút phích cắm điện để cô lập nguồn điện',
                'Dùng tay không túm áo nạn nhân giật mạnh ra',
                'Đổ một xô nước lạnh lên người nạn nhân',
                'Bỏ chạy và chờ đợi 30 phút sau quay lại',
              ],
              answerIndex: 0,
              explanation: 'Ngắt nguồn điện ngay lập tức giúp cứu tính mạng nạn nhân và tránh cho người cứu hộ bị điện giật theo.',
            },
          ],
        },
        {
          id: 'cn8-b11',
          grade: 8,
          chapterId: 'cn8-c3',
          chapterTitle: 'Chương III: An Toàn Điện',
          lessonNumber: 11,
          title: 'Bài 11. Dụng cụ bảo vệ an toàn điện',
          moduleCode: 'ELEC_TOOLS_11',
          description: 'Bút thử điện kiểm tra dây pha/dây nguội, găng tay cao su cách điện, kìm điện, ủng cách điện và thảm cao su.',
          summary: [
            'Bút thử điện: Dụng cụ kiểm tra dây dẫn hoặc vỏ thiết bị có mang điện hay không mà không gây nguy hiểm (dòng điện chạy qua điện trở giảm áp 1MΩ và bóng đèn neon).',
            'Dụng cụ bảo hộ cách điện: Găng tay cao su, kìm điện bọc nhựa cách điện 1000V, ủng cách điện chuyên dụng.',
          ],
          keyPoints: [
            'Khi dùng bút thử điện, ngón tay phải tiếp xúc với chỏm kim loại ở đuôi bút.',
            'Bóng đèn neon sáng lên chứng tỏ điểm tiếp xúc là dây pha (dây lửa mang điện).',
          ],
          specs: [
            { label: 'Cấu tạo bút thử điện', value: 'Đầu kim loại, điện trở cản dòng cao, đèn neon, lò xo, chỏm tiếp xúc' },
            { label: 'Cấp cách điện kìm', value: '1000V chuẩn VDE' },
          ],
          quiz: [
            {
              question: 'Tại sao dòng điện đi qua bút thử điện vào người mà ta không bị điện giật?',
              options: [
                'Vì bên trong bút có một điện trở có giá trị cực lớn làm dòng điện giảm xuống mức an toàn không gây hại',
                'Vì tay người có khả năng chống điện 100%',
                'Vì bút thử điện phát ra sóng siêu âm đuổi điện',
                'Vì đèn neon hút hết điện',
              ],
              answerIndex: 0,
              explanation: 'Điện trở rất lớn (hơn 1 triệu Ohm) làm dòng điện giảm xuống chỉ còn vài microampe, đủ để đèn neon phát sáng nhưng vô hại với con người.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn8-c4',
      grade: 8,
      title: 'Chương IV: Kĩ Thuật Điện',
      code: 'CN8_MODULE_ELEC_CIRCUIT',
      description: 'Mạch điện nguồn - tải - điều khiển, các đồ dùng điện gia đình và sơ đồ mạng điện sinh hoạt.',
      lessons: [
        {
          id: 'cn8-b12',
          grade: 8,
          chapterId: 'cn8-c4',
          chapterTitle: 'Chương IV: Kĩ Thuật Điện',
          lessonNumber: 12,
          title: 'Bài 12. Mạch điện cơ bản',
          moduleCode: 'ELEC_BASIC_12',
          description: 'Cấu trúc mạch điện gồm nguồn điện, dây dẫn, thiết bị đóng cắt bảo vệ (công tắc, cầu chì/Aptomat) và tải tiêu thụ.',
          summary: [
            'Mạch điện là tập hợp các phần tử điện ghép nối tạo thành vòng kín cho dòng điện chạy qua.',
            '4 thành phần cốt lõi: Nguồn điện (pin, máy phát) -> Thiết bị truyền dẫn (dây dẫn điện) -> Thiết bị điều khiển & bảo vệ (công tắc, cầu chì, Aptomat) -> Thiết bị tiêu thụ điện (đèn, quạt, nồi cơm).',
          ],
          keyPoints: [
            'Công tắc và thiết bị bảo vệ luôn được mắc nối tiếp trên dây pha (dây nóng).',
          ],
          specs: [
            { label: 'Điện áp lưới điện VN', value: '220V xoay chiều tần số 50Hz' },
            { label: 'Phần tử bảo vệ', value: 'Cầu chì, Cầu dao tự động MCB (Aptomat)' },
          ],
          codeSimulation: {
            title: 'Mô phỏng Mạch điện và Aptomat an toàn (Circuit Lab)',
            lang: 'c++',
            interactiveType: 'circuit_breaker',
            description: 'Mô phỏng mạch điện sinh hoạt 220V với Aptomat chống quá tải và rò dòng (RCBO). Bật tắt công tắc để thắp sáng bóng đèn.',
            code: `// AC 220V CIRCUIT SIMULATOR
#define BREAKER_ON 1
#define SWITCH_ON 1
#define RATED_CURRENT 10.0 // Ampe định mức

float calculateCurrent(float powerWatts, float voltage) {
  return powerWatts / voltage;
}

void checkCircuitSafety(float totalCurrent) {
  if (totalCurrent > RATED_CURRENT) {
    // Kích hoạt nhả lẫy Aptomat bảo vệ mạch
    tripBreaker("TRIP_OVERLOAD_CURRENT");
  }
}`,
          },
          quiz: [
            {
              question: 'Trong mạng điện sinh hoạt gia đình, công tắc điều khiển bóng đèn bắt buộc phải lắp trên dây nào?',
              options: ['Dây pha (dây nóng)', 'Dây trung tính (dây nguội)', 'Dây nối đất tiếp địa', 'Lắp dây nào cũng như nhau'],
              answerIndex: 0,
              explanation: 'Lắp công tắc trên dây pha để khi ngắt công tắc thì bóng đèn hoàn toàn không còn điện thế nguy hiểm, an toàn khi thay bóng.',
            },
          ],
        },
        {
          id: 'cn8-b13',
          grade: 8,
          chapterId: 'cn8-c4',
          chapterTitle: 'Chương IV: Kĩ Thuật Điện',
          lessonNumber: 13,
          title: 'Bài 13. Đồ dùng điện trong gia đình',
          moduleCode: 'ELEC_APPLIANCE_13',
          description: 'Đồ dùng loại điện - quang (đèn LED), điện - nhiệt (nồi cơm, bàn là), điện - cơ (quạt điện, máy bơm nước).',
          summary: [
            'Nhóm điện - quang: Đèn sợi đốt, đèn huỳnh quang, đèn LED siêu tiết kiệm điện (hiệu suất phát quang cao, tuổi thọ lên tới 50.000 giờ).',
            'Nhóm điện - nhiệt: Biến đổi điện năng thành nhiệt năng nhờ dây điện trở (dây mayso bằng Niken-Crom).',
            'Nhóm điện - cơ: Biến điện năng thành cơ năng quay nhờ từ trường trong động cơ điện xoay chiều 1 pha.',
          ],
          keyPoints: [
            'Sử dụng đèn LED và thiết bị có dán nhãn năng lượng 5 sao để tiết kiệm tiền điện tối đa.',
          ],
          specs: [
            { label: '3 nhóm đồ dùng điện', value: 'Điện - Quang, Điện - Nhiệt, Điện - Cơ' },
            { label: 'Đèn LED tiết kiệm', value: 'Tiết kiệm tới 80% điện so với đèn sợi đốt' },
          ],
          quiz: [
            {
              question: 'Dây đốt nóng trong các thiết bị điện - nhiệt (như bàn là, ấm đun siêu tốc) thường được làm bằng hợp kim gì?',
              options: ['Hợp kim Niken - Crom (dây mayso có điện trở suất cao, chịu nhiệt)', 'Kim loại đồng nguyên chất', 'Thủy tinh chịu nhiệt', 'Nhôm dẻo'],
              answerIndex: 0,
              explanation: 'Hợp kim Niken - Crom có điện trở suất rất cao và khả năng chống oxy hóa ở nhiệt độ nóng đỏ lên đến 1000°C.',
            },
          ],
        },
        {
          id: 'cn8-b14',
          grade: 8,
          chapterId: 'cn8-c4',
          chapterTitle: 'Chương IV: Kĩ Thuật Điện',
          lessonNumber: 14,
          title: 'Bài 14. Lắp đặt mạng điện sinh hoạt',
          moduleCode: 'ELEC_INSTALL_14',
          description: 'Sơ đồ nguyên lý vs sơ đồ lắp đặt mạng điện trong phòng; kỹ thuật nối dây dẫn điện thẳng và phân nhánh.',
          summary: [
            'Sơ đồ nguyên lý: Chỉ nêu mối liên hệ về mặt điện của các phần tử mà không phụ thuộc vào vị trí không gian thực tế.',
            'Sơ đồ lắp đặt: Thể hiện rõ vị trí lắp đặt thực tế của bảng điện, bóng đèn, đường ống luồn dây gen trong phòng.',
            'Kỹ thuật nối dây: Mối nối thẳng (nối nối tiếp), mối nối rẽ (mối nối phân nhánh chữ T), bọc cách điện chắc chắn.',
          ],
          keyPoints: [
            'Mối nối phải dẫn điện tốt, chịu lực cơ học cao và cách điện an toàn tuyệt đối.',
          ],
          specs: [
            { label: '2 loại sơ đồ', value: 'Sơ đồ nguyên lý & Sơ đồ lắp đặt' },
            { label: 'Yêu cầu mối nối', value: 'Dẫn điện tốt, cơ học bền, cách điện an toàn' },
          ],
          quiz: [
            {
              question: 'Sơ đồ mạng điện thể hiện vị trí thực tế của bảng điện, dây luồn và thiết bị trong phòng gọi là gì?',
              options: ['Sơ đồ lắp đặt', 'Sơ đồ nguyên lý', 'Sơ đồ tư duy', 'Bản vẽ mặt cắt nhà'],
              answerIndex: 0,
              explanation: 'Sơ đồ lắp đặt dựa trên mặt bằng thực tế của phòng để hướng dẫn thợ điện thi công đục tường luồn dây chính xác.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn8-c5',
      grade: 8,
      title: 'Chương V: Thiết Kế Kĩ Thuật',
      code: 'CN8_MODULE_TECH_DESIGN',
      description: 'Tư duy kỹ thuật sáng tạo, quy trình thiết kế chế tạo sản phẩm từ bài toán thực tiễn đến mô hình mẫu.',
      lessons: [
        {
          id: 'cn8-b15',
          grade: 8,
          chapterId: 'cn8-c5',
          chapterTitle: 'Chương V: Thiết Kế Kĩ Thuật',
          lessonNumber: 15,
          title: 'Bài 15. Khái quát về thiết kế kĩ thuật',
          moduleCode: 'DESIGN_INTRO_15',
          description: 'Khái niệm, mục đích phát triển công nghệ và các nguyên tắc thiết kế tối ưu, nhân trắc học, thẩm mỹ.',
          summary: [
            'Thiết kế kỹ thuật là hoạt động sáng tạo của con người nhằm tạo ra giải pháp công nghệ, sản phẩm hoặc công trình đáp ứng nhu cầu cuộc sống.',
            'Các nguyên tắc: Nguyên tắc công năng (sử dụng tốt), nguyên tắc an toàn, nguyên tắc thẩm mỹ, nguyên tắc kinh tế và bảo vệ môi trường.',
          ],
          keyPoints: [
            'Mọi vật dụng xung quanh ta (từ chiếc ghế ngồi, bàn phím, ô tô, điện thoại) đều là sản phẩm của thiết kế kỹ thuật.',
          ],
          specs: [
            { label: 'Bản chất', value: 'Sáng tạo giải pháp kỹ thuật giải quyết vấn đề con người' },
            { label: 'Tiêu chí đánh giá', value: 'Công năng, độ bền, thẩm mỹ, giá thành, sinh thái' },
          ],
          quiz: [
            {
              question: 'Yếu tố nào sau đây là quan trọng hàng đầu trong thiết kế kỹ thuật một sản phẩm tiêu dùng?',
              options: ['Đảm bảo tính năng sử dụng (công năng) và an toàn cho người dùng', 'Sản phẩm phải đắt tiền nhất có thể', 'Sản phẩm phải thật nặng', 'Sản phẩm chỉ dùng một lần rồi vứt'],
              answerIndex: 0,
              explanation: 'Công năng và sự an toàn là mục đích cốt lõi tồn tại của bất kỳ sản phẩm kỹ thuật nào.',
            },
          ],
        },
        {
          id: 'cn8-b16',
          grade: 8,
          chapterId: 'cn8-c5',
          chapterTitle: 'Chương V: Thiết Kế Kĩ Thuật',
          lessonNumber: 16,
          title: 'Bài 16. Quy trình thiết kế kĩ thuật',
          moduleCode: 'DESIGN_PROCESS_16',
          description: 'Chu trình thiết kế 5 bước: Xác định vấn đề -> Tìm giải pháp -> Chế tạo mẫu -> Thử nghiệm đánh giá -> Hoàn thiện hồ sơ.',
          summary: [
            'Chu trình thiết kế kỹ thuật lặp (Iterative Engineering Design Process):',
            'Bước 1: Xác định vấn đề và tiêu chí thiết kế.',
            'Bước 2: Tìm kiếm thông tin và đề xuất các phương án giải pháp.',
            'Bước 3: Lựa chọn phương án tối ưu và thiết kế chi tiết.',
            'Bước 4: Chế tạo nguyên mẫu thử nghiệm (Prototype).',
            'Bước 5: Thử nghiệm, đánh giá và cải tiến lặp lại cho đến khi đạt chuẩn.',
          ],
          keyPoints: [
            'Thất bại trong thử nghiệm mẫu là cơ hội quý giá để tìm ra nguyên nhân và cải tiến sản phẩm.',
          ],
          specs: [
            { label: 'Mô hình thiết kế', value: 'Chu trình lặp 5 bước (Engineering Design Loop)' },
            { label: 'Sản phẩm đầu ra', value: 'Bản vẽ thiết kế + Mẫu thử nghiệm (Prototype) + Thuyết minh' },
          ],
          practicalProject: 'Thực hành thiết kế và chế tạo một giá đỡ điện thoại thông minh đa năng bằng vật liệu tái chế (gỗ/bìa carton).',
          quiz: [
            {
              question: 'Khi thử nghiệm mô hình mẫu (Prototype) mà kết quả chưa đạt yêu cầu, kỹ sư cần làm gì tiếp theo?',
              options: [
                'Phân tích nguyên nhân lỗi, điều chỉnh phương án thiết kế và thử nghiệm lại (cải tiến lặp)',
                'Hủy bỏ toàn bộ dự án ngay lập tức',
                'Bán sản phẩm lỗi ra thị trường',
                'Đổ lỗi cho vật liệu',
              ],
              answerIndex: 0,
              explanation: 'Bản chất của quy trình thiết kế kỹ thuật là chu trình cải tiến liên tục để khắc phục điểm yếu của nguyên mẫu.',
            },
          ],
        },
      ],
    },
  ],
};
