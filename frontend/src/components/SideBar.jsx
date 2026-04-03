import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function SideBar({ onNavigate, currentPage }) {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { id: 'inicio', label: '🏠 Inicio', icon: 'home' },
    { id: 'aulas', label: '🏛️ Aulas', icon: 'building' },
    { id: 'profesores', label: '👨‍🏫 Profesores', icon: 'user' },
    { id: 'materias', label: '📚 Materias', icon: 'book' },
    { id: 'grupos', label: '👥 Grupos', icon: 'users' },
    { id: 'carreras', label: '🎓 Carreras', icon: 'graduation' },
    { id: 'horarios', label: '📅 Horarios', icon: 'calendar' },
    { id: 'admin', label: '⚙️ Administración', icon: 'settings' },
    { id: 'importar', label: '📤 Importar CSV', icon: 'upload' },
  ]

  return (
    <>
      {/* Botón móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800 text-white p-2 rounded"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white w-64 p-6 overflow-y-auto transition-transform duration-300 z-40 lg:z-0 ${
          !isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center">📖 Horarios</h1>
          <p className="text-sm text-slate-400 text-center mt-1">Académico</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                // Solo cerrar en mobile (pantallas menores a 1024px)
                if (window.innerWidth < 1024) {
                  setIsOpen(false)
                }
              }}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-xs text-slate-400">© 2024 Universidad</p>
        </div>
      </aside>

      {/* Overlay móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
