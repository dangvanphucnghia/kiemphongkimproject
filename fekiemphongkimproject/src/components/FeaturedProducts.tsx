// AllFeaturedSections.tsx
import { useState, useId } from "react";
import { ShoppingCart, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";

/* ==== Màu chữ tối ưu nền gỗ ==== */
const TITLE_STROKE = { WebkitTextStroke: "0.6px rgba(0,0,0,.35)" };
const TITLE_SHADOW = "[text-shadow:0_1px_0_#000,0_2px_6px_rgba(0,0,0,.35)]";

/* ============ IMAGE ============ */
const ph = (text: string) =>
  `https://placehold.co/800x800/FFF9EF/4B2E14/png?text=${encodeURIComponent(text)}`;

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

/* ============ FILTER GROUP ============ */
function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4 border-b border-yellow-700/40 pb-3">
      <h4 className="text-sm font-bold text-yellow-200 mb-2">{title}</h4>
      <div className="space-y-1">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-yellow-100">
            <input type="checkbox" className="accent-yellow-500" /> {item}
          </label>
        ))}
      </div>
    </div>
  );
}

/* ============ PAGINATION ============ */
function Pagination({ page, setPage, totalPages }: any) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-full border border-[#C8A951] text-[#4B2E14] disabled:opacity-40 hover:bg-[#C8A951] hover:text-white transition"
      >
        ‹ Trước
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`w-9 h-9 rounded-full border transition ${
            page === i + 1
              ? "bg-[#C8A951] text-white border-[#C8A951]"
              : "border-[#C8A951] text-[#4B2E14] hover:bg-[#FFF9EF]"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-full border border-[#C8A951] text-[#4B2E14] disabled:opacity-40 hover:bg-[#C8A951] hover:text-white transition"
      >
        Sau ›
      </button>
    </div>
  );
}

/* ============ PRODUCT CARD ============ */
function ProductCard({ p }: { p: any }) {
  const VND = new Intl.NumberFormat("vi-VN");
  const salePct =
    p.oldPrice && p.oldPrice > p.price
      ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
      : 0;
  return (
    <article className="group bg-[#FFFCF6] rounded-2xl border border-[#E9DBC1] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative flex flex-col">
      {salePct > 0 && (
        <div className="absolute top-2 left-2 bg-[#C8A951] text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
          -{salePct}%
        </div>
      )}
      <Link to={`/san-pham/${p.slug}`} className="block w-full">
        <div className="aspect-[1/1] bg-[#FFF9EF] overflow-hidden flex items-center justify-center">
          <ImageWithFallback src={p.image} alt={p.name} />
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <Link to={`/san-pham/${p.slug}`} className="block">
          <h3 className="font-semibold text-[#3F250C] group-hover:text-[#C8A951] text-[15px] leading-snug line-clamp-2">
            {p.name}
          </h3>
        </Link>
        <div className="mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[#B8860B] font-bold text-lg">
              {VND.format(p.price)}₫
            </span>
            {p.oldPrice && (
              <span className="text-gray-400 line-through text-sm">
                {VND.format(p.oldPrice)}₫
              </span>
            )}
          </div>
          <button className="mt-2 w-full border border-[#C8A951] text-[#6A4521] font-medium py-2 rounded-lg flex items-center justify-center gap-1 hover:bg-[#C8A951] hover:text-white transition-colors text-sm">
            <ShoppingCart size={16} /> Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}

/* ============ 1 HÀNG 6 SP + NÚT LỌC ============ */
function ProductRow({ title, subtitle, items, onShowMore, onShowFilter }: any) {
  const rowId = useId();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.slice(0, 6).map((p: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `/san-pham/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <section aria-labelledby={`${rowId}-title`} className="space-y-4">
      {/* Header + nút lọc ở góc phải */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2
            id={`${rowId}-title`}
            className={`text-2xl md:text-3xl font-extrabold text-yellow-100 ${TITLE_SHADOW}`}
            style={TITLE_STROKE}
          >
            🌿 {title}
          </h2>
          <p className={`text-sm text-yellow-100/85 italic ${TITLE_SHADOW}`}>{subtitle}</p>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </div>

        <button
          onClick={onShowFilter}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C8A951] text-yellow-100 hover:bg-[#C8A951]/20 transition"
        >
          <SlidersHorizontal size={16} />
          Lọc sản phẩm
        </button>
      </div>

      {/* Mobile/Tablet: kéo ngang */}
      <div className="lg:hidden overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-4 snap-x snap-mandatory">
          {items.slice(0, 6).map((p: any) => (
            <div key={p.id} className="snap-start shrink-0 w-[240px]">
              <ProductCard p={p} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 1 hàng 6 cột */}
      <div className="hidden lg:grid gap-4 xl:gap-5 lg:grid-cols-6">
        {items.slice(0, 6).map((p: any) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {items.length > 6 && (
        <div className="flex justify-center">
          <button
            onClick={onShowMore}
            className="px-8 py-2.5 border-2 border-[#C8A951] text-yellow-100 font-semibold rounded-full hover:bg-[#C8A951]/20 transition-all"
          >
            Xem thêm ▼
          </button>
        </div>
      )}
    </section>
  );
}

/* ============ GRID MODE (khi bấm lọc hoặc xem thêm) ============ */
function SectionWithGrid({ title, subtitle, items }: any) {
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState(true);
  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const list = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2
          className={`text-2xl md:text-3xl font-extrabold text-yellow-100 ${TITLE_SHADOW}`}
          style={TITLE_STROKE}
        >
          🌿 {title}
        </h2>
        <div className="flex items-center gap-3">
          <span className={`text-sm text-yellow-100/85 italic ${TITLE_SHADOW}`}>{subtitle}</span>
          <button
            onClick={() => setShowFilter((s) => !s)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#C8A951] text-yellow-100 hover:bg-[#C8A951]/20 transition"
          >
            <SlidersHorizontal size={16} />
            {showFilter ? "Ẩn bộ lọc" : "Lọc sản phẩm"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {showFilter && (
          <aside className="w-full md:w-64 rounded-2xl p-4 shadow-md bg-[rgba(44,26,13,0.75)] backdrop-blur-sm border border-yellow-700/40 text-amber-50">
            <h3 className="text-yellow-200 font-bold mb-3 flex items-center gap-1">
              <SlidersHorizontal size={16} /> Bộ lọc
            </h3>
            <FilterGroup title="Nhóm" items={["Tam Đa", "Di Lặc", "Quan Âm"]} />
            <FilterGroup title="Loại gỗ" items={["Hương Đá", "Hương Ta", "Mun Hoa", "Bách Xanh"]} />
            <FilterGroup title="Giá" items={["< 1 triệu", "1 – 2 triệu", "> 2 triệu"]} />
            <FilterGroup title="Vị trí" items={["Phòng khách", "Bàn thờ", "Cửa hàng", "Kệ tủ"]} />
          </aside>
        )}

        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-6">
            {list.map((p: any) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-4">
            {totalPages > 1 && (
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ SECTION (Tự động chuyển chế độ) ============ */
function ProductSection({ title, subtitle, items }: any) {
  const [expanded, setExpanded] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-[1600px] px-4">
        {!expanded && !showFilter && (
          <ProductRow
            title={title}
            subtitle={subtitle}
            items={items}
            onShowMore={() => setExpanded(true)}
            onShowFilter={() => setShowFilter(true)}
          />
        )}

        {(expanded || showFilter) && (
          <>
            <SectionWithGrid title={title} subtitle={subtitle} items={items} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => {
                  setExpanded(false);
                  setShowFilter(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-2.5 border-2 border-[#C8A951] text-[#FFFFFF] font-semibold rounded-full hover:bg-[#C8A951] hover:text-white transition-all shadow-sm"
              >
                Thu gọn ▲
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ============ PAGE ============ */
export default function AllFeaturedSections() {
  const WOOD_BG =
    "bg-[url('/images/wood.jpg')] bg-repeat bg-[length:512px_auto] bg-top bg-fixed";

  return (
    <div className={`min-h-screen ${WOOD_BG}`}>
      <ProductSection
        title="🔥 Khuyến mãi đặc biệt"
        subtitle="Giảm giá hấp dẫn cho các sản phẩm được yêu thích"
        items={PRODUCTS.slice(0, 18)}
      />
      <ProductSection
        title="💛 Được mua nhiều"
        subtitle="Những sản phẩm khách hàng lựa chọn nhiều nhất"
        items={PRODUCTS.slice(4, 40)}
      />
      <ProductSection
        title="🪵 Đồ gỗ phong thủy"
        subtitle="Tượng và vật phẩm gỗ tự nhiên mang năng lượng an lành"
        items={PRODUCTS.filter(
          (p: any) =>
            p.name.toLowerCase().includes("tượng") ||
            p.name.toLowerCase().includes("vòng")
        )}
      />
      <ProductSection
        title="🍶 Rượu truyền thống Việt"
        subtitle="Rượu ngâm thảo mộc – tinh hoa văn hoá Việt"
        items={PRODUCTS.filter((p: any) =>
          p.name.toLowerCase().includes("rượu")
        )}
      />
    </div>
  );
}
