import "./App.css";
import Home from "./pages/home/home";
import Products from "./pages/Products/Products";
import EmpresasPage from "./pages/Empresas/EmpresasPage";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/empresas" replace />} />
        <Route path="/empresas" element={<EmpresasPage />} />
        <Route path="/produtos" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
