import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Package,
  Sparkles,
  Gift,
  Users,
  Phone,
  Tag,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

type MenuNode = {
  id: number;
  name: string;
  href: string;
  children: MenuNode[];
};

const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function buildTree(categories: Category[]): MenuNode[] {
  const byParent = new Map<number | null, Category[]>();
  categories.forEach((c) => {
    const list = byParent.get(c.parentId) ?? [];
    list.push(c);
    byParent.set(c.parentId, list);
  });

  const buildNodes = (parentId: number | null): MenuNode[] => {
    const list = byParent.get(parentId) ?? [];
    return list.map((cat) => ({
      id: cat.id,
      name: cat.name,
      href: `/danh-muc/${cat.id}-${slugify(cat.name)}`,
      children: buildNodes(cat.id),
    }));
  };

  return buildNodes(null);
}

export default function Sidebar() {
  const [menu, setMenu] = useState<MenuNode[]>([]);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) return;
        const data: Category[] = await res.json();
        const tree = buildTree(data);
        setMenu(tree);
      } catch (err) {
        console.error("Error loading categories", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <aside className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <h2 className="font-bold text-lg flex items-center gap-2">
          <Package className="w-5 h-5" />
          Danh mục sản phẩm
        </h2>
      </div>

      {/* Menu dọc */}
      <nav className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin">
        {menu.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            level={0}
            expanded={expanded}
            onToggle={toggleExpand}
          />
        ))}
      </nav>
    </aside>
  );
}

function MenuItem({
  item,
  level,
  expanded,
  onToggle,
}: {
  item: MenuNode;
  level: number;
  expanded: Set<number>;
  onToggle: (id: number) => void;
}) {
  const hasChildren = item.children.length > 0;
  const isExpanded = expanded.has(item.id);
  const indent = level * 16;

  return (
    <div className="mb-1">
      <div
        className={`
          flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg
          transition-all duration-200 group cursor-pointer
          ${level === 0 ? "font-semibold" : "font-medium"}
          ${
            level === 0
              ? "text-gray-800 hover:bg-blue-50 hover:text-blue-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
        style={{ paddingLeft: `${12 + indent}px` }}
      >
        <Link
          to={item.href}
          className="flex items-center gap-2 flex-1 min-w-0"
          onClick={(e) => {
            if (hasChildren) {
              e.preventDefault();
              onToggle(item.id);
            }
          }}
        >
          {level === 0 && (
            <Package
              className={`w-4 h-4 flex-shrink-0 ${
                isExpanded ? "text-blue-600" : "text-gray-400"
              }`}
            />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </Link>

        {hasChildren && (
          <button
            onClick={() => onToggle(item.id)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
      </div>

      {/* Children - Recursive */}
      {hasChildren && isExpanded && (
        <div className="mt-1 ml-2 border-l-2 border-gray-100">
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              level={level + 1}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}