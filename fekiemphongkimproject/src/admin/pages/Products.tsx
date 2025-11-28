// src/admin/pages/Products.tsx
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { apiRequest } from "../../api/http";
import { authHeader } from "../../lib/api";

/**
 * Cấu hình BE trong .env hoặc .env.local:
 * VITE_API_URL=http://localhost:1212
 */
const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

/** Chuẩn hoá URL ảnh */
function resolveImageUrl(src?: string) {
  if (!src) return "";

  if (
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  const base = API_BASE.replace(/\/+$/, "");
  const path = src.startsWith("/") ? src : `/${src}`;

  return base ? `${base}${path}` : path;
}

type ProductFilterDto = {
  id?: number;
  filterType: string;
  filterValue: string;
};

type ProductDto = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  salePrice?: number | null;
  description: string;
  stock: number;
  status: string;

  categoryId: number;
  categoryName?: string | null;

  imageUrls?: string[] | null;
  filters?: ProductFilterDto[] | null;

  createdAt?: string;
  updatedAt?: string;
};

// State riêng cho form để xử lý string <-> number
type ProductForm = {
  id?: number;
  name: string;
  price: string;
  quantity: string;
  salePrice: string;
  description: string;
  stock: string;
  status: string;
  categoryId: string;
};

// 1 item ảnh đang chọn
type ImageItem = {
  id: string;
  file: File;
  preview: string; // object URL để hiển thị
};

const columns = [
  "ID",
  "Ảnh",
  "Tên sản phẩm",
  "Giá",
  "Giá KM",
  "Tồn kho",
  "Số lượng hiển thị",
  "Trạng thái",
  "Danh mục",
];

