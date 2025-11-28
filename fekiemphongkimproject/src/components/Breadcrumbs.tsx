import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex items-center gap-2 text-yellow-200">
        {items.map((c, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-2">
              {c.to && !isLast ? (
                // Các breadcrumb có link (không phải cuối) → vàng nhạt
                <Link
                  to={c.to}
                  className="text-yellow-200 hover:text-white underline-offset-4 hover:underline"
                >
                  {c.label}
                </Link>
              ) : (
                // Item cuối (trang hiện tại) → TRẮNG, đậm
                <span className="text-white font-semibold">
                  {c.label}
                </span>
              )}

              {/* vẽ dấu phân cách dọc giữa các crumb */}
              {idx < items.length - 1 && (
                <span className="inline-block h-4 w-[1px] bg-gradient-to-b from-gold-400 to-gold-600 rotate-12" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
