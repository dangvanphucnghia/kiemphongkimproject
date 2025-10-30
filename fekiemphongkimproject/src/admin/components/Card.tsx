import type { ReactNode } from 'react';

export default function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-platinum-700 bg-gradient-to-b from-[#1b1c22] to-[#16171c] p-4 shadow-[0_10px_30px_rgba(0,0,0,.25)]">
      {title && <h3 className="mb-2 text-base font-semibold">{title}</h3>}
      {children}
    </div>
  );
}
