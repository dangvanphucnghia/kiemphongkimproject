import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  imageUrls?: string[];
  status?: string;
  description?: string;
};

const API_BASE = import.meta.env.VITE_API_URL || "https://kiemphongkimproject.onrender.com";

function resolveImageUrl(src?: string) {
  if (!src) return "/images/placeholder.jpg";
  if (src.startsWith("http")) return src;
  return `${API_BASE}${src}`;
}

/* ============ PRODUCT CARD ============ */
function ProductCard({ product }: { product: Product }) {
  const VND = new Intl.NumberFormat("vi-VN");
  const price = product.salePrice ?? product.price;
  const oldPrice = product.salePrice && product.price !== product.salePrice ? product.price : null;
  const discount = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;
  const imageUrl = resolveImageUrl(product.imageUrls?.[0]);

  return (
    <Link
      to={`/san-pham/${product.id}`}
      className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
            SALE
          </div>
        )}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/placeholder.jpg";
          }}
        />
      </div>

      <div className="p-3">
        <h3 className="text-sm text-gray-900 line-clamp-2 mb-2 min-h-[40px] group-hover:text-blue-600">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-bold text-gray-900">
            {VND.format(price)}₫
          </span>
          {oldPrice && (
            <span className="text-xs text-gray-400 line-through">
              {VND.format(oldPrice)}₫
            </span>
          )}
        </div>

        <button 
          onClick={(e) => {
            e.preventDefault();
          }}
          className="w-full py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors text-center flex items-center justify-center"
        >
          <span className="text-xl font-light">+</span>
        </button>
      </div>
    </Link>
  );
}

/* ============ PRODUCT SECTION ============ */
function ProductSection({
  icon,
  title,
  subtitle,
  products,
  sectionId,
}: {
  icon: string;
  title: string;
  subtitle: string;
  products: Product[];
  sectionId: string;
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-white border-b">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="flex items-start justify-between mb-6 pb-4 border-b">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <span>{icon}</span>
              {title}
            </h2>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <Link
            to={`/danh-muc/${sectionId}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 whitespace-nowrap ml-4"
          >
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ MAIN COMPONENT ============ */
export default function FeaturedSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `${API_BASE}/api/products`;
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        
        const data: Product[] = await res.json();
        
        if (!Array.isArray(data)) {
          throw new Error("API did not return an array");
        }
        
        setProducts(data);
      } catch (e: any) {
        setError(e.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4">
          <p className="text-red-600 mb-4">❌ Lỗi: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="min-h-[400px] bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Chưa có sản phẩm nào</p>
          <p className="text-sm text-gray-400">Vui lòng thêm sản phẩm vào hệ thống</p>
        </div>
      </div>
    );
  }

  // Filter products
  const activeProducts = products.filter(p => 
    !p.status || p.status.toLowerCase() === "active"
  );

  // Section 1: Khuyến mãi
  const khuyenMai = activeProducts
    .filter(p => p.salePrice && p.salePrice < p.price)
    .slice(0, 18);

  // Section 2: Được mua nhiều
  const duocMuaNhieu = activeProducts.slice(0, 18);

  // Section 3: Đồ gỗ
  const doGoPhongThuy = activeProducts.filter((p) => {
    const searchText = (p.name + " " + (p.description || "")).toLowerCase();
    return (
      searchText.includes("tượng") || 
      searchText.includes("vòng") || 
      searchText.includes("gỗ") ||
      searchText.includes("trầm") ||
      searchText.includes("phong thủy")
    );
  }).slice(0, 18);

  // Section 4: Rượu
  const ruouTruyenThong = activeProducts.filter((p) => {
    const searchText = (p.name + " " + (p.description || "")).toLowerCase();
    return searchText.includes("rượu");
  }).slice(0, 18);

  return (
    <div className="bg-gray-50">
      {khuyenMai.length > 0 && (
        <ProductSection
          icon="🔥"
          title="Khuyến mãi đặc biệt"
          subtitle="Giảm giá hấp dẫn cho các sản phẩm được yêu thích"
          products={khuyenMai}
          sectionId="khuyen-mai"
        />
      )}

      {duocMuaNhieu.length > 0 && (
        <ProductSection
          icon="💛"
          title="Được mua nhiều"
          subtitle="Những sản phẩm khách hàng lựa chọn nhiều nhất"
          products={duocMuaNhieu}
          sectionId="duoc-mua-nhieu"
        />
      )}

      {doGoPhongThuy.length > 0 && (
        <ProductSection
          icon="🪵"
          title="Đồ gỗ phong thủy"
          subtitle="Tượng và vật phẩm gỗ tự nhiên mang năng lượng an lành"
          products={doGoPhongThuy}
          sectionId="do-go-phong-thuy"
        />
      )}

      {ruouTruyenThong.length > 0 && (
        <ProductSection
          icon="🍶"
          title="Rượu truyền thống Việt"
          subtitle="Rượu ngâm thảo mộc – tinh hoa văn hoá Việt"
          products={ruouTruyenThong}
          sectionId="ruou-truyen-thong"
        />
      )}
    </div>
  );
}