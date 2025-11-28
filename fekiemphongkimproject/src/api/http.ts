// src/api/http.ts
export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  // Ưu tiên token lưu riêng trong localStorage
  let token: string | undefined = localStorage.getItem("token") || undefined;

  // Nếu chưa có, đọc trong user
  if (!token) {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const u = JSON.parse(userJson);
        token = u.token || u.accessToken || undefined;
      } catch {
        token = undefined;
      }
    }
  }

  const isFormData = options.body instanceof FormData;

  const res = await fetch(url, {
    ...options,
    headers: {
      // Nếu body là FormData thì KHÔNG set Content-Type, để trình duyệt tự set boundary
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = res.statusText || `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (data && typeof data === "object" && "message" in data) {
        message = (data as any).message || message;
      } else {
        message = JSON.stringify(data);
      }
    } catch {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {
        // ignore
      }
    }
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  const text = await res.text();
  if (!text) return undefined as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}
