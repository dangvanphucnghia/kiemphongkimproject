// src/components/MegaMenu.tsx
import { useRef, useState } from "react";
import type { MenuNode } from "./SubBar";

type Props = { items: MenuNode[]; onClose?: () => void };

/**
 * Fixes:
 * 1) Align submenus evenly: dùng top-0 (không dùng top-2) để panel L2/L3 bám đúng item.
 * 2) Tránh chữ L1 “mất” khi hover: đặt relative z-10 cho <a> và ép màu chữ ổn định.
 * 3) Bỏ mt-[200px] => mt-2 để panel sát nút, không tạo khoảng rơi lớn.
 * 4) Thêm whitespace-nowrap để không xuống dòng/đứt chữ khi hẹp.
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
        "absolute left-0 top-0 mt-0 ",
        "z-[1200] rounded-lg border border-neutral-200 bg-white shadow-xl", // ↑ nâng từ 220
        "min-w-[260px] ",
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
          const hasChild = !!it.children?.length;

          return (
            <li
              key={(it.href || it.label) + i}
              className="group relative"
              onMouseEnter={() => {
                clearClose();
                setLv1(i);
                setLv2(null);
              }}
            >
              <a
                href={it.href}
                className="relative z-10 flex items-center justify-between gap-3 px-4 py-2 text-[14px] hover:bg-neutral-50"
                onClick={onClose}
              >
                <span className="text-neutral-800 whitespace-nowrap">{it.label}</span>
                {hasChild && (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden>
                    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </a>

              {/* ===== LEVEL 2 ===== */}
              {hasChild && lv1 === i && (
                <ul
                  className="absolute top-0 left-full mt-2 min-w-[240px] rounded-lg border border-neutral-200 bg-white shadow-xl py-2 z-[1400]"
                  onMouseLeave={scheduleClose}
                  role="menu"
                >
                  {/* cầu chống rơi mép dọc giữa L1↔L2 */}
                  <div aria-hidden className="absolute top-0 -left-2 w-3 h-full" />

                  {it.children!.map((c2, j) => {
                    const hasChild2 = !!c2.children?.length;

                    return (
                      <li
                        key={(c2.href || c2.label) + j}
                        className="group relative"
                        onMouseEnter={() => {
                          clearClose();
                          setLv2(j);
                        }}
                      >
                        <a
                          href={c2.href}
                          className="relative z-10 flex items-center justify-between gap-3 px-4 py-2 text-[14px] hover:bg-neutral-50"
                          onClick={onClose}
                        >
                          <span className="text-neutral-800 whitespace-nowrap">{c2.label}</span>
                          {hasChild2 && (
                            <svg viewBox="0 0 24 24" className="h-4 w-4 text-neutral-400 shrink-0" aria-hidden>
                              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                            </svg>
                          )}
                        </a>

                        {/* ===== LEVEL 3 ===== */}
                        {hasChild2 && lv2 === j && (
                          <ul
                            className="absolute top-0 left-full mt-2 min-w-[240px] rounded-lg border border-neutral-200 bg-white shadow-xl py-2 z-[1400]"
                            onMouseLeave={scheduleClose}
                            role="menu"
                          >
                            {/* cầu chống rơi mép dọc giữa L2↔L3 */}
                            <div aria-hidden className="absolute top-0 -left-2 w-3 h-full" />

                            {c2.children!.map((c3, k) => (
                              <li key={(c3.href || c3.label) + k}>
                                <a
                                  href={c3.href}
                                  className="block px-4 py-2 text-[14px] hover:bg-neutral-50 text-neutral-800 whitespace-nowrap"
                                  onClick={onClose}
                                >
                                  {c3.label}
                                </a>
                              </li>
                            ))}
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
