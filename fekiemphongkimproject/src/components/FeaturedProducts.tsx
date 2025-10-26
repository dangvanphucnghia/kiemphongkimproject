import { useState } from "react";
import { ShoppingCart } from "lucide-react";

// ========== DATA ==========
const ph = (text: string) =>
  `https://placehold.co/800x800/FFF9EF/4B2E14/png?text=${encodeURIComponent(text)}`;

// ========== SẢN PHẨM ==========
const PRODUCTS = [
  { id: 1, name: "Tượng Di Lặc gỗ Hương đá", image: ph("Tượng+Di+Lặc"), price: 1580000 },
  { id: 2, name: "Vòng tay Trầm Hương tự nhiên", image: ph("Vòng+Trầm+Hương"), price: 960000 },
  { id: 3, name: "Tinh dầu Tràm nguyên chất 50ml", image: ph("Tinh+Dầu+Tràm"), price: 120000, oldPrice: 150000 },
  { id: 4, name: "Mật ong rừng nguyên chất 500ml", image: ph("Mật+Ong+Rừng"), price: 210000 },
  { id: 5, name: "Rượu ngâm chuối hột rừng 1L", image: ph("Rượu+Chuối+Hột"), price: 390000 },
  { id: 6, name: "Nụ trầm hương không tăm 100g", image: ph("Nụ+Trầm+Hương"), price: 180000 },
  { id: 7, name: "Tinh dầu Sả Chanh nguyên chất 30ml", image: ph("Tinh+Dầu+Sả+Chanh"), price: 95000 },
  { id: 8, name: "Tượng Quan Âm gỗ Bách xanh", image: ph("Tượng+Quan+Âm"), price: 2150000 },
  { id: 9, name: "Bột sắn dây nguyên chất 500g", image: ph("Bột+Sắn+Dây"), price: 130000 },
  { id: 10, name: "Rượu ngâm đòng đòng nếp non 1L", image: ph("Rượu+Đòng+Đòng"), price: 420000 },
  { id: 11, name: "Tinh dầu Quế nguyên chất 30ml", image: ph("Tinh+Dầu+Quế"), price: 125000 },
  { id: 12, name: "Rượu ngâm táo mèo vùng cao 1L", image: ph("Rượu+Táo+Mèo"), price: 410000 },
  { id: 13, name: "Tượng Phật A Di Đà gỗ hương", image: ph("Tượng+Phật+A+Di+Đà"), price: 2980000 },
  { id: 14, name: "Vòng tay gỗ Trắc đỏ 10ly", image: ph("Vòng+Gỗ+Trắc"), price: 490000 },
  { id: 15, name: "Nụ trầm hương thảo mộc 200g", image: ph("Nụ+Trầm+200g"), price: 290000 },
  { id: 16, name: "Tinh dầu Bạc Hà 50ml", image: ph("Tinh+Dầu+Bạc+Hà"), price: 115000 },
  { id: 17, name: "Rượu ngâm nhân sâm 1L", image: ph("Rượu+Nhân+Sâm"), price: 550000 },
  { id: 18, name: "Rượu ngâm nếp cẩm 1L", image: ph("Rượu+Nếp+Cẩm"), price: 380000 },
  { id: 19, name: "Tượng gỗ Tam Đa Phúc Lộc Thọ", image: ph("Tượng+Tam+Đa"), price: 3250000 },
  { id: 20, name: "Tinh dầu Oải Hương thư giãn 50ml", image: ph("Tinh+Dầu+Oải+Hương"), price: 139000 },
];

// ========== IMAGE COMPONENT ==========
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

