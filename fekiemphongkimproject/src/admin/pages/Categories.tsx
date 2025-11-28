// src/admin/pages/Categories.tsx
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { apiRequest } from '../../api/http';

type Category = {
  id: number;
  name: string;
  description?: string;
};

const columns = ['ID', 'Tên loại', 'Mô tả'];

const emptyForm: Omit<Category, 'id'> = {
  name: '',
  description: '',
};

export default function Categories() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<typeof emptyForm>(emptyForm);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest<Category[]>('/api/categories');
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'Không tải được loại sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreate = () => {
    setEditingIndex(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (rowIndex: number) => {
    const c = items[rowIndex];
    if (!c) return;
    setEditingIndex(rowIndex);
    setForm({
      name: c.name,
      description: c.description || '',
    });
    setOpen(true);
  };

  const handleDelete = async (rowIndex: number) => {
    const c = items[rowIndex];
    if (!c) return;
    if (!window.confirm(`Xóa loại "${c.name}" ?`)) return;
    try {
      await apiRequest<void>(`/api/categories/${c.id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((x) => x.id !== c.id));
    } catch (e: any) {
      alert(e.message || 'Xóa loại sản phẩm thất bại');
    }
  };

  const handleSave = async () => {
    try {
      if (!form.name) {
        alert('Tên loại là bắt buộc');
        return;
      }

      if (editingIndex == null) {
        const created = await apiRequest<Category>('/api/categories', {
          method: 'POST',
          body: JSON.stringify(form),
        });
        setItems((prev) => [...prev, created]);
      } else {
        const id = items[editingIndex].id;
        await apiRequest<void>(`/api/categories/${id}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        });
        await loadCategories();
      }

      setOpen(false);
    } catch (e: any) {
      alert(e.message || 'Lưu loại sản phẩm thất bại');
    }
  };

  const rows = items.map((c) => [c.id, c.name, c.description || '']);

  if (loading) return <div>Đang tải loại sản phẩm...</div>;
  if (error) return <div className="text-red-400">Lỗi: {error}</div>;

  return (
    <>
      <Table
        columns={columns}
        rows={rows}
        onCreate={openCreate}
        onEditRow={openEdit}
        onDeleteRow={handleDelete}
      />
      <Modal
        open={open}
        title={editingIndex == null ? 'Thêm loại sản phẩm' : 'Sửa loại sản phẩm'}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm">
            Tên loại
            <input
              className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label className="col-span-full flex flex-col gap-1 text-sm">
            Mô tả
            <textarea
              className="min-h-[80px] rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
          </label>
        </div>
      </Modal>
    </>
  );
}
