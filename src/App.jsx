import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AreaLogada from './Pages/AreaLogada/AreaLogada';
import Velas from './Pages/Velas/Velas';

function App() {
  return (
    <Router>
      {/* <Login /> */}
      {/* <AreaLogada /> */}
      <Velas />
    </Router>
  );
}

export default App;