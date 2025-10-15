import { useState } from "react";

/** dữ liệu minh họa – bạn thay bằng API thực tế */
const CATEGORIES = [
  {
    name: "Giá Siêu Rẻ",
    subs: ["Flash sale hôm nay", "Mua 1 tặng 1", "Combo tiết kiệm"],
    preview:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Ưu Đãi Hội Viên",
    subs: ["Thành viên bạc", "Thành viên vàng", "Độc quyền app"],
    preview:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sữa các loại",
    subs: [
      "Sữa Tươi",
      "Sữa Hạt - Sữa Đậu",
      "Sữa Bột",
      "Bơ Sữa - Phô Mai",
      "Sữa đặc",
      "Sữa Chua - Váng Sữa",
    ],
    preview:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Rau - Củ - Trái Cây",
    subs: ["Rau lá", "Củ quả", "Trái cây nội địa", "Trái cây nhập khẩu"],
    preview:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Chăm Sóc Cá Nhân",
    subs: ["Dầu gội", "Sữa tắm", "Chăm sóc răng miệng", "Khử mùi"],
    preview:
      "https://images.unsplash.com/photo-1505575972945-280fd494ee0d?q=80&w=800&auto=format&fit=crop",
  },
  // ... thêm các mục khác nếu muốn
];

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(2); // highlight "Sữa các loại" như ảnh

  return (
    <div
      onMouseLeave={onClose}
      className="absolute left-0 top-10 z-30 w-[980px]"
    >
      <div className="bg-white rounded-md shadow-2xl p-0 grid grid-cols-[260px_320px_1fr] overflow-hidden">
        {/* Cột trái: danh mục chính */}
        <nav aria-label="Danh mục chính" className="border-r bg-[#FAFAFA]">
          <ul className="max-h-[460px] overflow-y-auto py-2">
            {CATEGORIES.map((c, idx) => {
              const activeCls =
                idx === active
                  ? "bg-white border-l-4 border-[#EA1B25] font-semibold"
                  : "hover:bg-gray-100";
              return (
                <li key={c.name}>
                  <button
                    onMouseEnter={() => setActive(idx)}
                    className={`w-full text-left px-4 py-2.5 flex items-center justify-between ${activeCls}`}
                  >
                    <span>{c.name}</span>
                    <span className="opacity-60">›</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Cột giữa: danh mục con */}
        <div className="px-4 py-3">
          <h3 className="mb-2 font-semibold text-[#2E2E2E]">
            {CATEGORIES[active].name}
          </h3>
          <ul className="space-y-2">
            {CATEGORIES[active].subs.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="block rounded px-2 py-2 hover:bg-gray-100"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột phải: ảnh tròn */}
        <div className="flex items-center justify-center p-6">
          <div className="h-80 w-80 rounded-full bg-[#F3F3F3] flex items-center justify-center">
            <img
              src={CATEGORIES[active].preview}
              alt={CATEGORIES[active].name}
              className="h-64 w-48 object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
