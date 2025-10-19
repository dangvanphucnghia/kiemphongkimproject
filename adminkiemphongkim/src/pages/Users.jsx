import { useState } from "react";
import Table from "../components/Table.jsx";
import { useAdminStore } from "../store/adminStore.js";
import { Field, Modal } from "../components/ui.jsx";

export default function Users() {
  const { users, addUser, updateUser, removeUser } = useAdminStore();
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  const columns = [
    { key: "name", header: "Tên" },
    { key: "email", header: "Email" },
    { key: "role", header: "Vai trò" },
    {
      key: "actions",
      header: "",
      render: (_, row) => (
        <div className="flex gap-2">
          <button className="px-2 py-1 text-xs rounded bg-gray-900 text-white" onClick={(e) => (e.stopPropagation(), setEditing(row), setOpen(true))}>Sửa</button>
          <button className="px-2 py-1 text-xs rounded bg-red-600 text-white" onClick={(e) => (e.stopPropagation(), removeUser(row.id))}>Xoá</button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
        <button className="px-3 py-2 rounded-lg bg-gray-900 text-white" onClick={() => (setEditing(null), setOpen(true))}>Thêm người dùng</button>
      </div>

      <Table columns={columns} data={users} />

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <UserForm
            initial={editing || { name: "", email: "", role: "user" }}
            onSubmit={(values) => {
              if (editing) updateUser(editing.id, values);
              else addUser(values);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

function UserForm({ initial, onSubmit }) {
  const [form, setForm] = useState(initial);
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
      <h3 className="text-lg font-semibold">{initial?.id ? "Sửa" : "Thêm"} người dùng</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tên">
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Field>
        <Field label="Email">
          <input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </Field>
        <Field label="Vai trò">
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="submit" className="px-3 py-2 rounded-lg bg-gray-900 text-white">Lưu</button>
      </div>
    </form>
  );
}
