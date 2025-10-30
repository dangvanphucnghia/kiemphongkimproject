import { NavLink, Outlet, useLocation } from 'react-router-dom';

const navItem = (to: string, label: string) => (
    <NavLink
        to={to}
        end={to === '/admin'}
        className={({ isActive }) =>
            'block rounded-lg border px-3 py-2 text-slate-200 transition ' +
            (isActive ? 'border-gold-500 bg-gold-500/15 text-white' : 'border-platinum-700 hover:border-slate-500')
        }
    >
        {label}
    </NavLink>
);

export default function AdminLayout() {
    const { pathname } = useLocation();
    const map: Record<string, string> = {
        '/admin': 'Dashboard',
        '/admin/products': 'Quản lý sản phẩm',
        '/admin/categories': 'Loại sản phẩm',
        '/admin/users': 'Quản lý user',
        '/admin/members': 'Quản lý hội viên',
        '/admin/promotions': 'Quản lý khuyến mãi',
        '/admin/orders': 'Quản lý đơn hàng',
        '/admin/revenue': 'Quản lý doanh thu',
        '/admin/banners': 'Quản lý banner',
    };

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
                <nav className="space-y-2">
                    {navItem('/admin', 'Dashboard')}
                    {navItem('/admin/products', 'Quản lý sản phẩm')}
                    {navItem('/admin/categories', 'Loại sản phẩm')}
                    {navItem('/admin/users', 'Quản lý user')}
                    {navItem('/admin/members', 'Quản lý hội viên')}
                    {navItem('/admin/promotions', 'Quản lý khuyến mãi')}
                    {navItem('/admin/orders', 'Quản lý đơn hàng')}
                    {navItem('/admin/revenue', 'Quản lý doanh thu')}
                    {navItem('/admin/banners', 'Quản lý banner')}
                </nav>
                <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-500">© 2025 KiemPhongKim</div>
            </aside>

            {/* Main */}
            <section className="flex-1 flex flex-col">
                <header className="sticky top-0 z-10 border-b border-platinum-700 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5">
                    <div className="flex items-center justify-between px-5 py-3">
                        <div className="font-semibold tracking-wide">{map[pathname] ?? 'Admin'}</div>
                        <div className="flex items-center gap-2">
                            <input
                                placeholder="Tìm kiếm nhanh…"
                                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/30"
                            />
                            <button className="rounded-lg border border-amber-700 bg-gradient-to-b from-gold-500 to-gold-600 px-4 py-2 font-semibold text-black">
                                + Tạo mới
                            </button>
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
