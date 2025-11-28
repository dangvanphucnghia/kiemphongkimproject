import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../lib/api";

type CurrentUser = {
  username?: string;
  fullName?: string;
  email?: string;
  roles?: string[];
};

export default function HeaderBar() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const navigate = useNavigate();

  const cartCount = 3; // Giả lập số lượng trong giỏ

  const chiNhanhs = [
    { name: "CS1: Tầng 1 TTTM Go Huế - 174 Bà Triệu, TP Huế" },
    { name: "CS2: 170 Phan Bội Châu, TP Huế" },
  ];

  // Lấy user từ localStorage (đã lưu khi login)
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) return;
    try {
      const u = JSON.parse(raw);
      setCurrentUser(u);
    } catch (e) {
      console.error("Parse user from localStorage failed", e);
    }
  }, []);

  // Tên hiển thị
  const displayName =
    currentUser?.fullName ||
    currentUser?.username ||
    currentUser?.email ||
    "Tài khoản";

  async function handleLogout() {
    const ok = confirm("Bạn có chắc muốn đăng xuất?");
    if (!ok) return;

    await logout();          // xoá token + user + gọi BE /api/auth/logout
    setCurrentUser(null);    // cập nhật UI
    navigate("/auth");       // chuyển về trang đăng nhập
  }
    function handleCartClick() {
    if (!currentUser) {
      // Chưa đăng nhập -> chuyển sang trang đăng nhập
      navigate("/auth");
    } else {
      // Đã đăng nhập -> cho vào giỏ hàng
      navigate("/cart");
    }
  }


  return (
    <header className="z-[9999] bg-[#F4E04D] text-[#2E2E2E] relative z-[1000]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Kiếm Phong Kim" className="h-8" />
        </Link>

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

        {/* Dropdown Chi nhánh */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setOpen(!open)}
            className="hidden md:flex items-center gap-2 bg-white text-[#D4AF37] rounded-full h-10 px-4 hover:bg-[#FFF8E1] transition"
          >
            📍 <span className="font-semibold">Chi nhánh</span>
            <svg
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <ul className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-[9999]">
              {chiNhanhs.map((cn, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-[#FFF8E1] cursor-pointer text-gray-700"
                >
                  {cn.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hội viên + Đăng nhập / Thông tin người dùng + Đăng xuất */}
        <nav className="flex items-center gap-6 text-sm">
          <Link className="flex items-center gap-1 hover:opacity-90" to="/member">
            👤 <span className="font-semibold">Hội viên</span>
          </Link>

          {/* Nếu CHƯA đăng nhập => hiện nút Đăng nhập */}
          {!currentUser && (
            <Link className="flex items-center gap-1 hover:opacity-90" to="/auth">
              🔑 <span className="font-semibold">Đăng nhập</span>
            </Link>
          )}

          {/* Nếu ĐÃ đăng nhập => hiện tên + nút Đăng xuất */}
          {currentUser && (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs md:text-sm">
                👋 <span className="font-semibold truncate max-w-[120px] md:max-w-[180px]">
                  {displayName}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs md:text-sm rounded-full border border-[#2E2E2E]/50 px-3 py-1 hover:bg-[#FFF8E1] transition"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </nav>

        {/* Nút giỏ hàng cố định góc phải */}
                {/* Nút giỏ hàng cố định góc phải */}
        <button
          type="button"
          onClick={handleCartClick}
          className="fixed top-[114px] right-6 flex items-center gap-3 bg-white text-[#D4AF37] rounded-full shadow-md px-4 py-2 hover:bg-[#FFF8E1] transition-all duration-200"
        >
          <div className="relative">
            <div className="bg-[#D4AF37] text-white p-2 rounded-full">
              <ShoppingCart className="w-5 h-5" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-semibold text-sm">Giỏ hàng</span>
        </button>

      </div>
    </header>
  );
}
