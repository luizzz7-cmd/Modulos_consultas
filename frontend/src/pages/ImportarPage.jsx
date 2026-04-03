import { useState } from 'react'
import { csvService } from '../services/api'
import Button from '../components/Button'
import Alert from '../components/Alert'
import { Upload, Download, Loader } from 'lucide-react'

export default function ImportarPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const files = e.dataTransfer.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  const handleImportar = async () => {
    if (!file) {
      setError('Por favor selecciona un archivo CSV')
      return
    }

    try {
      setLoading(true)
      setError(null)
      const response = await csvService.importar(file)
      setResultado(response.data)
      setSuccess(`Importación completada: ${response.data.registrosValidos} registros importados`)
      setFile(null)
    } catch (err) {
      setError('Error al importar: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDescargarPlantilla = async () => {
    try {
      const response = await csvService.descargarPlantilla()
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'plantilla_horarios.csv')
      document.body.appendChild(link)
      link.click()
      link.parentElement.removeChild(link)
    } catch (err) {
      setError('Error al descargar plantilla: ' + err.message)
    }
  }

  return (
    <div className="lg:ml-64 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">📤 Importar Horarios desde CSV</h1>

        {error && (
          <Alert
            type="error"
            title="Error"
            message={error}
            onClose={() => setError(null)}
            className="mb-4"
          />
        )}

        {success && (
          <Alert
            type="success"
            title="Éxito"
            message={success}
            onClose={() => setSuccess(null)}
            className="mb-4"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sección de carga */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold mb-6">Carga un archivo CSV</h2>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  dragActive
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
              >
                <Upload size={48} className="mx-auto mb-4 text-slate-400" />
                <p className="text-lg font-semibold mb-2">
                  {file ? file.name : 'Arrastra tu archivo aquí'}
                </p>
                <p className="text-sm text-slate-600 mb-4">o</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                  id="file-input"
                />
                <label htmlFor="file-input">
                  <Button variant="primary" onClick={(e) => e.preventDefault()}>
                    Seleccionar archivo
                  </Button>
                </label>
              </div>

              <div className="mt-8 space-y-4">
                <Button
                  onClick={handleImportar}
                  disabled={!file || loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin inline mr-2" size={20} />
                      Importando...
                    </>
                  ) : (
                    'Importar Horarios'
                  )}
                </Button>

                <Button
                  onClick={handleDescargarPlantilla}
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  <Download className="inline mr-2" size={20} />
                  Descargar plantilla
                </Button>
              </div>
            </div>
          </div>

          {/* Información */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">📋 Formato del CSV</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-slate-800">Columnas requeridas:</p>
                <ul className="list-disc list-inside text-slate-600 mt-2">
                  <li>carrera</li>
                  <li>grupo</li>
                  <li>semestre</li>
                  <li>materia</li>
                  <li>profesor</li>
                  <li>tipo_espacio</li>
                  <li>aula</li>
                  <li>dia</li>
                  <li>hora_inicio</li>
                  <li>hora_fin</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Columnas opcionales:</p>
                <ul className="list-disc list-inside text-slate-600 mt-2">
                  <li>turno</li>
                  <li>edificio</li>
                  <li>piso</li>
                  <li>observaciones</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded mt-4">
                <p className="font-semibold text-slate-800 mb-2">Días válidos:</p>
                <p className="text-slate-600 text-xs">LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Resultado de importación */}
        {resultado && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">📊 Resultado de la importación</h3>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded text-center">
                <p className="text-sm text-green-600 font-semibold">Válidos</p>
                <p className="text-3xl font-bold text-green-700">{resultado.registrosValidos}</p>
              </div>
              <div className="bg-red-50 p-4 rounded text-center">
                <p className="text-sm text-red-600 font-semibold">Con errores</p>
                <p className="text-3xl font-bold text-red-700">{resultado.registrosErroneos}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded text-center">
                <p className="text-sm text-blue-600 font-semibold">Total</p>
                <p className="text-3xl font-bold text-blue-700">{resultado.totalRegistros}</p>
              </div>
            </div>

            {resultado.registrosErroneos > 0 && resultado.detalles.length > 0 && (
              <div>
                <h4 className="font-bold mb-3 text-red-700">Registros con error:</h4>
                <div className="bg-slate-50 border border-red-200 rounded p-4 max-h-96 overflow-y-auto">
                  {resultado.detalles.slice(0, 10).map((detalle, idx) => (
                    <div key={idx} className="mb-3 pb-3 border-b border-red-200 last:border-b-0">
                      <p className="text-sm font-semibold text-red-700">Fila {detalle.fila}</p>
                      <p className="text-sm text-red-600">{detalle.error}</p>
                    </div>
                  ))}
                  {resultado.detalles.length > 10 && (
                    <p className="text-sm text-slate-600 mt-2">... y {resultado.detalles.length - 10} más</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
