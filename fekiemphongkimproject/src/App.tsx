import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Member from "./pages/Member";
import Checkout from "./pages/Checkout";
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import Products from './admin/pages/Products';
import Categories from './admin/pages/Categories';
import Users from './admin/pages/Users';
import Members from './admin/pages/Members';
import Promotions from './admin/pages/Promotions';
import Orders from './admin/pages/Orders';
import Revenue from './admin/pages/Revenue';
import Banners from './admin/pages/Banners';
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminRoute from "./admin/components/AdminRoute"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/member" element={<Member />} />
      <Route path="/cart" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/san-pham" element={<ProductsPage />} />
      <Route path="/san-pham/:slug" element={<ProductDetail />} />

      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Bọc toàn bộ admin */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="users" element={<Users />} />
        <Route path="members" element={<Members />} />
        <Route path="promotions" element={<Promotions />} />
        <Route path="orders" element={<Orders />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="banners" element={<Banners />} />
      </Route>
    </Routes>
  );
}
