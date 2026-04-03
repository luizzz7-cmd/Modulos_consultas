import { useState, useEffect } from 'react'
import { profesorService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import HorarioCard from '../components/HorarioCard'
import { Search, Loader, Mail, Phone } from 'lucide-react'

export default function ProfesoresPage() {
  const [profesores, setProfesores] = useState([])
  const [filteredProfesores, setFilteredProfesores] = useState([])
  const [selectedProfesor, setSelectedProfesor] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    cargarProfesores()
  }, [])

  const cargarProfesores = async () => {
    try {
      setLoading(true)
      const response = await profesorService.obtenerTodos()
      setProfesores(response.data)
      setFilteredProfesores(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los profesores: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = profesores.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.departamento && p.departamento.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    setFilteredProfesores(filtered)
  }, [searchTerm, profesores])

  const handleSelectProfesor = async (profesor) => {
    try {
      const response = await profesorService.obtenerPorId(profesor.id)
      setSelectedProfesor(response.data)
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los detalles: ' + err.message)
    }
  }

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'email', label: 'Email' },
    { id: 'departamento', label: 'Departamento' },
    { id: 'telefono', label: 'Teléfono' },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">👨‍🏫 Profesores</h1>

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
              placeholder="Buscar por nombre, email o departamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : filteredProfesores.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No se encontraron profesores</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredProfesores.map((profesor) => (
                  <TableRow
                    key={profesor.id}
                    data={profesor}
                    columns={columns}
                    onClick={() => handleSelectProfesor(profesor)}
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
        title={selectedProfesor?.nombre}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        {selectedProfesor && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-600" />
                <div>
                  <p className="text-slate-600 text-sm">Email</p>
                  <p className="font-semibold">{selectedProfesor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-green-600" />
                <div>
                  <p className="text-slate-600 text-sm">Teléfono</p>
                  <p className="font-semibold">{selectedProfesor.telefono || 'N/A'}</p>
                </div>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Cédula</p>
                <p className="font-semibold">{selectedProfesor.cedula}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Departamento</p>
                <p className="font-semibold">{selectedProfesor.departamento || 'N/A'}</p>
              </div>
            </div>

            {selectedProfesor.materias && selectedProfesor.materias.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-3">Materias que imparte</h3>
                <div className="space-y-2">
                  {selectedProfesor.materias.map((m) => (
                    <div key={m.id} className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold text-blue-900">{m.materia.nombre}</p>
                      <p className="text-sm text-blue-700">Créditos: {m.materia.creditos}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProfesor.horarios && selectedProfesor.horarios.length > 0 && (
              <div>
                <h3 className="font-bold mb-4">Horarios</h3>
                <div className="space-y-3">
                  {selectedProfesor.horarios.map((h) => (
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