// ========== PRODUCT GRID ==========
function ProductGrid({
  title,
  subtitle,
  bg,
  items,
}: {
  title: string;
  subtitle: string;
  bg: string;
  items: any[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const visibleItems = expanded
    ? items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : items.slice(0, 5);

  const canShowMore = !expanded && items.length > 5;
  const canPaginate = expanded && totalPages > 1;

  const onExpand = () => {
    setExpanded(true);
    setPage(1);
  };
  const onCollapse = () => {
    setExpanded(false);
    setPage(1);
  };

  return (
    <section className={`py-12 ${bg}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#4B2E14] flex items-center gap-2">
            🌿 <span>{title}</span>
          </h2>
          <span className="text-sm text-[#8B6B43] italic">{subtitle}</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
          {visibleItems.map((p) => (
            <article
              key={p.id}
              className="group bg-[#FFFCF6] rounded-2xl border border-[#E9DBC1] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative flex flex-col"
            >
              {/* Badge giảm giá */}
              {p.oldPrice && (
                <div className="absolute top-2 left-2 bg-[#C8A951] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                  -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                </div>
              )}

              {/* Ảnh */}
              <div className="w-full aspect-[1/1] overflow-hidden bg-[#FFF9EF] flex items-center justify-center">
                <ImageWithFallback src={p.image} alt={p.name} />
              </div>

              {/* Nội dung */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="flex-grow">
                  <h3 className="font-semibold text-[#3F250C] group-hover:text-[#C8A951] leading-snug text-[15px] line-clamp-2">
                    {p.name}
                  </h3>
                </div>

                {/* Giá + nút */}
                <div className="mt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[#B8860B] font-bold text-lg">
                      {p.price.toLocaleString()}₫
                    </span>
                    {p.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {p.oldPrice.toLocaleString()}₫
                      </span>
                    )}
                  </div>
                  <button className="mt-2 w-full bg-[#FFF9EF] border border-[#C8A951] text-[#6A4521] font-medium py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#C8A951] hover:text-white transition-colors text-sm">
                    <ShoppingCart size={16} /> Thêm vào giỏ
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Điều khiển dưới grid */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {canPaginate && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 rounded-full border border-[#C8A951] text-[#4B2E14] disabled:opacity-40 hover:bg-[#C8A951] hover:text-white transition"
              >
                ‹ Trước
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === page;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-full border transition ${
                      active
                        ? "bg-[#C8A951] text-white border-[#C8A951]"
                        : "border-[#C8A951] text-[#4B2E14] hover:bg-[#FFF9EF]"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 rounded-full border border-[#C8A951] text-[#4B2E14] disabled:opacity-40 hover:bg-[#C8A951] hover:text-white transition"
              >
                Sau ›
              </button>
            </div>
          )}

          {!expanded && canShowMore && (
            <button
              onClick={onExpand}
              className="px-8 py-2.5 border-2 border-[#C8A951] text-[#4B2E14] font-semibold rounded-full hover:bg-[#C8A951] hover:text-white transition-all shadow-sm"
            >
              Xem thêm ▼
            </button>
          )}
          {expanded && (
            <button
              onClick={onCollapse}
              className="px-8 py-2.5 border-2 border-[#C8A951] text-[#4B2E14] font-semibold rounded-full hover:bg-[#C8A951] hover:text-white transition-all shadow-sm"
            >
              Thu gọn ▲
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// ========== TRANG CHÍNH ==========
export default function AllFeaturedSections() {
  return (
    <div className="bg-[#FFFDF7]">
      <ProductGrid
        title="🔥 Khuyến mãi đặc biệt"
        subtitle="Giảm giá hấp dẫn cho các sản phẩm được yêu thích"
        bg="bg-gradient-to-b from-[#FFF7E9] to-[#FFF9EF]"
        items={PRODUCTS.slice(0, 8)}
      />
      <ProductGrid
        title="💛 Được mua nhiều"
        subtitle="Những sản phẩm khách hàng lựa chọn nhiều nhất"
        bg="bg-gradient-to-b from-[#FFF9F0] to-[#FFF9EB]"
        items={PRODUCTS.slice(4, 20)}
      />
      <ProductGrid
        title="🪵 Đồ gỗ phong thủy"
        subtitle="Tượng và vật phẩm gỗ tự nhiên mang năng lượng an lành"
        bg="bg-gradient-to-b from-[#FFFAF2] to-[#FFF5E8]"
        items={PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes("tượng") ||
            p.name.toLowerCase().includes("vòng")
        )}
      />
      <ProductGrid
        title="🍶 Rượu truyền thống Việt"
        subtitle="Rượu ngâm thảo mộc – tinh hoa văn hoá Việt"
        bg="bg-gradient-to-b from-[#FFF8EC] to-[#FFF4DE]"
        items={PRODUCTS.filter((p) => p.name.toLowerCase().includes("rượu"))}
      />
    </div>
  );
}
