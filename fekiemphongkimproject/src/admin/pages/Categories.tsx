import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['Mã','Tên loại','Mô tả','Số SP'];
const seed = [
['L-01','Kiếm','Vũ khí cận chiến','24'],
['L-02','Giáp','Trang bị phòng thủ','13'],
];
export default function Categories(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Thêm loại sản phẩm" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tên loại<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Mô tả<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
</div>
</Modal>
</>);
}