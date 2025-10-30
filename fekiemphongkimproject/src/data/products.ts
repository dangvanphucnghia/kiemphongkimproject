// src/data/products.ts
export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  rating?: number;
  badges?: ("NEW" | "HOT" | "SALE")[];
  shortDesc?: string;
  description?: string;
  specs?: Record<string, string>;
};

const ph = (text: string) =>
  `https://placehold.co/1000x1000/FFF9EF/4B2E14/png?text=${encodeURIComponent(text)}`;

// Lưu ý: slug được tạo theo quy tắc bỏ dấu + gạch nối
export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: "tuong-di-lac-go-huong-da",
    name: "Tượng Di Lặc gỗ Hương đá",
    price: 1580000,
    image: ph("Tượng+Di+Lặc"),
    images: [ph("Di+Lac+1"), ph("Di+Lac+2"), ph("Di+Lac+3")],
    rating: 4.8,
    badges: ["HOT"],
    shortDesc: "Tượng Di Lặc thủ công, vân gỗ nổi đẹp.",
    description: "Đục chạm tỉ mỉ, phủ sáp ong tự nhiên. Tone vàng bạch kim sang trọng.",
    specs: { Chat_lieu: "Gỗ Hương đá", Kich_thuoc: "20 x 12 x 10 cm", Bao_hanh: "12 tháng" }
  },
  {
    id: 2,
    slug: "vong-tay-tram-huong-tu-nhien",
    name: "Vòng tay Trầm Hương tự nhiên",
    price: 960000,
    image: ph("Vòng+Trầm+Hương"),
    images: [ph("Tram+1"), ph("Tram+2"), ph("Tram+3")],
    rating: 4.6,
    badges: ["NEW"],
    shortDesc: "Chuỗi hạt trầm thơm dịu, charm vàng bạch kim.",
    description: "Hạt tuyển đều, mùi trầm ấm. Phù hợp đeo hàng ngày.",
    specs: { Size_hat: "10 mm", Chat_lieu: "Trầm hương tự nhiên", Bao_hanh: "6 tháng" }
  },
  {
    id: 3,
    slug: "tinh-dau-tram-nguyen-chat-50ml",
    name: "Tinh dầu Tràm nguyên chất 50ml",
    price: 120000,
    oldPrice: 150000,
    image: ph("Tinh+Dầu+Tràm"),
    images: [ph("Tram+50ml+1"), ph("Tram+50ml+2")],
    rating: 4.9,
    badges: ["SALE"],
    shortDesc: "Tinh dầu tràm 100% tự nhiên chai 50ml.",
    description: "Chưng cất hơi nước, mùi thơm dịu, an toàn cho gia đình.",
    specs: { Dung_tich: "50 ml", Xuat_xu: "Việt Nam", Bao_quan: "Nơi khô mát" }
  },
  {
    id: 4,
    slug: "mat-ong-rung-nguyen-chat-500ml",
    name: "Mật ong rừng nguyên chất 500ml",
    price: 210000,
    image: ph("Mật+Ong+Rừng"),
    images: [ph("Mat+ong+1"), ph("Mat+ong+2")],
    rating: 4.7,
    badges: ["HOT"],
    shortDesc: "Mật ong rừng sánh vàng, 500ml.",
    description: "Thu hoạch theo mùa, không pha tạp. Vị ngọt hậu rõ.",
    specs: { Dung_tich: "500 ml", Do_am: "< 20%", Bao_quan: "Đậy kín, tránh nắng" }
  },
  {
    id: 5,
    slug: "ruou-ngam-chuoi-hot-rung-1l",
    name: "Rượu ngâm chuối hột rừng 1L",
    price: 390000,
    image: ph("Rượu+Chuối+Hột"),
    images: [ph("Ruou+chuoi+1"), ph("Ruou+chuoi+2")],
    rating: 4.5,
    badges: ["HOT"],
    shortDesc: "Rượu chuối hột ngâm truyền thống 1L.",
    description: "Hương thơm nhẹ, hậu ngọt, dùng trong bữa cơm sum vầy.",
    specs: { Dung_tich: "1 Lít", Nong_do: "28–32%", Bao_quan: "Nơi thoáng mát" }
  },
  {
    id: 6,
    slug: "nu-tram-huong-khong-tam-100g",
    name: "Nụ trầm hương không tăm 100g",
    price: 180000,
    image: ph("Nụ+Trầm+Hương"),
    images: [ph("Nu+tram+1")],
    rating: 4.4,
    shortDesc: "Nụ trầm ít khói, thơm dịu.",
    description: "Thành phần bột trầm và keo bời lời, dễ bắt lửa.",
    specs: { Khoi_luong: "100 g", Thanh_phan: "Bột trầm", Thoi_gian_chay: "~10–15 phút/nụ" }
  },
  {
    id: 7,
    slug: "tinh-dau-sa-chanh-nguyen-chat-30ml",
    name: "Tinh dầu Sả Chanh nguyên chất 30ml",
    price: 95000,
    image: ph("Tinh+Dầu+Sả+Chanh"),
    images: [ph("Sa+chanh+1")],
    rating: 4.6,
    shortDesc: "Mùi tươi mát, xua côn trùng.",
    description: "Dùng xông phòng, khử mùi, thư giãn.",
    specs: { Dung_tich: "30 ml", Cach_dung: "Khuếch tán/xông" }
  },
  {
    id: 8,
    slug: "tuong-quan-am-go-bach-xanh",
    name: "Tượng Quan Âm gỗ Bách xanh",
    price: 2150000,
    image: ph("Tượng+Quan+Âm"),
    images: [ph("Quan-am+1"), ph("Quan-am+2")],
    rating: 4.8,
    badges: ["NEW"],
    shortDesc: "Gỗ bách xanh, đường nét mềm mại.",
    description: "Hoàn thiện mịn, màu vàng bạch kim nhã.",
    specs: { Chat_lieu: "Gỗ Bách xanh", Chieu_cao: "32 cm", Bao_hanh: "12 tháng" }
  },
  {
    id: 9,
    slug: "bot-san-day-nguyen-chat-500g",
    name: "Bột sắn dây nguyên chất 500g",
    price: 130000,
    image: ph("Bột+Sắn+Dây"),
    images: [ph("San+day+1")],
    rating: 4.3,
    shortDesc: "Bột sắn dây thơm mát, hạt mịn.",
    description: "Pha uống giải nhiệt hoặc nấu chè.",
    specs: { Khoi_luong: "500 g", Bao_quan: "Nơi khô mát" }
  },
  {
    id: 10,
    slug: "ruou-ngam-dong-dong-nep-non-1l",
    name: "Rượu ngâm đòng đòng nếp non 1L",
    price: 420000,
    image: ph("Rượu+Đòng+Đòng"),
    images: [ph("Dong+dong+1")],
    rating: 4.5,
    shortDesc: "Rượu đòng đòng hương lúa non, êm dịu.",
    description: "Đặc sản miền Tây, hậu ngọt.",
    specs: { Dung_tich: "1 Lít", Nong_do: "29–32%" }
  },
  {
    id: 11,
    slug: "tinh-dau-que-nguyen-chat-30ml",
    name: "Tinh dầu Quế nguyên chất 30ml",
    price: 125000,
    image: ph("Tinh+Dầu+Quế"),
    images: [ph("Que+1")],
    rating: 4.7,
    shortDesc: "Hương ấm, thư giãn.",
    description: "Phù hợp xông phòng ngày lạnh.",
    specs: { Dung_tich: "30 ml" }
  },
  {
    id: 12,
    slug: "ruou-ngam-tao-meo-vung-cao-1l",
    name: "Rượu ngâm táo mèo vùng cao 1L",
    price: 410000,
    image: ph("Rượu+Táo+Mèo"),
    images: [ph("Tao+meo+1")],
    rating: 4.5,
    shortDesc: "Vị chua ngọt, dễ uống.",
    description: "Ngâm quả táo mèo vùng cao theo mùa.",
    specs: { Dung_tich: "1 Lít", Nong_do: "28–32%" }
  },
  {
    id: 13,
    slug: "tuong-phat-a-di-da-go-huong",
    name: "Tượng Phật A Di Đà gỗ hương",
    price: 2980000,
    image: ph("Tượng+Phật+A+Di+Đà"),
    images: [ph("A-di-da+1"), ph("A-di-da+2")],
    rating: 4.9,
    badges: ["HOT"],
    shortDesc: "Đục tay tinh xảo, gỗ hương thơm.",
    description: "Bề mặt mịn, vân gỗ rõ.",
    specs: { Chat_lieu: "Gỗ Hương", Chieu_cao: "38 cm" }
  },
  {
    id: 14,
    slug: "vong-tay-go-trac-do-10ly",
    name: "Vòng tay gỗ Trắc đỏ 10ly",
    price: 490000,
    image: ph("Vòng+Gỗ+Trắc"),
    images: [ph("Trac+do+1")],
    rating: 4.6,
    shortDesc: "Chuỗi hạt 10ly, sắc gỗ trắc đỏ.",
    description: "Phối dây đàn hồi bền chắc.",
    specs: { Size_hat: "10 mm", Chat_lieu: "Gỗ Trắc" }
  },
  {
    id: 15,
    slug: "nu-tram-huong-thao-moc-200g",
    name: "Nụ trầm hương thảo mộc 200g",
    price: 290000,
    image: ph("Nụ+Trầm+200g"),
    images: [ph("Nu+tram+200g")],
    rating: 4.4,
    shortDesc: "Nhiều nụ, hương êm dịu.",
    description: "Ít khói, thích hợp thiền, thư giãn.",
    specs: { Khoi_luong: "200 g" }
  },
  {
    id: 16,
    slug: "tinh-dau-bac-ha-50ml",
    name: "Tinh dầu Bạc Hà 50ml",
    price: 115000,
    image: ph("Tinh+Dầu+Bạc+Hà"),
    images: [ph("Bac+ha+1")],
    rating: 4.6,
    shortDesc: "Tươi mát, sảng khoái.",
    description: "Hỗ trợ giảm mùi, xua côn trùng.",
    specs: { Dung_tich: "50 ml" }
  },
  {
    id: 17,
    slug: "ruou-ngam-nhan-sam-1l",
    name: "Rượu ngâm nhân sâm 1L",
    price: 550000,
    image: ph("Rượu+Nhân+Sâm"),
    images: [ph("Nhan+sam+1")],
    rating: 4.5,
    shortDesc: "Rượu nhân sâm vị đậm, thơm.",
    description: "Thích hợp biếu tặng.",
    specs: { Dung_tich: "1 Lít", Nong_do: "30–35%" }
  },
  {
    id: 18,
    slug: "ruou-ngam-nep-cam-1l",
    name: "Rượu ngâm nếp cẩm 1L",
    price: 380000,
    image: ph("Rượu+Nếp+Cẩm"),
    images: [ph("Nep+cam+1")],
    rating: 4.4,
    shortDesc: "Hương nếp cẩm đặc trưng.",
    description: "Màu tím than tự nhiên.",
    specs: { Dung_tich: "1 Lít", Nong_do: "28–32%" }
  },
  {
    id: 19,
    slug: "tuong-go-tam-da-phuc-loc-tho",
    name: "Tượng gỗ Tam Đa Phúc Lộc Thọ",
    price: 3250000,
    image: ph("Tượng+Tam+Đa"),
    images: [ph("Tam+Da+1"), ph("Tam+Da+2")],
    rating: 4.8,
    badges: ["HOT"],
    shortDesc: "Bộ ba Tam Đa gỗ, tượng tròn khối đẹp.",
    description: "Tạo hình cân đối, bề mặt láng mịn.",
    specs: { Chat_lieu: "Gỗ tự nhiên", Chieu_cao: "30–32 cm" }
  },
  {
    id: 20,
    slug: "tinh-dau-oai-huong-thu-gian-50ml",
    name: "Tinh dầu Oải Hương thư giãn 50ml",
    price: 139000,
    image: ph("Tinh+Dầu+Oải+Hương"),
    images: [ph("Oai+huong+1")],
    rating: 4.7,
    shortDesc: "Oải hương dịu nhẹ, dễ ngủ.",
    description: "Phù hợp dùng trước khi ngủ.",
    specs: { Dung_tich: "50 ml" }
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
