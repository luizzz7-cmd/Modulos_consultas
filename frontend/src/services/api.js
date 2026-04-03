import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// HORARIOS
export const horarioService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/horarios', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/horarios/${id}`),
  crear: (datos) =>
    api.post('/horarios', datos),
  actualizar: (id, datos) =>
    api.put(`/horarios/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/horarios/${id}`),
  consultarDisponibilidad: (espacioId, dia, hora, periodoId) =>
    api.get('/horarios/disponibilidad', {
      params: { espacioId, dia, hora, periodoId },
    }),
}

// ESPACIOS
export const espacioService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/espacios', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/espacios/${id}`),
  crear: (datos) =>
    api.post('/espacios', datos),
  actualizar: (id, datos) =>
    api.put(`/espacios/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/espacios/${id}`),
}

// PROFESORES
export const profesorService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/profesores', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/profesores/${id}`),
  crear: (datos) =>
    api.post('/profesores', datos),
  actualizar: (id, datos) =>
    api.put(`/profesores/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/profesores/${id}`),
  obtenerHorarios: (id, periodoId = null) =>
    api.get(`/profesores/${id}/horarios`, {
      params: { periodoId },
    }),
}

// MATERIAS
export const materiaService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/materias', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/materias/${id}`),
  crear: (datos) =>
    api.post('/materias', datos),
  actualizar: (id, datos) =>
    api.put(`/materias/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/materias/${id}`),
}

// GRUPOS
export const grupoService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/grupos', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/grupos/${id}`),
  crear: (datos) =>
    api.post('/grupos', datos),
  actualizar: (id, datos) =>
    api.put(`/grupos/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/grupos/${id}`),
  obtenerHorarios: (id, periodoId = null) =>
    api.get(`/grupos/${id}/horarios`, {
      params: { periodoId },
    }),
}

// CARRERAS
export const carreraService = {
  obtenerTodos: (filtros = {}) =>
    api.get('/carreras', { params: filtros }),
  obtenerPorId: (id) =>
    api.get(`/carreras/${id}`),
  crear: (datos) =>
    api.post('/carreras', datos),
  actualizar: (id, datos) =>
    api.put(`/carreras/${id}`, datos),
  eliminar: (id) =>
    api.delete(`/carreras/${id}`),
  obtenerEspacios: (id, periodoId = null) =>
    api.get(`/carreras/${id}/espacios`, {
      params: { periodoId },
    }),
}

// CSV
export const csvService = {
  importar: (archivo) => {
    const formData = new FormData()
    formData.append('archivo', archivo)
    return api.post('/csv/importar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  obtenerHistorial: () =>
    api.get('/csv/historial'),
  descargarPlantilla: () =>
    api.get('/csv/descargar-plantilla', {
      responseType: 'blob',
    }),
}

export default api
