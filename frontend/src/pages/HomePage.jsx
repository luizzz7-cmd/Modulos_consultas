import Card from '../components/Card'
import { ArrowRight } from 'lucide-react'

export default function HomePage({ onNavigate }) {
  const categories = [
    {
      id: 'aulas',
      title: '🏛️ Aulas',
      description: 'Consulta disponibilidad y ocupación de aulas',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'laboratorios',
      title: '🔬 Laboratorios',
      description: 'Disponibilidad de laboratorios y equipos',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'profesores',
      title: '👨‍🏫 Profesores',
      description: 'Horarios y materias de los profesores',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'materias',
      title: '📚 Materias',
      description: 'Información sobre materias y horarios',
      color: 'from-orange-500 to-orange-600',
    },
    {
      id: 'grupos',
      title: '👥 Grupos',
      description: 'Horarios de grupos académicos',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 'carreras',
      title: '🎓 Carreras',
      description: 'Información de carreras disponibles',
      color: 'from-teal-500 to-teal-600',
    },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            ¿Qué deseas buscar?
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Encuentra horarios académicos, disponibilidad de aulas y laboratorios de forma rápida y sencilla.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate(cat.id)}
              className="cursor-pointer group"
            >
              <div
                className={`bg-gradient-to-r ${cat.color} rounded-lg shadow-lg p-6 text-white transition-transform transform hover:scale-105 hover:shadow-xl h-full flex flex-col justify-between`}
              >
                <div>
                  <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                  <p className="text-sm opacity-90">{cat.description}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Características */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Características</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <span className="text-3xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">Búsqueda avanzada</h4>
                <p className="text-slate-300 text-sm">Filtra por día, hora, espacio y profesor</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">Disponibilidad en tiempo real</h4>
                <p className="text-slate-300 text-sm">Consulta qué aulas están libres</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">Horarios visuales</h4>
                <p className="text-slate-300 text-sm">Ver horarios en formato calendario</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-3xl">✓</span>
              <div>
                <h4 className="font-bold mb-1">Panel administrativo</h4>
                <p className="text-slate-300 text-sm">Gestiona datos desde la plataforma</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
