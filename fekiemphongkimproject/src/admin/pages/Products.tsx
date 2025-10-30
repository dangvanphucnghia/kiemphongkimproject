import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';

const columns = ['Mã','Tên','Loại','Giá','Tồn kho','Trạng thái'];
const seed = [
['SP-001','Kiếm Vương Kim','Kiếm','2.500.000','12','Đang bán'],
['SP-002','Áo Giáp Bạch Kim','Giáp','3.200.000','5','Hết hàng'],
];

export default function Products(){
const [open,setOpen] = useState(false);
return (
<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Thêm sản phẩm" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tên sản phẩm<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Loại<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Kiếm</option><option>Giáp</option></select></label>
<label className="flex flex-col gap-1 text-sm">Giá<input type="number" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Tồn kho<input type="number" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="col-span-full flex flex-col gap-1 text-sm">Mô tả<textarea className="min-h-[100px] rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>
);
}