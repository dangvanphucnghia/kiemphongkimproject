import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorMessage({
  title = "Đã có lỗi xảy ra",
  message = "Không thể tải dữ liệu. Vui lòng thử lại sau.",
  onRetry
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Thử lại
        </button>
      )}
    </div>
  );
}