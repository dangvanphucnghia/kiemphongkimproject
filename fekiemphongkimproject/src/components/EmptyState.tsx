import { PackageX } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon = PackageX,
  title = "Không có sản phẩm",
  description = "Không tìm thấy sản phẩm nào phù hợp",
  actionText = "Về trang chủ",
  actionHref = "/"
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-center mb-6 max-w-sm">
        {description}
      </p>
      <Link
        to={actionHref}
        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        {actionText}
      </Link>
    </div>
  );
}