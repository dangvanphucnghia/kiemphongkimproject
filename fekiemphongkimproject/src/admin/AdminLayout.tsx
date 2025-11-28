import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../lib/api";

type CurrentUser = {
  username?: string;
  fullName?: string;
  email?: string;
  roles?: string[];
};

const navItem = (to: string, label: string) => (
  <NavLink
    to={to}
    end={to === "/admin"}
    className={({ isActive }) =>
      "block rounded-lg border px-3 py-2 text-slate-200 transition " +
      (isActive
        ? "border-gold-500 bg-gold-500/15 text-white"
        : "border-platinum-700 hover:border-slate-500")
    }
  >
    {label}
  </NavLink>
);

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // ✅ thêm

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

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

  const map: Record<string, string> = {
    "/admin": "Dashboard",
    "/admin/products": "Quản lý sản phẩm",
    "/admin/categories": "Loại sản phẩm",
    "/admin/users": "Quản lý user",
    "/admin/members": "Quản lý hội viên",
    "/admin/promotions": "Quản lý khuyến mãi",
    "/admin/orders": "Quản lý đơn hàng",
    "/admin/revenue": "Quản lý doanh thu",
    "/admin/banners": "Quản lý banner",
  };

  const roleLabel = currentUser?.roles?.includes("ROLE_ADMIN")
    ? "Quản trị viên"
    : currentUser?.roles?.join(", ");

  const displayName =
    currentUser?.fullName ||
    currentUser?.username ||
    currentUser?.email ||
    "Tài khoản";

  const avatarChar = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    const ok = confirm("Bạn có chắc muốn đăng xuất?");
    if (!ok) return;

    await logout();      // ✅ gọi BE + xoá localStorage
    navigate("/auth");   // ✅ quay về trang đăng nhập
  }

  return (
    <div className="min-h-screen text-slate-100 bg-gradient-to-br from-platinum-900 to-platinum-800 flex">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r border-platinum-700 bg-gradient-to-b from-[#25252b] to-[#1b1b1e] p-4 sticky top-0 h-screen">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <img
            src="/images/logo.png"
            alt="Kiếm Phong Kim"
            className="h-8 w-8 rounded-md object-contain"
            loading="lazy"
          />

          <div>
            <div className="font-semibold">Kiếm Phong Kim</div>
            <div className="text-xs text-slate-400">Trang quản trị</div>
          </div>
        </div>

        {/* Thông tin người đang đăng nhập */}
        {currentUser && (
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-black/20 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 text-black font-semibold">
              {avatarChar}
            </div>
            <div className="flex-1 leading-tight">
              <div className="text-sm font-semibold">{displayName}</div>
              <div className="text-[11px] text-slate-400">
                {roleLabel || "Đang đăng nhập"}
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2">
          {navItem("/admin", "Dashboard")}
          {navItem("/admin/products", "Quản lý sản phẩm")}
          {navItem("/admin/categories", "Loại sản phẩm")}
          {navItem("/admin/users", "Quản lý user")}
          {navItem("/admin/members", "Quản lý hội viên")}
          {navItem("/admin/promotions", "Quản lý khuyến mãi")}
          {navItem("/admin/orders", "Quản lý đơn hàng")}
          {navItem("/admin/revenue", "Quản lý doanh thu")}
          {navItem("/admin/banners", "Quản lý banner")}
        </nav>

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-500">
          <span>© 2025 KiemPhongKim</span>
          {currentUser && (
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-600 bg-transparent px-2 py-1 text-[11px] text-slate-300 hover:border-gold-500 hover:text-gold-300"
            >
              Đăng xuất
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <section className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 border-b border-platinum-700 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="font-semibold tracking-wide">
              {map[pathname] ?? "Admin"}
            </div>

            <div className="flex items-center gap-3">
              <input
                placeholder="Tìm kiếm nhanh…"
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/30"
              />

              {currentUser && (
                <span className="hidden md:inline-flex items-center rounded-full border border-slate-700 bg-platinum-900 px-3 py-1 text-xs text-slate-300">
                  Đang đăng nhập:{" "}
                  <span className="ml-1 font-semibold text-gold-300">
                    {roleLabel || "User"}
                  </span>
                </span>
              )}
            </div>
          </div>
        </header>

        <main className="p-5">
          <Outlet />
        </main>
      </section>
    </div>
  );
}
