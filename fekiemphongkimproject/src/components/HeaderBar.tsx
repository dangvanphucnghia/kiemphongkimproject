import { Link } from "react-router-dom";
import { Search, User, ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

export default function HeaderBar() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-white border-b">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Kiem Phong Kim"
                className="h-12 w-auto"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">
                  Kiếm Phong Kim
                </h1>
                <p className="text-xs text-gray-500">Tinh hoa gỗ quý</p>
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <form className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <Link
              to="/auth"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                Đăng nhập
              </span>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}