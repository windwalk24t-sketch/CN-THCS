import { GradeCurriculum } from '../types/curriculum';

export const grade7Data: GradeCurriculum = {
  grade: 7,
  title: 'Công Nghệ 7',
  subTitle: 'Bộ Sách Kết Nối Tri Thức Với Cuộc Sống',
  colorScheme: {
    primary: 'emerald-400',
    border: 'border-emerald-500/40',
    glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
    accent: '#10b981',
  },
  chapters: [
    {
      id: 'cn7-c1',
      grade: 7,
      title: 'Chương I: Trồng Trọt',
      code: 'CN7_MODULE_AGRITECH',
      description: 'Quy trình sản xuất nông nghiệp công nghệ cao, thổ nhưỡng học, nhân giống vô tính và dự án trồng rau an toàn.',
      lessons: [
        {
          id: 'cn7-b1',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 1,
          title: 'Bài 1. Giới thiệu về trồng trọt',
          moduleCode: 'AGRI_INTRO_01',
          description: 'Vai trò của trồng trọt đối với con người và nền kinh tế; các phương thức trồng trọt phổ biến và xu hướng công nghệ cao.',
          summary: [
            'Trồng trọt cung cấp lương thực, thực phẩm cho con người; thức ăn cho chăn nuôi; nguyên liệu cho công nghiệp chế biến và nông sản xuất khẩu.',
            'Các phương thức trồng trọt: Trồng ngoài tự nhiên (truyền thống) và trồng trọt trong nhà có mái che (nhà màng, nhà lưới, nhà kính).',
            'Nông nghiệp 4.0: Ứng dụng tưới nhỏ giọt tự động, cảm biến độ ẩm IoT, flycam phun thuốc trừ sâu sinh học.',
          ],
          keyPoints: [
            'Trồng trọt chiếm vị trí chiến lược đảm bảo an ninh lương thực quốc gia.',
            'Trồng trọt trong nhà kính giúp chủ động kiểm soát vi khí hậu, tránh sâu bệnh và hạn chế tác động thời tiết cực đoan.',
          ],
          specs: [
            { label: 'Vai trò ngành', value: 'Lương thực, nguyên liệu công nghiệp, xuất khẩu' },
            { label: 'Phương thức tiên tiến', value: 'Nhà kính IoT, Thủy canh (Hydroponics), Khí canh (Aeroponics)' },
          ],
          quiz: [
            {
              question: 'Ưu điểm lớn nhất của phương thức trồng trọt trọt trong nhà kính công nghệ cao là gì?',
              options: [
                'Chủ động kiểm soát nhiệt độ, độ ẩm, ánh sáng và ngăn chặn sâu bọ gây hại',
                'Hoàn toàn không cần nước tưới cây',
                'Cây trồng phát triển mà không cần ánh sáng',
                'Chi phí đầu tư ban đầu bằng 0 đồng',
              ],
              answerIndex: 0,
              explanation: 'Nhà màng/nhà kính tạo vi khí hậu khép kín, kiểm soát tối ưu mọi thông số môi trường cho cây.',
            },
          ],
        },
        {
          id: 'cn7-b2',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 2,
          title: 'Bài 2. Làm đất trồng cây',
          moduleCode: 'AGRI_SOIL_02',
          description: 'Thành phần cấu tạo của đất trồng, quy trình cày bừa xới xáo, bón lót và lên luống thoát nước.',
          summary: [
            'Đất trồng bao gồm 3 phần: Phần rắn (chất vô cơ và chất hữu cơ mùn), phần lỏng (nước hòa tan dưỡng chất) và phần khí (oxy cho rễ hô hấp).',
            'Quy trình làm đất: Cày lật đất -> Bừa và đập nhỏ đất -> Lên luống (tùy loại cây) -> Bón lót phân hữu cơ ủ hoai mục.',
          ],
          keyPoints: [
            'Đất tơi xốp giúp rễ cây hô hấp tốt, giữ ẩm và giải phóng chất dinh dưỡng.',
            'Lên luống cao giúp chống ngập úng mùa mưa bão và thuận tiện tưới tiêu xới cỏ.',
          ],
          specs: [
            { label: 'Thành phần đất', value: 'Phần rắn (khoáng + mùn), Phần lỏng (nước), Phần khí (oxy)' },
            { label: 'Quy trình chuẩn', value: 'Cày -> Bừa -> Đập đất -> Bón lót -> Lên luống' },
          ],
          quiz: [
            {
              question: 'Phần khí trong đất có vai trò chủ yếu gì đối với sự sống của cây trồng?',
              options: ['Cung cấp oxy cho rễ cây và vi sinh vật có ích hô hấp', 'Làm đất bị chua hóa nhanh', 'Làm cây úng rễ chết', 'Không có tác dụng gì'],
              answerIndex: 0,
              explanation: 'Khí trong khe hở đất giàu oxy, cần thiết để tế bào lông hút của rễ hô hấp tạo năng lượng hút khoáng.',
            },
          ],
        },
        {
          id: 'cn7-b3',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 3,
          title: 'Bài 3. Gieo trồng, chăm sóc và phòng trừ sâu bệnh cho cây trồng',
          moduleCode: 'AGRI_CROP_CARE_03',
          description: 'Thời vụ gieo trồng, kỹ thuật tỉa dặm, tưới nước, bón thúc và nguyên tắc phòng trừ dịch hại tổng hợp IPM.',
          summary: [
            'Kỹ thuật gieo trồng: Gieo hạt (trực tiếp hoặc ươm bầu) và trồng bằng cây con (cây con có bầu đất, bộ rễ khỏe).',
            'Chăm sóc cây trồng: Tỉa và dặm cây đảm bảo mật độ -> Làm cỏ, vun xới gốc -> Tưới tiêu nước hợp lý -> Bón phân thúc đón nhánh/hoa/quả.',
            'Phòng trừ sâu bệnh theo nguyên tắc IPM: Phòng là chính; ưu tiên biện pháp sinh học, canh tác, thủ công; chỉ dùng hóa chất khi dịch hại vượt ngưỡng kinh tế.',
          ],
          keyPoints: [
            'Tưới nước lúc sáng sớm hoặc chiều mát, tránh tưới đẫm khi trời đang nắng gắt.',
            'Ưu tiên chế phẩm sinh học (nấm Trichoderma, bẫy dính màu vàng) để bảo vệ môi trường và người tiêu dùng.',
          ],
          specs: [
            { label: 'Nguyên tắc quản lý dịch', value: 'IPM (Quản lý dịch hại tổng hợp)' },
            { label: 'Kỹ thuật tưới hiện đại', value: 'Tưới phun sương, tưới nhỏ giọt tiết kiệm 50% nước' },
          ],
          codeSimulation: {
            title: 'Hệ thống Tưới nhỏ giọt thông minh (IoT Smart Farm Node)',
            lang: 'c++',
            interactiveType: 'irrigation_system',
            description: 'Thuật toán đọc độ ẩm từ cảm biến điện dung đất. Nếu độ ẩm < 40%, tự động bật máy bơm tưới nhỏ giọt.',
            code: `// SMART DRIP IRRIGATION SYSTEM
#define SOIL_SENSOR_PIN A0
#define WATER_PUMP_PIN 7
#define THRESHOLD_DRY 40 // Ngưỡng độ ẩm %

void loop() {
  int rawValue = analogRead(SOIL_SENSOR_PIN);
  int moisturePercent = map(rawValue, 1023, 0, 0, 100);
  
  if (moisturePercent < THRESHOLD_DRY) {
    digitalWrite(WATER_PUMP_PIN, HIGH); // Bật bơm tưới
  } else {
    digitalWrite(WATER_PUMP_PIN, LOW);  // Đủ ẩm ngắt bơm
  }
  delay(1000);
}`,
          },
          quiz: [
            {
              question: 'Biện pháp nào sau đây thuộc nhóm biện pháp sinh học trong phòng trừ sâu bệnh?',
              options: [
                'Sử dụng thiên địch như bọ rùa ăn rệp hoặc bẫy ong ký sinh',
                'Phun thuốc trừ sâu hóa học nồng độ cực cao',
                'Rắc vôi bột khử khuẩn',
                'Dùng vợt bắt bướm thủ công',
              ],
              answerIndex: 0,
              explanation: 'Dùng sinh vật có ích (thiên địch) tiêu diệt sâu hại là cốt lõi của biện pháp sinh học thân thiện môi trường.',
            },
          ],
        },
        {
          id: 'cn7-b4',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 4,
          title: 'Bài 4. Thu hoạch sản phẩm trồng trọt',
          moduleCode: 'AGRI_HARVEST_04',
          description: 'Thời điểm thu hoạch chuẩn sinh lý, các phương pháp thu hoạch (hái, cắt, nhổ, đào) và bảo quản sau thu hoạch.',
          summary: [
            'Thu hoạch đúng lúc: Đúng độ chín thương phẩm, vào ngày khô ráo, tránh dập nát cơ học.',
            'Các phương pháp: Hái bằng tay (hoa quả mềm), cắt bằng kéo chuyên dụng (rau, hoa), nhổ (rau ăn củ), đào (khoai tây, gừng).',
            'Sơ chế và đóng gói sau thu hoạch: Làm sạch, phân loại kích cỡ phẩm cấp, làm mát sơ bộ và bảo quản lạnh bảo vệ chuỗi giá trị.',
          ],
          keyPoints: [
            'Thu hoạch quá sớm sẽ giảm hàm lượng đường và vi chất, thu hoạch quá muộn nông sản dễ xơ hóa hoặc thối rữa.',
            'Vết cắt phải dứt khoát tránh tạo điều kiện cho vi nấm xâm nhập vết thương hở.',
          ],
          specs: [
            { label: 'Phương pháp thu hái', value: 'Hái, cắt cành, nhổ rễ, đào củ, máy gặt đập' },
            { label: 'Quy chuẩn chất lượng', value: 'VietGAP, GlobalGAP, Nông sản hữu cơ Organic' },
          ],
          quiz: [
            {
              question: 'Tại sao không nên thu hoạch rau ăn lá vào giữa trưa lúc trời nắng gắt?',
              options: [
                'Rau dễ bị mất nước nhanh, héo rũ và suy giảm vitamin',
                'Vì giữa trưa cây quang hợp tạo ra chất độc',
                'Vì giá rau buổi trưa luôn rẻ nhất',
                'Vì sâu bọ trốn vào đất khó bắt',
              ],
              answerIndex: 0,
              explanation: 'Nắng gắt khiến cây thoát hơi nước dữ dội, tế bào rau mất sức trương nước gây héo và thối nhanh sau thu hoạch.',
            },
          ],
        },
        {
          id: 'cn7-b5',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 5,
          title: 'Bài 5. Nhân giống vô tính cây trồng',
          moduleCode: 'AGRI_PROPAGATE_05',
          description: 'Cơ sở sinh học và quy trình kỹ thuật giâm cành, chiết cành, ghép cành và nuôi cấy mô tế bào thực vật.',
          summary: [
            'Nhân giống vô tính tạo ra cá thể con mang hoàn toàn đặc tính di truyền ưu việt của cây mẹ mà không qua thụ phấn thụ tinh.',
            'Giâm cành: Cắt một đoạn cành bánh tẻ, cắm vào giá thể giữ ẩm để kích thích rễ phụ đâm chồi.',
            'Chiết cành: Khoanh vỏ thân cành, bó bầu đất kích thích ra rễ ngay trên cây mẹ rồi mới cắt đem trồng.',
            'Ghép cành/mắt: Gắn cành ghép hoặc mắt ghép vào gốc ghép sao cho các tầng sinh mô tiếp xúc khít nhau.',
          ],
          keyPoints: [
            'Chọn cành bánh tẻ (không quá non cũng không quá già, khỏe mạnh, không sâu bệnh).',
            'Đảm bảo dao chiết ghép phải sắc bén và được khử trùng bằng cồn y tế.',
          ],
          specs: [
            { label: 'Các phương pháp chính', value: 'Giâm cành, Chiết cành, Ghép cành, Nuôi cấy mô tế bào' },
            { label: 'Ưu điểm', value: 'Cây con giữ trọn vẹn đặc tính tốt của cây mẹ, ra hoa kết trái sớm' },
          ],
          quiz: [
            {
              question: 'Điều kiện then chốt để cành ghép có thể dính liền và sống được trên gốc ghép là gì?',
              options: [
                'Tầng sinh mô (tượng tầng) của mắt ghép và gốc ghép phải tiếp xúc khít vào nhau',
                'Phải tưới thật nhiều dầu ăn vào vết ghép',
                'Cắt gốc ghép càng sâu càng tốt',
                'Ghép vào ban đêm dưới trời mưa to',
              ],
              answerIndex: 0,
              explanation: 'Tầng sinh mô là nơi tế bào phân chia tích cực để hàn gắn mạch dẫn nhựa giữa cành ghép và gốc ghép.',
            },
          ],
        },
        {
          id: 'cn7-b6',
          grade: 7,
          chapterId: 'cn7-c1',
          chapterTitle: 'Chương I: Trồng Trọt',
          lessonNumber: 6,
          title: 'Bài 6. Dự án: Trồng rau an toàn',
          moduleCode: 'PROJECT_CLEAN_VEG_06',
          description: 'Lập kế hoạch, chuẩn bị đất dinh dưỡng, gieo hạt giống, chăm sóc và thu hoạch rau mầm/rau ăn lá tại nhà.',
          summary: [
            'Mục tiêu dự án: Học sinh làm chủ chu trình sinh trưởng của cây trồng từ khi gieo hạt đến khi thu hoạch sản phẩm sạch.',
            'Các bước tiến hành: Chọn giống rau (cải ngọt, xà lách, rau muống hạt) -> Phối trộn đất sạch xơ dừa trấu hun -> Gieo hạt mật độ thích hợp -> Chăm sóc tưới ẩm mỗi ngày -> Nhật ký theo dõi chiều cao và sâu bệnh -> Thu hoạch.',
          ],
          keyPoints: [
            'Sử dụng phân bón hữu cơ sinh học, cách ly tối thiểu trước khi thu hoạch.',
            'Ghi chép số liệu khoa học vào nhật ký sinh trưởng của cây trồng.',
          ],
          specs: [
            { label: 'Thời gian sinh trưởng', value: '25 - 35 ngày (rau ăn lá), 5 - 7 ngày (rau mầm)' },
            { label: 'Vật liệu thực hành', value: 'Khay xốp/chậu nhựa có lỗ thoát nước, hạt giống F1, giá thể đất vi sinh' },
          ],
          practicalProject: 'Thực hành trồng một khay rau mầm hoặc chậu rau xà lách sạch tại góc học tập, chụp ảnh nhật ký mỗi 3 ngày.',
          quiz: [
            {
              question: 'Khi trồng rau trong chậu hoặc khay xốp, thao tác nào dưới đây bắt buộc phải làm trước khi đổ đất?',
              options: [
                'Đục các lỗ thoát nước ở đáy khay để chống ngập úng rễ',
                'Sơn màu đen kín toàn bộ bên trong khay',
                'Đổ đầy nước vào khay rồi mới thả đất vào',
                'Dán băng dính bịt kín toàn bộ khay',
              ],
              answerIndex: 0,
              explanation: 'Không có lỗ thoát nước thì rễ cây sẽ thiếu oxy và bị thối úng khi tưới.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn7-c2',
      grade: 7,
      title: 'Chương II: Lâm Nghiệp',
      code: 'CN7_MODULE_FORESTRY',
      description: 'Hệ sinh thái rừng, vai trò bảo vệ lá phổi xanh của Trái Đất, quy trình trồng và chăm sóc cây rừng.',
      lessons: [
        {
          id: 'cn7-b7',
          grade: 7,
          chapterId: 'cn7-c2',
          chapterTitle: 'Chương II: Lâm Nghiệp',
          lessonNumber: 7,
          title: 'Bài 7. Giới thiệu về rừng và lâm nghiệp',
          moduleCode: 'FOREST_INTRO_07',
          description: 'Phân loại rừng (rừng phòng hộ, đặc dụng, sản xuất), vai trò điều hòa khí hậu và chống xói mòn.',
          summary: [
            'Rừng là hệ sinh thái phức tạp gồm quần xã thực vật, động vật và môi trường sống.',
            '3 loại rừng tại Việt Nam: Rừng phòng hộ (chắn gió, chắn sóng, giữ nguồn nước), Rừng đặc dụng (bảo tồn đa dạng sinh học, vườn quốc gia), Rừng sản xuất (cung cấp gỗ và lâm sản).',
          ],
          keyPoints: [
            'Rừng ngăn chặn lũ quét, sạt lở đất đồi núi và là bể chứa carbon hấp thụ CO2 khổng lồ.',
            'Bảo vệ rừng là trách nhiệm pháp lý và đạo đức của toàn xã hội.',
          ],
          specs: [
            { label: 'Phân loại 3 nhóm rừng', value: 'Phòng hộ, Đặc dụng, Sản xuất' },
            { label: 'Độ che phủ mục tiêu', value: 'Duy trì trên 42% diện tích lãnh thổ Việt Nam' },
          ],
          quiz: [
            {
              question: 'Vườn quốc gia Cúc Phương hoặc Ba Vì thuộc nhóm rừng nào theo quy định pháp luật?',
              options: ['Rừng đặc dụng', 'Rừng sản xuất', 'Rừng công nghiệp gỗ', 'Rừng nhân tạo ven biển'],
              answerIndex: 0,
              explanation: 'Rừng đặc dụng dùng để bảo tồn thiên nhiên, nguồn gen sinh vật và nghiên cứu khoa học.',
            },
          ],
        },
        {
          id: 'cn7-b8',
          grade: 7,
          chapterId: 'cn7-c2',
          chapterTitle: 'Chương II: Lâm Nghiệp',
          lessonNumber: 8,
          title: 'Bài 8. Trồng, chăm sóc và bảo vệ rừng',
          moduleCode: 'FOREST_CARE_08',
          description: 'Mùa vụ trồng rừng, kỹ thuật đào hố xé bầu, phát hoang dọn cỏ, phòng cháy chữa cháy rừng.',
          summary: [
            'Thời vụ trồng rừng: Vùng Bắc Bộ vào mùa xuân và thu; vùng Nam Bộ và Trung Bộ vào đầu mùa mưa.',
            'Quy trình trồng bằng cây con có bầu: Đào hố -> Xé vỏ bầu nilon cẩn thận -> Đặt cây thẳng đứng vào hố -> Lấp đất màu và nén chặt quanh gốc -> Vun đất cao hơn mặt hố.',
            'Bảo vệ rừng: Tuần tra phòng cháy rừng trong mùa hanh khô, ngăn chặn lâm tặc chặt phá rừng trái phép.',
          ],
          keyPoints: [
            'Bắt buộc xé bỏ vỏ bầu nilon để rễ cây non tự do bung rễ bám vào đất tự nhiên.',
            'Công tác phòng chống cháy rừng trong mùa nắng nóng là nhiệm vụ sống còn.',
          ],
          specs: [
            { label: 'Kỹ thuật chính', value: 'Trồng bằng cây con có bầu rễ' },
            { label: 'Thời gian chăm sóc', value: 'Liên tục trong 3 - 4 năm đầu sau khi trồng' },
          ],
          quiz: [
            {
              question: 'Thao tác kỹ thuật nào là bắt buộc khi trồng cây con có bầu vào hố đất?',
              options: [
                'Xé bỏ túi bầu nilon trước khi lấp đất nén chặt',
                'Giữ nguyên túi nilon bọc kín rễ để cây ẩm',
                'Cắt bỏ toàn bộ rễ của cây con',
                'Đốt lửa trong hố trước khi thả cây vào',
              ],
              answerIndex: 0,
              explanation: 'Nếu không xé túi nilon, rễ cây non sẽ bị bó chặt không thể phát triển đâm ra ngoài, cây sẽ còi cọc và chết.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn7-c3',
      grade: 7,
      title: 'Chương III: Chăn Nuôi',
      code: 'CN7_MODULE_ANIMAL_HUS',
      description: 'Kỹ thuật chăn nuôi gia súc gia cầm an toàn sinh học, dinh dưỡng thức ăn và kiểm soát dịch tễ.',
      lessons: [
        {
          id: 'cn7-b9',
          grade: 7,
          chapterId: 'cn7-c3',
          chapterTitle: 'Chương III: Chăn Nuôi',
          lessonNumber: 9,
          title: 'Bài 9. Giới thiệu về chăn nuôi',
          moduleCode: 'ANIMAL_INTRO_09',
          description: 'Vai trò của chăn nuôi, các nhóm vật nuôi phổ biến và phương thức chăn nuôi nông hộ vs công nghiệp trang trại.',
          summary: [
            'Cung cấp thực phẩm giàu đạm (thịt, trứng, sữa), sức kéo, phân bón hữu cơ và nguyên liệu cho ngành công nghiệp thuộc da, may mặc.',
            'Hai phương thức chăn nuôi: Chăn thả tự do bán hoang dã và chăn nuôi công nghiệp tập trung quy mô trang trại khép kín.',
          ],
          keyPoints: [
            'Xu hướng chăn nuôi hiện đại: Ứng dụng chuồng lạnh tự động kiểm soát vi khí hậu và bảo vệ môi trường bằng hầm biogas.',
          ],
          specs: [
            { label: 'Vật nuôi chủ lực', value: 'Lợn (heo), Bò sữa, Bò thịt, Gà, Vịt' },
            { label: 'Mô hình chuồng trại', value: 'Chuồng kín thông gió áp suất âm' },
          ],
          quiz: [
            {
              question: 'Ưu điểm của mô hình chăn nuôi trang trại công nghiệp khép kín là gì?',
              options: [
                'Kiểm soát tốt an toàn dịch bệnh, năng suất cao và tự động hóa',
                'Không cần bất kỳ nguồn nước uống nào cho vật nuôi',
                'Hoàn toàn không tốn tiền thức ăn',
                'Không cần công nhân chăm sóc theo dõi',
              ],
              answerIndex: 0,
              explanation: 'Trang trại khép kín cách ly mầm bệnh từ môi trường bên ngoài, kiểm soát nhiệt độ tự động cho năng suất cao.',
            },
          ],
        },
        {
          id: 'cn7-b10',
          grade: 7,
          chapterId: 'cn7-c3',
          chapterTitle: 'Chương III: Chăn Nuôi',
          lessonNumber: 10,
          title: 'Bài 10. Nuôi dưỡng và chăm sóc vật nuôi',
          moduleCode: 'ANIMAL_CARE_10',
          description: 'Dinh dưỡng thức ăn theo giai đoạn sinh trưởng, vệ sinh thú y và xây dựng chuồng trại thoáng mát.',
          summary: [
            'Chăm sóc vật nuôi non: Giữ ấm cơ thể, bú sữa đầu đủ kháng thể, tập ăn sớm thức ăn dễ tiêu hóa.',
            'Chăm sóc vật nuôi cái sinh sản: Cung cấp đầy đủ dưỡng chất trong thai kỳ, chuẩn bị ổ đẻ sạch sẽ, hộ sinh an toàn.',
          ],
          keyPoints: [
            'Sữa đầu của con mẹ chứa lượng kháng thể miễn dịch dịch thể tối quan trọng cho con non mới sinh.',
            'Chuồng trại phải quay về hướng nam hoặc đông nam để đón gió mát mùa hè và tránh gió mùa đông bắc.',
          ],
          specs: [
            { label: 'Hướng chuồng tối ưu', value: 'Hướng Đông Nam (ấm về đông, mát về hè)' },
            { label: 'Chỉ số vi khí hậu', value: 'Độ ẩm 60-75%, nhiệt độ 22-28°C' },
          ],
          quiz: [
            {
              question: 'Tại sao con non mới sinh bắt buộc phải được bú sữa đầu càng sớm càng tốt?',
              options: [
                'Vì sữa đầu chứa lượng lớn kháng thể tự nhiên giúp con non chống lại bệnh tật',
                'Vì sữa đầu có vị cay kích thích vị giác',
                'Vì sữa đầu làm lông mọc nhanh',
                'Vì con non không uống được nước lọc thông thường',
              ],
              answerIndex: 0,
              explanation: 'Hệ miễn dịch của con non chưa hoàn thiện, sữa đầu của mẹ truyền kháng thể thụ động vô cùng quý giá.',
            },
          ],
        },
        {
          id: 'cn7-b11',
          grade: 7,
          chapterId: 'cn7-c3',
          chapterTitle: 'Chương III: Chăn Nuôi',
          lessonNumber: 11,
          title: 'Bài 11. Phòng và trị bệnh cho vật nuôi',
          moduleCode: 'ANIMAL_HEALTH_11',
          description: 'Nguyên nhân gây bệnh (truyền nhiễm vs không truyền nhiễm), lịch tiêm phòng vaccine và an toàn sinh học.',
          summary: [
            'Bệnh truyền nhiễm do vi rút, vi khuẩn lây lan nhanh tạo thành dịch bệnh nguy hiểm (dịch tả lợn châu Phi, cúm gia cầm H5N1).',
            'Nguyên tắc: Phòng bệnh hơn chữa bệnh. Tiêm phòng vaccine định kỳ, khử trùng tiêu độc chuồng trại bằng vôi bột và thuốc sát trùng.',
          ],
          keyPoints: [
            'Cách ly ngay vật nuôi ốm để theo dõi và tránh lây lan cho toàn đàn.',
            'Tiêu hủy xác động vật chết bệnh đúng quy chuẩn, tuyệt đối không vứt ra sông ngòi kênh rạch.',
          ],
          specs: [
            { label: 'Biện pháp tối thượng', value: 'Tiêm chủng vaccine định kỳ theo lịch thú y' },
            { label: 'Xử lý dịch', value: 'Cách ly, tiêu độc khử trùng, khai báo thú y cơ sở' },
          ],
          quiz: [
            {
              question: 'Hành vi nào dưới đây bị nghiêm cấm trong quản lý an toàn dịch bệnh chăn nuôi?',
              options: [
                'Vứt xác gia súc gia cầm chết do dịch bệnh xuống sông ngòi, kênh rạch',
                'Tiêm phòng vaccine định kỳ cho vật nuôi',
                'Rắc vôi bột tiêu độc khử trùng xung quanh chuồng',
                'Cách ly ngay con vật có triệu chứng sốt bỏ ăn',
              ],
              answerIndex: 0,
              explanation: 'Vứt xác động vật bệnh xuống nguồn nước sẽ làm mầm bệnh lây lan diện rộng và gây ô nhiễm môi trường nghiêm trọng.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn7-c4',
      grade: 7,
      title: 'Chương IV: Thủy Sản',
      code: 'CN7_MODULE_AQUACULTURE',
      description: 'Nuôi trồng thủy sản nước ngọt và nước mặn, quản lý chất lượng môi trường nước ao và bảo tồn hệ sinh thái biển.',
      lessons: [
        {
          id: 'cn7-b12',
          grade: 7,
          chapterId: 'cn7-c4',
          chapterTitle: 'Chương IV: Thủy Sản',
          lessonNumber: 12,
          title: 'Bài 12. Giới thiệu về nuôi thủy sản',
          moduleCode: 'AQUA_INTRO_12',
          description: 'Vai trò ngành thủy sản trong cơ cấu xuất khẩu, các đối tượng nuôi chủ lực (tôm sú, tôm thẻ, cá tra, cá rô phi).',
          summary: [
            'Thủy sản là ngành kinh tế mũi nhọn cung cấp thực phẩm giàu protein, omega-3 và đem lại kim ngạch xuất khẩu hàng tỷ USD cho Việt Nam.',
            'Các môi trường nuôi: Nuôi nước ngọt (ao, hồ, bè trên sông), nước lợ (cửa sông, rừng ngập mặn), nước mặn (vịnh ven biển, lồng bè xa bờ).',
          ],
          keyPoints: [
            'Việt Nam là một trong những quốc gia xuất khẩu tôm và cá tra hàng đầu thế giới.',
          ],
          specs: [
            { label: 'Mặt hàng xuất khẩu chủ lực', value: 'Tôm thẻ chân trắng, Tôm sú, Cá tra basa' },
            { label: 'Môi trường sống', value: 'Nước ngọt (độ mặn <0.5‰), Nước lợ (0.5-30‰), Nước mặn (>30‰)' },
          ],
          quiz: [
            {
              question: 'Loài cá nước ngọt nào dưới đây là đối tượng xuất khẩu chiến lược nổi tiếng của đồng bằng sông Cửu Long?',
              options: ['Cá tra, cá basa', 'Cá mập trắng', 'Cá hồi Bắc Âu', 'Cá kiếm đại dương'],
              answerIndex: 0,
              explanation: 'Cá tra và cá basa nuôi bè trên dòng sông Tiền và sông Hậu nổi tiếng toàn cầu về sản lượng xuất khẩu.',
            },
          ],
        },
        {
          id: 'cn7-b13',
          grade: 7,
          chapterId: 'cn7-c4',
          chapterTitle: 'Chương IV: Thủy Sản',
          lessonNumber: 13,
          title: 'Bài 13. Quy trình nuôi thủy sản',
          moduleCode: 'AQUA_PROCESS_13',
          description: 'Cải tạo ao nuôi, chọn và thả giống, quản lý thức ăn và theo dõi các chỉ tiêu môi trường nước (pH, oxy hòa tan DO).',
          summary: [
            'Quy trình chuẩn: Chuẩn bị ao nuôi (tát cạn, rải vôi, phơi đáy ao, lấy nước qua lưới lọc) -> Chọn con giống đều con, nhanh nhẹn -> Thả giống vào lúc mát mẻ -> Quản lý cho ăn bằng sàng ăn -> Quạt nước tạo oxy.',
          ],
          keyPoints: [
            'Kiểm tra pH (ngưỡng 7.5 - 8.5) và hàm lượng oxy hòa tan DO (> 4 mg/l).',
            'Không cho cá ăn dư thừa để tránh ô nhiễm sinh khí độc H2S, NH3 làm cá nổi đầu chết ngạt.',
          ],
          specs: [
            { label: 'Chỉ số pH chuẩn', value: '7.5 - 8.5' },
            { label: 'Nồng độ oxy hòa tan', value: 'Tối thiểu > 4.0 mg/L' },
          ],
          quiz: [
            {
              question: 'Việc bật quạt nước (guồng cánh quạt) trong ao nuôi tôm công nghiệp có tác dụng chủ yếu nào?',
              options: [
                'Tăng cường hòa tan khí oxy vào nước và gom chất thải vào giữa ao',
                'Làm nước nóng lên để tôm nhanh lớn',
                'Tạo sóng nhân tạo cho tôm tập bơi',
                'Làm sạch rêu bám trên vỏ tôm',
              ],
              answerIndex: 0,
              explanation: 'Guồng quạt nước đánh tan mặt nước giúp oxy khí quyển khuếch tán vào nước phục vụ tôm hô hấp mật độ dày.',
            },
          ],
        },
        {
          id: 'cn7-b14',
          grade: 7,
          chapterId: 'cn7-c4',
          chapterTitle: 'Chương IV: Thủy Sản',
          lessonNumber: 14,
          title: 'Bài 14. Bảo vệ môi trường và nguồn lợi thủy sản',
          moduleCode: 'AQUA_PROTECT_14',
          description: 'Nguyên nhân suy thoái môi trường nước, cấm đánh bắt bằng xung điện và chất nổ, giải pháp tái tạo nguồn lợi.',
          summary: [
            'Nguyên nhân ô nhiễm: Nước thải công nghiệp chưa xử lý, rác thải nhựa, đánh bắt tận diệt bừa bãi.',
            'Biện pháp bảo vệ: Cấm tuyệt đối đánh bắt bằng kích điện, hóa chất độc hại, lưới mắt quá nhỏ; thả cá giống tái tạo tự nhiên hàng năm.',
          ],
          keyPoints: [
            'Bảo vệ hệ sinh thái rạn san hô và rừng ngập mặn là lá chắn duy trì nguồn hải sản tự nhiên.',
          ],
          specs: [
            { label: 'Hành vi bị cấm', value: 'Kích điện, mìn nổ, hóa chất độc hại, lưới cào đáy mắt nhỏ' },
            { label: 'Giải pháp bảo tồn', value: 'Thành lập khu bảo tồn biển MPA, thả cá giống tái tạo' },
          ],
          quiz: [
            {
              question: 'Tại sao đánh bắt thủy sản bằng xung điện (kích điện) lại bị pháp luật nghiêm cấm tuyệt đối?',
              options: [
                'Vì dòng điện giết chết toàn bộ sinh vật từ cá con, trứng nước đến vi sinh vật có ích, hủy hoại hệ sinh thái',
                'Vì giá điện sinh hoạt quá đắt đỏ',
                'Vì làm cá bị mất vảy không đẹp mắt',
                'Vì kích điện làm nước ao bị biến thành nước khoáng',
              ],
              answerIndex: 0,
              explanation: 'Xung điện mang tính tận diệt tàn bạo, tiêu diệt cả ấu trùng và nguồn thức ăn tự nhiên của thủy sản.',
            },
          ],
        },
      ],
    },
  ],
};
