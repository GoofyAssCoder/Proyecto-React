import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Posts from "./Posts";
import PerfilUsuario from "./PerfilUsuario";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/perfil/:userId" element={<PerfilUsuario />} />
      </Routes>
    </Router>
  );
}

export default App; 

