export function TableHeader({ columns }) {
  return (
    <thead className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
      <tr>
        {columns.map((col) => (
          <th
            key={col.id}
            className={`px-6 py-3 text-left text-sm font-semibold ${col.className || ''}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export function TableRow({ data, columns, onClick }) {
  return (
    <tr
      onClick={onClick}
      className="border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
    >
      {columns.map((col) => (
        <td
          key={col.id}
          className={`px-6 py-4 text-sm text-slate-700 ${col.className || ''}`}
        >
          {col.render ? col.render(data[col.id], data) : data[col.id]}
        </td>
      ))}
    </tr>
  )
}

export function Table({ children, className = '' }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className={`w-full border-collapse bg-white ${className}`}>
        {children}
      </table>
    </div>
  )
}
