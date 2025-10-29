import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Cart Drawer — Glassmorphism (UI only)
 * - Không gọi API
 * - Điều khiển qua props: open, onClose
 * - Có thể truyền items/subtotalText để thay placeholder
 */

type Item = { id: string; name: string; image?: string; priceText?: string; qty?: number };

const GOLD_1 = "#D4AF37";   // vàng kim
const GOLD_2 = "#E5CC7A";   // vàng nhạt
const PLATINUM = "#E5E4E2"; // bạch kim

export default function CartDrawer({
    open,
    onClose,
    items = PLACEHOLDER,
    subtotalText = "648.000₫",
}: {
    open: boolean;
    onClose: () => void;
    items?: Item[];
    subtotalText?: string;
}) {
    const panelRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    useEffect(() => { if (open) panelRef.current?.focus(); }, [open]);

    return (
        <>
            {/* Overlay mờ nhẹ + blur nền */}
            <div
                className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity motion-reduce:transition-none
                    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                aria-hidden={!open}
                onClick={onClose}
            />

            {/* Drawer: glass (blur + translucent), viền bạch kim */}
            <aside
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-title"
                ref={panelRef}
                tabIndex={-1}
                className={`fixed top-0 right-0 h-screen w-full md:w-1/2
                    backdrop-blur-2xl bg-white/12 md:rounded-l-3xl
                    border-l border-white/20 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]
                    transition-transform duration-300 ease-out motion-reduce:transition-none z-50
                    ${open ? "translate-x-0" : "translate-x-full"}`}
                style={{ willChange: "transform" }}
            >
                {/* Accent bar vàng bạch kim mảnh */}
                <div
                    className="h-1 w-full"
                    style={{ backgroundImage: `linear-gradient(90deg, ${GOLD_1}, ${GOLD_2}, ${PLATINUM})` }}
                />

                {/* Header dạng glass + nút đóng thanh lịch */}
                <div className="sticky top-0 z-10 bg-white/10 backdrop-blur-xl border-b border-white/20">
                    <div className="px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span
                                className="h-8 w-8 rounded-xl ring-1 ring-white/30"
                                style={{ backgroundImage: `linear-gradient(135deg, ${GOLD_1}, ${PLATINUM})` }}
                                aria-hidden="true"
                            />
                            <h2 id="cart-title" className="text-lg font-semibold text-zinc-900">Giỏ hàng</h2>
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Đóng giỏ hàng"
                            className="rounded-xl px-3 py-2 text-sm bg-white/30 hover:bg-white/40
                         border border-white/40 text-zinc-900 shadow"
                        >
                            Đóng
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col h-[calc(100vh-57px)]">
                    <div className="flex-1 overflow-y-auto p-5">
                        {items.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <ul className="space-y-4">
                                {items.map((it) => <CartRow key={it.id} item={it} />)}
                            </ul>
                        )}
                    </div>

                    {/* Footer glass + CTA vàng kim */}
                    <div className="border-t border-white/20 bg-white/10 backdrop-blur-xl p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-700">Tạm tính</span>
                            <span className="text-xl font-semibold text-zinc-900">{subtotalText}</span>
                        </div>

                        <div className="mt-4 grid grid-cols-[1fr_auto] gap-3">
                            <button
                                className="inline-flex justify-center items-center h-11 rounded-xl text-white font-medium
               shadow-lg shadow-amber-200/40"
                                style={{ backgroundImage: `linear-gradient(135deg, ${GOLD_1}, ${GOLD_2})` }}
                                onClick={() => navigate("/checkout")}   // ⟵ chuyển tới trang chốt đơn
                                aria-label="Tiến hành thanh toán"
                            >
                                Thanh toán
                            </button>
                            <button
                                className="h-11 rounded-xl px-4 border border-white/30 bg-white/20 hover:bg-white/30 text-zinc-900"
                                onClick={(e) => e.preventDefault()}
                            >
                                Xoá hết
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

function CartRow({ item }: { item: Item }) {
    return (
        <li
            className="p-3 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30
                 hover:bg-white/25 transition-colors"
        >
            <div className="flex gap-3">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-20 h-20 rounded-xl object-cover ring-1 ring-white/40"
                    />
                ) : (
                    <div
                        className="w-20 h-20 rounded-xl ring-1 ring-white/40"
                        style={{ backgroundImage: `linear-gradient(135deg, ${PLATINUM}, #ffffff)` }}
                        aria-hidden="true"
                    />
                )}

                <div className="flex-1 min-w-0">
                    <h3 className="font-medium leading-5 text-zinc-900 line-clamp-2">{item.name}</h3>
                    <div className="text-sm text-zinc-700 mt-0.5">{item.priceText ?? "—"}</div>

                    <div className="mt-3 flex items-center gap-2">
                        <StepBtn ariaLabel={`Giảm số lượng ${item.name}`}>−</StepBtn>
                        <input
                            className="w-12 h-9 text-center rounded-lg bg-white/40 border border-white/40 text-zinc-900"
                            defaultValue={item.qty ?? 1}
                            readOnly
                            aria-label={`Số lượng ${item.name}`}
                        />
                        <StepBtn ariaLabel={`Tăng số lượng ${item.name}`}>+</StepBtn>

                        <button
                            className="ml-auto text-sm text-zinc-600 hover:text-red-600 hover:underline"
                            onClick={(e) => e.preventDefault()}
                        >
                            Xoá
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}

function StepBtn({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
    return (
        <button
            aria-label={ariaLabel}
            onClick={(e) => e.preventDefault()}
            className="h-9 w-9 rounded-lg border border-white/40 bg-white/30
                 hover:bg-white/40 active:scale-[0.98] transition text-zinc-900"
        >
            {children}
        </button>
    );
}

function EmptyState() {
    return (
        <div className="text-center text-zinc-700 mt-10">
            <div
                className="mx-auto w-16 h-16 rounded-2xl ring-1 ring-white/40 flex items-center justify-center
                   bg-white/30 backdrop-blur"
            >
                🛒
            </div>
            <p className="mt-3 font-medium">Giỏ hàng trống</p>
            <p className="text-sm text-zinc-600">Hãy thêm vài sản phẩm yêu thích của bạn.</p>
        </div>
    );
}

const PLACEHOLDER: Item[] = [
    { id: "1", name: "Sản phẩm vàng bạch kim A", priceText: "259.000₫", qty: 1 },
    { id: "2", name: "Sản phẩm vàng bạch kim B", priceText: "389.000₫", qty: 2 },
];
