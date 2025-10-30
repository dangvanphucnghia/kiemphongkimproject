import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['Mã','Tên','Hạng','Điểm','Ngày hết hạn'];
const seed = [['M-1001','Lê Cường','Bạch Kim','3.250','2026-03-30']];
export default function Members(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Thêm hội viên" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tên<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Hạng<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Vàng</option><option>Bạch Kim</option></select></label>
<label className="flex flex-col gap-1 text-sm">Điểm<input type="number" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Ngày hết hạn<input type="date" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>);
}