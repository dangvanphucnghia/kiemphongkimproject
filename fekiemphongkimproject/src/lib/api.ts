const API = import.meta.env.VITE_API_URL ?? ''; // để trống vì đã proxy '/api'

export type RegisterDto = { username: string; email: string; password: string };
export type LoginDto = { usernameOrEmail: string; password: string };

function headers(extra: Record<string,string> = {}) {
  return { 'Content-Type': 'application/json', ...extra };
}

export async function register(dto: RegisterDto) {
  const res = await fetch(`${API}/api/auth/register`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw await res.json().catch(() => new Error(res.statusText));
  return res.json(); // UserResponse
}

export async function login(dto: LoginDto) {
  const res = await fetch(`${API}/api/auth/login`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw await res.json().catch(() => new Error(res.statusText));
  const data = await res.json(); // { token, user }
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export function authHeader(): Record<string, string> {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}


export async function me() {
  const res = await fetch(`${API}/api/users/me`, { headers: headers(authHeader()) });
  if (!res.ok) throw new Error('Unauthorized');
  return res.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}
