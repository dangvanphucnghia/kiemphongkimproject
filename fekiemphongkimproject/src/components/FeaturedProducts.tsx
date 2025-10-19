import { useState } from "react";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;      // có thể thay bằng ảnh thật sau
  price: number;
  oldPrice?: number;
  desc?: string;
}

// Ảnh placeholder an toàn 100% (HTTPS, luôn trả ảnh)
const ph = (text: string) =>
  `https://placehold.co/800x800/FFF8E7/4B2E14/png?text=${encodeURIComponent(text)}`;

const PRODUCTS: Product[] = [
  { id: 1,  name: "Tượng Di Lặc gỗ Hương đá",            image: ph("Tượng+Gỗ"),            price: 1580000, desc: "Tượng phong thủy mang lại may mắn, chế tác từ gỗ Hương đá cao cấp." },
  { id: 2,  name: "Vòng tay Trầm Hương tự nhiên",         image: ph("Vòng+Trầm+Hương"),     price: 960000,  desc: "Trầm hương rừng tự nhiên, hương thơm thanh khiết, phù hợp phong thủy." },
  { id: 3,  name: "Tinh dầu Tràm nguyên chất 50ml",       image: ph("Tinh+Dầu+Tràm"),       price: 120000,  oldPrice: 150000, desc: "Tinh dầu truyền thống kháng khuẩn, giúp thư giãn tinh thần và an toàn cho trẻ nhỏ." },
  { id: 4,  name: "Mật ong rừng nguyên chất 500ml",       image: ph("Mật+Ong+Rừng"),        price: 210000,  desc: "Mật ong tự nhiên 100%, giàu dinh dưỡng và tốt cho sức khỏe." },
  { id: 5,  name: "Rượu ngâm chuối hột rừng 1L",          image: ph("Rượu+Ngâm+Chuối+Hột"), price: 390000,  desc: "Rượu ngâm thủ công, vị đậm đà, mang hương vị quê nhà truyền thống." },
  { id: 6,  name: "Nụ trầm hương không tăm 100g",         image: ph("Nụ+Trầm+Hương"),       price: 180000,  desc: "Nụ trầm thiên nhiên, hương thơm dịu nhẹ, giúp an thần và tĩnh tâm." },
  { id: 7,  name: "Tinh dầu Sả Chanh nguyên chất 30ml",   image: ph("Tinh+Dầu+Sả+Chanh"),   price: 95000,   desc: "Tinh dầu tự nhiên giúp khử khuẩn, xua muỗi và tạo cảm giác thư giãn." },
  { id: 8,  name: "Tượng Quan Âm gỗ Bách xanh",           image: ph("Tượng+Quan+Âm"),       price: 2150000, desc: "Tượng Quan Âm an lành, gỗ Bách xanh thơm nhẹ, tinh tế và thanh tịnh." },
  { id: 9,  name: "Bột sắn dây nguyên chất 500g",         image: ph("Bột+Sắn+Dây"),         price: 130000,  desc: "Sản phẩm truyền thống, giải nhiệt cơ thể và hỗ trợ tiêu hóa." },
  { id: 10, name: "Rượu ngâm đòng đòng nếp non 1L",       image: ph("Rượu+Đòng+Đòng"),      price: 420000,  desc: "Rượu ngâm thủ công, vị ngọt nhẹ và hương thơm tinh tế." },
];

// Ảnh có fallback: nếu src lỗi => dùng ảnh dự phòng
function ImageWithFallback({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  const FALLBACK = ph("Kiem+Phong+Kim");
  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => setImgSrc(FALLBACK)}
      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
    />
  );
}

export default function FeaturedProducts() {
  const [visibleCount, setVisibleCount] = useState(5);
  const handleShowMore = () => setVisibleCount((v) => Math.min(v + 5, PRODUCTS.length));
  const handleCollapse = () => setVisibleCount(5);

  return (
    <section className="py-12 bg-gradient-to-b from-[#FFFDF5] to-[#FFF8E7]" aria-label="Sản phẩm nổi bật hôm nay">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#5C3B1E] flex items-center gap-2">
            🌿 <span>Sản phẩm nổi bật hôm nay</span>
          </h2>
          <span className="text-sm text-gray-500 italic">Ưu đãi hấp dẫn mỗi ngày</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {PRODUCTS.slice(0, visibleCount).map((p) => (
            <article
              key={p.id}
              className="group bg-white rounded-2xl border border-[#F3E8C9] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative flex flex-col"
            >
              {/* Badge giảm giá */}
              {p.oldPrice && (
                <div className="absolute top-2 left-2 bg-[#D4AF37] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                </div>
              )}

              {/* Ảnh vuông, đảm bảo hiển thị */}
              <div className="w-full aspect-[1/1] overflow-hidden bg-[#FFF8E7] flex items-center justify-center">
                <ImageWithFallback src={p.image} alt={p.name} />
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="flex-grow">
                  <h3 className="font-semibold text-[#4B2E14] group-hover:text-[#C79C3D] leading-snug text-[15px] line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{p.desc}</p>
                </div>

                {/* Giá + nút */}
                <div className="mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#B8860B] font-bold text-lg">{p.price.toLocaleString()}₫</span>
                    {p.oldPrice && <span className="text-gray-400 line-through text-sm">{p.oldPrice.toLocaleString()}₫</span>}
                  </div>
                  <button
                    className="mt-2 w-full bg-[#FFF8E7] border border-[#D4AF37] text-[#8B5E3C] font-medium py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#D4AF37] hover:text-white transition-colors text-sm"
                    aria-label={`Thêm ${p.name} vào giỏ`}
                  >
                    <ShoppingCart size={16} /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Xem thêm / Thu gọn */}
        <div className="text-center mt-10">
          {visibleCount < PRODUCTS.length ? (
            <button
              onClick={handleShowMore}
              className="px-8 py-2.5 border-2 border-[#D4AF37] text-[#5C3B1E] font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
            >
              Xem thêm sản phẩm ▼
            </button>
          ) : (
            <button
              onClick={handleCollapse}
              className="px-8 py-2.5 border-2 border-[#D4AF37] text-[#5C3B1E] font-semibold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all shadow-sm"
            >
              Thu gọn ▲
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
