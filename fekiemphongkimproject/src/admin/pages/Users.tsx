import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['ID','Tên','Email','Vai trò','Trạng thái'];
const seed = [
['U-01','Nguyễn An','an@example.com','Admin','Hoạt động'],
['U-02','Trần Bình','binh@example.com','Nhân viên','Khóa'],
];
export default function Users(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Thêm người dùng" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Tên<input className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Email<input type="email" className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"/></label>
<label className="flex flex-col gap-1 text-sm">Vai trò<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Admin</option><option>Nhân viên</option></select></label>
</div>
</Modal>
</>);
}