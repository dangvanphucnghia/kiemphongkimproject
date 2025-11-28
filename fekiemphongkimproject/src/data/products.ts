// src/data/products.ts
export type ProductFilter = {
  id: number;
  filterType: string;
  filterValue: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  description?: string;
  quantity?: number;
  stock?: number;
  status?: string;
  categoryId?: number;
  categoryName?: string;
  imageUrls?: string[];
  filters?: ProductFilter[];
  createdAt?: string;
  updatedAt?: string;

  // Các field cũ để code cũ không lỗi
  slug?: string;
  oldPrice?: number;
  rating?: number;
  badges?: ("NEW" | "HOT" | "SALE")[];
  shortDesc?: string;
  specs?: Record<string, string>;
};

// Tạo slug từ tên nếu backend chưa trả slug
export const makeSlug = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Fallback image placeholder
export const ph = (text: string) =>
  `https://placehold.co/1000x1000/FFF9EF/4B2E14/png?text=${encodeURIComponent(
    text
  )}`;
