import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="grid h-screen w-full max-w-[1100px] mx-auto grid-cols-1 lg:grid-cols-2">
      {/* LEFT - Ảnh giày và nút chuyển */}
      <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-200 overflow-hidden">
        <div className="relative w-[85%] max-w-[600px]">
          {/* Nút chọn Login / Signup */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 flex gap-4">
            <button
              onClick={() => setMode("login")}
              className={`uppercase font-extrabold text-gray-800 text-lg px-6 py-3 rounded-full transition ${
                mode === "login"
                  ? "bg-white/60 shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`uppercase font-extrabold text-gray-800 text-lg px-6 py-3 rounded-full transition ${
                mode === "signup"
                  ? "bg-white/60 shadow-md"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              Đăng ký
            </button>
          </div>

          {/* Ảnh giày (đặt ở public/images/shoe.png hoặc ảnh bạn muốn) */}
          <img
            src="/images/category1.png"
            alt="Sneaker"
            className="mt-24 w-full drop-shadow-[0_42px_40px_rgba(20,20,40,0.5)]"
          />
        </div>
      </div>

      {/* RIGHT - Form */}
      <div className="flex flex-col justify-center gap-7 bg-white lg:rounded-l-[28px] p-8 md:p-14 shadow-[ -30px_0_80px_rgba(0,0,0,0.08)]">
        {/* logo */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain"
          />
          <b className="text-[22px] text-yellow-600 tracking-wide">
            Kiếm Phong Kim
          </b>
        </div>

        {/* Form login / signup */}
        {mode === "login" ? <LoginForm /> : <SignupForm />}

        {/* Chuyển form ở mobile */}
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
      </div>
    </div>
  );
}

/* =================== SUB COMPONENTS =================== */

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
      <div className="mb-1 text-sm text-gray-500">{label}</div>
      <div className="flex items-center border-b-2 border-gray-200">
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

/* Icons inline */
function IconMail() {
  return (
    <svg
      className="h-[18px] w-[18px] opacity-75 ml-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 6l10 7L22 6" />
      <rect x="2" y="6" width="20" height="12" rx="2" ry="2" />
    </svg>
  );
}
function IconLock() {
  return (
    <svg
      className="h-[18px] w-[18px] opacity-75 ml-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      className="h-[18px] w-[18px] opacity-75 ml-0.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c2-4 14-4 16 0" />
    </svg>
  );
}

/* LOGIN FORM */
function LoginForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        alert("Đăng nhập: " + JSON.stringify(data));
      }}
      className="w-full max-w-[440px]"
    >
      <div className="space-y-4">
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          icon={<IconMail />}
        />
        <Field
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="••••••••"
          icon={<IconLock />}
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="text-sm font-semibold text-yellow-700"
        >
          Quên mật khẩu?
        </a>
        <button
          type="submit"
          className="rounded-full bg-yellow-500 px-6 py-3 font-bold text-white shadow-md hover:bg-yellow-600"
        >
          Đăng nhập
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        Hoặc đăng nhập với
      </div>
      <div className="mt-2 flex justify-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-semibold shadow-sm hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" /> Google
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-[#1877F2] text-white px-4 py-2 font-semibold shadow-sm hover:bg-[#166FE5]"
        >
          <FaFacebook className="text-lg" /> Facebook
        </button>
      </div>
    </form>
  );
}

/* SIGNUP FORM */
function SignupForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget).entries());
        alert("Đăng ký: " + JSON.stringify(data));
      }}
      className="w-full max-w-[440px]"
    >
      <div className="space-y-4">
        <Field
          label="Họ và tên"
          type="text"
          name="name"
          placeholder="Nguyễn Văn A"
          icon={<IconUser />}
        />
        <Field
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          icon={<IconMail />}
        />
        <Field
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="Tạo mật khẩu"
          icon={<IconLock />}
        />
        {/* ➕ Thêm trường nhập lại mật khẩu */}
        <Field
          label="Nhập lại mật khẩu"
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          icon={<IconLock />}
        />
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          type="submit"
          className="rounded-full bg-yellow-500 px-6 py-3 font-bold text-white shadow-md hover:bg-yellow-600"
        >
          Tạo tài khoản
        </button>
      </div>
    </form>
  );
}
