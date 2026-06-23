import './App.module.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import EmpresasPage from './pages/Empresas/EmpresasPage'
import Products from './pages/Products/Products';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/empresas" replace />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/produtos" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
