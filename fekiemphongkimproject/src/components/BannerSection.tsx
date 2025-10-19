import { useEffect, useState } from "react";

const bigSlides = [
  "/images/category1.png",
  "/images/category2.png",
  "/images/category3.png",
];

export default function BannerSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % bigSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 mt-5 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
      {/* slide lớn bên trái */}
      <div className="relative rounded-xl overflow-hidden shadow">
        <img
          src={bigSlides[i]}
          alt="Khuyến mãi nổi bật"
          className="w-full h-[360px] object-scale-down bg-white"
        />

        <button
          onClick={() => setI((i - 1 + bigSlides.length) % bigSlides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
          aria-label="Prev"
        >
          ‹
        </button>
        <button
          onClick={() => setI((i + 1) % bigSlides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-8 w-8"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* 2 ảnh tĩnh bên phải */}
      <div className="grid gap-4">
  <img
    src="/images/category1.png"
    alt="Promo side 1"
    className="rounded-xl shadow h-[170px] w-full object-contain bg-white"
  />
  <img
    src="/images/category2.png"
    alt="Promo side 2"
    className="rounded-xl shadow h-[170px] w-full object-contain bg-white"
  />
</div>


    </section>
  );
}
