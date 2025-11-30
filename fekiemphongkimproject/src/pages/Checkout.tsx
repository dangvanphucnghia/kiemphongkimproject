import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Item = { id: string; name: string; image?: string; price: number; qty: number };

const GOLD_1 = "#D4AF37";
const GOLD_2 = "#E5CC7A";
const PLATINUM = "#E5E4E2";

// nền vân gỗ
const WOOD_BG =
  "bg-[url('/images/wood.jpg')] bg-repeat bg-[length:512px_auto] bg-top";

const initItems: Item[] = [
  { id: "1", name: "Sản phẩm vàng bạch kim A", price: 259000, qty: 1 },
  { id: "2", name: "Sản phẩm vàng bạch kim B", price: 389000, qty: 2 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>(initItems);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const setQty = (id: string, change: number | "set", value?: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              qty: Math.max(
                1,
                change === "set" ? value ?? it.qty : it.qty + change
              ),
            }
          : it
      )
    );
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const fmt = (v: number) => v.toLocaleString("vi-VN") + "₫";

  return (
    <div className={`min-h-screen relative ${WOOD_BG}`}>
      {/* (tuỳ chọn) một lớp trắng rất mỏng để chữ dễ đọc hơn */}
      <div className="absolute inset-0 -z-10 bg-white/10" />

      <header className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 text-white">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl px-3 py-2 border border-white/40 bg-black/20 hover:bg-black/30"
            aria-label="Quay lại"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Chốt đơn</h1>
          <div className="ml-auto text-sm">
            <Link
              to="/"
              className="text-zinc-100/80 hover:text-white hover:underline"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách SP */}
        <section
          className="lg:col-span-2 rounded-3xl border border-white/30 bg-white/70 backdrop-blur-xl p-4"
          style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,.4)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold">Sản phẩm đã chọn</h2>
            <span className="text-sm text-zinc-500">
              {items.length} sản phẩm
            </span>
          </div>

          {items.length === 0 ? (
            <div className="text-center text-zinc-600 py-10">
              <div className="mx-auto w-16 h-16 rounded-2xl ring-1 ring-zinc-200 flex items-center justify-center bg-white/60">
                🛒
              </div>
              <p className="mt-3">Chưa có sản phẩm.</p>
              <Link
                to="/"
                className="text-sm text-blue-600 hover:underline"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((it) => (
                <li key={it.id} className="py-4 flex gap-3">
                  {/* Ảnh placeholder */}
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.name}
                      className="w-20 h-20 rounded-xl object-cover ring-1 ring-zinc-200"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-xl ring-1 ring-zinc-200"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${PLATINUM}, #fff)`,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <div className="font-medium leading-5 line-clamp-2">
                        {it.name}
                      </div>
                      <button
                        className="ml-auto text-sm text-zinc-500 hover:text-red-600 hover:underline"
                        onClick={() => remove(it.id)}
                      >
                        Xoá
                      </button>
                    </div>
                    <div className="text-sm text-zinc-600 mt-0.5">
                      {fmt(it.price)}
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <Step
                        onClick={() => setQty(it.id, -1)}
                        aria="Giảm số lượng"
                      >
                        −
                      </Step>
                      <input
                        className="w-12 h-9 text-center border border-zinc-200 rounded-lg"
                        value={it.qty}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || "1", 10);
                          if (!Number.isNaN(v)) setQty(it.id, "set", v);
                        }}
                        inputMode="numeric"
                        aria-label={`Số lượng ${it.name}`}
                      />
                      <Step
                        onClick={() => setQty(it.id, +1)}
                        aria="Tăng số lượng"
                      >
                        +
                      </Step>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Tóm tắt + Liên hệ */}
        <aside
          className="rounded-3xl border border-white/30 bg-white/75 backdrop-blur-xl p-4 space-y-4"
          style={{ boxShadow: "0 10px 40px -15px rgba(0,0,0,.4)" }}
        >
          <h2 className="text-base font-semibold">Tóm tắt đơn</h2>
          <div className="space-y-2 text-sm">
            <Row label="Tạm tính" value={fmt(subtotal)} />
            <Row label="Phí vận chuyển" value="—" />
            <Row label="Giảm giá" value="—" />
            <div className="h-px bg-zinc-200 my-2" />
            <Row big label="Tổng thanh toán" value={fmt(subtotal)} />
          </div>

          {/* Nút liên hệ */}
          <div className="grid gap-2">
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl px-4 inline-flex items-center justify-center gap-2 text-white font-medium"
              style={{
                backgroundImage: "linear-gradient(135deg, #1877F2, #3b82f6)",
              }}
            >
              Liên hệ Facebook
            </a>
            <a
              href="https://zalo.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl px-4 inline-flex items-center justify-center gap-2 text-white font-medium"
              style={{
                backgroundImage: "linear-gradient(135deg, #0068FF, #60a5fa)",
              }}
            >
              Liên hệ Zalo
            </a>
          </div>

          {/* CTA đặt hàng – nhân viên sẽ liên hệ */}
          <button
            className="w-full h-12 rounded-xl text-white font-semibold shadow-lg shadow-amber-200/40"
            style={{
              backgroundImage: `linear-gradient(135deg, ${GOLD_1}, ${GOLD_2})`,
            }}
            onClick={() =>
              alert(
                "Đã ghi nhận yêu cầu. Nhân viên sẽ liên hệ để xác nhận đơn!"
              )
            }
          >
            Đặt hàng – Nhân viên liên hệ
          </button>

          {/* Ghi chú đơn hàng */}
          <div className="pt-2">
            <label className="block text-sm text-zinc-600 mb-1">
              Ghi chú cho đơn hàng
            </label>
            <textarea
              className="w-full rounded-xl border border-zinc-200 p-3"
              rows={3}
              placeholder="Ví dụ: Gọi trước khi giao hàng, giao giờ hành chính…"
            />
          </div>
        </aside>
      </main>
    </div>
  );
}

function Step({
  children,
  onClick,
  aria,
}: {
  children: React.ReactNode;
  onClick: () => void;
  aria: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      className="h-9 w-9 rounded-lg border border-zinc-200 hover:bg-zinc-50 active:scale-[0.98] transition"
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  big,
}: {
  label: string;
  value: React.ReactNode;
  big?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-zinc-600 ${big ? "text-base" : ""}`}>
        {label}
      </span>
      <span className={`font-semibold ${big ? "text-lg" : ""}`}>{value}</span>
    </div>
  );
}
