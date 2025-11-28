import type { ReactNode } from 'react';

type TableProps = {
  columns: string[];
  rows: (string | number | ReactNode)[][];
  onCreate?: () => void;
  onEditRow?: (rowIndex: number) => void;
  onDeleteRow?: (rowIndex: number) => void;
};

export default function Table({ columns, rows, onCreate, onEditRow, onDeleteRow }: TableProps) {
  return (
    <div className="rounded-2xl border border-platinum-700 bg-gradient-to-b from-[#1b1c22] to-[#16171c] p-4">
      <div className="mb-2 flex items-center gap-2">
        <input
          className="rounded-lg border border-slate-700 bg-platinum-900 px-3 py-2 text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-gold-500/30"
          placeholder="Lọc theo từ khóa… (chưa làm)"
        />
        <div className="flex-1" />
        {onCreate && (
          <button
            onClick={onCreate}
            className="rounded-lg border border-amber-700 bg-gradient-to-b from-gold-500 to-gold-600 px-3 py-2 font-semibold text-black"
          >
            + Tạo mới sản phẩm
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-slate-300">
            <tr>
              {columns.map((c) => (
                <th key={c} className="border-b border-platinum-700 px-3 py-2 text-left font-semibold">
                  {c}
                </th>
              ))}
              <th className="border-b border-platinum-700" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-white/5">
                {r.map((c, j) => (
                  <td key={j} className="border-b border-platinum-700 px-3 py-2">
                    {c}
                  </td>
                ))}
                <td className="border-b border-platinum-700 px-3 py-2 text-right">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-slate-400">
        <button className="rounded-lg border border-slate-600 bg-transparent px-2 py-1">«</button>
        <span>Trang 1/1 (demo)</span>
        <button className="rounded-lg border border-slate-600 bg-transparent px-2 py-1">»</button>
      </div>
    </div>
  );
}
