export function Field({ label, children }) {
  return (
    <label className="block text-sm">
      <div className="text-gray-600 mb-1">{label}</div>
      {children}
    </label>
  );
}

export function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow p-4">
        <button className="absolute right-3 top-3 text-gray-500 hover:text-gray-900" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
