import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";

export type MenuNode = { 
  label: string; 
  href: string; 
  children?: MenuNode[];
  categoryId?: number;
};

export type MenuItem = { 
  key: string; 
  label: string; 
  href?: string; 
  items?: MenuNode[];
  categoryId?: number;
};

type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function buildMenuFromCategories(categories: Category[]): MenuItem[] {
  const byParent = new Map<number | null, Category[]>();
  categories.forEach((c) => {
    const key = c.parentId;
    const list = byParent.get(key) ?? [];
    list.push(c);
    byParent.set(key, list);
  });

  const buildNodes = (parentId: number | null): MenuNode[] => {
    const list = byParent.get(parentId) ?? [];
    return list.map((cat) => ({
      label: cat.name,
      href: `/danh-muc/${cat.id}-${slugify(cat.name)}`,
      categoryId: cat.id,
      children: buildNodes(cat.id),
    }));
  };

  const roots = byParent.get(null) ?? [];
  return roots.map((root) => ({
    key: String(root.id),
    label: root.name,
    href: `/danh-muc/${root.id}-${slugify(root.name)}`,
    categoryId: root.id,
    items: buildNodes(root.id),
  }));
}

export default function SubBar() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenKey(null);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenKey(null);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <header className="relative z-40 bg-white border-b" ref={wrapRef}>
      <nav className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
              <ul className="flex items-center gap-1">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <Menu className="w-5 h-5" />
              <span className="font-medium">Danh mục sản phẩm</span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t bg-white py-2">
              {menu.map((item) => (
                <MobileMenuItem
                  key={item.key}
                  item={item}
                  onClose={() => setMobileMenuOpen(false)}
                />
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function NavItem({
  item,
  isOpen,
  onOpen,
  onClose,
}: {
  item: MenuItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const hasChild = !!item.items?.length;

  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <a
        href={item.href || "#"}
        className={`
          inline-flex items-center gap-2 whitespace-nowrap
          text-sm font-medium leading-none
          px-4 py-2.5 rounded-lg transition-all duration-200
          ${isOpen
            ? "text-blue-600 bg-blue-50 shadow-sm"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }
        `}
        aria-haspopup={hasChild ? "true" : undefined}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <span>{item.label}</span>
        {hasChild && (
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </a>

      {isOpen && hasChild && (
        <MegaMenu items={item.items!} onClose={onClose} />
      )}
    </li>
  );
}

function MobileMenuItem({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChild = !!item.items?.length;

  return (
    <div className="border-b last:border-0">
      <div className="flex items-center justify-between px-4 py-3">
        <a
          href={item.href || "#"}
          onClick={onClose}
          className="flex-1 font-medium text-gray-700 hover:text-blue-600"
        >
          {item.label}
        </a>
        {hasChild && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {expanded && hasChild && (
        <div className="pl-4 pb-2">
          {item.items!.map((child, idx) => (
            <a
              key={idx}
              href={child.href}
              onClick={onClose}
              className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}