import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth"; // 👈 import trang đăng nhập

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />

      {/* route mặc định: nếu truy cập sai đường dẫn thì về Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
