import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

// Placeholder ảnh fallback
const ph = (text: string) =>
  `https://placehold.co/800x800/FFF9EF/4B2E14/png?text=${encodeURIComponent(text)}`;

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
  // bg bỏ qua không dùng nữa (giữ tham số để không phải sửa nơi gọi)
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

  const VND = new Intl.NumberFormat("vi-VN");

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2
            className="text-2xl md:text-3xl font-extrabold leading-tight flex items-center gap-2 text-amber-50 [text-shadow:0_1px_0_#000,0_2px_6px_rgba(0,0,0,.35)]"
            style={{ WebkitTextStroke: "0.6px rgba(0,0,0,.35)" }}
          >
            <span className="inline-block">🌿</span>
            <span>{title}</span>
          </h2>

          <span className="text-sm italic text-amber-50/90 [text-shadow:0_1px_0_#000,0_1px_4px_rgba(0,0,0,.45)]">
            {subtitle}
          </span>
        </div>

        {/* Lớp nền mờ để nổi trên nền gỗ */}
        <div className="rounded-2xl border border-[#E9DBC1]/70 bg-[#FFFCF6]/85 backdrop-blur-[2px] p-4 md:p-5 shadow-[0_6px_24px_rgba(0,0,0,0.08)]">
          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
            {visibleItems.map((p) => {
              const salePct =
                p.oldPrice && p.oldPrice > p.price
                  ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
                  : 0;

              return (
                <article
                  key={p.id}
                  className="group bg-[#FFFCF6] rounded-2xl border border-[#E9DBC1] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative flex flex-col"
                >
                  {/* Badge giảm giá */}
                  {salePct > 0 && (
                    <div className="absolute top-2 left-2 bg-[#C8A951] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                      -{salePct}%
                    </div>
                  )}

                  {/* Ảnh (click mở chi tiết) */}
                  <Link to={`/san-pham/${p.slug}`} state={{ product: p }} className="block w-full">
                    <div className="w-full aspect-[1/1] overflow-hidden bg-[#FFF9EF] flex items-center justify-center">
                      <ImageWithFallback src={p.image} alt={p.name} />
                    </div>
                  </Link>

                  {/* Nội dung */}
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div className="flex-grow">
                      {/* Tiêu đề (click mở chi tiết) */}
                      <Link to={`/san-pham/${p.slug}`} state={{ product: p }} className="block">
                        <h3 className="font-semibold text-[#3F250C] group-hover:text-[#C8A951] leading-snug text-[15px] line-clamp-2">
                          {p.name}
                        </h3>
                      </Link>
                    </div>

                    {/* Giá + nút */}
                    <div className="mt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[#B8860B] font-bold text-lg">
                          {VND.format(p.price)}₫
                        </span>
                        {p.oldPrice && p.oldPrice > p.price && (
                          <span className="text-gray-400 line-through text-sm">
                            {VND.format(p.oldPrice)}₫
                          </span>
                        )}
                      </div>
                      <button
                        className="mt-2 w-full bg-[#FFF9EF] border border-[#C8A951] text-[#6A4521] font-medium py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#C8A951] hover:text-white transition-colors text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: mở drawer giỏ hàng UI-only nếu muốn
                        }}
                      >
                        <ShoppingCart size={16} /> Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
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
                      className={`w-9 h-9 rounded-full border transition ${active
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
      </div>
    </section>
  );
}

// ========== TRANG CHÍNH ==========
export default function AllFeaturedSections() {
  // Nền vân gỗ cho toàn bộ khu vực featured
  // Dùng texture từ public/images/wood.jpg (đặt file vào đó)
  const WOOD_BG =
    "bg-[url('/images/wood.jpg')] bg-repeat bg-[length:512px_auto] bg-top bg-fixed";

  return (
    <div className={`min-h-screen ${WOOD_BG}`}>
      {/* bỏ gradient ở các section, để lớp mờ phía trong lo hiển thị */}
      <ProductGrid
        title="🔥 Khuyến mãi đặc biệt"
        subtitle="Giảm giá hấp dẫn cho các sản phẩm được yêu thích"
        bg=""
        items={PRODUCTS.slice(0, 8)}
      />
      <ProductGrid
        title="💛 Được mua nhiều"
        subtitle="Những sản phẩm khách hàng lựa chọn nhiều nhất"
        bg=""
        items={PRODUCTS.slice(4, 20)}
      />
      <ProductGrid
        title="🪵 Đồ gỗ phong thủy"
        subtitle="Tượng và vật phẩm gỗ tự nhiên mang năng lượng an lành"
        bg=""
        items={PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes("tượng") ||
            p.name.toLowerCase().includes("vòng")
        )}
      />
      <ProductGrid
        title="🍶 Rượu truyền thống Việt"
        subtitle="Rượu ngâm thảo mộc – tinh hoa văn hoá Việt"
        bg=""
        items={PRODUCTS.filter((p) => p.name.toLowerCase().includes("rượu"))}
      />
    </div>
  );
}
