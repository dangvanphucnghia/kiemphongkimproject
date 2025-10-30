import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['ID','Tiêu đề','Vị trí','Trạng thái','Ưu tiên'];
const seed = [['B-01','Tuần lễ vàng','Trang chủ','Hiển thị','1']];
export default function Banners(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Thêm banner" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tiêu đề<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Vị trí<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Trang chủ</option><option>Danh mục</option></select></label>
<label className="flex flex-col gap-1 text-sm">Ưu tiên<input type="number" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Ảnh<input type="file" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>);
}