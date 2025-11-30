// src/pages/Products.tsx
import { useEffect, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../data/products";
import { ph } from "../data/products";

/* ===== CẤU HÌNH ẢNH TỪ BE ===== */
const API_BASE = import.meta.env.VITE_API_URL ?? ""; // vd: https://kiemphongkimproject.onrender.com

function resolveImageUrl(src?: string, nameForPh?: string) {
  const fallback = ph(nameForPh || "Kiem+Phong+Kim");

  if (!src) return fallback;

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  if (src.startsWith("/uploads/")) {
    return API_BASE ? `${API_BASE}${src}` : src;
  }

  return src;
}
/* =================================== */

export default function ProductsPage() {
  // lấy param danh mục: /danh-muc/:categorySlug  (vd: 72-long-quy)
  const { categorySlug } = useParams<{ categorySlug?: string }>();

  // tách ID + tên từ slug
  const categoryId = categorySlug ? Number(categorySlug.split("-")[0]) : null;
  const categoryNameSlug = categorySlug
    ? categorySlug.split("-").slice(1).join(" ")
    : "";

  const [sort, setSort] = useState("Giá");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [limit, setLimit] = useState(36);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State filter (checkbox)
  const [groupFilter, setGroupFilter] = useState<string[]>([]);
  const [woodFilter, setWoodFilter] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // NẾU CÓ categoryId => gọi API lọc theo category
        const url = categoryId
          ? `/api/products/category/${categoryId}`
          : `/api/products`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Không tải được danh sách sản phẩm");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (e: any) {
        setError(e.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  // ==== Filter client dựa trên data từ API ====
  const filtered = products.filter((p) => {
    if (groupFilter.length > 0) {
      const nameLower = p.name.toLowerCase();
      const ok = groupFilter.some((g) => nameLower.includes(g.toLowerCase()));
      if (!ok) return false;
    }

    if (woodFilter.length > 0) {
      const text = (p.name + " " + (p.description || "")).toLowerCase();
      const ok = woodFilter.some((w) => text.includes(w.toLowerCase()));
      if (!ok) return false;
    }

    if (priceFilter.length > 0) {
      const price = p.salePrice ?? p.price ?? 0;
      let okPrice = false;
      for (const pf of priceFilter) {
        if (pf === "Dưới 1 triệu" && price < 1_000_000) okPrice = true;
        if (pf === "1–2 triệu" && price >= 1_000_000 && price <= 2_000_000)
          okPrice = true;
        if (pf === "Trên 2 triệu" && price > 2_000_000) okPrice = true;
      }
      if (!okPrice) return false;
    }

    return true;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    const priceA = a.salePrice ?? a.price ?? 0;
    const priceB = b.salePrice ?? b.price ?? 0;

    if (sort === "Giá") return priceA - priceB;
    if (sort === "Tên A-Z") return a.name.localeCompare(b.name, "vi");
    if (sort === "Tên Z-A") return b.name.localeCompare(a.name, "vi");
    return 0;
  });

  const toDisplay = sorted.slice(0, limit);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-100">
        <p>Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-100">
        <p className="text-red-400">Lỗi: {error}</p>
      </div>
    );
  }

  // ƯU TIÊN tên danh mục lấy từ API (categoryName của product đầu tiên)
  const categoryDisplayName =
    products[0]?.categoryName || categoryNameSlug || "Danh mục";

  const heading = categoryId
    ? `Danh mục: ${categoryDisplayName}`
    : "Tất cả sản phẩm";

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          categoryId
            ? { label: "Danh mục", to: "/san-pham" }
            : { label: "Tất cả sản phẩm" },
          ...(categoryId ? [{ label: categoryDisplayName }] : []),
        ]}
      />

      

      <div className="flex flex-col md:flex-row gap-6">
        {/* ==== BỘ LỌC ==== */}
        <aside className="md:w-64 w-full border border-yellow-700/40 bg-[#2c1a0d]/70 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-200 shadow-lg">
          <FilterGroup
            title="Nhóm"
            items={["Tam Đa"]}
            selected={groupFilter}
            onChange={setGroupFilter}
          />
          <FilterGroup
            title="Loại gỗ"
            items={["Hương Ta", "Hương Đá", "Hương Đỏ", "Mun Hoa", "Bách Xanh"]}
            selected={woodFilter}
            onChange={setWoodFilter}
          />
          <FilterGroup
            title="Giá"
            items={["Dưới 1 triệu", "1–2 triệu", "Trên 2 triệu"]}
            selected={priceFilter}
            onChange={setPriceFilter}
          />
        </aside>

        {/* ==== DANH SÁCH ==== */}
        <main className="flex-1">
          {/* Thanh điều khiển */}
          <div className="flex flex-wrap items-center justify-between mb-4 gap-2 text-gray-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Sắp xếp theo</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#3b2613] border border-yellow-700/50 rounded-md text-sm px-2 py-1 text-gray-100 focus:outline-none"
              >
                <option>Giá</option>
                <option>Tên A-Z</option>
                <option>Tên Z-A</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">Hiển thị</span>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="bg-[#3b2613] border border-yellow-700/50 rounded-md text-sm px-2 py-1 text-gray-100"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={36}>36</option>
              </select>
            </div>
          </div>

          {/* Lưới sản phẩm */}
          <div
            className={`grid ${
              view === "grid"
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "grid-cols-1 gap-3"
            }`}
          >
            {toDisplay.map((p) => {
              const mainImg = resolveImageUrl(p.imageUrls?.[0], p.name);

              return (
                <Link
                  key={p.id}
                  to={`/san-pham/${p.id}`}
                  className="bg-[#fff8f0] text-gray-900 border border-yellow-800/30 rounded-lg shadow-md hover:shadow-yellow-600/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={mainImg}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = ph(p.name);
                      }}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-sm font-semibold text-[#4b2e14] group-hover:text-[#b8860b] line-clamp-2">
                      {p.name}
                    </h3>
                    <div className="mt-1 text-sm text-gray-700">
                      {new Intl.NumberFormat("vi-VN").format(
                        p.salePrice ?? p.price ?? 0
                      )}{" "}
                      ₫
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected,
  onChange,
}: {
  title: string;
  items: string[];
  selected?: string[];
  onChange?: (val: string[]) => void;
}) {
  const handleToggle = (item: string) => {
    if (!onChange) return;
    if (selected?.includes(item)) {
      onChange(selected.filter((v) => v !== item));
    } else {
      onChange([...(selected ?? []), item]);
    }
  };

  return (
    <div className="mb-4 border border-yellow-800/50 rounded-md overflow-hidden">
      <div className="bg-[#3b2613]/60 px-3 py-2 font-semibold text-yellow-300 text-sm uppercase tracking-wide border-b border-yellow-700/30">
        {title}
      </div>
      <div className="p-3 space-y-2">
        {items.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-sm text-gray-200"
          >
            <input
              type="checkbox"
              checked={selected?.includes(item) ?? false}
              onChange={() => handleToggle(item)}
              className="accent-yellow-500"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
