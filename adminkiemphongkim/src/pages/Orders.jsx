import Table from "../components/Table.jsx";
import { useAdminStore } from "../store/adminStore.js";

export default function Orders() {
  const { orders, updateOrder, removeOrder } = useAdminStore();
  const columns = [
    { key: "id", header: "Mã" },
    { key: "items", header: "Mặt hàng", render: (items) => items.map((i) => `${i.name} x${i.qty}`).join(", ") },
    { key: "total", header: "Tổng", render: (_, row) => formatVND(row.items.reduce((s, i) => s + i.qty * i.price, 0)) },
    { key: "status", header: "Trạng thái" },
    {
      key: "actions",
      header: "",
      render: (_, row) => (
        <div className="flex gap-2">
          <select className="input" value={row.status} onChange={(e) => updateOrder(row.id, { status: e.target.value })}>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="shipped">shipped</option>
            <option value="cancelled">cancelled</option>
          </select>
          <button className="px-2 py-1 text-xs rounded bg-red-600 text-white" onClick={() => removeOrder(row.id)}>Xoá</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quản lý đơn hàng</h2>
      <Table columns={columns} data={orders} />
    </div>
  );
}

function formatVND(n) {
  return Number(n).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
