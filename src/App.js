import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import History from './pages/History/History';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import Approval from './pages/Approval/Approval'

function App() {
  return (
    <div >
 
       <Router>        
                 <Routes>
                 <Route exact path='/' element={< Layout />}></Route>
                 <Route exact path='/dashboard' element={< Dashboard />}></Route>
                 <Route exact path='/contact' element={< history />}></Route>
                 <Route exact path='/approval' element={< Approval />}></Route>
          </Routes>
      
       </Router>

</div>
);
  
}

export default App;
