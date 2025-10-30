import Card from '../components/Card';

export default function Dashboard(){
return (
<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
<Card title="Doanh thu hôm nay">
<div className="text-3xl font-bold text-gold-400">₫ 12.540.000</div>
<div className="text-slate-400">+12% so với hôm qua</div>
</Card>
<Card title="Đơn hàng">
<div className="text-3xl font-bold text-gold-400">128</div>
<div className="text-slate-400">Đang xử lý: 14</div>
</Card>
<Card title="Khách hàng mới">
<div className="text-3xl font-bold text-gold-400">37</div>
<div className="text-slate-400">Trong 7 ngày qua</div>
</Card>
<Card title="Hoạt động gần đây">
<ul className="list-disc pl-5 text-sm text-slate-300">
<li>#DH-1024 • Đã giao • ₫1.250.000</li>
<li>#DH-1025 • Đang xử lý • ₫820.000</li>
<li>#KM-09 • Tạo mã giảm 10%</li>
</ul>
</Card>
</div>
);
}