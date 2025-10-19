import HeaderBar from "../components/HeaderBar";
import SubBar from "../components/SubBar";
import BannerSection from "../components/BannerSection";
import VoucherCard from "../components/VoucherCard";
import Footer from "../components/Footer";
import FeaturedProducts from "../components/FeaturedProducts";

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

  return (
    <>
      <HeaderBar />
      <SubBar />
      <main id="main">
        <BannerSection />

        {/* VOUCHER */}
        <section className="max-w-6xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {vouchers.map((v) => (
            <VoucherCard key={v.code} {...v} />
          ))}
        </section>
      </main>
      <FeaturedProducts />

      <Footer/>
    </>
  );
}
