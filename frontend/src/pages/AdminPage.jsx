import { useState, useEffect } from 'react'
import { espacioService, profesorService, materiaService, grupoService } from '../services/api'
import { Table, TableHeader, TableRow } from '../components/Table'
import Button from '../components/Button'
import Alert from '../components/Alert'
import Modal from '../components/Modal'
import { Loader, Trash2, Edit2 } from 'lucide-react'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('espacios')
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const tabs = [
    { id: 'espacios', label: '🏛️ Espacios', service: espacioService },
    { id: 'profesores', label: '👨‍🏫 Profesores', service: profesorService },
    { id: 'materias', label: '📚 Materias', service: materiaService },
    { id: 'grupos', label: '👥 Grupos', service: grupoService },
  ]

  const currentService = tabs.find((t) => t.id === activeTab)?.service

  useEffect(() => {
    cargarDatos()
  }, [activeTab])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const response = await currentService.obtenerTodos()
      setDatos(response.data)
      setError(null)
    } catch (err) {
      setError('Error al cargar datos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      try {
        await currentService.eliminar(id)
        setSuccess('Registro eliminado exitosamente')
        cargarDatos()
      } catch (err) {
        setError('Error al eliminar: ' + err.message)
      }
    }
  }

  const getColumns = () => {
    switch (activeTab) {
      case 'espacios':
        return [
          { id: 'nombre', label: 'Nombre' },
          { id: 'codigo', label: 'Código' },
          { id: 'tipo', label: 'Tipo' },
          { id: 'edificio', label: 'Edificio' },
          { id: 'capacidad', label: 'Capacidad' },
          {
            id: 'acciones',
            label: 'Acciones',
            render: (v, row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ),
          },
        ]
      case 'profesores':
        return [
          { id: 'nombre', label: 'Nombre' },
          { id: 'email', label: 'Email' },
          { id: 'departamento', label: 'Departamento' },
          {
            id: 'acciones',
            label: 'Acciones',
            render: (v, row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ),
          },
        ]
      case 'materias':
        return [
          { id: 'nombre', label: 'Nombre' },
          { id: 'codigo', label: 'Código' },
          { id: 'semestre', label: 'Semestre' },
          { id: 'creditos', label: 'Créditos' },
          {
            id: 'acciones',
            label: 'Acciones',
            render: (v, row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ),
          },
        ]
      case 'grupos':
        return [
          { id: 'codigo', label: 'Código' },
          { id: 'semestre', label: 'Semestre' },
          { id: 'turno', label: 'Turno' },
          {
            id: 'acciones',
            label: 'Acciones',
            render: (v, row) => (
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ),
          },
        ]
      default:
        return []
    }
  }

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">⚙️ Administración</h1>

        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {success && (
          <Alert
            type="success"
            title="Éxito"
            message={success}
            onClose={() => setSuccess(null)}
          />
        )}

        <div className="bg-white rounded-lg shadow-md">
          {/* Tabs */}
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Contenido */}
          <div className="p-6">
            <div className="mb-4">
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                ➕ Añadir nuevo
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin" size={32} />
              </div>
            ) : datos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">No hay datos</p>
              </div>
            ) : (
              <Table>
                <TableHeader columns={getColumns()} />
                <tbody>
                  {datos.map((item) => (
                    <TableRow
                      key={item.id}
                      data={item}
                      columns={getColumns()}
                    />
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>

      {/* Modal para añadir/editar */}
      <Modal
        isOpen={isModalOpen}
        title={editingItem ? 'Editar' : 'Añadir nuevo'}
        onClose={() => {
          setIsModalOpen(false)
          setEditingItem(null)
        }}
      >
        <p className="text-slate-600">
          La funcionalidad de añadir/editar está en desarrollo. Usa la API directamente o crea un formulario aquí.
        </p>
      </Modal>
    </div>
  )
}
