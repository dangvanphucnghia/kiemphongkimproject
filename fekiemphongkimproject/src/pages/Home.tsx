import HeaderBar from "../components/HeaderBar";
import SubBar from "../components/SubBar";
import BannerSection from "../components/BannerSection";
import VoucherCard from "../components/VoucherCard";

export default function Home() {
  const vouchers = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Unilever.svg",
      title: "Voucher 10k - Unilever",
      desc: "GIẢM THÊM 10K: Áp dụng khi mua combo 2 sản phẩm (áp dụng một số danh mục).",
      hsd: "22.10.2025",
      code: "UNILEVER10K",
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/82/OMO_logo.png",
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

      <footer className="mt-10 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} WinMart UI Demo — Giao nhanh, tiết kiệm, uy tín.
        </div>
      </footer>
    </>
  );
}
