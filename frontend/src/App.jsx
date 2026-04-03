import './index.css'
import { useState } from 'react'
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import AulasPage from './pages/AulasPage'
import ProfesoresPage from './pages/ProfesoresPage'
import MateriasPage from './pages/MateriasPage'
import GruposPage from './pages/GruposPage'
import CarrerasPage from './pages/CarrerasPage'
import HorariosPage from './pages/HorariosPage'
import AdminPage from './pages/AdminPage'
import ImportarPage from './pages/ImportarPage'

function App() {
  const [currentPage, setCurrentPage] = useState('inicio')

  const renderPage = () => {
    switch (currentPage) {
      case 'inicio':
        return <HomePage onNavigate={setCurrentPage} />
      case 'aulas':
      case 'laboratorios':
        return <AulasPage />
      case 'profesores':
        return <ProfesoresPage />
      case 'materias':
        return <MateriasPage />
      case 'grupos':
        return <GruposPage />
      case 'carreras':
        return <CarrerasPage />
      case 'horarios':
        return <HorariosPage />
      case 'admin':
        return <AdminPage />
      case 'importar':
        return <ImportarPage />
      default:
        return <HomePage onNavigate={setCurrentPage} />
    }
  }

  const getNavBarTitle = () => {
    const titles = {
      inicio: 'Consulta de Horarios Académicos',
      aulas: 'Aulas',
      laboratorios: 'Laboratorios',
      profesores: 'Profesores',
      materias: 'Materias',
      grupos: 'Grupos',
      carreras: 'Carreras',
      horarios: 'Horarios',
      admin: 'Administración',
      importar: 'Importar Horarios',
    }
    return titles[currentPage] || 'Consulta de Horarios'
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <SideBar onNavigate={setCurrentPage} currentPage={currentPage} />
      <NavBar title={getNavBarTitle()} />
      {renderPage()}
    </div>
  )
}

export default App
