import { KnowledgeArticle } from '../types';

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'lesson-1',
    title: 'Bài 1: Chất chỉ thị acid–base là gì?',
    subtitle: 'Tìm hiểu về những hợp chất đổi màu kỳ diệu trong Hóa học',
    category: 'Cơ bản',
    readingTime: '4 phút',
    content: `Chất chỉ thị acid–base (hay chất chỉ thị màu) là những chất có màu sắc biến đổi phụ thuộc vào độ chua hay độ kiềm (giá trị $\text{pH}$) của môi trường dung dịch. 

Trong thực tế thí nghiệm khoa học tự nhiên cấp THCS, chúng ta thường gặp các chất chỉ thị phổ biến như:
1. **Giấy quỳ tím**: Chuyển sang màu đỏ trong môi trường acid, màu xanh trong môi trường base và giữ nguyên màu tím trong môi trường trung tính.
2. **Phenolphthalein**: Không màu trong môi trường acid và trung tính, nhưng chuyển sang màu hồng đậm / đỏ tía trong môi trường base.
3. **Methyl orange (da cam)**: Chuyển sang màu đỏ ở $\text{pH} < 3.1$, màu cam ở vùng trung gian và màu vàng ở $\text{pH} > 4.4$.
4. **Chất chỉ thị tự nhiên**: Nước ép bắp cải tím, khoai lang tím, hoa đậu biếc chứa các sắc tố anthocyanin đổi màu rất nhạy theo $\text{pH}$.`,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Hydrochloric acid', common: 'Axit clohidric', formula: '$\\text{HCl}$', description: 'Dung dịch acid mạnh, không màu, có trong dịch vị dạ dày.' },
      { term: 'Sodium hydroxide', common: 'Xút ăn da / Xút', formula: '$\\text{NaOH}$', description: 'Base mạnh, chất rắn hút ẩm mạnh, tính ăn mòn da cao.' }
    ],
    quiz: {
      id: 'q1',
      question: 'Chất chỉ thị phenolphthalein sẽ có màu gì trong dung dịch sodium hydroxide loãng (môi trường base)?',
      options: ['Màu đỏ', 'Không màu', 'Màu hồng / đỏ tía', 'Màu xanh lam'],
      correctAnswer: 2,
      explanation: 'Phenolphthalein không màu trong acid và trung tính, nhưng chuyển sang màu hồng/đỏ tía trong môi trường base ($\text{pH} > 8.2$).'
    }
  },
  {
    id: 'lesson-2',
    title: 'Bài 2: Thang pH từ 0 đến 14',
    subtitle: 'Thước đo mức độ acid và base của các dung dịch',
    category: 'Cơ bản',
    readingTime: '5 phút',
    content: `Thang $\text{pH}$ là một thang đo quy ước dùng để biểu thị nồng độ ion hydrogen ($\text{H}^+$) trong dung dịch, chạy từ 0 đến 14:
- **$\text{pH}$ từ 0 đến gần 7**: Môi trường **acid** (càng nhỏ, tính acid càng mạnh).
- **$\text{pH}$ đúng bằng 7**: Môi trường **trung tính** (ví dụ nước cất tinh khiết ở $25^\circ\text{C}$).
- **$\text{pH}$ từ trên 7 đến 14**: Môi trường **base / kiềm** (càng lớn, tính base càng mạnh).

Ví dụ thực tế:
- Nước chanh: $\text{pH} \approx 2.0 – 3.0$ (Acid)
- Sữa tươi: $\text{pH} \approx 6.5 – 6.7$ (Acid nhẹ)
- Nước cất: $\text{pH} = 7.0$ (Trung tính)
- Nước xà phòng: $\text{pH} \approx 9.0 – 10.0$ (Base)
- Dung dịch $\text{NaOH}$ 0.1M: $\text{pH} \approx 13.0$ (Base mạnh)`,
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Ethanoic acid', common: 'Axit axetic (Giấm ăn)', formula: '$\\text{CH}_3\\text{COOH}$', description: 'Acid hữu cơ yếu có trong giấm ăn hàng ngày.' },
      { term: 'Sodium carbonate', common: 'Soda / Natri cacbonat', formula: '$\\text{Na}_2\\text{CO}_3$', description: 'Muối có môi trường kiềm nhẹ trong nước.' }
    ],
    quiz: {
      id: 'q2',
      question: 'Một dung dịch có giá trị pH bằng 2,5 thì dung dịch đó thuộc môi trường nào?',
      options: ['Môi trường trung tính', 'Môi trường base', 'Môi trường acid', 'Không xác định'],
      correctAnswer: 2,
      explanation: 'Giá trị $\text{pH} < 7$ (cụ thể là 2,5) biểu thị môi trường acid.'
    }
  },
  {
    id: 'lesson-3',
    title: 'Bài 3: Môi trường acid trong đời sống',
    subtitle: 'Từ dịch vị dạ dày đến các loại trái cây chua',
    category: 'Đời sống',
    readingTime: '3 phút',
    content: `Môi trường acid rất phổ biến trong tự nhiên và cơ thể sinh vật:
- **Trong cơ thể**: Dạ dày người tiết ra **hydrochloric acid** ($\text{HCl}$) với nồng độ thích hợp giúp tiêu hóa thức ăn và diệt vi khuẩn.
- **Trong thực phẩm**: Quả chanh chứa citric acid ($\text{C}_6\text{H}_8\text{O}_7$), giấm ăn chứa **ethanoic acid** ($\text{CH}_3\text{COOH}$).
- **Tính chất hóa học**: Dung dịch acid làm đổi màu giấy quỳ sang đỏ, tác dụng với kim loại hoạt động (như kẽm $\text{Zn}$, sắt $\text{Fe}$) giải phóng khí dihydrogen ($\text{H}_2$).`,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Citric acid', common: 'Axit citric (có trong chanh, cam)', formula: '$\\text{C}_6\\text{H}_8\\text{O}_7$', description: 'Acid hữu cơ tạo vị chua tự nhiên cho trái cây họ cam quýt.' }
    ],
    quiz: {
      id: 'q3',
      question: 'Dung dịch acid khi tác dụng với kim loại như kẽm (Zn) thường sinh ra khí gì?',
      options: ['Khí oxygen (O₂)', 'Khí carbon dioxide (CO₂)', 'Khí dihydrogen (H₂)', 'Khí nitrogen (N₂)'],
      correctAnswer: 2,
      explanation: 'Acid phản ứng với kim loại đứng trước hydrogen (như Zn, Fe) tạo muối và giải phóng khí dihydrogen ($\text{H}_2$).'
    }
  },
  {
    id: 'lesson-4',
    title: 'Bài 4: Môi trường trung tính',
    subtitle: 'Sự cân bằng hoàn hảo giữa ion H⁺ và OH⁻',
    category: 'Cơ bản',
    readingTime: '3 phút',
    content: `Môi trường trung tính là môi trường mà nồng độ ion hydrogen ($\text{H}^+$) cân bằng với nồng độ ion hydroxide ($\text{OH}^-$): $[\text{H}^+] = [\text{OH}^-]$.
- Ví dụ tiêu biểu nhất là nước cất tinh khiết ở nhiệt độ phòng ($25^\circ\text{C}$), có $\text{pH} = 7.0$.
- Các dung dịch muối tạo bởi acid mạnh và base mạnh (như sodium chloride - $\text{NaCl}$) trong nước cũng có môi trường trung tính, không làm đổi màu quỳ tím.`,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Sodium chloride', common: 'Muối ăn', formula: '$\\text{NaCl}$', description: 'Hợp chất phổ biến tạo nên nước biển và gia vị nấu ăn.' }
    ],
    quiz: {
      id: 'q4',
      question: 'Nước cất tinh khiết ở 25°C có giá trị pH bằng bao nhiêu?',
      options: ['pH = 0', 'pH = 7', 'pH = 14', 'pH = 5'],
      correctAnswer: 1,
      explanation: 'Nước cất nguyên chất có tính trung tính với giá trị $\text{pH} = 7$.'
    }
  },
  {
    id: 'lesson-5',
    title: 'Bài 5: Môi trường base (kiềm)',
    subtitle: 'Tính tẩy rửa và dung dịch kiềm trong công nghiệp',
    category: 'Đời sống',
    readingTime: '4 phút',
    content: `Môi trường base (hay kiềm) có giá trị $\text{pH} > 7$. Các dung dịch kiềm hòa tan trong nước (như **sodium hydroxide** - $\text{NaOH}$, **calcium hydroxide** - $\text{Ca(OH)}_2$) có những đặc điểm sau:
- Làm giấy quỳ tím chuyển sang màu xanh.
- Làm phenolphthalein chuyển sang màu hồng/đỏ.
- Có tính nhờn khi chạm vào và có khả năng xà phòng hóa chất béo.
- Trong nông nghiệp, **calcium hydroxide** ($\text{Ca(OH)}_2$) được dùng để khử độ chua của đất trồng.`,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Calcium hydroxide', common: 'Vôi tôi', formula: '$\\text{Ca(OH)}_2$', description: 'Base ít tan trong nước, dùng trong xây dựng và nông nghiệp.' }
    ],
    quiz: {
      id: 'q5',
      question: 'Dung dịch kiềm có đặc tính nào sau đây đối với giấy quỳ tím?',
      options: ['Làm quỳ tím hóa đỏ', 'Làm quỳ tím hóa xanh', 'Làm quỳ tím mất màu', 'Không làm đổi màu quỳ tím'],
      correctAnswer: 1,
      explanation: 'Dung dịch base (kiềm) làm giấy quỳ tím chuyển từ tím sang màu xanh.'
    }
  },
  {
    id: 'lesson-6',
    title: 'Bài 6: Quỳ tím hoạt động như thế nào?',
    subtitle: 'Bí mật cấu trúc phân tử của chất chỉ thị cổ điển',
    category: 'Chuyên sâu',
    readingTime: '4 phút',
    content: `Quỳ tím được chiết xuất từ một số loài địa y. Thành phần chính của nó là các hợp chất phức tạp có nhóm chức hoạt động như những acid yếu ($\text{HIn}$):
- Khi ở môi trường nhiều ion $\text{H}^+$ (acid), cân bằng dịch chuyển tạo dạng phân tử $\text{HIn}$ có màu đỏ:
  $$\\text{HIn} \\rightleftharpoons \\text{H}^+ + \\text{In}^-$$
- Khi ở môi trường thiếu $\text{H}^+$ hoặc nhiều $\text{OH}^-$ (base), ion $\text{H}^+$ bị tách ra tạo dạng ion $\text{In}^-$ có màu xanh.`,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Litmus', common: 'Quỳ tím', formula: '$\\text{HIn}$', description: 'Hợp chất hữu cơ tự nhiên dùng làm chất chỉ thị acid-base.' }
    ],
    quiz: {
      id: 'q6',
      question: 'Giấy quỳ tím khi nhúng vào dung dịch giấm ăn (chứa ethanoic acid) sẽ chuyển màu gì?',
      options: ['Màu xanh', 'Màu đỏ', 'Màu vàng', 'Không đổi màu'],
      correctAnswer: 1,
      explanation: 'Giấm ăn có tính acid, làm giấy quỳ tím chuyển sang màu đỏ.'
    }
  },
  {
    id: 'lesson-7',
    title: 'Bài 7: Chất chỉ thị tự nhiên từ bắp cải tím',
    subtitle: 'Tự chế tạo chất chỉ thị ngay tại gian bếp nhà bạn',
    category: 'STEM',
    readingTime: '5 phút',
    content: `Bắp cải tím chứa hàm lượng lớn chất màu tự nhiên thuộc nhóm **anthocyanin** ($\text{C}_{15}\text{H}_{11}\text{O}_6^+$). Sắc tố này đổi màu cực kỳ phong phú theo từng khoảng $\text{pH}$:
- $\text{pH } 1–2$ (Acid mạnh): Đỏ đậm / Hồng sáng
- $\text{pH } 3–5$ (Acid yếu): Tím / Hồng nhạt
- $\text{pH } 6–8$ (Trung tính): Tím hoa cà / Xanh lam nhạt
- $\text{pH } 9–11$ (Base yếu): Xanh lá cây
- $\text{pH } 12–14$ (Base mạnh): Vàng / Xanh lục vàng`,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Anthocyanin', common: 'Sắc tố bắp cải tím', formula: '$\\text{C}_{15}\\text{H}_{11}\\text{O}_6^+$', description: 'Chất màu hữu cơ tự nhiên tan trong nước, đổi màu theo pH.' }
    ],
    quiz: {
      id: 'q7',
      question: 'Dịch chiết bắp cải tím khi gặp dung dịch base mạnh sẽ chuyển sang màu gì?',
      options: ['Màu đỏ tươi', 'Màu vàng hoặc xanh lục', 'Màu hồng', 'Màu tím đậm'],
      correctAnswer: 1,
      explanation: 'Dịch bắp cải tím chuyển sang màu xanh lá cây hoặc vàng trong môi trường base mạnh.'
    }
  },
  {
    id: 'lesson-7b',
    title: 'Bài 7b: Chất chỉ thị tự nhiên từ khoai lang tím',
    subtitle: 'Tận dụng củ khoai lang tím quen thuộc để làm thí nghiệm pH',
    category: 'STEM',
    readingTime: '4 phút',
    content: `Khoai lang tím (*Ipomoea batatas*) chứa hàm lượng rất cao các hợp chất **anthocyanin** (đặc biệt là dẫn xuất acylated cyanidin và peonidin) vô cùng nhạy cảm với sự thay đổi nồng độ ion $\text{H}^+$ trong dung dịch.

**Sự đổi màu theo thang $\text{pH}$:**
- **Môi trường acid ($\text{pH } 1 – 3$)**: Chuyển sang màu **đỏ hồng rực rỡ**.
- **Môi trường trung tính ($\text{pH } 6 – 8$)**: Giữ màu **tím hoa cà / tím nhạt**.
- **Môi trường base / kiềm ($\text{pH } 9 – 14$)**: Chuyển sang màu **xanh lá cây** hoặc **vàng lục**.`,
    image: 'https://images.unsplash.com/photo-1590502593749-4244d18357a6?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Cyanidin derivatives', common: 'Dẫn xuất Xyanidin trong khoai lang tím', formula: '$\\text{C}_{21}\\text{H}_{21}\\text{O}_{11}^+$', description: 'Sắc tố tự nhiên tạo màu tím và thay đổi cấu trúc theo pH.' }
    ],
    quiz: {
      id: 'q7b',
      question: 'Dịch chiết từ khoai lang tím khi nhỏ vào dung dịch kiềm (base) mạnh sẽ chuyển sang màu gì?',
      options: ['Màu đỏ thẫm', 'Màu xanh lá cây hoặc vàng lục', 'Màu trắng sữa', 'Màu đen hoàn toàn'],
      correctAnswer: 1,
      explanation: 'Do chứa anthocyanin, dịch chiết khoai lang tím chuyển sang màu xanh lá cây hoặc vàng lục trong môi trường kiềm (base).'
    }
  },
  {
    id: 'lesson-8',
    title: 'Bài 8: Ý nghĩa của pH trong nông nghiệp và đời sống',
    subtitle: 'Ứng dụng thực tế của việc kiểm tra độ pH',
    category: 'Đời sống',
    readingTime: '4 phút',
    content: `Kiểm tra $\text{pH}$ đóng vai trò cực kỳ quan trọng trong nhiều lĩnh vực:
1. **Nông nghiệp**: Đất trồng quá chua ($\text{pH} < 5.5$) làm cây khó hấp thụ dinh dưỡng, cần bón vôi ($\text{Ca(OH)}_2$) để nâng $\text{pH}$.
2. **Thủy sản**: Nuôi trồng thủy sản yêu cầu $\text{pH}$ nước ao hồ duy trì ổn định trong khoảng $7.5 – 8.5$.
3. **Y tế & Chăm sóc cơ thể**: Da người có lớp màng acid tự nhiên với $\text{pH} \approx 5.5$ giúp bảo vệ vi khuẩn có hại.`,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Carbonic acid', common: 'Axit cacbonic', formula: '$\\text{H}_2\\text{CO}_3$', description: 'Acid yếu tạo ra khi khí $\text{CO}_2$ hòa tan trong nước mưa.' }
    ],
    quiz: {
      id: 'q8',
      question: 'Nếu đất trồng bị chua (pH quá thấp), người nông dân thường bón chất nào để cải tạo?',
      options: ['Muối ăn (NaCl)', 'Vôi tôi (Calcium hydroxide)', 'Giấm ăn', 'Nước chanh'],
      correctAnswer: 1,
      explanation: 'Vôi tôi ($\text{Ca(OH)}_2$) là một base có tác dụng trung hòa độ chua của đất, nâng giá trị $\text{pH}$ lên mức thích hợp cho cây trồng.'
    }
  },
  {
    id: 'lesson-9',
    title: 'Bài 9: Vì sao màu sắc lại phản ánh giá trị pH?',
    subtitle: 'Bản chất quang phổ học và năng lượng phân tử',
    category: 'Chuyên sâu',
    readingTime: '4 phút',
    content: `Khi cấu trúc hóa học của chất chỉ thị thay đổi do nhận hoặc nhường ion $\text{H}^+$, độ dài bước sóng ánh sáng mà phân tử đó hấp thụ cũng thay đổi.
- Ứng dụng **ECO pH** sử dụng thuật toán phân tích không gian màu **RGB, HSV và LAB** để lượng hóa các giá trị màu sắc số hóa thành con số $\text{pH}$ chuẩn xác.`,
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Spectrophotometry', common: 'Quang phổ hấp thụ', formula: 'N/A', description: 'Phương pháp đo cường độ ánh sáng hấp thụ bởi dung dịch.' }
    ],
    quiz: {
      id: 'q9',
      question: 'Ứng dụng ECO pH phân tích màu sắc dựa trên các không gian màu nào?',
      options: ['Chỉ có RGB', 'RGB, HSV và LAB', 'Chỉ có trắng đen', 'Không gian CMYK'],
      correctAnswer: 1,
      explanation: 'Ứng dụng kết hợp trọn vẹn các không gian màu RGB, HSV và đặc biệt là không gian LAB ($\Delta E$) để nhận diện màu chính xác nhất.'
    }
  },
  {
    id: 'lesson-10',
    title: 'Bài 10: Những yếu tố ảnh hưởng khi chụp ảnh pH bằng điện thoại',
    subtitle: 'Mẹo để có kết quả nhận diện chính xác cao',
    category: 'STEM',
    readingTime: '4 phút',
    content: `Do camera điện thoại và điều kiện ánh sáng rất đa dạng, kết quả nhận diện $\text{pH}$ qua ảnh chụp có thể bị ảnh hưởng bởi các yếu tố sau:
1. **Ánh sáng quá mạnh hoặc chói lóa (Glare)**.
2. **Ánh sáng vàng/đỏ từ bóng đèn**.
3. **Nền đặt mẫu không chuẩn**.
*Mẹo*: Hãy dùng tính năng **Hiệu chuẩn màu** trong ứng dụng để cá nhân hóa cho từng loại giấy quỳ và camera của riêng bạn!`,
    image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80',
    iupacTerms: [
      { term: 'Delta E (ΔE)', common: 'Khoảng cách màu chuẩn', formula: '$\\Delta E$', description: 'Đại lượng đo khoảng cách giữa hai màu sắc theo tiêu chuẩn quốc tế.' }
    ],
    quiz: {
      id: 'q10',
      question: 'Để giảm thiểu sai số khi chụp ảnh giấy chỉ thị pH bằng điện thoại, bạn nên làm gì?',
      options: ['Chụp trong phòng tối thui', 'Đặt mẫu trên nền trắng, đủ ánh sáng tự nhiên và tránh lóe sáng', 'Dùng đèn flash trực tiếp sát mặt giấy', 'Nhúng giấy vào nước ngọt trước khi chụp'],
      correctAnswer: 1,
      explanation: 'Đủ ánh sáng tự nhiên, đặt trên nền trắng và tránh ánh sáng phản chiếu trực tiếp giúp camera nhận diện màu sắc chuẩn xác nhất.'
    }
  }
];
