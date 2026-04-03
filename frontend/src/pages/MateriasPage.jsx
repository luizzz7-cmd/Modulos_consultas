import { useState, useEffect } from 'react'
import { materiaService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import HorarioCard from '../components/HorarioCard'
import { Search, Loader } from 'lucide-react'

export default function MateriasPage() {
  const [materias, setMaterias] = useState([])
  const [filteredMaterias, setFilteredMaterias] = useState([])
  const [selectedMateria, setSelectedMateria] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    cargarMaterias()
  }, [])

  const cargarMaterias = async () => {
    try {
      setLoading(true)
      const response = await materiaService.obtenerTodos()
      setMaterias(response.data)
      setFilteredMaterias(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar las materias: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = materias.filter(
      (m) =>
        m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredMaterias(filtered)
  }, [searchTerm, materias])

  const handleSelectMateria = async (materia) => {
    try {
      const response = await materiaService.obtenerPorId(materia.id)
      setSelectedMateria(response.data)
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los detalles: ' + err.message)
    }
  }

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'codigo', label: 'Código' },
    { id: 'semestre', label: 'Semestre' },
    { id: 'creditos', label: 'Créditos' },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">📚 Materias</h1>

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
              placeholder="Buscar por nombre o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : filteredMaterias.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No se encontraron materias</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredMaterias.map((materia) => (
                  <TableRow
                    key={materia.id}
                    data={materia}
                    columns={columns}
                    onClick={() => handleSelectMateria(materia)}
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
        title={selectedMateria?.nombre}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        {selectedMateria && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded">
              <div>
                <p className="text-slate-600 text-sm">Código</p>
                <p className="font-bold text-lg">{selectedMateria.codigo}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Semestre</p>
                <p className="font-bold text-lg">{selectedMateria.semestre}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Créditos</p>
                <p className="font-bold text-lg">{selectedMateria.creditos}</p>
              </div>
            </div>

            {selectedMateria.descripcion && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Descripción</h3>
                <p className="text-slate-700">{selectedMateria.descripcion}</p>
              </div>
            )}

            {selectedMateria.profesores && selectedMateria.profesores.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-3">Profesores</h3>
                <div className="space-y-2">
                  {selectedMateria.profesores.map((p) => (
                    <div key={p.id} className="bg-purple-50 p-3 rounded">
                      <p className="font-semibold text-purple-900">{p.profesor.nombre}</p>
                      <p className="text-sm text-purple-700">{p.profesor.email}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMateria.horarios && selectedMateria.horarios.length > 0 && (
              <div>
                <h3 className="font-bold mb-4">Horarios</h3>
                <div className="space-y-3">
                  {selectedMateria.horarios.map((h) => (
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
