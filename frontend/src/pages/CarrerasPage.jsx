import { useState, useEffect } from 'react'
import { carreraService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import { Search, Loader } from 'lucide-react'

export default function CarrerasPage() {
  const [carreras, setCarreras] = useState([])
  const [filteredCarreras, setFilteredCarreras] = useState([])
  const [selectedCarrera, setSelectedCarrera] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    cargarCarreras()
  }, [])

  const cargarCarreras = async () => {
    try {
      setLoading(true)
      const response = await carreraService.obtenerTodos()
      setCarreras(response.data)
      setFilteredCarreras(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar las carreras: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = carreras.filter(
      (c) =>
        c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCarreras(filtered)
  }, [searchTerm, carreras])

  const handleSelectCarrera = async (carrera) => {
    try {
      const response = await carreraService.obtenerPorId(carrera.id)
      setSelectedCarrera(response.data)
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los detalles: ' + err.message)
    }
  }

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'codigo', label: 'Código' },
    { id: 'semestres', label: 'Semestres' },
    {
      id: 'grupos',
      label: 'Grupos',
      render: (value, row) => row.grupos?.length || 0,
    },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">🎓 Carreras</h1>

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
          ) : filteredCarreras.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No se encontraron carreras</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredCarreras.map((carrera) => (
                  <TableRow
                    key={carrera.id}
                    data={carrera}
                    columns={columns}
                    onClick={() => handleSelectCarrera(carrera)}
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
        title={selectedCarrera?.nombre}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        {selectedCarrera && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded">
              <div>
                <p className="text-slate-600 text-sm">Código</p>
                <p className="font-bold text-lg">{selectedCarrera.codigo}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Semestres</p>
                <p className="font-bold text-lg">{selectedCarrera.semestres}</p>
              </div>
            </div>

            {selectedCarrera.descripcion && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Descripción</h3>
                <p className="text-slate-700">{selectedCarrera.descripcion}</p>
              </div>
            )}

            {selectedCarrera.grupos && selectedCarrera.grupos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-3">Grupos</h3>
                <div className="space-y-2">
                  {selectedCarrera.grupos.map((g) => (
                    <div key={g.id} className="bg-teal-50 p-3 rounded">
                      <p className="font-semibold text-teal-900">{g.codigo}</p>
                      <p className="text-sm text-teal-700">Semestre {g.semestre} - Turno: {g.turno}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCarrera.profesores && selectedCarrera.profesores.length > 0 && (
              <div>
                <h3 className="font-bold mb-3">Profesores</h3>
                <div className="space-y-2">
                  {selectedCarrera.profesores.slice(0, 5).map((p) => (
                    <div key={p.id} className="bg-orange-50 p-3 rounded">
                      <p className="font-semibold text-orange-900">{p.profesor.nombre}</p>
                      <p className="text-sm text-orange-700">{p.profesor.email}</p>
                    </div>
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
