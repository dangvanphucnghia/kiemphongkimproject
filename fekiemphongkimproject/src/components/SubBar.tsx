import { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

/** ===== Types local ===== */
export type MenuNode = { label: string; href: string; children?: MenuNode[] };
export type MenuItem = { key: string; label: string; href?: string; items?: MenuNode[] };

/** ===== Data ===== */
const BRAND = { phone: "039 573 2017" };
const HOTLINES: string[] = ["0968 809 609", "0931 919 114", "0931 999 114"];

/** MENU ===== */
const MENU: MenuItem[] = [
  /* ====== MỤC 1: TƯỢNG GỖ ====== */
  {
    key: "tuong-go",
    label: "TƯỢNG GỖ",
    href: "/tuong-go",
    items: [
      /* === TƯỢNG GỖ TÂM LINH – PHONG THUỶ (đã chuyển vào đây) === */
      {
        label: "Tượng gỗ tâm linh – phong thủy",
        href: "/hang-hien-co/tuong-go",
        children: [
          {
            label: "Chất liệu",
            href: "/hang-hien-co/tuong-go/chat-lieu",
            children: [
              { label: "Gỗ Hương đá", href: "/hang-hien-co/tuong-go/huong-da" },
              { label: "Gỗ Hương Việt Nam", href: "/hang-hien-co/tuong-go/huong-viet" },
              { label: "Gỗ Bách xanh", href: "/hang-hien-co/tuong-go/bach-xanh" },
              { label: "Gỗ Trắc", href: "/hang-hien-co/tuong-go/trac" },
              { label: "Gỗ Mít", href: "/hang-hien-co/tuong-go/mit" },
            ],
          },
          {
            label: "Sản phẩm",
            href: "/hang-hien-co/tuong-go/san-pham",
            children: [
              { label: "Tượng Di Lặc", href: "/hang-hien-co/tuong-go/di-lac" },
              { label: "Phật Bà Quan Âm", href: "/hang-hien-co/tuong-go/quan-am" },
              { label: "Thích Ca – Đạt Ma", href: "/hang-hien-co/tuong-go/thich-ca-dat-ma" },
              { label: "Tam Đa", href: "/hang-hien-co/tuong-go/tam-da" },
              { label: "Tỳ Hưu – Cóc ngậm tiền", href: "/hang-hien-co/tuong-go/ty-huu-coc" },
              { label: "Đặt khắc theo yêu cầu", href: "/hang-hien-co/tuong-go/dat-khac" },
            ],
          },
        ],
      },
      /* === NỘI THẤT GỖ & TRANH GỖ === */
      {
        label: "Nội Thất Gỗ",
        href: "/noi-that-go",
        children: [
          { label: "Trường Kỷ", href: "/noi-that-go/truong-ky" },
          { label: "Ghế Thư Giãn", href: "/noi-that-go/ghe-thu-gian" },
          { label: "Đôn Kệ", href: "/noi-that-go/don-ke" },
          { label: "Kệ Tủ", href: "/noi-that-go/ke-tu" },
        ],
      },
      {
        label: "Tranh Gỗ",
        href: "/tranh-go",
        children: [
          { label: "Tranh Tứ Quý", href: "/tranh-go/tranh-tu-quy" },
          { label: "Tranh Chữ - Đồng Hồ", href: "/tranh-go/tranh-chu-dong-ho" },
          { label: "Tranh Quạt", href: "/tranh-go/tranh-quat" },
          { label: "Đĩa Gỗ", href: "/tranh-go/dia-go" },
          { label: "Tranh Bát Mã", href: "/tranh-go/tranh-bat-ma" },
          { label: "Tranh Cá Chép", href: "/tranh-go/tranh-ca-chep" },
          { label: "Tranh Phật", href: "/tranh-go/tranh-phat" },
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

  /* ====== MỤC 2: ĐỒ MỸ NGHỆ ====== */
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

  /* ====== MỤC 3: TƯỢNG PHẬT ====== */
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

  /* ====== MỤC 4: LINH VẬT ====== */
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

  /* ====== MỤC 5: TRẦM HƯƠNG ====== */
  {
    key: "hhc-tramhuong",
    label: "Trầm hương",
    href: "/hang-hien-co/tram-huong",
    items: [
      { label: "Trầm cảnh / trang trí", href: "/hang-hien-co/tram-huong/tram-canh" },
      { label: "Vòng tay trầm hương", href: "/hang-hien-co/tram-huong/vong-tay" },
      { label: "Nụ trầm / trầm xông", href: "/hang-hien-co/tram-huong/nu-tram" },
      { label: "Thác khói trầm hương", href: "/hang-hien-co/tram-huong/thac-khoi" },
      { label: "Trầm đốt – trầm miếng", href: "/hang-hien-co/tram-huong/tram-dot" },
      { label: "Tinh dầu trầm nguyên chất", href: "/hang-hien-co/tram-huong/tinh-dau-tram" },
    ],
  },

  /* ====== MỤC 6: TINH DẦU ====== */
  {
    key: "hhc-tinhdau",
    label: "Tinh dầu truyền thống",
    href: "/hang-hien-co/tinh-dau",
    items: [
      { label: "Tinh dầu tràm", href: "/hang-hien-co/tinh-dau/tinh-dau-tram" },
      { label: "Tinh dầu bưởi", href: "/hang-hien-co/tinh-dau/tinh-dau-buoi" },
      { label: "Sả chanh / sả Java / quế", href: "/hang-hien-co/tinh-dau/sa-chanh-sa-java-que" },
    ],
  },

  /* ====== MỤC 7: THỰC PHẨM ====== */
  {
    key: "hhc-thucpham",
    label: "Thực phẩm tự nhiên – sức khỏe gia đình",
    href: "/hang-hien-co/thuc-pham",
    items: [
      { label: "Mật ong rừng", href: "/hang-hien-co/thuc-pham/mat-ong" },
      { label: "Bột sắn dây", href: "/hang-hien-co/thuc-pham/bot-san-day" },
      { label: "Tinh bột nghệ vàng", href: "/hang-hien-co/thuc-pham/tinh-bot-nghe" },
      { label: "Yến sào", href: "/hang-hien-co/thuc-pham/yen-sao" },
    ],
  },

  /* ====== MỤC 8: RƯỢU NGÂM ====== */
  {
    key: "hhc-ruou",
    label: "Rượu ngâm truyền thống",
    href: "/hang-hien-co/ruou-ngam",
    items: [
      { label: "Chuối hột rừng", href: "/hang-hien-co/ruou-ngam/chuoi-hot" },
      { label: "Nếp đục / nếp non đòng đòng", href: "/hang-hien-co/ruou-ngam/nep" },
      { label: "Trái cây mix", href: "/hang-hien-co/ruou-ngam/trai-cay-mix" },
      { label: "Ngô bao tử", href: "/hang-hien-co/ruou-ngam/ngo-bao-tu" },
      { label: "Thông tin – không hiển thị giá", href: "/hang-hien-co/ruou-ngam/thong-tin" },
    ],
  },

  /* BLOG */
  { key: "noi-dung", label: "BÀI VIẾT", href: "/bai-viet" },
];

/* ====================================================================== */
/* ====================== COMPONENT KHÔNG ĐỔI ============================ */
/* ====================================================================== */

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
    <header className="relative z-[1200] isolate border-b bg-wood" ref={wrapRef}>
      <nav className="bg-transparent">
        <div className="max-w-6xl mx-auto px-4">
          <div className="my-3 rounded-lg bg-white border border-neutral-100 shadow-[0_4px_14px_rgba(0,0,0,0.12)] relative z-[1210]">
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
          "uppercase text-[8px] md:text-[8.5px] font-semibold leading-none",
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
