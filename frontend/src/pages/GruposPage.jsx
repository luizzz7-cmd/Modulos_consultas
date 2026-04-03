import { useState, useEffect } from 'react'
import { grupoService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import HorarioCard from '../components/HorarioCard'
import { Search, Loader } from 'lucide-react'

export default function GruposPage() {
  const [grupos, setGrupos] = useState([])
  const [filteredGrupos, setFilteredGrupos] = useState([])
  const [selectedGrupo, setSelectedGrupo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    cargarGrupos()
  }, [])

  const cargarGrupos = async () => {
    try {
      setLoading(true)
      const response = await grupoService.obtenerTodos()
      setGrupos(response.data)
      setFilteredGrupos(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los grupos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = grupos.filter(
      (g) =>
        g.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (g.carrera && g.carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredGrupos(filtered)
  }, [searchTerm, grupos])

  const handleSelectGrupo = async (grupo) => {
    try {
      const response = await grupoService.obtenerPorId(grupo.id)
      setSelectedGrupo(response.data)
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los detalles: ' + err.message)
    }
  }

  const columns = [
    { id: 'codigo', label: 'Código' },
    { id: 'semestre', label: 'Semestre' },
    { id: 'turno', label: 'Turno' },
    { id: 'capacidad', label: 'Capacidad' },
    {
      id: 'carrera',
      label: 'Carrera',
      render: (value) => value?.nombre || 'N/A',
    },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">👥 Grupos</h1>

        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por código o carrera..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : filteredGrupos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No se encontraron grupos</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredGrupos.map((grupo) => (
                  <TableRow
                    key={grupo.id}
                    data={grupo}
                    columns={columns}
                    onClick={() => handleSelectGrupo(grupo)}
                  />
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={isModalOpen}
        title={selectedGrupo?.codigo}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        {selectedGrupo && (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded">
              <div>
                <p className="text-slate-600 text-sm">Semestre</p>
                <p className="font-bold text-lg">{selectedGrupo.semestre}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Turno</p>
                <p className="font-bold text-lg">{selectedGrupo.turno}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Capacidad</p>
                <p className="font-bold text-lg">{selectedGrupo.capacidad}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Carrera</p>
                <p className="font-bold text-lg">{selectedGrupo.carrera?.nombre}</p>
              </div>
            </div>

            {selectedGrupo.materias && selectedGrupo.materias.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-3">Materias del grupo</h3>
                <div className="space-y-2">
                  {selectedGrupo.materias.map((m) => (
                    <div key={m.id} className="bg-green-50 p-3 rounded">
                      <p className="font-semibold text-green-900">{m.materia.nombre}</p>
                      <p className="text-sm text-green-700">Créditos: {m.materia.creditos}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedGrupo.horarios && selectedGrupo.horarios.length > 0 && (
              <div>
                <h3 className="font-bold mb-4">Horarios</h3>
                <div className="space-y-3">
                  {selectedGrupo.horarios.map((h) => (
                    <HorarioCard key={h.id} horario={h} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
