// src/components/MegaMenu.tsx
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { MenuNode } from "./SubBar";

type Props = { items: MenuNode[]; onClose?: () => void };

// Nếu MenuNode có thêm categoryId thì dùng được luôn
type MenuNodeWithCat = MenuNode & { categoryId?: number | string };

function nodeToUrl(node: MenuNodeWithCat) {
  if (node.categoryId != null) {
    return `/san-pham?categoryId=${node.categoryId}`;
  }
  return node.href || "#";
}

/**
 * Mega menu 3 cấp
 */
export default function MegaMenu({ items, onClose }: Props) {
  const [lv1, setLv1] = useState<number | null>(null);
  const [lv2, setLv2] = useState<number | null>(null);

  // --- timer trễ đóng ---
  const closeTimer = useRef<number | null>(null);
  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    closeTimer.current = window.setTimeout(() => {
      setLv1(null);
      setLv2(null);
    }, 180);
  };

  return (
    <div
      className={[
        "absolute left-0 top-[29px] mt-0",
        "z-[1200] rounded-lg border border-neutral-200 bg-white shadow-xl",
        "min-w-[260px]",
      ].join(" ")}
      onMouseEnter={clearClose}
      onMouseLeave={scheduleClose}
      role="menu"
      aria-orientation="vertical"
    >
      {/* cầu chống rơi giữa nút và panel */}
      <div aria-hidden className="absolute -top-2 left-0 right-0 h-3" />

      {/* ===== LEVEL 1 ===== */}
      <ul className="relative py-2">
        {items.map((it, i) => {
          const node = it as MenuNodeWithCat;
          const hasChild = !!node.children?.length;
          const url = nodeToUrl(node);

          return (
            <li
              key={(node.href || node.label) + i}
              className="group relative"
              onMouseEnter={() => {
                clearClose();
                setLv1(i);
                setLv2(null);
              }}
            >
              <Link
                to={url}
                className="relative z-10 flex items-center justify-between gap-3 px-4 py-2 text-[8.5px] hover:bg-neutral-50"
                onClick={onClose}
              >
                <span className="text-neutral-800 whitespace-nowrap">
                  {node.label}
                </span>
                {hasChild && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-neutral-400 shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </Link>

              {/* ===== LEVEL 2 ===== */}
              {hasChild && lv1 === i && (
                <ul
                  className="absolute top-0 left-full mt-2 min-w-[240px] rounded-lg border border-neutral-200 bg-white shadow-xl py-2 z-[1400]"
                  onMouseLeave={scheduleClose}
                  role="menu"
                >
                  {/* cầu chống rơi mép dọc giữa L1↔L2 */}
                  <div aria-hidden className="absolute top-0 -left-2 w-3 h-full" />

                  {node.children!.map((c2, j) => {
                    const node2 = c2 as MenuNodeWithCat;
                    const hasChild2 = !!node2.children?.length;
                    const url2 = nodeToUrl(node2);

                    return (
                      <li
                        key={(node2.href || node2.label) + j}
                        className="group relative"
                        onMouseEnter={() => {
                          clearClose();
                          setLv2(j);
                        }}
                      >
                        <Link
                          to={url2}
                          className="relative z-10 flex items-center justify-between gap-3 px-4 py-2 text-[8.5px] hover:bg-neutral-50"
                          onClick={onClose}
                        >
                          <span className="text-neutral-800 whitespace-nowrap">
                            {node2.label}
                          </span>
                          {hasChild2 && (
                            <svg
                              viewBox="0 0 24 24"
                              className="h-4 w-4 text-neutral-400 shrink-0"
                              aria-hidden
                            >
                              <path
                                d="M9 6l6 6-6 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                            </svg>
                          )}
                        </Link>

                        {/* ===== LEVEL 3 ===== */}
                        {hasChild2 && lv2 === j && (
                          <ul
                            className="absolute top-0 left-full mt-2 min-w-[240px] rounded-lg border border-neutral-200 bg-white shadow-xl py-2 z-[1400]"
                            onMouseLeave={scheduleClose}
                            role="menu"
                          >
                            {/* cầu chống rơi mép dọc giữa L2↔L3 */}
                            <div
                              aria-hidden
                              className="absolute top-0 -left-2 w-3 h-full"
                            />

                            {node2.children!.map((c3, k) => {
                              const node3 = c3 as MenuNodeWithCat;
                              const url3 = nodeToUrl(node3);

                              return (
                                <li key={(node3.href || node3.label) + k}>
                                  <Link
                                    to={url3}
                                    className="block px-4 py-2 text-[8.5px] hover:bg-neutral-50 text-neutral-800 whitespace-nowrap"
                                    onClick={onClose}
                                  >
                                    {node3.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
