import { useParams, useLocation, Link } from "react-router-dom";
import { PRODUCTS, getProductBySlug } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function ProductDetail() {
  const { slug } = useParams();
  const { state } = useLocation() as { state?: { product?: any } };

  // Ưu tiên lấy từ Link state; nếu không có thì tìm theo slug trong kho chung
  const product = state?.product ?? (slug ? getProductBySlug(slug) : undefined);
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Sản phẩm", to: "/san-pham" }, { label: "Không tìm thấy" }]} />
        <div className="surface p-8 text-center">
          <p className="text-lg">Sản phẩm không tồn tại hoặc đã bị xoá.</p>
          <Link to="/san-pham" className="mt-4 inline-block btn-ghost">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];
  const priceText = new Intl.NumberFormat("vi-VN").format(product.price) + "₫";
  const oldText = product.oldPrice ? new Intl.NumberFormat("vi-VN").format(product.oldPrice) + "₫" : undefined;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Sản phẩm", to: "/san-pham" }, { label: product.name }]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gallery */}
        <section className="surface overflow-hidden">
          <div className="relative aspect-square">
            <img src={gallery[active]} alt={product.name} className="size-full object-cover" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(212,175,55,.25)]" />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 p-4">
              {gallery.map((src: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Ảnh ${idx + 1}`}
                  className={
                    "relative aspect-square overflow-hidden rounded-lg border " +
                    (idx === active ? "border-gold-600 ring-2 ring-gold-400" : "border-platinum-200")
                  }
                >
                  <img src={src} className="size-full object-cover" alt={`${product.name} - ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Info */}
        <section className="surface p-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-semibold text-ink-900">{product.name}</h1>
            <div className="flex items-center gap-2">
              {product.badges?.map((b: string) => (
                <span
                  key={b}
                  className="rounded-md border border-gold-600 bg-gradient-to-b from-gold-500/80 to-gold-600/80 px-2 py-1 text-xs font-medium text-black"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {product.shortDesc && <p className="mt-2 text-ink-700">{product.shortDesc}</p>}

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-ink-900">{priceText}</span>
            {oldText && <span className="text-ink-500 line-through">{oldText}</span>}
          </div>

          {typeof product.rating === "number" && (
            <div className="mt-2 text-sm text-ink-600">
              Đánh giá: <span className="font-medium text-ink-900">{product.rating.toFixed(1)}/5</span>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="btn-gold flex items-center gap-2">
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>
          </div>

          {product.specs && (
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-ink-900">Thông số</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-platinum-200 bg-platinum-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-ink-600">{k.replace(/_/g, " ")}</div>
                    <div className="text-ink-900">{String(v)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.description && (
            <div className="prose mt-8 max-w-none text-ink-800">
              <h2 className="text-lg font-semibold">Mô tả</h2>
              <p>{product.description}</p>
            </div>
          )}
        </section>
      </div>

      {/* Related */}
      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink-900">Sản phẩm liên quan</h3>
          <Link to="/san-pham" className="text-sm underline underline-offset-4 hover:text-ink-900">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <Link key={p.id} to={`/san-pham/${p.slug}`} className="surface block overflow-hidden">
              <div className="aspect-square">
                <img src={p.image} alt={p.name} className="size-full object-cover" />
              </div>
              <div className="p-3">
                <div className="line-clamp-1 text-sm text-ink-900">{p.name}</div>
                <div className="text-sm font-medium text-ink-900">
                  {new Intl.NumberFormat("vi-VN").format(p.price)}₫
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
