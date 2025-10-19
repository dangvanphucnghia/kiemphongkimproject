import { create } from "zustand";
import { nanoid } from "nanoid";

const initialUsers = [
  { id: nanoid(), name: "Nguyễn An", email: "an@example.com", role: "admin" },
  { id: nanoid(), name: "Trần Bình", email: "binh@example.com", role: "user" },
];

const initialProducts = [
  { id: nanoid(), name: "Áo thun", price: 199000, stock: 120 },
  { id: nanoid(), name: "Quần jean", price: 499000, stock: 75 },
];

const initialOrders = [
  {
    id: nanoid(),
    userId: null,
    items: [
      { productId: null, name: "Áo thun", qty: 2, price: 199000 },
      { productId: null, name: "Quần jean", qty: 1, price: 499000 },
    ],
    status: "paid",
    createdAt: new Date().toISOString(),
  },
];

export const useAdminStore = create((set, get) => ({
  users: initialUsers,
  products: initialProducts,
  orders: initialOrders,

  addUser: (payload) => set((s) => ({ users: [...s.users, { id: nanoid(), ...payload }] })),
  updateUser: (id, patch) => set((s) => ({ users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)) })),
  removeUser: (id) => set((s) => ({ users: s.users.filter((u) => u.id !== id) })),

  addProduct: (payload) => set((s) => ({ products: [...s.products, { id: nanoid(), ...payload }] })),
  updateProduct: (id, patch) => set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  removeProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

  addOrder: (payload) => set((s) => ({ orders: [...s.orders, { id: nanoid(), ...payload }] })),
  updateOrder: (id, patch) => set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),
  removeOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),

  kpis: () => {
    const orders = get().orders;
    const revenue = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.qty * i.price, 0), 0);
    const paidOrders = orders.filter((o) => o.status === "paid").length;
    return { revenue, orders: orders.length, paidOrders };
  },
}));
