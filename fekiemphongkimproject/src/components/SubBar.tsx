import { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

/** ===== Types local (không cần file data) ===== */
export type MenuNode = { label: string; href: string; children?: MenuNode[] };
export type MenuItem = { key: string; label: string; href?: string; items?: MenuNode[] };

/** ===== Data mẫu ===== */
const BRAND = { phone: "039 573 2017" };
const HOTLINES: string[] = ["0968 809 609", "0931 919 114", "0931 999 114"];

/** MENU có cả 2 cấp và 3 cấp (ví dụ: Di Lặc -> Chúc Phúc -> biến thể) */
const MENU: MenuItem[] = [
  {
    key: "tuong-go",
    label: "TƯỢNG GỖ",
    href: "/tuong-go",
    items: [
      {
        label: "Di Lặc",
        href: "/tuong-go/di-lac",
        children: [
          {
            label: "Di Lặc Chúc Phúc",
            href: "/tuong-go/di-lac/chuc-phuc",
            children: [
              { label: "Bản nhỏ", href: "/tuong-go/di-lac/chuc-phuc/ban-nho" },
              { label: "Bản trung", href: "/tuong-go/di-lac/chuc-phuc/ban-trung" },
              { label: "Bản lớn", href: "/tuong-go/di-lac/chuc-phuc/ban-lon" },
            ],
          },
          { label: "Di Lặc Gánh Vàng", href: "/tuong-go/di-lac/ganh-vang" },
          { label: "Di Lặc Ngũ Phúc", href: "/tuong-go/di-lac/ngu-phuc" },
        ],
      },
      { label: "Quan Công", href: "/tuong-go/quan-cong" },
      { label: "Tam Đa", href: "/tuong-go/tam-da" },
      { label: "Khổng Minh", href: "/tuong-go/khong-minh" },
      { label: "Lũa - Gốc Cây", href: "/tuong-go/lua-goc-cay" },
      { label: "Trần Quốc Tuấn", href: "/tuong-go/tran-quoc-tuan" },
      { label: "Triệu Tử Long", href: "/tuong-go/trieu-tu-long" },
      { label: "Võ Nguyên Giáp", href: "/tuong-go/vo-nguyen-giap" },
      { label: "Danh Nhân", href: "/tuong-go/danh-nhan" },
      { label: "Thần Tài", href: "/tuong-go/than-tai" },
      { label: "Tế Công", href: "/tuong-go/te-cong" },
      { label: "Thần Trà", href: "/tuong-go/than-tra" },
    ],
  },
  {
    key: "do-my-nghe",
    label: "ĐỒ MỸ NGHỆ",
    href: "/do-my-nghe",
    items: [
      { label: "Vòng Gỗ", href: "/do-my-nghe/vong-go" },
      { label: "Lục Bình", href: "/do-my-nghe/luc-binh" },
      { label: "Khay Trà", href: "/do-my-nghe/khay-tra" },
      { label: "Đốc Lịch", href: "/do-my-nghe/doc-lich" },
      { label: "Đồng Hồ", href: "/do-my-nghe/dong-ho" },
      { label: "Cờ Tướng", href: "/do-my-nghe/co-tuong" },
      { label: "Đèn Thờ", href: "/do-my-nghe/den-tho" },
      { label: "Khay - Hộp - Gạt Tàn", href: "/do-my-nghe/khay-hop-gat-tan" },
      { label: "Tiểu Cảnh", href: "/do-my-nghe/tieu-canh" },
      { label: "Hoa Sen", href: "/do-my-nghe/hoa-sen" },
      { label: "Thuyền Gỗ", href: "/do-my-nghe/thuyen-go" },
    ],
  },
  {
    key: "tuong-phat",
    label: "TƯỢNG PHẬT",
    href: "/tuong-phat",
    items: [
      { label: "Quan Âm", href: "/tuong-phat/quan-am" },
      { label: "Đạt Ma", href: "/tuong-phat/dat-ma" },
      { label: "Tam Thánh", href: "/tuong-phat/tam-thanh" },
      { label: "Phật Tổ", href: "/tuong-phat/phat-to" },
      { label: "Thích Ca", href: "/tuong-phat/thich-ca" },
      { label: "Địa Tạng Vương", href: "/tuong-phat/dia-tang-vuong" },
      { label: "Thiên Thủ Thiên Nhãn", href: "/tuong-phat/thien-thu-thien-nhan" },
    ],
  },
  {
    key: "linh-vat",
    label: "LINH VẬT",
    href: "/linh-vat",
    items: [
      { label: "Con Cá", href: "/linh-vat/ca" },
      { label: "Con Ngựa", href: "/linh-vat/ngua" },
      { label: "Con Báo", href: "/linh-vat/bao" },
      { label: "Con Trâu", href: "/linh-vat/trau" },
      { label: "Con Mèo", href: "/linh-vat/meo" },
      { label: "Con Heo", href: "/linh-vat/heo" },
      { label: "Con Voi", href: "/linh-vat/voi" },
      { label: "Con Dê", href: "/linh-vat/de" },
      { label: "Con Cóc", href: "/linh-vat/coc" },
      { label: "Con Rắn", href: "/linh-vat/ran" },
      { label: "Con Chó", href: "/linh-vat/cho" },
      { label: "Long Quy", href: "/linh-vat/long-quy" },
      { label: "Tứ Linh", href: "/linh-vat/tu-linh" },
      { label: "Con Gà", href: "/linh-vat/ga" },
      { label: "Con Hổ", href: "/linh-vat/ho" },
      { label: "Con Rồng", href: "/linh-vat/rong" },
      { label: "Đại Bàng", href: "/linh-vat/dai-bang" },
      { label: "Tỳ Hưu", href: "/linh-vat/ty-huu" },
      { label: "Con Chuột", href: "/linh-vat/chuot" },
    ],
  },
  {
    key: "noi-that-go",
    label: "NỘI THẤT GỖ",
    href: "/noi-that-go",
    items: [
      { label: "Trường Kỷ", href: "/noi-that-go/truong-ky" },
      { label: "Ghế Thư Giãn", href: "/noi-that-go/ghe-thu-gian" },
      { label: "Đôn Kệ", href: "/noi-that-go/don-ke" },
      { label: "Kệ Tủ", href: "/noi-that-go/ke-tu" },
    ],
  },
  {
    key: "tranh-go",
    label: "TRANH GỖ",
    href: "/tranh-go",
    items: [
      { label: "Tranh Tứ Quý", href: "/tranh-go/tranh-tu-quy" },
      { label: "Tranh Chữ - Đồng Hồ", href: "/tranh-go/tranh-chu-dong-ho" },
      { label: "Tranh Quạt", href: "/tranh-go/tranh-quat" },
      { label: "Đĩa Gỗ", href: "/tranh-go/dia-go" },
      { label: "Tranh Bát Mã", href: "/tranh-go/tranh-bat-ma" },
      { label: "Tranh Cá Chép", href: "/tranh-go/tranh-ca-chep" },
      { label: "Tranh Phật", href: "/tranh-go/tranh-phat" },
    ],
  },
  { key: "di-lac", label: "DI LẶC", href: "/di-lac" },
  { key: "quan-cong", label: "QUAN CÔNG", href: "/quan-cong" },
  { key: "tam-da", label: "TAM ĐA", href: "/tam-da" },
  { key: "bai-viet", label: "BÀI VIẾT", href: "/bai-viet" },
];

export default function SubBar() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenKey(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    // ↑ tạo stacking context mạnh để dropdown đè nội dung phía dưới
    <header className="relative z-[200] isolate border-b bg-wood" ref={wrapRef}>
      <nav className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          {/* hộp trắng ở trên cùng của stack */}
          <div className="my-3 rounded-lg bg-white border border-neutral-100 shadow-[0_4px_14px_rgba(0,0,0,0.12)] relative z-[210]">
            {/* chỉ cuộn ngang; cho phép tràn theo trục dọc để dropdown không bị cắt */}
            <div className="relative overflow-y-visible overflow-x-auto lg:overflow-x-visible no-scrollbar overflow-visible">
              <ul className="flex items-center h-9 gap-3 px-3 min-w-max">
                {MENU.map((item) => (
                  <NavItem
                    key={item.key}
                    item={item}
                    isOpen={openKey === item.key}
                    onOpen={() => setOpenKey(item.key)}
                    onClose={() => setOpenKey(null)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavItem({
  item, isOpen, onOpen, onClose,
}: { item: MenuItem; isOpen: boolean; onOpen: () => void; onClose: () => void; }) {
  const hasChild = !!item.items?.length;

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={onClose}
    >
      <a
        href={item.href || "#"}
        className={[
          "inline-flex items-center gap-1 whitespace-nowrap",
          "uppercase text-[12.5px] md:text-[13px] font-semibold leading-none",
          "px-2 py-1.5 rounded-md transition-colors",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
          isOpen
            ? "text-[#D4AF37] bg-[#FFF6DE] border-b-2 border-[#D4AF37]"
            : "text-neutral-800 hover:text-[#D4AF37] hover:bg-neutral-50"
        ].join(" ")}
        aria-haspopup={hasChild ? "true" : undefined}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <span>{item.label}</span>
        {hasChild && (
          <svg viewBox="0 0 24 24" className="h-3 w-3 -mb-px">
            <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </a>

      {isOpen && hasChild && (
        <MegaMenu items={item.items!} onClose={onClose} />
      )}
    </li>
  );
}

/* Ẩn scrollbar cho scroller nếu chưa có trong CSS global:
.no-scrollbar::-webkit-scrollbar{display:none}
.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
*/
