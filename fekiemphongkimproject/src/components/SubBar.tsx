import { useEffect, useRef, useState } from "react";
import MegaMenu from "./MegaMenu";

/** ===== Types local ===== */
export type MenuNode = { label: string; href: string; children?: MenuNode[] };
export type MenuItem = { key: string; label: string; href?: string; items?: MenuNode[] };

/** ===== Data ===== */
const BRAND = { phone: "039 573 2017" };
const HOTLINES: string[] = ["0968 809 609", "0931 919 114", "0931 999 114"];

/** MENU ===== */
/** Dto từ API */
type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

/** Tạo slug đơn giản từ name để làm href (tạm thời) */
const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu tiếng Việt
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

/** Build MenuItem[] từ list category phẳng */
function buildMenuFromCategories(categories: Category[]): MenuItem[] {
  // group theo parentId
  const byParent = new Map<number | null, Category[]>();
  categories.forEach((c) => {
    const key = c.parentId;
    const list = byParent.get(key) ?? [];
    list.push(c);
    byParent.set(key, list);
  });

  // đệ quy build children
  const buildNodes = (parentId: number | null): MenuNode[] => {
    const list = byParent.get(parentId) ?? [];
    return list.map((cat) => ({
      label: cat.name,
      href: `/danh-muc/${cat.id}-${slugify(cat.name)}`,
      children: buildNodes(cat.id),
    }));
  };

  // top-level (parentId = null) là các mục chính trong subbar
  const roots = byParent.get(null) ?? [];
  return roots.map((root) => ({
    key: String(root.id),
    label: root.name,
    href: `/danh-muc/${root.id}-${slugify(root.name)}`,
    items: buildNodes(root.id),
  }));
}


/* ====================================================================== */
/* ====================== COMPONENT KHÔNG ĐỔI ============================ */
/* ====================================================================== */

export default function SubBar() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // 🔹 gọi API categories 1 lần khi mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:1212/api/categories");
        if (!res.ok) {
          console.error("Failed to fetch categories", res.status);
          return;
        }
        const data: Category[] = await res.json();
        const builtMenu = buildMenuFromCategories(data);
        setMenu(builtMenu);
      } catch (err) {
        console.error("Error fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  // đóng menu khi click ra ngoài / bấm ESC
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
                {menu.map((item) => (
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
