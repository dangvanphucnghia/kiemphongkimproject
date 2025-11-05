import { useParams, useLocation, Link } from "react-router-dom";
import { PRODUCTS, getProductBySlug } from "../data/products";
import Breadcrumbs from "../components/Breadcrumbs";
import { ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
// NOTE: Removed react-helmet-async due to React 19 peer conflict. Using a tiny in-file SEO component instead.

// Lightweight SEO head manager compatible with React 19
function SEO({ title, description, canonical, ogImage, children }: { title: string; description?: string; canonical?: string; ogImage?: string; children?: React.ReactNode }) {
  const setTag = (selector: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(selector);
    if (!el) { el = create(); document.head.appendChild(el); }
    return el as HTMLElement;
  };
  if (typeof document !== 'undefined') {
    document.title = title;
    if (description !== undefined) {
      const metaDesc = setTag('meta[name="description"]', () => {
        const m = document.createElement('meta'); m.setAttribute('name','description'); return m; });
      metaDesc.setAttribute('content', description);
    }
    if (canonical) {
      const linkCanon = setTag('link[rel="canonical"]', () => {
        const l = document.createElement('link'); l.setAttribute('rel','canonical'); return l; });
      linkCanon.setAttribute('href', canonical);
    }
    if (ogImage) {
      const ogType = setTag('meta[property="og:type"]', () => { const m = document.createElement('meta'); m.setAttribute('property','og:type'); return m; });
      ogType.setAttribute('content','product');
      const ogTitle = setTag('meta[property="og:title"]', () => { const m = document.createElement('meta'); m.setAttribute('property','og:title'); return m; });
      ogTitle.setAttribute('content', title);
      const ogDesc = setTag('meta[property="og:description"]', () => { const m = document.createElement('meta'); m.setAttribute('property','og:description'); return m; });
      ogDesc.setAttribute('content', description || '');
      const ogImg = setTag('meta[property="og:image"]', () => { const m = document.createElement('meta'); m.setAttribute('property','og:image'); return m; });
      ogImg.setAttribute('content', ogImage);
      if (canonical) {
        const ogUrl = setTag('meta[property="og:url"]', () => { const m = document.createElement('meta'); m.setAttribute('property','og:url'); return m; });
        ogUrl.setAttribute('content', canonical);
      }
      const tw = setTag('meta[name="twitter:card"]', () => { const m = document.createElement('meta'); m.setAttribute('name','twitter:card'); return m; });
      tw.setAttribute('content','summary_large_image');
    }
  }
  return <>{children}</>;
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { state } = useLocation() as { state?: { product?: any } };

  // Ưu tiên lấy từ Link state; nếu không có thì tìm theo slug trong kho chung
  const product = state?.product ?? (slug ? getProductBySlug(slug) : undefined);
  const [active, setActive] = useState(0);

  if (!product) {
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
          <p className="text-lg">Sản phẩm không tồn tại hoặc đã bị xoá.</p>
          <Link to="/san-pham" className="mt-4 inline-block btn-ghost">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const gallery: string[] = product.images?.length ? product.images : [product.image];
  const priceText = new Intl.NumberFormat("vi-VN").format(product.price) + "₫";
  const oldText = product.oldPrice
    ? new Intl.NumberFormat("vi-VN").format(product.oldPrice) + "₫"
    : undefined;
  const availability = product.inStock === false ? "OutOfStock" : "InStock";

  // ======= SEO helpers =======
  const { pageTitle, pageDesc, canonical, ogImage } = useMemo(() => {
    const title = `${product.name} | Giá tốt, chính hãng`;
    const desc = product.shortDesc?.slice(0, 155) ||
      `Mua ${product.name} giá ${priceText}. Giao hàng nhanh, bảo hành rõ ràng.`;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/san-pham/${product.slug ?? slug ?? ""}`;
    const image = gallery?.[0];
    return { pageTitle: title, pageDesc: desc, canonical: url, ogImage: image };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.name, product?.slug, gallery, priceText, slug]);

  // JSON-LD cho Breadcrumb & Product
  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@id': '/', name: 'Trang chủ' },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: { '@id': '/san-pham', name: 'Sản phẩm' },
      },
      {
        '@type': 'ListItem',
        position: 3,
        item: { '@id': `/san-pham/${product.slug ?? slug ?? ''}`, name: product.name },
      },
    ],
  };

  const productJson = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.shortDesc || product.description,
    sku: product.sku || product.id,
    image: gallery,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    aggregateRating:
      typeof product.rating === 'number'
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating.toFixed(1),
            reviewCount: product.reviewCount || 1,
          }
        : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      price: product.price,
      availability: `https://schema.org/${availability}`,
      url: `/san-pham/${product.slug ?? slug ?? ''}`,
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ======= HEAD / META ======= */}
      <SEO title={pageTitle} description={pageDesc} canonical={canonical} ogImage={ogImage} />

      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Sản phẩm", to: "/san-pham" },
          { label: product.name },
        ]}
      />

      <article className="grid grid-cols-1 md:grid-cols-12 gap-6" itemScope itemType="https://schema.org/Product">
        {/* Gallery */}
        <section className="surface overflow-hidden md:sticky md:top-6 md:col-span-6" aria-label="Bộ sưu tập hình ảnh sản phẩm">
          <figure className="relative aspect-square">
            <img
              src={gallery[active]}
              alt={`${product.name} - hình ${active + 1}`}
              className="size-full object-cover"
              loading="eager"
              itemProp="image"
            />
            <figcaption className="sr-only">{product.name}</figcaption>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(212,175,55,.25)]" />
          </figure>
          {gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3 p-4" role="list" aria-label="Hình thu nhỏ">
              {gallery.map((src: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  aria-label={`Xem ảnh ${idx + 1}`}
                  className={
                    "relative aspect-square overflow-hidden rounded-lg border " +
                    (idx === active
                      ? "border-gold-600 ring-2 ring-gold-400"
                      : "border-platinum-200")
                  }
                >
                  <img src={src} className="size-full object-cover" alt={`${product.name} - ${idx + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Info */}
        <section className="surface p-6 md:col-span-4" aria-label="Thông tin sản phẩm">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-[28px] leading-tight font-extrabold tracking-[-0.02em] text-ink-900" itemProp="name">
                {product.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  <span className="size-2 rounded-full bg-emerald-500" aria-hidden /> Còn hàng
                </span>
                {product.sku && (<span className="text-ink-600">Mã SP: <span className="font-medium text-ink-900">{product.sku}</span></span>)}
                {product.stockCount && (<span className="text-amber-700">Chỉ còn {product.stockCount} sản phẩm</span>)}
              </div>
            </div>
            {product.badges?.length ? (
              <ul className="flex items-center gap-2" aria-label="Nhãn sản phẩm">
                {product.badges.map((b: string) => (
                  <li key={b}>
                    <span className="rounded-md border border-gold-600 bg-gradient-to-b from-gold-500/80 to-gold-600/80 px-2 py-1 text-xs font-medium text-black">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>

          {product.shortDesc && (
            <p className="mt-2 text-ink-700" itemProp="description">
              {product.shortDesc}
            </p>
          )}

          <div className="mt-4 flex items-baseline gap-3" itemScope itemType="https://schema.org/Offer" itemProp="offers">
            <span className="text-2xl font-bold text-ink-900" itemProp="price" content={String(product.price)}>
              {priceText}
            </span>
            <meta itemProp="priceCurrency" content="VND" />
            <link itemProp="availability" href={`https://schema.org/${availability}`} />
            {oldText && <span className="text-ink-500 line-through">{oldText}</span>}
          </div>

          {typeof product.rating === "number" && (
            <div className="mt-2 text-sm text-ink-600" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              Đánh giá: {" "}
              <span className="font-medium text-ink-900" itemProp="ratingValue">
                {product.rating.toFixed(1)}
              </span>
              /5
              <meta itemProp="reviewCount" content={String(product.reviewCount || 1)} />
            </div>
          )}

          {/* CTA */}
          <div className="mt-6 flex items-center gap-3">
            <label className="sr-only" htmlFor="qty">Số lượng</label>
            <input id="qty" type="number" defaultValue={1} min={1} className="w-16 rounded-lg border border-platinum-300 bg-white px-2 py-2 text-center" />
            <button className="btn-gold flex items-center gap-2" aria-label="Thêm vào giỏ hàng">
              <ShoppingCart size={18} />
              Thêm vào giỏ
            </button>
            <a href="#mo-ta" className="btn-ghost">Xem mô tả chi tiết</a>
          </div>

          {/* Usp */}
          

          {product.specs && (
            <section className="mt-8" aria-labelledby="thong-so">
              <h2 id="thong-so" className="mb-3 text-lg font-semibold text-ink-900">
                Thông số
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="rounded-lg border border-platinum-200 bg-platinum-50 p-3">
                    <div className="text-xs uppercase tracking-wide text-ink-600">{k.replace(/_/g, " ")}</div>
                    <div className="text-ink-900">{String(v)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {product.description && (
            <section id="mo-ta" className="prose mt-8 max-w-none text-ink-800">
              <h2 className="text-lg font-semibold">Mô tả</h2>
              <p>{product.description}</p>
            </section>
          )}
        </section>

        {/* Right USP Sidebar */}
        <aside className="hidden md:block md:col-span-2" aria-label="Lợi ích">
          <div className="space-y-3">
            <div className="rounded-lg border border-platinum-200 bg-white p-4">
              <div className="font-semibold">GIAO HÀNG MIỄN PHÍ</div>
              <div className="text-sm text-ink-600">Miễn phí giao hàng toàn quốc</div>
            </div>
            <div className="rounded-lg border border-platinum-200 bg-white p-4">
              <div className="font-semibold">ĐẢM BẢO HOÀN LẠI TIỀN</div>
              <div className="text-sm text-ink-600">Cam kết hoàn lại nếu sản phẩm kém chất lượng</div>
            </div>
            <div className="rounded-lg border border-platinum-200 bg-white p-4">
              <div className="font-semibold">ĐẶT HÀNG NHANH CHÓNG</div>
              <div className="text-sm text-ink-600">Xử lý đơn nhanh, xác nhận trong 5 phút</div>
            </div>
          </div>
        </aside>
      </article>

      {/* Related */}
      <section className="mt-10" aria-label="Sản phẩm liên quan">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-ink-900">Sản phẩm liên quan</h3>
          <Link to="/san-pham" className="text-sm underline underline-offset-4 hover:text-ink-900">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              to={`/san-pham/${p.slug}`}
              className="surface block overflow-hidden"
              aria-label={`Xem chi tiết ${p.name}`}
            >
              <div className="aspect-square">
                <img src={p.image} alt={p.name} className="size-full object-cover" loading="lazy" />
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
