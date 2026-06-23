import "./App.css";
import Home from "./pages/home/home";
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

export default App;