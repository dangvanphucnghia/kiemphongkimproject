export default function HeaderBar() {
  return (
    <div className="bg-[#F4E04D] text-[#2E2E2E]"> {/* Đổi từ đỏ sang vàng và chữ thành đen */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Kiếm Phong Kim"
            className="h-8"
          />
        </a>

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center bg-white rounded-full overflow-hidden shadow-sm">
            <span className="pl-4 pr-2 text-gray-500">🔍</span>
            <input
              className="h-10 w-full outline-none text-sm text-[#2E2E2E] placeholder:text-gray-400"
              placeholder="Giao nhanh 2h, Giảm thêm 20% sản phẩm Trầm & Tinh Dầu Kiếm Phong Kim"
            />
          </div>
        </div>

        {/* Chi nhánh */}
        <button
          className="hidden md:flex items-center gap-2 bg-white text-[#D4AF37] rounded-full h-10 px-4 hover:bg-[#FFF8E1]"
          aria-haspopup="listbox"
        >
          📍 <span className="font-semibold">Chi nhánh</span>
        </button>

        {/* Cart + Member */}
        <nav className="flex items-center gap-6 text-sm">
          <a className="flex items-center gap-1 hover:opacity-90" href="#">
            🛒 <span className="font-semibold">Giỏ hàng (0)</span>
          </a>
          <a className="flex items-center gap-1 hover:opacity-90" href="#">
            👤 <span className="font-semibold">Hội viên</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
