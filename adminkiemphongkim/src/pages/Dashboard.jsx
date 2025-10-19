import { useAdminStore } from "../store/adminStore.js";

export default function Dashboard() {
  const kpis = useAdminStore((s) => s.kpis());
  const { revenue, orders, paidOrders } = kpis;

  const points = [5, 9, 7, 12, 10, 14, 18, 16];
  const max = Math.max(...points);
  const path = points
    .map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI title="Tổng doanh thu" value={formatVND(revenue)} />
        <KPI title="Số đơn" value={orders} />
        <KPI title="Đơn đã thanh toán" value={paidOrders} />
        <div className="rounded-xl bg-white shadow p-4">
          <div className="text-sm text-gray-600 mb-2">Xu hướng</div>
          <svg viewBox="0 0 100 100" className="w-full h-16">
            <polyline fill="none" stroke="currentColor" strokeWidth="2" points={path} className="text-gray-900" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="rounded-xl bg-white shadow p-4">
      <div className="text-sm text-gray-600">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function formatVND(n) {
  return n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
