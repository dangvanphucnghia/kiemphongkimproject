import { useEffect, useState } from "react";

const bigSlides = [
  "https://images.unsplash.com/photo-1695656329774-05985b3b4480?q=80&w=1600&auto=format&fit=crop", // bạn có thể thay ảnh banner khuyến mãi
  "https://images.unsplash.com/photo-1690482529272-ccc6ad5aa1a1?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1682687982521-1bb4a565d6b1?q=80&w=1600&auto=format&fit=crop",
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
          className="w-full h-[360px] object-cover"
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
          src="https://images.unsplash.com/photo-1516684732162-798a0062e110?q=80&w=900&auto=format&fit=crop"
          alt="Promo side 1"
          className="rounded-xl shadow h-[170px] w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1483986390315-bcbd17d0fe29?q=80&w=900&auto=format&fit=crop"
          alt="Promo side 2"
          className="rounded-xl shadow h-[170px] w-full object-cover"
        />
      </div>
    </section>
  );
}
