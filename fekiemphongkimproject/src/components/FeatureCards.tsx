import { Link } from "react-router-dom";

const features = [
  {
    id: 1,
    title: "Ưu đãi Trầm Hương",
    description: "Giảm đến 30%",
    image: "/images/feature1.jpg",
    bgColor: "from-amber-900 to-amber-700",
    href: "/danh-muc/tram-huong"
  },
  {
    id: 2,
    title: "Bộ sưu tập Linh Vật",
    description: "Sản phẩm cao cấp nhất",
    image: "/images/feature2.jpg",
    bgColor: "from-gray-800 to-gray-600",
    href: "/danh-muc/linh-vat"
  },
  {
    id: 3,
    title: "Vòng Tay Bình An",
    description: "Mang lại may mắn & sức khỏe tốt",
    image: "/images/feature3.jpg",
    bgColor: "from-amber-700 to-amber-500",
    href: "/danh-muc/vong-tay"
  }
];

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature) => (
        <Link
          key={feature.id}
          to={feature.href}
          className="group relative overflow-hidden rounded-2xl h-[180px] shadow-md hover:shadow-xl transition-all duration-300"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor}`} />
          
          {/* Background Image (if exists) */}
          {feature.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ backgroundImage: `url(${feature.image})` }}
            />
          )}

          {/* Content */}
          <div className="relative h-full flex flex-col justify-center p-6">
            <h3 className="text-white font-bold text-xl mb-1">
              {feature.title}
            </h3>
            <p className="text-white/80 text-sm">
              {feature.description}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
        </Link>
      ))}
    </div>
  );
}