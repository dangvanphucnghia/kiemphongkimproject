// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";
import { ph } from "../data/products";

// Base URL của backend – nếu chưa set VITE_API_URL
// thì mặc định dùng http://localhost:1212 (port BE của bạn)
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:1212";

// Helper build URL ảnh
function resolveImageUrl(src?: string, nameForPh?: string) {
  if (!src) return ph(nameForPh || "Kiem+Phong+Kim");
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  // src kiểu /uploads/products/xxx.jpeg -> prefix thêm host BE
  return `${API_BASE}${src}`;
}

// SEO đơn giản
function SEO({
  title,
  description,
  canonical,
  ogImage,
  children,
}: {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  children?: React.ReactNode;
}) {
  const setTag = (selector: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    return el as HTMLElement;
  };

  if (typeof document !== "undefined") {
    document.title = title;

    if (description !== undefined) {
      const metaDesc = setTag('meta[name="description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      });
      metaDesc.setAttribute("content", description);
    }

    if (canonical) {
      const linkCanon = setTag('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.setAttribute("rel", "canonical");
        return l;
      });
      linkCanon.setAttribute("href", canonical);
    }

    if (ogImage) {
      const ogType = setTag('meta[property="og:type"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:type");
        return m;
      });
      ogType.setAttribute("content", "product");

      const ogTitle = setTag('meta[property="og:title"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:title");
        return m;
      });
      ogTitle.setAttribute("content", title);

      const ogDesc = setTag('meta[property="og:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      });
      ogDesc.setAttribute("content", description || "");

      const ogImg = setTag('meta[property="og:image"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:image");
        return m;
      });
      ogImg.setAttribute("content", ogImage);

      if (canonical) {
        const ogUrl = setTag('meta[property="og:url"]', () => {
          const m = document.createElement("meta");
          m.setAttribute("property", "og:url");
          return m;
        });
        ogUrl.setAttribute("content", canonical);
      }

      const tw = setTag('meta[name="twitter:card"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "twitter:card");
        return m;
      });
      tw.setAttribute("content", "summary_large_image");
    }
  }

  return <>{children}</>;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const numericId = productId ? Number(productId) : NaN;

  // Gọi API lấy chi tiết sản phẩm
  useEffect(() => {
    if (!productId || Number.isNaN(numericId)) {
      setError("ID sản phẩm không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/products/${numericId}`);
        if (res.status === 404) {
          throw new Error("Sản phẩm không tồn tại hoặc đã bị xoá.");
        }
        if (!res.ok) {
          throw new Error("Không tải được chi tiết sản phẩm.");
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (e: any) {
        setError(e.message || "Đã xảy ra lỗi.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, numericId]);

  // ====== LOADING ======
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <SEO title="Đang tải sản phẩm | Kiem Phong Kim" />
        <p>Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  // ====== LỖI / KHÔNG CÓ PRODUCT ======
  if (!product || error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <SEO title="Không tìm thấy sản phẩm | Kiem Phong Kim" />
        <Breadcrumbs
          items={[
            { label: "Trang chủ", to: "/" },
            { label: "Sản phẩm", to: "/san-pham" },
            { label: "Không tìm thấy" },
          ]}
        />
        <div className="surface p-8 text-center">
          <p className="text-lg">
            {error === "ID sản phẩm không hợp lệ"
              ? "ID sản phẩm không hợp lệ"
              : "Sản phẩm không tồn tại hoặc đã bị xoá."}
          </p>
          <Link to="/san-pham" className="mt-4 inline-block btn-ghost">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  // ====== CÓ PRODUCT ======
  // map imageUrls -> URL đầy đủ của BE
  const gallery: string[] =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls.map((u) => resolveImageUrl(u, product.name))
      : [ph(product.name)];

  const priceNumber = product.salePrice ?? product.price ?? 0;
  const priceText =
    new Intl.NumberFormat("vi-VN").format(priceNumber) + "₫";

  const oldText =
    product.salePrice && product.price && product.salePrice < product.price
      ? new Intl.NumberFormat("vi-VN").format(product.price) + "₫"
      : undefined;

  const availability =
    (product.stock ?? 0) > 0 && product.status !== "OUT_OF_STOCK"
      ? "InStock"
      : "OutOfStock";

  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "http://localhost:5173";
  const canonical = `${origin}/san-pham/${product.id}`;
  const pageTitle = `${product.name} | Giá tốt, chính hãng`;
  const pageDesc =
    product.description?.slice(0, 155) ||
    `Mua ${product.name} giá ${priceText}. Giao hàng nhanh, bảo hành rõ ràng.`;
  const ogImage = gallery[0];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* SEO */}
      <SEO
        title={pageTitle}
        description={pageDesc}
        canonical={canonical}
        ogImage={ogImage}
      />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Sản phẩm", to: "/san-pham" },
          { label: product.name },
        ]}
      />

      <article className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Gallery */}
        <section className="surface overflow-hidden md:sticky md:top-6 md:col-span-6">
          <figure className="relative aspect-square">
            <img
              src={gallery[active]}
              alt={`${product.name} - hình ${active + 1}`}
              className="size-full object-cover"
              loading="eager"
            />
            <figcaption className="sr-only">{product.name}</figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(212,175,55,.25)]" />
          </figure>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 p-4">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={
                    "relative aspect-square overflow-hidden rounded-lg border " +
                    (idx === active
                      ? "border-gold-600 ring-2 ring-gold-400"
                      : "border-platinum-200")
                  }
                >
                  <img
                    src={src}
                    alt={`${product.name} - ${idx + 1}`}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Info */}
        <section className="surface p-6 md:col-span-4">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-ink-900">
                {product.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-500" />{" "}
                  {(product.stock ?? 0) > 0 ? "Còn hàng" : "Hết hàng"}
                </span>
                {product.categoryName && (
                  <span className="text-ink-600">
                    Danh mục:{" "}
                    <span className="font-medium text-ink-900">
                      {product.categoryName}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </header>

          {product.description && (
            <p className="mt-2 text-ink-700">{product.description}</p>
          )}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-ink-900">
              {priceText}
            </span>
            {oldText && (
              <span className="text-ink-500 line-through">{oldText}</span>
            )}
          </div>

          {/* CTA */}
          <div className="mt-6 flex items-center gap-3">
            <label className="sr-only" htmlFor="qty">
              Số lượng
            </label>
            <input
              id="qty"
              type="number"
              defaultValue={1}
              min={1}
              className="w-16 rounded-lg border border-platinum-300 bg-white px-2 py-2 text-center"
            />
            <button className="btn-gold flex items-center gap-2">
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>
          </div>

          {/* Thuộc tính từ filters */}
          {product.filters && product.filters.length > 0 && (
            <section className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-ink-900">
                Thuộc tính sản phẩm
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.filters.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-lg border border-platinum-200 bg-platinum-50 p-3"
                  >
                    <div className="text-xs uppercase tracking-wide text-ink-600">
                      {f.filterType}
                    </div>
                    <div className="text-ink-900">{f.filterValue}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* Right sidebar */}
        <aside className="hidden md:block md:col-span-2">
          <div className="space-y-3">
            <div className="rounded-lg border border-platinum-200 bg-white p-4">
              <div className="font-semibold">Giao hàng toàn quốc</div>
              <div className="text-sm text-ink-600">
                Đóng gói cẩn thận, giao nhanh.
              </div>
            </div>
            <div className="rounded-lg border border-platinum-200 bg-white p-4">
              <div className="font-semibold">Đổi trả linh hoạt</div>
              <div className="text-sm text-ink-600">
                Hỗ trợ đổi trả nếu có lỗi do nhà sản xuất.
              </div>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
}
