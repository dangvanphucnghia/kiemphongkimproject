import React from "react";

// ======= Mock dữ liệu demo (bạn có thể nối API thật sau) =======
const user = {
  name: "Hội viên mới",
  email: "member@example.com",
  tier: "Gold",            // Silver | Gold | Platinum
  points: 1234,            // điểm hiện tại
  nextTier: "Platinum",    // hạng tiếp theo
  nextTierAt: 2000,        // mốc điểm để lên hạng
};

const recentOrders = [
  { id: "KP-2025001", date: "2025-10-21", total: 259000, status: "Đang giao" },
  { id: "KP-2025000", date: "2025-09-30", total: 129000, status: "Hoàn tất" },
];

const benefits = [
  { title: "Giảm 10% đơn đầu tháng", desc: "Áp dụng cho đơn từ 199k." },
  { title: "Freeship Gold", desc: "Miễn phí vận chuyển 2 lần/tháng." },
  { title: "Tặng 300 điểm sinh nhật", desc: "Tự cộng vào ví điểm." },
];

// ======= Helpers =======
function formatCurrency(v: number) {
  return v.toLocaleString("vi-VN") + "₫";
}
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "H") + (parts[parts.length - 1]?.[0] ?? "V");
}
function tierColor(tier: string) {
  switch (tier) {
    case "Platinum": return "bg-gradient-to-r from-slate-800 to-slate-600 text-white";
    case "Gold": return "bg-gradient-to-r from-amber-500 to-amber-400 text-white";
    default: return "bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800";
  }
}

export default function Member() {
  const progress = Math.min((user.points / user.nextTierAt) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur flex items-center justify-center text-lg font-bold shadow">
                {initials(user.name)}
              </div>
              <div className="text-white">
                <h1 className="text-2xl font-semibold">Xin chào, {user.name}</h1>
                <p className="text-white/80 text-sm">{user.email}</p>
              </div>
            </div>

            <div className={`px-3 py-1.5 rounded-xl text-sm shadow ${tierColor(user.tier)}`}>
              Hạng: <span className="font-semibold">{user.tier}</span>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <StatCard label="Điểm hiện tại" value={user.points.toLocaleString()} hint={`Cần ${user.nextTierAt - user.points} điểm để lên ${user.nextTier}`} />
            <StatCard label="Đơn gần đây" value={recentOrders.length} hint="Trong 60 ngày" />
            <StatCard label="Ưu đãi khả dụng" value={benefits.length} hint="Cập nhật mỗi tuần" />
          </div>

          {/* Progress */}
          <div className="mt-6 p-4 rounded-2xl bg-white shadow-sm border">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Tiến độ lên hạng <span className="text-gray-500">({user.tier} → {user.nextTier})</span></div>
              <div className="text-sm text-gray-500">{Math.floor(progress)}%</div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-pink-500"
                style={{ width: `${progress}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.floor(progress)}
                role="progressbar"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {user.points.toLocaleString()} / {user.nextTierAt.toLocaleString()} điểm
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Btn onClick={() => alert("Đi đổi voucher (demo)")}>Đổi voucher</Btn>
            <Btn variant="outline" onClick={() => alert("Cập nhật hồ sơ (demo)")}>Cập nhật hồ sơ</Btn>
            <Btn variant="ghost" onClick={() => alert("Xem lịch sử điểm (demo)")}>Lịch sử điểm</Btn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Benefits */}
          <Card title="Ưu đãi dành cho bạn" subtitle="Chỉ áp dụng cho hạng hiện tại">
            <ul className="space-y-3">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <IconCheck />
                  <div>
                    <div className="font-medium">{b.title}</div>
                    <div className="text-sm text-gray-500">{b.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Btn onClick={() => alert("Xem tất cả ưu đãi (demo)")}>Xem tất cả ưu đãi</Btn>
            </div>
          </Card>

          {/* Orders */}
          <Card className="lg:col-span-2" title="Đơn hàng gần đây" subtitle="Theo dõi trạng thái và chi tiết">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 font-medium">Mã đơn</th>
                    <th className="font-medium">Ngày</th>
                    <th className="font-medium">Trạng thái</th>
                    <th className="font-medium text-right">Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{o.id}</td>
                      <td className="text-gray-600">{o.date}</td>
                      <td>
                        <span className={badgeClass(o.status)}>{o.status}</span>
                      </td>
                      <td className="text-right font-medium">{formatCurrency(o.total)}</td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-6 text-center text-gray-500">Chưa có đơn hàng</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Btn variant="outline" onClick={() => alert("Xem lịch sử đơn hàng (demo)")}>Xem lịch sử đơn</Btn>
            </div>
          </Card>

          {/* Profile */}
          <Card title="Hồ sơ của bạn" subtitle="Thông tin cơ bản">
            <div className="space-y-2 text-sm">
              <Row label="Họ tên" value={user.name} />
              <Row label="Email" value={user.email} />
              <Row label="Hạng" value={user.tier} />
              <Row label="Điểm" value={user.points.toLocaleString()} />
            </div>
            <div className="mt-4 flex gap-2">
              <Btn onClick={() => alert("Chỉnh sửa hồ sơ (demo)")}>Chỉnh sửa</Btn>
              <Btn variant="ghost" onClick={() => alert("Bảo mật tài khoản (demo)")}>Bảo mật</Btn>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

// ======= UI primitives =======
function StatCard({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-2xl bg-white border shadow-sm p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
      {hint && <div className="text-xs text-gray-400 mt-1">{hint}</div>}
    </div>
  );
}

function Card({
  title,
  subtitle,
  children,
  className = "",
}: React.PropsWithChildren<{ title: string; subtitle?: string; className?: string }>) {
  return (
    <section className={`rounded-2xl bg-white border shadow-sm p-4 ${className}`}>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b last:border-0 py-2">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = "solid",
}: React.PropsWithChildren<{ onClick?: () => void; variant?: "solid" | "outline" | "ghost" }>) {
  const base = "inline-flex items-center gap-2 rounded-xl text-sm px-3 py-2 transition";
  if (variant === "outline") {
    return (
      <button onClick={onClick} className={`${base} border hover:bg-gray-50`}>
        {children}
      </button>
    );
  }
  if (variant === "ghost") {
    return (
      <button onClick={onClick} className={`${base} hover:bg-gray-100`}>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${base} text-white bg-gray-900 hover:bg-black`}>
      {children}
    </button>
  );
}

function badgeClass(status: string) {
  switch (status) {
    case "Hoàn tất":
      return "inline-flex items-center px-2 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-700";
    case "Đang giao":
      return "inline-flex items-center px-2 py-1 text-xs rounded-lg bg-amber-100 text-amber-700";
    default:
      return "inline-flex items-center px-2 py-1 text-xs rounded-lg bg-gray-100 text-gray-700";
  }
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0 mt-0.5" aria-hidden="true">
      <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
    </svg>
  );
}
