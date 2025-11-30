// src/lib/api.ts
const API = import.meta.env.VITE_API_URL ?? "https://kiemphongkimproject.onrender.com"; // để trống vì đã proxy '/api'

export type RegisterDto = {
  username: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
};

export type LoginDto = { usernameOrEmail: string; password: string };

function headers(extra: Record<string, string> = {}) {
  return { "Content-Type": "application/json", ...extra };
}

export async function register(dto: RegisterDto) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || res.statusText || "Đăng ký thất bại");
  }

  return res.json();
}

export async function login(dto: LoginDto) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(dto),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || res.statusText || "Đăng nhập thất bại");
  }

  const data = await res.json(); // ví dụ: { accessToken, tokenType, user } hoặc { token, user }

  // LẤY TOKEN ĐÚNG FIELD
  const token: string | undefined =
    data.token ||
    data.accessToken ||
    data.jwt ||
    data.id_token ||
    undefined;

  if (token) {
    localStorage.setItem("token", token);
  }

  if (data.user) {
    // lưu kèm token trong user để phòng khi cần
    const userToStore = { ...data.user, token };
    localStorage.setItem("user", JSON.stringify(userToStore));
  }

  return data;
}

export function authHeader(): Record<string, string> {
  // Ưu tiên token lưu riêng
  let token: string | null = localStorage.getItem("token");

  // Fallback: lấy trong object user nếu có
  if (!token) {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const u = JSON.parse(userJson);
        token = u.token || u.accessToken || null;
      } catch {
        token = null;
      }
    }
  }

  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function me() {
  const res = await fetch(`${API}/api/users/me`, {
    headers: headers(authHeader()),
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

/**
 * Logout dùng chung cho cả admin và user:
 * - Gửi request lên /api/auth/logout (nếu BE cần)
 * - Xoá token + user trong localStorage
 */
export async function logout() {
  try {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      headers: headers(authHeader()),
    });
  } catch (e) {
    // Logout BE fail cũng không sao, vẫn xoá token local
    console.error("Logout request failed", e);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
