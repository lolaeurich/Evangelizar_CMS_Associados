import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";
import Login from './Pages/Login/Login';
import AreaLogada from './Pages/AreaLogada/AreaLogada';
import Velas from './Pages/Velas/Velas';
import Testemunhos from './Pages/Testemunhos/Testemunhos';

const App = () => {
  return (
    <Routes>
     <Route path="/" element={<Login />}/>
     <Route path="/AreaLogada" element={<AreaLogada/>}/>
     <Route path="/Velas" element={<Velas/>}/>
     <Route path="/Testemunhos" element={<Testemunhos/>}/>
    </Routes>
  );
}

export default App 