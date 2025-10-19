import { useState } from "react";
import Table from "../components/Table.jsx";
import { useAdminStore } from "../store/adminStore.js";
import { Field, Modal } from "../components/ui.jsx";

export default function Products() {
  const { products, addProduct, updateProduct, removeProduct } = useAdminStore();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const columns = [
    { key: "name", header: "Tên" },
    { key: "price", header: "Giá", render: (v) => formatVND(v) },
    { key: "stock", header: "Tồn" },
    {
      key: "actions",
      header: "",
      render: (_, row) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs rounded bg-gray-900 text-white" onClick={(e) => (e.stopPropagation(), setEditing(row), setOpen(true))}>Sửa</button>
          <button className="px-2 py-1 text-xs rounded bg-red-600 text-white" onClick={(e) => (e.stopPropagation(), removeProduct(row.id))}>Xoá</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý sản phẩm</h2>
        <button className="px-3 py-2 rounded-lg bg-gray-900 text-white" onClick={() => (setEditing(null), setOpen(true))}>Thêm sản phẩm</button>
      </div>

      <Table columns={columns} data={products} />

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <ProductForm
            initial={editing || { name: "", price: 0, stock: 0 }}
            onSubmit={(values) => {
              values.price = Number(values.price);
              values.stock = Number(values.stock);
              if (editing) updateProduct(editing.id, values);
              else addProduct(values);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function ProductForm({ initial, onSubmit }) {
  const [form, setForm] = useState(initial);
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <h3 className="text-lg font-semibold">{initial?.id ? "Sửa" : "Thêm"} sản phẩm</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Tên">
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Field>
        <Field label="Giá (VND)">
          <input className="input" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        </Field>
        <Field label="Tồn kho">
          <input className="input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="px-3 py-2 rounded-lg bg-gray-900 text-white">Lưu</button>
      </div>
    </form>
  );
}

function formatVND(n) {
  return Number(n).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}
