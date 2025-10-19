import { useState, useRef, useEffect } from "react";
import MegaMenu from "./MegaMenu";

export default function SubBar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="bg-[#FFF8E1] border-b relative z-30" ref={wrapRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Danh mục sản phẩm */}
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className={`flex items-center gap-2 text-[#2E2E2E] transition ${
                  open ? "text-[#D4AF37] font-semibold" : "hover:text-[#D4AF37]"
                }`}
              >
                <span className="text-lg">≡</span>
                <span className="font-medium">Danh mục sản phẩm</span>
              </button>

              {open && (
                <div className="absolute top-full left-0" onClick={(e) => e.stopPropagation()}>
                  <MegaMenu onClose={() => setOpen(false)} />
                </div>
              )}
            </div>

            {/* Bên phải */}
            <div className="flex items-center gap-6 text-[#2E2E2E]">
              <a
                href="https://www.facebook.com/share/1ACtyRToUK/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80"
              >
                ✉️ <span>Về Kiếm Phong Kim</span>
              </a>

              <details className="relative group">
                <summary className="list-none cursor-pointer flex items-center gap-2 hover:opacity-80">
                  🎧 <span>Tư vấn mua hàng</span>
                </summary>
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-md p-3 text-sm w-44">
                  <div className="font-semibold text-[#D4AF37]">Hotline</div>
                  <a href="tel:0968809609" className="block mt-1 hover:underline">
                    0968809609
                  </a>
                  <a href="tel:0931919114" className="block hover:underline">
                    0931919114
                  </a>
                  <a href="tel:0931999114" className="block hover:underline">
                    0931999114
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay nền mờ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-20"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
