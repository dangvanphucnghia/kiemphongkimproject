import { NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r hidden md:flex md:flex-col">
        <div className="px-6 py-4 border-b">
          <h1 className="text-xl font-bold tracking-tight">Kiếm Phong Kim</h1>
          <p className="text-xs text-gray-500">Trang quản lý</p>
        </div>
        <nav className="flex-1 p-2">
          <NavItem to="/dashboard" label="Bảng quản lý" />
          <NavItem to="/users" label="Quản lý người dùng" />
          <NavItem to="/products" label="Quản lý sản phẩm" />
          <NavItem to="/orders" label="Quản lý loại sản phẩm" />
        </nav>
        <div className="p-4 text-xs text-gray-500">v0.1</div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b">
          <div className="h-14 px-4 md:px-6 flex items-center justify-between">
            <span className="font-medium">Nhân viên</span>
          </div>
        </header>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "block rounded-lg px-3 py-2 text-sm font-medium " +
        (isActive ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100")
      }
    >
      {label}
    </NavLink>
  );
}
