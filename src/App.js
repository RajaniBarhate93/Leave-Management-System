import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Application from './pages/Application/Application';
import Login from './pages/Login/Login';
import Records from './pages/RecordsDashboard/Records';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'
import Layout from './components/Layout/Layout'
import Approval from './pages/Approval/Approval'
import TableComponent from './components/TableComponent';

function App() {
  return (
    <div >
 
       <Router>        
                 <Routes>
                 <Route exact={true} path='/' element={< Layout />}></Route>
                 <Route exact={true} path='/dashboard' element={< Application />}></Route>
                 <Route exact={true} path='/records' element={< Records />}></Route>
                 <Route exact={true} path='/approval' element={< Approval />}></Route>
                 <Route exact={true} path='/table' element={< TableComponent />}></Route>
          </Routes>
      
       </Router>

</div>
);
  
}

export default App;
