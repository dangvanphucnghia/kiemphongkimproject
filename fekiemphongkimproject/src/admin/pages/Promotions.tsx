import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['Mã','Tên chương trình','Loại','Giá trị','Hiệu lực'];
const seed = [['KM-09','Tuần lễ vàng','%','10%','2025-10-01 → 2025-10-31']];
export default function Promotions(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Tạo khuyến mãi" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tên CT<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Loại<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>%</option><option>Giảm tiền</option></select></label>
<label className="flex flex-col gap-1 text-sm">Giá trị<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Hiệu lực từ<input type="date" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Đến<input type="date" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>);
}