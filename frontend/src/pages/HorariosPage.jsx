import { useState, useEffect } from 'react'
import { horarioService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Alert from '../components/Alert'
import { Search, Loader } from 'lucide-react'

export default function HorariosPage() {
  const [horarios, setHorarios] = useState([])
  const [filteredHorarios, setFilteredHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [diaFiltro, setDiaFiltro] = useState('LUNES')

  const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO']

  useEffect(() => {
    cargarHorarios()
  }, [diaFiltro])

  const cargarHorarios = async () => {
    try {
      setLoading(true)
      const response = await horarioService.obtenerTodos({ dia: diaFiltro })
      setHorarios(response.data)
      setFilteredHorarios(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los horarios: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const diasMap = {
    LUNES: 'Lunes',
    MARTES: 'Martes',
    MIERCOLES: 'Miércoles',
    JUEVES: 'Jueves',
    VIERNES: 'Viernes',
    SABADO: 'Sábado',
  }

  const columns = [
    { id: 'diaSemana', label: 'Día', render: (v) => diasMap[v] },
    {
      id: 'horaInicio',
      label: 'Hora Inicio',
      render: (v) => v,
    },
    {
      id: 'horaFin',
      label: 'Hora Fin',
      render: (v) => v,
    },
    {
      id: 'materia',
      label: 'Materia',
      render: (v) => v?.nombre || 'N/A',
    },
    {
      id: 'profesor',
      label: 'Profesor',
      render: (v) => v?.nombre || 'N/A',
    },
    {
      id: 'espacio',
      label: 'Espacio',
      render: (v) => v?.nombre || 'N/A',
    },
    {
      id: 'grupo',
      label: 'Grupo',
      render: (v) => v?.codigo || 'N/A',
    },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">📅 Horarios</h1>

        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6 flex flex-wrap gap-2">
            {dias.map((dia) => (
              <button
                key={dia}
                onClick={() => setDiaFiltro(dia)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  diaFiltro === dia
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                }`}
              >
                {diasMap[dia]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : filteredHorarios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No hay horarios para este día</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredHorarios.map((horario) => (
                  <TableRow
                    key={horario.id}
                    data={horario}
                    columns={columns}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}
