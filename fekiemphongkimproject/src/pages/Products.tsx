import Breadcrumbs from "../components/Breadcrumbs";
import { PRODUCTS } from "../data/products";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Sản phẩm" }]} />
      <h1 className="mb-4 text-2xl font-semibold text-ink-900">Tất cả sản phẩm</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PRODUCTS.map((p) => (
          <Link key={p.id} to={`/san-pham/${p.slug}`} className="surface group overflow-hidden">
            <div className="relative aspect-square">
              <img
                src={p.image}
                alt={p.name}
                className="size-full object-cover transition-transform group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-[rgba(212,175,55,.15)]" />
              {p.badges?.length ? (
                <div className="absolute left-2 top-2 flex gap-2">
                  {p.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-md border border-gold-600 bg-gradient-to-b from-gold-500/80 to-gold-600/80 px-2 py-1 text-xs font-medium text-black"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="p-3">
              <div className="line-clamp-1 text-sm text-ink-900">{p.name}</div>
              <div className="mt-1 text-sm font-medium text-ink-900">
                {new Intl.NumberFormat("vi-VN").format(p.price)}₫{" "}
                {p.oldPrice && (
                  <span className="text-ink-500 line-through ml-1">
                    {new Intl.NumberFormat("vi-VN").format(p.oldPrice)}₫
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
