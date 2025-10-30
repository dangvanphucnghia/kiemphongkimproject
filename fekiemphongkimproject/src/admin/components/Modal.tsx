import type { ReactNode } from 'react';

export default function Modal({
  open,
  title,
  children,
  onClose,
  onSave,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-[92vw] max-w-2xl overflow-hidden rounded-2xl border border-platinum-700 bg-gradient-to-b from-[#1c1d22] to-[#16171c]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-platinum-700 p-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button className="rounded-lg border border-slate-600 px-2 py-1" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end gap-2 border-t border-platinum-700 p-3">
          <button className="rounded-lg border border-slate-600 px-3 py-2" onClick={onClose}>
            Hủy
          </button>
          <button
            className="rounded-lg border border-amber-700 bg-gradient-to-b from-gold-500 to-gold-600 px-3 py-2 font-semibold text-black"
            onClick={onSave}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
