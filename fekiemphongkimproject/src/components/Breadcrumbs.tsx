import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex items-center gap-2 text-ink-600">
        {items.map((c, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {c.to ? (
              <Link to={c.to} className="hover:text-ink-900 underline-offset-4 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-ink-900">{c.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="inline-block h-4 w-[1px] bg-gradient-to-b from-gold-400 to-gold-600 rotate-12" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
