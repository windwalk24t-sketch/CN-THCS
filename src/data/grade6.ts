import { GradeCurriculum } from '../types/curriculum';

export const grade6Data: GradeCurriculum = {
  grade: 6,
  title: 'Công Nghệ 6',
  subTitle: 'Bộ Sách Kết Nối Tri Thức Với Cuộc Sống',
  colorScheme: {
    primary: 'cyan-400',
    border: 'border-cyan-500/40',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.25)]',
    badgeBg: 'bg-cyan-950/60 text-cyan-300 border-cyan-800',
    accent: '#06b6d4',
  },
  chapters: [
    {
      id: 'cn6-c1',
      grade: 6,
      title: 'Chương I: Nhà Ở',
      code: 'CN6_MODULE_HOUSING',
      description: 'Khám phá vai trò, kiến trúc xây dựng và giải pháp công nghệ nhà ở thông minh hiện đại.',
      lessons: [
        {
          id: 'cn6-b1',
          grade: 6,
          chapterId: 'cn6-c1',
          chapterTitle: 'Chương I: Nhà Ở',
          lessonNumber: 1,
          title: 'Bài 1. Khái quát về nhà ở',
          moduleCode: 'HOME_CORE_01',
          description: 'Tìm hiểu vai trò bảo vệ con người, các khu vực chức năng chính và các kiểu kiến trúc nhà ở đặc trưng tại Việt Nam.',
          summary: [
            'Nhà ở là công trình xây dựng phục vụ nhu cầu sinh hoạt, nghỉ ngơi và bảo vệ con người trước các tác động khắc nghiệt của thời tiết, môi trường.',
            'Các khu vực chức năng cơ bản: Khu sinh hoạt chung, phòng khách, phòng ngủ, khu bếp - ăn, khu vệ sinh, khu để xe và kho.',
            'Kiến trúc nhà ở đặc trưng ở Việt Nam: Nhà ở nông thôn truyền thống, nhà ở đô thị (nhà phố, chung cư), nhà sàn vùng cao, nhà bè trên sông nước.',
          ],
          keyPoints: [
            'Nhà ở giúp con người tránh mưa bão, nắng nóng, thú dữ và bảo vệ sự riêng tư.',
            'Phân chia không gian hợp lý, đảm bảo thông thoáng, đón ánh sáng tự nhiên.',
            'Vật liệu xây dựng phản ánh điều kiện tự nhiên và địa lý vùng miền.',
          ],
          specs: [
            { label: 'Vai trò cốt lõi', value: 'Bảo vệ, an cư, phát triển đời sống tinh thần' },
            { label: 'Kiến trúc phổ biến', value: 'Nhà ống đô thị, nhà vườn nông thôn, nhà chung cư cao tầng' },
            { label: 'Quy chuẩn không gian', value: 'Thông thoáng, hợp vệ sinh, tiết kiệm năng lượng' },
          ],
          practicalProject: 'Khảo sát và vẽ sơ đồ bố trí các khu vực chức năng trong chính ngôi nhà của em, chỉ ra hướng gió và ánh sáng tự nhiên.',
          quiz: [
            {
              question: 'Khu vực nào trong nhà ở cần được bố trí kín đáo và đảm bảo sự riêng tư nhất?',
              options: ['Phòng ngủ', 'Phòng khách', 'Khu để xe', 'Khu sinh hoạt chung'],
              answerIndex: 0,
              explanation: 'Phòng ngủ là không gian nghỉ ngơi cá nhân, cần yên tĩnh và riêng tư nhất trong ngôi nhà.',
            },
            {
              question: 'Kiến trúc nhà sàn đặc trưng phổ biến nhất ở vùng địa hình nào của Việt Nam?',
              options: ['Vùng đồng bằng duyên hải', 'Vùng đồi núi cao Tây Bắc và Tây Nguyên', 'Khu đô thị công nghiệp', 'Vùng đất ngập mặn'],
              answerIndex: 1,
              explanation: 'Nhà sàn giúp đồng bào miền núi tránh thú dữ, ẩm ướt và tận dụng sườn dốc địa hình.',
            },
          ],
        },
        {
          id: 'cn6-b2',
          grade: 6,
          chapterId: 'cn6-c1',
          chapterTitle: 'Chương I: Nhà Ở',
          lessonNumber: 2,
          title: 'Bài 2. Xây dựng nhà ở',
          moduleCode: 'HOME_BUILD_02',
          description: 'Quy trình thi công, các loại vật liệu xây dựng tự nhiên và nhân tạo, an toàn lao động trong xây dựng.',
          summary: [
            'Vật liệu xây dựng gồm nhóm tự nhiên (đá, cát, gỗ, tre, đất sét) và nhóm nhân tạo (xi măng, gạch nung, thép, bê tông cốt thép, kính).',
            'Quy trình xây dựng nhà ở trải qua 3 bước cốt lõi: Thiết kế lập bản vẽ -> Thi công phần thô (móng, cột, dầm, sàn, mái, tường) -> Hoàn thiện (trát, sơn, lát sàn, lắp điện nước).',
          ],
          keyPoints: [
            'Móng nhà là bộ phận chịu toàn bộ tải trọng công trình truyền xuống nền đất.',
            'Bê tông cốt thép kết hợp khả năng chịu nén của bê tông và chịu kéo của thép.',
            'Tuân thủ nghiêm ngặt đồ bảo hộ và an toàn lao động công trình.',
          ],
          specs: [
            { label: 'Quy trình thi công', value: 'Thiết kế -> Thi công thô -> Hoàn thiện nội ngoại thất' },
            { label: 'Vật liệu kết cấu', value: 'Xi măng, thép cán, cát vàng, đá dăm' },
            { label: 'Bộ phận chịu lực', value: 'Móng, cột trụ, dầm đà, sàn bê tông' },
          ],
          practicalProject: 'Tìm hiểu danh mục vật liệu được sử dụng để xây dựng lớp học hoặc ngôi nhà của em, ghi chú cách thức bảo dưỡng.',
          quiz: [
            {
              question: 'Bộ phận nào chịu toàn bộ tải trọng của ngôi nhà và truyền xuống đất?',
              options: ['Mái nhà', 'Móng nhà', 'Cửa đi', 'Tường ngăn phòng'],
              answerIndex: 1,
              explanation: 'Móng nhà nằm sâu dưới lòng đất, là nền tảng chịu lực cho toàn bộ kết cấu phía trên.',
            },
          ],
        },
        {
          id: 'cn6-b3',
          grade: 6,
          chapterId: 'cn6-c1',
          chapterTitle: 'Chương I: Nhà Ở',
          lessonNumber: 3,
          title: 'Bài 3. Ngôi nhà thông minh',
          moduleCode: 'SMART_HOME_03',
          description: 'Hệ thống Smart Home: cảm biến tự động, vi điều khiển IoT, giải pháp tiết kiệm năng lượng và tiện nghi an ninh cao cấp.',
          summary: [
            'Ngôi nhà thông minh (Smart Home) được trang bị hệ sinh thái cảm biến, thiết bị tự động hóa và kết nối mạng để điều khiển từ xa.',
            'Đặc điểm vượt trội: Tiện nghi tối đa, an ninh an toàn thông minh (cảm biến khói, camera AI, khóa vân tay), tiết kiệm năng lượng hiệu quả.',
            'Các hệ thống tự động: Chiếu sáng thông minh theo chuyển động, điều hòa theo nhiệt độ môi trường, rèm cửa theo cường độ ánh sáng mặt trời.',
          ],
          keyPoints: [
            'Cảm biến (Sensor) đóng vai trò giác quan tiếp nhận tín hiệu vật lý.',
            'Bộ điều khiển trung tâm (Controller) xử lý thuật toán và ra lệnh cho cơ cấu chấp hành.',
            'Ứng dụng trí tuệ nhân tạo để học hỏi thói quen sinh hoạt của gia chủ.',
          ],
          specs: [
            { label: 'Giao thức kết nối', value: 'Wi-Fi, Zigbee, Bluetooth Mesh' },
            { label: 'Cảm biến tích hợp', value: 'PIR Chuyển động, Khí gas, Ánh sáng LDR, Nhiệt ẩm DHT22' },
            { label: 'Lợi ích', value: 'Giảm 30% điện năng tiêu thụ, an ninh 24/7' },
          ],
          practicalProject: 'Thiết kế kịch bản tự động hóa cho ngôi nhà mơ ước (ví dụ: Chế độ Vắng nhà, Chế độ Ngủ đêm).',
          codeSimulation: {
            title: 'Thuật toán điều khiển Ngôi nhà thông minh (Smart Home Node)',
            lang: 'c++',
            interactiveType: 'smart_home',
            description: 'Mô phỏng bộ xử lý Arduino/ESP32 nhận tín hiệu từ cảm biến chuyển động PIR và ánh sáng để kích hoạt đèn LED và điều hòa.',
            code: `// SMART HOME CONTROLLER - THCS LAB
#define PIR_PIN 2
#define LDR_PIN A0
#define RELAY_LIGHT 4
#define RELAY_AC 5

void setup() {
  pinMode(PIR_PIN, INPUT);
  pinMode(RELAY_LIGHT, OUTPUT);
  pinMode(RELAY_AC, OUTPUT);
}

void loop() {
  bool motion = digitalRead(PIR_PIN);
  int lux = analogRead(LDR_PIN);
  
  if (motion && lux < 300) {
    digitalWrite(RELAY_LIGHT, HIGH); // Bật đèn tự động khi có người & tối
  } else {
    digitalWrite(RELAY_LIGHT, LOW);
  }
}`,
          },
          quiz: [
            {
              question: 'Hệ thống chiếu sáng thông minh trong Smart Home thường dùng cảm biến nào để tự bật khi có người bước vào?',
              options: ['Cảm biến chuyển động hồng ngoại (PIR)', 'Cảm biến nồng độ oxy', 'Cảm biến độ ẩm đất', 'Cảm biến đo vận tốc gió'],
              answerIndex: 0,
              explanation: 'Cảm biến PIR phát hiện bức xạ nhiệt hồng ngoại từ cơ thể người chuyển động trong phòng.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn6-c2',
      grade: 6,
      title: 'Chương II: Bảo Quản Và Chế Biến Thực Phẩm',
      code: 'CN6_MODULE_FOOD_TECH',
      description: 'Khoa học dinh dưỡng, công nghệ vi sinh bảo quản và nghệ thuật xây dựng thực đơn khoa học.',
      lessons: [
        {
          id: 'cn6-b4',
          grade: 6,
          chapterId: 'cn6-c2',
          chapterTitle: 'Chương II: Bảo Quản Và Chế Biến Thực Phẩm',
          lessonNumber: 4,
          title: 'Bài 4. Thực phẩm và dinh dưỡng',
          moduleCode: 'FOOD_NUTRITION_04',
          description: '4 nhóm dưỡng chất thiết yếu (đạm, bột đường, béo, khoáng & vitamin), nhu cầu năng lượng và tháp dinh dưỡng.',
          summary: [
            '4 nhóm chất dinh dưỡng chính: Nhóm giàu chất đạm (protein), nhóm giàu chất bột đường (carbohydrate), nhóm giàu chất béo (lipid), nhóm giàu vitamin và khoáng chất.',
            'Chế độ ăn hợp lý là bữa ăn kết hợp đầy đủ, cân đối các nhóm chất theo tỷ lệ khuyến nghị của Tháp dinh dưỡng.',
          ],
          keyPoints: [
            'Thiếu hoặc thừa chất dinh dưỡng đều gây bệnh lý (suy dinh dưỡng, béo phì, tiểu đường).',
            'Nước sạch và chất xơ đóng vai trò không thể thay thế cho hệ tiêu hóa và bài tiết.',
          ],
          specs: [
            { label: '4 nhóm cốt lõi', value: 'Protein, Lipid, Glucid, Vitamin & Khoáng' },
            { label: 'Thước đo năng lượng', value: 'Kilocalorie (kcal)' },
          ],
          quiz: [
            {
              question: 'Thực phẩm nào sau đây thuộc nhóm giàu chất bột đường (Carbohydrate)?',
              options: ['Gạo tẻ, ngô, khoai', 'Thịt bò, tôm sú', 'Mỡ cá hồi, dầu vừng', 'Rau bina, súp lơ'],
              answerIndex: 0,
              explanation: 'Gạo tẻ, bắp ngô, khoai lang là nguồn cung cấp tinh bột chính tạo năng lượng cho cơ thể.',
            },
          ],
        },
        {
          id: 'cn6-b5',
          grade: 6,
          chapterId: 'cn6-c2',
          chapterTitle: 'Chương II: Bảo Quản Và Chế Biến Thực Phẩm',
          lessonNumber: 5,
          title: 'Bài 5. Phương pháp bảo quản và chế biến thực phẩm',
          moduleCode: 'FOOD_PRESERVE_05',
          description: 'Công nghệ ức chế vi sinh vật gây hại, các phương pháp sấy khô, ướp muối, lên men chua và chế biến nhiệt.',
          summary: [
            'Mục đích bảo quản: Ngăn chặn vi khuẩn, nấm mốc phát triển, làm chậm quá trình ôi thiu phân hủy, kéo dài thời hạn sử dụng.',
            'Các phương pháp bảo quản: Làm lạnh và đông đá, phơi/sấy khô loại bỏ nước, ướp muối/ướp đường, hút chân không.',
            'Phương pháp chế biến: Dùng nhiệt (luộc, hấp, xào, nướng, rán) và không dùng nhiệt (trộn nộm, ngâm chua).',
          ],
          keyPoints: [
            'Đông đá sâu (< -18°C) làm chậm phản ứng enzym và đóng băng tinh thể nước của vi khuẩn.',
            'Chế biến thực phẩm đúng quy trình giúp tiêu diệt mầm bệnh và bảo toàn tối đa vi chất dinh dưỡng.',
          ],
          specs: [
            { label: 'Nhiệt độ ngăn mát', value: '2°C - 5°C' },
            { label: 'Nhiệt độ ngăn đông', value: '-18°C trở xuống' },
          ],
          quiz: [
            {
              question: 'Phương pháp chế biến nào sau đây không sử dụng nhiệt độ cao?',
              options: ['Trộn nộm (gỏi) rau củ', 'Xào thịt bò cần tỏi', 'Hấp cách thủy bánh bao', 'Nướng gà than hoa'],
              answerIndex: 0,
              explanation: 'Trộn nộm sử dụng gia vị (chanh, giấm, đường, muối) để làm chín sinh học mà không dùng nhiệt độ lửa.',
            },
          ],
        },
        {
          id: 'cn6-b6',
          grade: 6,
          chapterId: 'cn6-c2',
          chapterTitle: 'Chương II: Bảo Quản Và Chế Biến Thực Phẩm',
          lessonNumber: 6,
          title: 'Bài 6: Dự án: Bữa ăn kết nối yêu thương',
          moduleCode: 'PROJECT_MEAL_06',
          description: 'Xây dựng thực đơn cân bằng dinh dưỡng, tính toán chi phí khẩu phần và thực hành nấu ăn gắn kết gia đình.',
          summary: [
            'Dự án rèn luyện năng lực: Lập kế hoạch thực đơn gia đình cho 3 - 4 người, hạch toán chi phí nguyên liệu đi chợ.',
            'Các bước thực hiện: Lựa chọn món ăn cân đối 4 nhóm dinh dưỡng -> Lập bảng định lượng & chi phí -> Thực hành sơ chế an toàn vệ sinh thực phẩm -> Trình bày mâm cơm gia đình.',
          ],
          keyPoints: [
            'Thực đơn phải hài hòa giữa món mặn, món xào/luộc và món canh thanh nhiệt.',
            'Hạn chế lãng phí thực phẩm và đảm bảo an toàn vệ sinh.',
          ],
          specs: [
            { label: 'Số lượng món chuẩn', value: '3 - 4 món (Món giàu đạm + Món rau xanh + Canh + Cơm)' },
            { label: 'Tiêu chí đánh giá', value: 'Dinh dưỡng, thẩm mỹ, vệ sinh an toàn, ngân sách' },
          ],
          practicalProject: 'Thực hành lên thực đơn và cùng bố mẹ nấu một bữa cơm tối ấm cúng cuối tuần.',
          quiz: [
            {
              question: 'Một mâm cơm gia đình chuẩn dinh dưỡng cần đảm bảo tối thiểu những thành phần nào?',
              options: [
                'Cơm gạo + Món chính giàu đạm + Món rau củ + Món canh',
                'Chỉ cần thật nhiều thịt nướng và xúc xích rán',
                'Chỉ cần nước ngọt có ga và bánh kẹo ngọt',
                'Chỉ cần 3 món rau luộc không có chất đạm',
              ],
              answerIndex: 0,
              explanation: 'Mâm cơm chuẩn cần cân bằng giữa chất bột đường, chất đạm, chất xơ và nước canh cung cấp vitamin khoáng chất.',
            },
          ],
        },
      ],
    },
    {
      id: 'cn6-c3',
      grade: 6,
      title: 'Chương III: Trang Phục Và Thời Trang',
      code: 'CN6_MODULE_FASHION_TECH',
      description: 'Nguồn gốc sợi dệt, quy trình bảo quản giặt ủi và phong cách thời trang công nghệ tương lai.',
      lessons: [
        {
          id: 'cn6-b7',
          grade: 6,
          chapterId: 'cn6-c3',
          chapterTitle: 'Chương III: Trang Phục Và Thời Trang',
          lessonNumber: 7,
          title: 'Bài 7. Trang phục trong đời sống',
          moduleCode: 'APPAREL_LIFE_07',
          description: 'Vai trò bảo vệ cơ thể, thẩm mỹ, phân loại trang phục theo công năng và phân loại sợi dệt.',
          summary: [
            'Trang phục bao gồm quần áo và các vật dụng phụ kiện đi kèm như mũ, giày, tất, găng tay, khăn quàng.',
            'Hai nguồn gốc sợi dệt cơ bản: Vải sợi tự nhiên (bông, tơ tằm, len cừu) và vải sợi hóa học (sợi nhân tạo rayon, sợi tổng hợp nylon, polyester).',
          ],
          keyPoints: [
            'Vải sợi bông thoáng mát, thấm hút mồ hôi tốt nhưng dễ nhàu.',
            'Vải sợi tổng hợp bền chắc, mau khô, ít nhăn nhưng ít thấm hút mồ hôi.',
          ],
          specs: [
            { label: 'Sợi tự nhiên', value: 'Cotton (sợi bông), Silk (tơ tằm), Wool (len cừu)' },
            { label: 'Sợi hóa học', value: 'Polyester, Nylon, Spandex' },
          ],
          quiz: [
            {
              question: 'Vải sợi bông (cotton) có ưu điểm nổi bật nhất là gì?',
              options: ['Hút ẩm cao, mặc thoáng mát, dễ chịu cho da', 'Không bao giờ bị nhàu khi giặt', 'Chống cháy ở nhiệt độ 1000°C', 'Chống thấm nước tuyệt đối'],
              answerIndex: 0,
              explanation: 'Vải cotton làm từ quả bông tự nhiên có khả năng mao dẫn hút mồ hôi cực tốt, đem lại cảm giác mát mẻ.',
            },
          ],
        },
        {
          id: 'cn6-b8',
          grade: 6,
          chapterId: 'cn6-c3',
          chapterTitle: 'Chương III: Trang Phục Và Thời Trang',
          lessonNumber: 8,
          title: 'Bài 8. Sử dụng và bảo quản trang phục',
          moduleCode: 'APPAREL_CARE_08',
          description: 'Lựa chọn trang phục phù hợp hoàn cảnh, đọc ký hiệu giặt là chuẩn quốc tế và quy trình cất giữ.',
          summary: [
            'Lựa chọn trang phục: Phù hợp với lứa tuổi, vóc dáng, tính chất công việc và thời tiết theo mùa.',
            'Quy trình bảo quản chuẩn: Phân loại theo màu sắc và chất liệu -> Giặt sạch -> Phơi trong bóng râm hoặc sấy -> Là (ủi) theo nhiệt độ quy định -> Gấp gọn hoặc treo tủ.',
          ],
          keyPoints: [
            'Đọc kỹ nhãn mác giặt (ký hiệu chậu nước, bàn là, hình tam giác, vòng tròn khô).',
            'Không phơi quần áo lụa và len trực tiếp dưới ánh nắng gay gắt.',
          ],
          specs: [
            { label: 'Ký hiệu chậu nước', value: 'Chỉ định phương pháp giặt và nhiệt độ tối đa' },
            { label: 'Ký hiệu bàn là', value: 'Chấm tròn chỉ thị mức nhiệt độ an toàn (1, 2 hoặc 3 chấm)' },
          ],
          quiz: [
            {
              question: 'Ký hiệu hình bàn ủi có 1 dấu chấm tròn bên trong có ý nghĩa kỹ thuật gì?',
              options: ['Là ủi ở nhiệt độ thấp (dưới 110°C)', 'Là ủi ở nhiệt độ cực cao (200°C)', 'Cấm được là ủi', 'Chỉ được là ủi bằng hơi nước áp suất cao'],
              answerIndex: 0,
              explanation: '1 chấm biểu thị nhiệt độ thấp (tối đa 110°C), phù hợp cho các loại vải nhạy cảm như sợi tổng hợp nylon, acrylic.',
            },
          ],
        },
        {
          id: 'cn6-b9',
          grade: 6,
          chapterId: 'cn6-c3',
          chapterTitle: 'Chương III: Trang Phục Và Thời Trang',
          lessonNumber: 9,
          title: 'Bài 9. Thời trang',
          moduleCode: 'FASHION_STYLE_09',
          description: 'Phong cách thời trang, xu hướng công nghệ vật liệu may mặc thông minh và cá tính cá nhân.',
          summary: [
            'Thời trang là tập hợp những thói quen và thị hiếu thẩm mỹ về trang phục phổ biến trong một xã hội ở một thời kỳ nhất định.',
            'Các phong cách cơ bản: Cổ điển (Classic), Thể thao (Sporty), Tự do bụi bặm (Casual/Streetwear), Dân gian truyền thống.',
            'Xu hướng công nghệ dệt may: Vật liệu sinh học tái chế bảo vệ môi trường, vải may mặc tích hợp cảm biến nhiệt độ thông minh.',
          ],
          keyPoints: [
            'Mặc đẹp là ăn mặc lịch sự, tôn trọng người đối diện và phù hợp với vóc dáng.',
            'Phối màu sắc dựa trên quy tắc tương đồng, tương phản hoặc đơn sắc.',
          ],
          specs: [
            { label: 'Phong cách kinh điển', value: 'Classic, Sporty, Casual, Formal' },
            { label: 'Công nghệ dệt tương lai', value: 'Smart Textile, Vải tự làm sạch, Vải sợi chuối sinh học' },
          ],
          practicalProject: 'Phác thảo một bộ trang phục đi học dã ngoại có gắn túi đựng dụng cụ công nghệ và may từ vải tái chế.',
          quiz: [
            {
              question: 'Phong cách thời trang thể thao (Sporty) có đặc trưng nổi bật nào?',
              options: ['Rộng rãi, năng động, chất liệu co giãn và thấm hút tốt', 'Gò bó, đính kim sa lấp lánh', 'Áo dài cổ cao truyền thống', 'Váy dạ hội đuôi cá dài quét đất'],
              answerIndex: 0,
              explanation: 'Phong cách thể thao ưu tiên sự thoải mái, phóng khoáng, phục vụ chuyển động linh hoạt của cơ thể.',
            },
          ],
        },
      ],
    },
  ],
};
