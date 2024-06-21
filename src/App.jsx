import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import AreaLogada from './Pages/AreaLogada/AreaLogada';
import Velas from './Pages/Velas/Velas';
import Testemunhos from './Pages/Testemunhos/Testemunhos';
import AddJornal from './Pages/AddJornal/AddJornal';
import AddRevista from './Pages/AddRevista/AddRevista';
import PaginaInicial from './Pages/PaginaInicial/PaginaInicial';

const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/PaginaInicial" element={<PaginaInicial />}/>
     <Route path="/AreaLogada" element={<AreaLogada/>}/>
     <Route path="/Velas" element={<Velas/>}/>
     <Route path="/Testemunhos" element={<Testemunhos/>}/>
     <Route path="/Jornais" element={<AddJornal/>}/>
     <Route path="/Revistas" element={<AddRevista/>}/>
    </Routes>
  );
}

export default App 