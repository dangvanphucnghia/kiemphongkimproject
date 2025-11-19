import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { login, register } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="grid h-screen w-full max-w-[1200px] mx-auto grid-cols-1 lg:grid-cols-2 bg-gray-50 overflow-hidden">
      {/* LEFT - Biển hiệu Kiếm Phong Kim */}
      <header className="relative hidden lg:flex items-center justify-center bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-200">
        <div className="relative w-[90%] max-w-[620px] text-center select-none py-20 px-8 rounded-[32px] shadow-[0_0_80px_rgba(0,0,0,0.3)]
          border-[6px] border-yellow-500 bg-gradient-to-b from-yellow-300 to-yellow-100">

          {/* Nút chuyển Login / Signup */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex gap-4">
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "login" | "signup")}
                className={`uppercase font-extrabold text-gray-800 text-lg px-6 py-3 rounded-full transition ${mode === m
                    ? "bg-white/80 shadow-md"
                    : "opacity-70 hover:opacity-100"
                  }`}
              >
                {m === "login" ? "Đăng nhập" : "Đăng ký"}
              </button>
            ))}
          </div>

          {/* Hàng chính */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <div className="w-14 h-14 bg-yellow-400 rounded-full shadow-[0_0_40px_15px_rgba(255,230,0,0.8)] animate-pulse shrink-0"></div>

            <h1 className="text-3xl font-extrabold text-white tracking-wider drop-shadow-[3px_4px_1px_rgba(20,20,80,0.9)]
              bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-blue-400">
              KIẾM PHONG KIM
            </h1>
          </div>

          <div className="mt-8 space-y-3 text-xl font-extrabold text-[#0c2b7a]">
            <p className="tracking-wide">MỘC MỸ NGHỆ – TRẦM HƯƠNG</p>
            <p>ĐẶC SẢN TÂY BẮC – YẾN SÀO KHÁNH HÒA</p>
            <p>TINH DẦU CHƯNG CẤT TRUYỀN THỐNG</p>
          </div>

          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-white/15 to-transparent
            animate-[shine_4s_linear_infinite]" />
        </div>
      </header>

      {/* RIGHT FORM */}
      <main className="flex flex-col justify-center gap-7 bg-white lg:rounded-l-[28px] p-8 md:p-14 shadow-[-30px_0_80px_rgba(0,0,0,0.08)]">
        {/* Logo chữ */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/logo.png"
            alt="Logo Kiếm Phong Kim"
            className="h-10 w-10 object-contain"
          />
          <b className="text-[24px] text-yellow-600 tracking-wide font-extrabold">
            Kiếm Phong Kim
          </b>
        </div>

        {mode === "login" ? <LoginForm /> : <SignupForm />}

        <div className="lg:hidden text-center text-sm text-gray-600 mt-3">
          {mode === "login" ? (
            <>
              Chưa có tài khoản?{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-semibold text-yellow-600"
              >
                Đăng ký ngay
              </button>
            </>
          ) : (
            <>
              Đã có tài khoản?{" "}
              <button
                onClick={() => setMode("login")}
                className="font-semibold text-yellow-600"
              >
                Đăng nhập
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ================= FIELD ================= */
function Field({
  label,
  type,
  name,
  placeholder,
  icon,
}: {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-500">{label}</label>
      <div className="flex items-center border-b-2 border-gray-200 focus-within:border-yellow-500">
        {icon}
        <input
          type={type}
          name={name}
          required
          placeholder={placeholder}
          className="w-full px-3 py-3 bg-transparent outline-none text-base"
        />
      </div>
    </div>
  );
}

/* ================= ICONS ================= */
const IconMail = () => (
  <svg className="h-[18px] w-[18px] opacity-75 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6l10 7L22 6" />
    <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
  </svg>
);

const IconLock = () => (
  <svg className="h-[18px] w-[18px] opacity-75 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconUser = () => (
  <svg className="h-[18px] w-[18px] opacity-75 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c2-4 14-4 16 0" />
  </svg>
);

/* ================= LOGIN FORM ================= */
function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await login({
        usernameOrEmail: data.email as string,
        password: data.password as string,
      });

      const roles: string[] = res.user.roles;

      if (roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err: any) {
      alert(err?.message ?? "Đăng nhập thất bại");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[440px]">
      <div className="space-y-4">
        <Field label="Email" type="email" name="email" placeholder="you@example.com" icon={<IconMail />} />
        <Field label="Mật khẩu" type="password" name="password" placeholder="••••••••" icon={<IconLock />} />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <a href="#" onClick={(e) => e.preventDefault()} className="text-sm font-semibold text-yellow-700">
          Quên mật khẩu?
        </a>
        <button type="submit" className="rounded-full bg-yellow-500 px-6 py-3 font-bold text-white shadow-md hover:bg-yellow-600">
          Đăng nhập
        </button>
      </div>
    </form>
  );
}


/* ================= SIGNUP FORM ================= */
function SignupForm() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    const password = data.password as string;
    const confirm = data.confirmPassword as string;

    if (password !== confirm) {
      alert("Mật khẩu không khớp");
      return;
    }

    try {
      await register({
        username: data.name as string,
        email: data.email as string,
        password,
      });

      // Auto login
      await login({
        usernameOrEmail: data.email as string,
        password,
      });

      navigate("/");
    } catch (err: any) {
      alert(err?.message ?? "Đăng ký thất bại");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[440px]">
      <div className="space-y-4">
        <Field label="Họ và tên" type="text" name="name" placeholder="Nguyễn Văn A" icon={<IconUser />} />
        <Field label="Email" type="email" name="email" placeholder="you@example.com" icon={<IconMail />} />
        <Field label="Mật khẩu" type="password" name="password" placeholder="Tạo mật khẩu" icon={<IconLock />} />
        <Field label="Nhập lại mật khẩu" type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" icon={<IconLock />} />
      </div>

      <div className="mt-5 flex items-center justify-end">
        <button type="submit" className="rounded-full bg-yellow-500 px-6 py-3 font-bold text-white shadow-md hover:bg-yellow-600">
          Tạo tài khoản
        </button>
      </div>
    </form>
  );
}

/* ================= Hiệu ứng ánh sáng ================= */
const style = document.createElement("style");
style.innerHTML = `
@keyframes shine {
  0% { opacity: 0.2; transform: translateX(-100%); }
  50% { opacity: 0.8; transform: translateX(0%); }
  100% { opacity: 0.2; transform: translateX(100%); }
}`;
document.head.appendChild(style);
