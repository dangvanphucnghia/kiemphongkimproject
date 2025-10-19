import { useMemo, useState } from "react";

export default function Table({ columns, data, onRowClick }) {
  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [asc, setAsc] = useState(true);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    let out = !text
      ? data
      : data.filter((row) =>
          Object.values(row).join(" ").toLowerCase().includes(text)
        );
    if (sortKey) {
      out = [...out].sort((a, b) => {
        const A = a[sortKey], B = b[sortKey];
        if (typeof A === "number" && typeof B === "number") return asc ? A - B : B - A;
        return asc ? String(A).localeCompare(String(B)) : String(B).localeCompare(String(A));
      });
    }
    return out;
  }, [q, data, sortKey, asc]);

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-3 flex items-center gap-2 border-b">
        <input
          className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="Tìm kiếm..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-3 py-2 text-left cursor-pointer select-none"
                  onClick={() =>
                    sortKey === c.key ? setAsc(!asc) : (setSortKey(c.key), setAsc(true))
                  }
                >
                  <div className="flex items-center gap-1">
                    <span>{c.header}</span>
                    {sortKey === c.key && <span>{asc ? "▲" : "▼"}</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2">
                    {c.render ? c.render(row[c.key], row) : String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-center text-gray-500" colSpan={columns.length}>
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
