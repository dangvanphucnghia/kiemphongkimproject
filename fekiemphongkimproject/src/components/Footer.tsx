import { Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F4F4F4] text-[#2E2E2E] border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        {/* Cột 1: Logo + mô tả */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <img
              src="/images/logo.png"
              alt="Kiếm Phong Kim"
              className="h-10 w-auto"
            />
            <h2 className="text-lg font-semibold">Kiếm Phong Kim</h2>
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            Chuyên sản phẩm phong thuỷ, trầm hương và đồ gỗ cao cấp tại Huế.
          </p>
          <p className="text-sm mt-2">
            📍 <strong>CS1:</strong> Tầng 1 TTTM Go Huế - 174 Bà Triệu, TP Huế
          </p>
          <p className="text-sm mt-2">
            📍 <strong>CS2:</strong> CS2: 170 Phan Bội Châu, TP Huế
          </p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Liên hệ</h3>
          <p className="text-sm">📞 0968.809.609 - 0931.919.114 - 0931.999.114</p>
          <p className="text-sm">✉️ batien11022003@gmail.com</p>
          <div className="mt-3">
            <a
              href="https://www.facebook.com/share/1ACtyRToUK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              <span>Facebook Kiếm Phong Kim</span>
            </a>
          </div>
        </div>

        {/* Cột 3: Giờ mở cửa + bản quyền */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Giờ mở cửa</h3>
          <p className="text-sm">🕘 8:00 - 21:00 (Tất cả các ngày trong tuần)</p>
          <p className="text-xs text-gray-500 mt-6 border-t pt-3">
            © {new Date().getFullYear()} Kiếm Phong Kim — Phong Thuỷ Huế.  
            <br />
            Giao nhanh, uy tín, chất lượng.
          </p>
        </div>
      </div>
    </footer>
  );
}
