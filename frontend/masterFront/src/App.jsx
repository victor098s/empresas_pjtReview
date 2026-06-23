import './App.module.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import EmpresasPage from './pages/Empresas/EmpresasPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/empresas" replace />} />
        <Route path="/empresas" element={<EmpresasPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
