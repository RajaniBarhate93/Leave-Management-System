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

function App() {
  return (
    <div >
   <Header/>
       <Router>        
                 <Routes>
                 <Route exact path='/' element={< Login />}></Route>
                 <Route exact path='/dashboard' element={< Dashboard />}></Route>
                 <Route exact path='/contact' element={< history />}></Route>
          </Routes>
      
       </Router>
<Footer/>
</div>
);
  
}

export default App;
