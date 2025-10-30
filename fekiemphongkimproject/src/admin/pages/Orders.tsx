import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['Mã','Khách','Tổng','Trạng thái','Ngày'];
const seed = [
['DH-1024','Phạm Duy','₫ 1.250.000','Đã giao','2025-10-28'],
['DH-1025','Hoàng Mai','₫ 820.000','Đang xử lý','2025-10-29'],
];
export default function Orders(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Tạo đơn hàng" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Khách hàng<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Tổng tiền<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Trạng thái<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Đang xử lý</option><option>Đã giao</option></select></label>
<label className="flex flex-col gap-1 text-sm">Ngày<input type="date" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>);
}