import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";
import SubBar from "../components/SubBar";
import BannerSection from "../components/BannerSection";
import VoucherCard from "../components/VoucherCard";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/FeaturedProducts";
import CartDrawer from "../components/CartDrawer"; // ⟵ thêm

export default function Home() {
  const vouchers = [
    {
      logo: "/images/logo.png",
      title: "Voucher 10k - Unilever",
      desc: "GIẢM THÊM 10K: Áp dụng khi mua combo 2 sản phẩm (áp dụng một số danh mục).",
      hsd: "22.10.2025",
      code: "UNILEVER10K",
    },
    {
      logo: "/images/logo.png",
      title: "Voucher 20k - OMO",
      desc: "GIẢM THÊM 20K: Áp dụng cho đơn hàng các sản phẩm OMO từ 180K.",
      hsd: "31.10.2025",
      code: "OMO20K",
    },
  ];

  // === Router-based drawer state ===
  const location = useLocation();
  const navigate = useNavigate();
  const isCartRoute = location.pathname === "/cart";
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    setOpenCart(isCartRoute);
  }, [isCartRoute]);

  const closeCart = () => {
    setOpenCart(false);
    navigate("/", { replace: true }); // đóng drawer -> về trang chủ
  };

  return (
    <>
      <HeaderBar />
      <SubBar />
      <main id="main">
        <BannerSection />

        {/* (Gợi ý) Nút mở giỏ hàng – có thể chuyển lên HeaderBar nếu muốn */}
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <button
            onClick={() => navigate("/cart")}
            className="rounded-xl px-4 py-2 font-medium text-gray-900
                       bg-gradient-to-r from-amber-400 to-zinc-300 hover:brightness-95
                       shadow focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Mở giỏ hàng"
          >
            🛒 Mở giỏ hàng
          </button>
        </div>

        {/* VOUCHER */}
        <section className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map((v) => (
            <VoucherCard key={v.code} {...v} />
          ))}
        </section>
      </main>

      <FeaturedProducts />
      <Footer />

      {/* Drawer giỏ hàng UI-only (1/2 màn hình phải trên desktop) */}
      <CartDrawer
        open={openCart}
        onClose={closeCart}
        // Bạn có thể truyền items/subtotalText nếu muốn thay placeholder:
        // items={[{ id: "1", name: "Sản phẩm A", priceText: "259.000₫", qty: 1 }]}
        // subtotalText="259.000₫"
      />
    </>
  );
}
