import React from "react";
import type { MenuNode } from "./SubBar";

type Props = {
  items: MenuNode[];
  onClose?: () => void;
};

/** Panel dropdown trái; có thể lồng đệ quy để bật 2, bật 3… */
export default function MegaMenu({ items, onClose }: Props) {
  return (
    <div
      className="absolute left-0 top-full z-[999] w-[320px] min-w-[280px] bg-white rounded-md
                 border border-neutral-200 shadow-[0_10px_24px_rgba(0,0,0,0.12)]"
      role="menu"
      aria-label="Danh mục con"
      onMouseLeave={onClose}
    >
      <MenuPanel nodes={items} depth={1} />
    </div>
  );
}

function MenuPanel({ nodes, depth }: { nodes: MenuNode[]; depth: number }) {
  return (
    <ul className="py-2 max-h-[70vh] overflow-auto">
      {nodes.map((n) => {
        const hasChildren = !!n.children?.length;
        return (
          <li key={n.href} className="group relative">
            <a
              href={n.href}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-neutral-100"
            >
              <span>{n.label}</span>
              {hasChildren && <span className="text-neutral-500">›</span>}
            </a>

            {hasChildren && (
              <div
                className="absolute left-full top-0 ml-2 w-[300px] min-w-[260px] bg-white border border-neutral-200 rounded-md shadow-[0_8px_20px_rgba(0,0,0,0.12)] hidden group-hover:block z-[999]"
                role="menu"
              >
                <MenuPanel nodes={n.children!} depth={depth + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
