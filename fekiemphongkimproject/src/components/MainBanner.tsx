import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Tinh hoa nghệ thuật từ",
    highlight: "gỗ quý",
    description: "Khám phá những sản phẩm thủ công tinh xảo, mang đậm giá trị văn hóa",
    image: "/images/category1.png",
    buttonText: "Khám phá ngay"
  },
  {
    id: 2,
    title: "Vòng tay phong thủy",
    highlight: "năng lượng",
    description: "Mang lại may mắn, bình an cho người đeo",
    image: "/images/category2.png",
    buttonText: "Xem ngay"
  },
  {
    id: 3,
    title: "Tượng phong thủy",
    highlight: "độc đáo",
    description: "Tạo điểm nhấn cho không gian sống của bạn",
    image: "/images/category3.png",
    buttonText: "Khám phá"
  }
];

export default function MainBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const current = banners[currentIndex];

  return (
    <div className="relative bg-gradient-to-br from-gray-400 via-gray-300 to-gray-200 rounded-2xl overflow-hidden shadow-lg h-[400px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${current.image})`,
          opacity: 0.3
        }}
      />

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="w-full px-12 lg:px-20">
          <div className="max-w-xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
              {current.title}
            </h1>
            <h2 className="text-5xl lg:text-6xl font-extrabold text-yellow-400 mb-4">
              {current.highlight}
            </h2>
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              {current.description}
            </p>
            <button className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-white transition-all duration-300 shadow-lg">
              {current.buttonText}
            </button>
          </div>
        </div>

        {/* Product Image (if needed) */}
        <div className="absolute right-12 bottom-0 w-1/3 h-full hidden lg:flex items-end">
          <img 
            src={current.image} 
            alt={current.title}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}