export default function Products() {
  const [items, setItems] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ProductForm | null>(null);

  // ảnh mới chọn từ máy (tối đa 5)
  const [images, setImages] = useState<ImageItem[]>([]);

  // ảnh hiện có trên BE (chỉ để preview khi sửa)
  const [existingUrls, setExistingUrls] = useState<string[]>([]);

  // ===== LOAD LIST =====
  async function loadProducts() {
    try {
      setLoading(true);
      const data = await apiRequest<ProductDto[]>("/api/products");
      setItems(data);
    } catch (e: any) {
      alert(e?.message ?? "Không tải được danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  // ===== MAP ProductDto -> ProductForm =====
  function toForm(p?: ProductDto): ProductForm {
    if (!p) {
      return {
        name: "",
        price: "",
        quantity: "0",
        salePrice: "",
        description: "",
        stock: "0",
        status: "ACTIVE",
        categoryId: "",
      };
    }
    return {
      id: p.id,
      name: p.name ?? "",
      price: p.price?.toString() ?? "",
      quantity: p.quantity?.toString() ?? "0",
      salePrice: p.salePrice != null ? p.salePrice.toString() : "",
      description: p.description ?? "",
      stock: p.stock?.toString() ?? "0",
      status: p.status ?? "ACTIVE",
      categoryId: p.categoryId?.toString() ?? "",
    };
  }

  // ===== IMAGE HELPERS =====
  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList);

    setImages((prev) => {
      const next: ImageItem[] = [
        ...prev,
        ...files.map((f) => ({
          id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
          file: f,
          preview: URL.createObjectURL(f),
        })),
      ];

      if (next.length > 5) {
        alert("Tối đa 5 ảnh. Hệ thống sẽ chỉ giữ 5 ảnh đầu tiên.");
      }

      return next.slice(0, 5);
    });
  }

  function moveImage(index: number, direction: -1 | 1) {
    setImages((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  // ===== HANDLE OPEN MODAL =====
  const handleCreate = () => {
    setForm(toForm(undefined));
    setImages([]);
    setExistingUrls([]);
    setOpen(true);
  };

  const handleEdit = (p: ProductDto) => {
    setForm(toForm(p));
    setImages([]);
    setExistingUrls(p.imageUrls ?? []);
    setOpen(true);
  };

  // ===== SAVE (CREATE / UPDATE) =====
  async function handleSave() {
    if (!form) return;

    // validate đơn giản phía FE
    if (!form.name.trim()) {
      alert("Tên sản phẩm không được để trống");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      alert("Giá sản phẩm phải lớn hơn 0");
      return;
    }
    if (!form.description.trim()) {
      alert("Mô tả sản phẩm không được để trống");
      return;
    }
    if (!form.categoryId || Number.isNaN(Number(form.categoryId))) {
      alert("Category ID không hợp lệ");
      return;
    }

    const isEdit = !!form.id;
    const url = isEdit ? `/api/products/${form.id}` : "/api/products";

    // BẮT BUỘC chọn ít nhất 1 ảnh khi TẠO MỚI
    if (!isEdit && images.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ảnh sản phẩm");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("price", form.price);
    fd.append("quantity", form.quantity);
    fd.append("description", form.description.trim());
    fd.append("stock", form.stock);
    fd.append("status", form.status || "ACTIVE");
    fd.append("categoryId", form.categoryId);

    if (form.salePrice.trim() !== "") {
      fd.append("salePrice", form.salePrice);
    }

    // Gửi ảnh theo THỨ TỰ trong mảng images
    if (images.length > 0) {
      images.forEach((img) => {
        fd.append("images", img.file);
      });
    }
    // Nếu EDIT mà không chọn ảnh mới → không có field images, BE giữ ảnh cũ.

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          ...authHeader(),
        },
        body: fd,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Lưu sản phẩm thất bại");
      }

      if (isEdit) {
        await loadProducts();
      } else {
        const created = (await res.json()) as ProductDto;
        setItems((prev) => [...prev, created]);
      }

      setOpen(false);
      setForm(null);
      setImages([]);
      setExistingUrls([]);
      alert("Lưu sản phẩm thành công");
    } catch (e: any) {
      alert(e?.message ?? "Lưu sản phẩm thất bại");
    }
  }

  // ===== DELETE =====
  async function handleDelete(id: number) {
    if (!confirm("Xoá sản phẩm này?")) return;

    try {
      await apiRequest<void>(`/api/products/${id}`, {
        method: "DELETE",
      });
      setItems((prev) => prev.filter((p) => p.id !== id));
      alert("Đã xoá sản phẩm");
    } catch (e: any) {
      alert(e?.message ?? "Xoá sản phẩm thất bại");
    }
  }

  // ===== TABLE ROWS =====
  const rows = items.map((p) => {
    const mainImg = resolveImageUrl(p.imageUrls?.[0]); // ảnh đầu tiên là ảnh chính

    return [
      p.id,
      // CỘT ẢNH CHÍNH
      <div key={`img-${p.id}`} className="flex justify-center">
        {mainImg ? (
          <img
            src={mainImg}
            alt={p.name}
            className="w-12 h-12 object-cover rounded-md border border-slate-700"
          />
        ) : (
          <span className="text-xs text-slate-500">Không có ảnh</span>
        )}
      </div>,
      // CÁC CỘT CŨ
      p.name,
      p.price?.toLocaleString("vi-VN") ?? "",
      p.salePrice?.toLocaleString("vi-VN") ?? "",
      p.stock ?? 0,
      p.quantity ?? 0,
      p.status ?? "",
      p.categoryName || p.categoryId || "",
      // cột action
      <div key={`actions-${p.id}`} className="flex gap-2 justify-end">
        <button
          className="rounded-lg border border-slate-600 bg-transparent px-2 py-1"
          onClick={() => handleEdit(p)}
        >
          Sửa
        </button>
        <button
          className="rounded-lg border border-amber-700 bg-gradient-to-b from-gold-500 to-gold-600 px-2 py-1 text-black"
          onClick={() => handleDelete(p.id)}
        >
          Xóa
        </button>
      </div>,
    ];
  });

  return (
    <>
      <Table columns={columns} rows={rows} onCreate={handleCreate} />
      {loading && (
        <div className="mt-2 text-sm text-slate-400">Đang tải danh sách…</div>
      )}

      <Modal
        open={open}
        title={form?.id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        onClose={() => {
          setOpen(false);
          setForm(null);
          setImages([]);
          setExistingUrls([]);
        }}
        onSave={handleSave}
      >
        {form && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex flex-col gap-1 text-sm">
              Tên sản phẩm
              <input
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Giá
              <input
                type="number"
                min={0}
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, price: e.target.value } : prev
                  )
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Giá khuyến mãi
              <input
                type="number"
                min={0}
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.salePrice}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, salePrice: e.target.value } : prev
                  )
                }
              />
              <span className="mt-1 text-xs text-slate-400">
                Để trống nếu không có khuyến mãi. Nếu nhập phải &gt; 0.
              </span>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Tồn kho
              <input
                type="number"
                min={0}
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.stock}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, stock: e.target.value } : prev
                  )
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Số lượng hiển thị (quantity)
              <input
                type="number"
                min={0}
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.quantity}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, quantity: e.target.value } : prev
                  )
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Trạng thái
              <select
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.status}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, status: e.target.value } : prev
                  )
                }
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm">
              Category ID
              <input
                type="number"
                min={1}
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.categoryId}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, categoryId: e.target.value } : prev
                  )
                }
              />
            </label>

            <label className="col-span-full flex flex-col gap-1 text-sm">
              Mô tả
              <textarea
                className="min-h-[100px] rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) =>
                    prev ? { ...prev, description: e.target.value } : prev
                  )
                }
              />
            </label>

            {/* ẢNH CŨ (khi sửa, chưa chọn ảnh mới) */}
            {existingUrls.length > 0 && images.length === 0 && (
              <div className="col-span-full mt-2 flex flex-wrap gap-3">
                {existingUrls.slice(0, 5).map((url, idx) => (
                  <div
                    key={`old-${idx}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-600 bg-black/40"
                  >
                    <img
                      src={resolveImageUrl(url)}
                      alt={`Ảnh hiện có ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute top-1 left-1 rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-semibold text-black">
                        Ảnh chính (hiện tại)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* CHỌN ẢNH MỚI + PREVIEW + SẮP XẾP */}
            <label className="col-span-full flex flex-col gap-1 text-sm mt-2">
              Ảnh sản phẩm (tối đa 5 ảnh)
              <input
                type="file"
                multiple
                accept="image/*"
                className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <span className="mt-1 text-xs text-slate-400">
                Ảnh đầu tiên sẽ được dùng làm ảnh chính. Có thể sắp xếp bằng nút
                ↑ ↓.
              </span>

              {images.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-600 bg-black/40"
                    >
                      <img
                        src={img.preview}
                        alt={`Ảnh ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {idx === 0 && (
                        <span className="absolute top-1 left-1 rounded bg-amber-500/90 px-1.5 py-0.5 text-[10px] font-semibold text-black">
                          Ảnh chính
                        </span>
                      )}
                      <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between gap-1">
                        <button
                          type="button"
                          className="rounded bg-black/60 px-1 text-[10px] text-white disabled:opacity-40"
                          onClick={() => moveImage(idx, -1)}
                          disabled={idx === 0}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="rounded bg-black/60 px-1 text-[10px] text-white disabled:opacity-40"
                          onClick={() => moveImage(idx, 1)}
                          disabled={idx === images.length - 1}
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className="rounded bg-red-600/80 px-1 text-[10px] text-white"
                          onClick={() => removeImage(idx)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </label>
          </div>
        )}
      </Modal>
    </>
  );
}
