import { useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
const columns = ['Kỳ','Đơn','Doanh thu','Tỷ lệ hoàn'];
const seed = [
['Hôm nay','128','₫ 12.540.000','1.2%'],
['7 ngày','824','₫ 79.230.000','0.9%'],
];
export default function Revenue(){
const [open,setOpen] = useState(false);
return (<>
<Table columns={columns} rows={seed} onCreate={()=>setOpen(true)} />
<Modal open={open} title="Tạo báo cáo" onClose={()=>setOpen(false)} onSave={()=>{alert('Lưu (demo)'); setOpen(false)}}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex flex-col gap-1 text-sm">Kỳ báo cáo<select className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"><option>Ngày</option><option>Tuần</option><option>Tháng</option></select></label>
</div>
</Modal>
</>);
}