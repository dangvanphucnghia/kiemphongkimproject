import { useState, useRef } from "react";

interface SubItem {
  name: string;
  link: string;
  subSubs?: { name: string; link: string }[];
}

interface Category {
  name: string;
  subs: SubItem[];
  preview: string;
}

interface MegaMenuProps {
  onClose?: () => void;
}

const CATEGORIES: Category[] = [
  {
    name: "Tượng Gỗ Tâm Linh – Phong Thủy",
    subs: [
      { name: "Tượng Di Lặc", link: "#" },
      { name: "Phật Bà Quan Âm", link: "#" },
      { name: "Phật Thích Ca", link: "#" },
      { name: "Tượng Đạt Ma", link: "#" },
      { name: "Tam Đa – Phúc Lộc Thọ", link: "#" },
      { name: "Tỳ Hưu – Cóc Ngậm Tiền", link: "#" },
      { name: "Nhận Khắc Tượng Theo Yêu Cầu", link: "#" },
    ],
    preview: "/images/category2.png",
  },
  {
    name: "Trầm Hương – Tinh Hoa Thiên Nhiên",
    subs: [
      { name: "Trầm Cảnh – Trang Trí", link: "#" },
      { name: "Vòng Tay Trầm Hương", link: "#" },
      { name: "Nụ Trầm – Trầm Không Tăm", link: "#" },
      { name: "Thác Khói Trầm Hương", link: "#" },
      { name: "Trầm Đốt – Trầm Miếng", link: "#" },
      { name: "Tinh Dầu Trầm Hương", link: "#" },
    ],
    preview: "/images/category1.png",
  },
  {
    name: "Tinh Dầu Truyền Thống",
    subs: [
      { name: "Tinh Dầu Tràm", link: "#" },
      { name: "Tinh Dầu Bưởi", link: "#" },
      { name: "Tinh Dầu Sả Chanh", link: "#" },
      { name: "Tinh Dầu Sả Java", link: "#" },
      { name: "Tinh Dầu Quế", link: "#" },
    ],
    preview: "/images/category2.png",
  },
  {
    name: "Thực Phẩm Tự Nhiên – Sức Khỏe Gia Đình",
    subs: [
      { name: "Mật Ong Rừng Nguyên Chất", link: "#" },
      { name: "Bột Sắn Dây", link: "#" },
      { name: "Tinh Bột Nghệ Vàng", link: "#" },
      { name: "Yến Sào", link: "#" },
    ],
    preview: "/images/category3.png",
  },
  {
    name: "Rượu Ngâm Truyền Thống",
    subs: [
      { name: "Rượu Chuối Hột Rừng", link: "#" },
      { name: "Rượu Nếp Đục", link: "#" },
      { name: "Rượu Nếp Non – Đòng Đòng", link: "#" },
      { name: "Rượu Trái Cây Mix", link: "#" },
      { name: "Rượu Ngô Bao Tử", link: "#" },
    ],
    preview: "/images/category1.png",
  },
];

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const [active, setActive] = useState<number>(0);
  const [subActive, setSubActive] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseLeave={onClose}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white rounded-md shadow-2xl w-[1080px] animate-fadeIn">
        <div className="grid grid-cols-[260px_320px_1fr]">
          {/* Cột trái */}
          <ul className="border-r bg-[#FAFAFA] max-h-[480px] overflow-y-auto py-2">
            {CATEGORIES.map((c, idx) => (
              <li key={c.name}>
                <button
                  onMouseEnter={() => setActive(idx)}
                  className={`w-full text-left px-4 py-2.5 flex items-center justify-between transition ${
                    active === idx
                      ? "bg-white border-l-4 border-[#F4E04D] font-semibold text-[#D4AF37]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="opacity-50">›</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Cột giữa */}
          <div className="px-4 py-3">
            <h3 className="mb-2 font-semibold text-[#2E2E2E]">
              {CATEGORIES[active].name}
            </h3>
            <ul className="space-y-1">
              {CATEGORIES[active].subs.map((s, idx) => (
                <li
                  key={s.name}
                  onMouseEnter={() => setSubActive(idx)}
                  onMouseLeave={() => setSubActive(null)}
                  className="relative"
                >
                  <a href={s.link} className="block px-2 py-2 hover:bg-gray-100">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột phải: ảnh minh hoạ */}
          <div className="flex items-center justify-center p-6">
            <div className="h-80 w-80 rounded-full bg-[#FFF8E1] flex items-center justify-center overflow-hidden">
              <img
                src={CATEGORIES[active].preview}
                alt={CATEGORIES[active].name}
                className="h-72 w-72 object-contain transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
