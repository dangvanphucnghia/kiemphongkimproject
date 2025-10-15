export default function HeaderBar() {
  return (
    <div className="bg-[#EA1B25] text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7f/WinMart_logo.svg"
            alt="WinMart"
            className="h-8"
          />
        </a>

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center bg-white/95 rounded-full overflow-hidden">
            <span className="pl-4 pr-2 text-gray-400">🔍</span>
            <input
              className="h-10 w-full outline-none text-sm text-[#2E2E2E] placeholder:text-gray-400"
              placeholder="Giao nhanh 2h, Giảm thêm 20% Rau WinEco & Thịt MeatDeli"
            />
          </div>
        </div>

        {/* Chi nhánh */}
        <button
          className="hidden md:flex items-center gap-2 bg-white/95 text-[#EA1B25] rounded-full h-10 px-4 hover:bg-white"
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
