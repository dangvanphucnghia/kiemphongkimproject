import { useState, useRef } from "react";
import MegaMenu from "./MegaMenu";

export default function SubBar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* thanh xám */}
      <div className="bg-[#F4F4F4] border-b relative z-20" ref={wrapRef}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Danh mục sản phẩm */}
            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button className="flex items-center gap-2 text-[#2E2E2E]">
                <span className="text-lg">≡</span>
                <span className="font-medium">Danh mục sản phẩm</span>
              </button>

              {open && <MegaMenu onClose={() => setOpen(false)} />}
            </div>

            {/* bên phải: tin tức & tư vấn */}
            <div className="flex items-center gap-6 text-[#2E2E2E]">
              <a className="flex items-center gap-2 hover:opacity-80" href="#">
                ✉️ <span>Tin tức WinMart</span>
              </a>

              {/* tư vấn: mở số điện thoại */}
              <details className="relative">
                <summary className="list-none cursor-pointer flex items-center gap-2 hover:opacity-80">
                  🎧 <span>Tư vấn mua hàng</span>
                </summary>
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow p-3 text-sm w-44">
                  <div className="font-semibold text-[#EA1B25]">Hotline</div>
                  <a href="tel:19001908" className="block mt-1 hover:underline">
                    1900 1908
                  </a>
                  <a href="tel:02877778888" className="block hover:underline">
                    028 7777 8888
                  </a>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop khi mở menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-[1px] z-10"
          onMouseEnter={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
