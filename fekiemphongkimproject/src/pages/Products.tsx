import { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { PRODUCTS } from "../data/products";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [sort, setSort] = useState("Giá");
  const [view, setView] = useState("grid");
  const [limit, setLimit] = useState(36);

  return (
    <div className="container mx-auto px-4 py-8 text-gray-100">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Tất cả sản phẩm" },
        ]}
      />

      <h1 className="mb-6 text-3xl font-bold text-yellow-300 tracking-wide uppercase drop-shadow">
        Tất cả sản phẩm
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ==== BỘ LỌC ==== */}
        <aside className="md:w-64 w-full border border-yellow-700/40 bg-[#2c1a0d]/70 backdrop-blur-sm rounded-lg p-4 text-sm text-gray-200 shadow-lg">
          <FilterGroup title="Nhóm" items={["Tam Đa"]} selected={["Tam Đa"]} />
          <FilterGroup title="Loại gỗ" items={["Hương Ta", "Hương Đá", "Hương Đỏ", "Mun Hoa", "Bách Xanh"]} />
          <FilterGroup title="Giá" items={["Dưới 1 triệu", "1–2 triệu", "Trên 2 triệu"]} />
          <FilterGroup title="Vị trí" items={["Phòng Khách", "Bàn Thờ", "Cửa Hàng", "Kệ Tủ"]} />
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
            {PRODUCTS.slice(0, limit).map((p) => (
              <Link
                key={p.id}
                to={`/san-pham/${p.slug}`}
                className="bg-[#fff8f0] text-gray-900 border border-yellow-800/30 rounded-lg shadow-md hover:shadow-yellow-600/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-[#4b2e14] group-hover:text-[#b8860b] line-clamp-2">
                    {p.name}
                  </h3>
                  <div className="mt-1 text-sm text-gray-700">
                    {new Intl.NumberFormat("vi-VN").format(p.price)} ₫{" "}
                    {p.oldPrice && (
                      <span className="line-through text-gray-400 ml-1">
                        {new Intl.NumberFormat("vi-VN").format(p.oldPrice)} ₫
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  items,
  selected = [],
}: {
  title: string;
  items: string[];
  selected?: string[];
}) {
  return (
    <div className="mb-4 border border-yellow-800/50 rounded-md overflow-hidden">
      <div className="bg-[#3b2613]/60 px-3 py-2 font-semibold text-yellow-300 text-sm uppercase tracking-wide border-b border-yellow-700/30">
        {title}
      </div>
      <div className="p-3 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-2 text-sm text-gray-200">
            <input
              type="checkbox"
              defaultChecked={selected.includes(item)}
              className="accent-yellow-500"
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
