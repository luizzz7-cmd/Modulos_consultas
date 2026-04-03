import { useState, useEffect } from 'react'
import { espacioService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import HorarioCard from '../components/HorarioCard'
import { Search, Loader } from 'lucide-react'

export default function AulasPage() {
  const [espacios, setEspacios] = useState([])
  const [filteredEspacios, setFilteredEspacios] = useState([])
  const [selectedEspacio, setSelectedEspacio] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoFiltro, setTipoFiltro] = useState('AULA')

  useEffect(() => {
    cargarEspacios()
  }, [])

  const cargarEspacios = async () => {
    try {
      setLoading(true)
      const response = await espacioService.obtenerTodos({ tipo: tipoFiltro })
      setEspacios(response.data)
      setFilteredEspacios(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los espacios: ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarEspacios()
  }, [tipoFiltro])

  useEffect(() => {
    const filtered = espacios.filter(
      (e) =>
        e.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.edificio.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEspacios(filtered)
  }, [searchTerm, espacios])

  const handleSelectEspacio = async (espacio) => {
    try {
      const response = await espacioService.obtenerPorId(espacio.id)
      setSelectedEspacio(response.data)
      setIsModalOpen(true)
    } catch (err) {
      setError('Error al cargar los detalles: ' + err.message)
    }
  }

  const columns = [
    { id: 'nombre', label: 'Nombre' },
    { id: 'codigo', label: 'Código' },
    { id: 'edificio', label: 'Edificio' },
    { id: 'piso', label: 'Piso' },
    { id: 'capacidad', label: 'Capacidad' },
    {
      id: 'tipo',
      label: 'Tipo',
      render: (value) => (
        <span className={`px-3 py-1 rounded text-sm font-semibold ${
          value === 'AULA'
            ? 'bg-blue-100 text-blue-800'
            : value === 'LABORATORIO'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-orange-100 text-orange-800'
        }`}>
          {value}
        </span>
      ),
    },
  ]

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">
          {tipoFiltro === 'AULA' ? '🏛️ Aulas' : tipoFiltro === 'LABORATORIO' ? '🔬 Laboratorios' : '🎤 Auditorios'}
        </h1>

        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, código o edificio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={tipoFiltro}
              onChange={(e) => setTipoFiltro(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="AULA">Aulas</option>
              <option value="LABORATORIO">Laboratorios</option>
              <option value="AUDITORIO">Auditorios</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="animate-spin" size={32} />
            </div>
          ) : filteredEspacios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">No se encontraron espacios</p>
            </div>
          ) : (
            <Table>
              <TableHeader columns={columns} />
              <tbody>
                {filteredEspacios.map((espacio) => (
                  <TableRow
                    key={espacio.id}
                    data={espacio}
                    columns={columns}
                    onClick={() => handleSelectEspacio(espacio)}
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
        title={selectedEspacio?.nombre}
        onClose={() => setIsModalOpen(false)}
        size="lg"
      >
        {selectedEspacio && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-slate-600 text-sm">Código</p>
                <p className="font-bold text-lg">{selectedEspacio.codigo}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Tipo</p>
                <p className="font-bold text-lg">{selectedEspacio.tipo}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Edificio</p>
                <p className="font-bold text-lg">{selectedEspacio.edificio}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Piso</p>
                <p className="font-bold text-lg">{selectedEspacio.piso}</p>
              </div>
              <div>
                <p className="text-slate-600 text-sm">Capacidad</p>
                <p className="font-bold text-lg">{selectedEspacio.capacidad} personas</p>
              </div>
            </div>

            {selectedEspacio.recurso && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Recursos</h3>
                <div className="bg-slate-50 p-4 rounded">
                  <pre className="text-sm">{JSON.stringify(JSON.parse(selectedEspacio.recursos), null, 2)}</pre>
                </div>
              </div>
            )}

            {selectedEspacio.horarios && selectedEspacio.horarios.length > 0 && (
              <div>
                <h3 className="font-bold mb-4">Horarios Ocupados</h3>
                <div className="space-y-3">
                  {selectedEspacio.horarios.map((h) => (
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
