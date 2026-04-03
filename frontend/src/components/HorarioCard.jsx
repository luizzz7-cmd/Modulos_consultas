import { Clock, MapPin, User, BookOpen } from 'lucide-react'

export default function HorarioCard({ horario, onClick }) {
  const diasMap = {
    LUNES: 'Lunes',
    MARTES: 'Martes',
    MIERCOLES: 'Miércoles',
    JUEVES: 'Jueves',
    VIERNES: 'Viernes',
    SABADO: 'Sábado',
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-slate-800">{horario.materia?.nombre}</h3>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {diasMap[horario.diaSemana]}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-blue-600" />
          <span>
            {horario.horaInicio} - {horario.horaFin}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-orange-600" />
          <span>{horario.espacio?.nombre}</span>
        </div>

        <div className="flex items-center gap-2">
          <User size={16} className="text-purple-600" />
          <span>{horario.profesor?.nombre}</span>
        </div>

        {horario.grupo && (
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-green-600" />
            <span>{horario.grupo.codigo}</span>
          </div>
        )}
      </div>

      {horario.observaciones && (
        <p className="text-xs text-slate-500 mt-3 p-2 bg-slate-50 rounded">
          📝 {horario.observaciones}
        </p>
      )}
    </div>
  )
}
