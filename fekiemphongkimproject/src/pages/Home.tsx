import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../components/Sidebar";
import MainBanner from "../components/MainBanner";
import FeatureCards from "../components/FeatureCards";
import FeaturedSections from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const isCartRoute = location.pathname === "/cart";
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    setOpenCart(isCartRoute);
  }, [isCartRoute]);

  const closeCart = () => {
    setOpenCart(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <HeaderBar />
      </div>

      {/* Main Layout: Sidebar + Content */}
      <main className="relative">
        <div className="max-w-[1440px] mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            
            {/* Sidebar dọc bên trái */}
            <aside className="hidden lg:block">
              <div className="sticky top-[88px]">
                <Sidebar />
              </div>
            </aside>

            {/* Content chính */}
            <div className="space-y-6">
              <MainBanner />
              <FeatureCards />
            </div>
          </div>
        </div>

        {/* 4 Featured Sections - Full width */}
        <FeaturedSections />
      </main>

      <Footer />
      <CartDrawer open={openCart} onClose={closeCart} />
    </div>
  );
}