import { Search } from 'lucide-react'
import { useState } from 'react'

export default function NavBar({ onSearch, title = 'Consulta de Horarios' }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <nav className="bg-white shadow-md p-4 lg:ml-64">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>

        <form onSubmit={handleSearch} className="relative flex-1 md:max-w-xs">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>
    </nav>
  )
}
