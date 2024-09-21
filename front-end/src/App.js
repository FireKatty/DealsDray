import './App.css';
import Nav from "./components/nav";
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Private from './components/pc';
import SignUp   from './components/SignUp';
import Login from './components/login';
import EmployeeList from './components/EmployeeLIst';
import DashBoard from './components/DashBoard';
import CreateEmployee from "./components/CreateEmployee"
import EditEmployee from './components/EditEmployee'

function App() {

  return (
    <div className="App">
      <BrowserRouter>   
        <Nav />
        <Routes>
          <Route element={<Private />}>
          <Route path='/' element={<DashBoard/>}/>
          <Route path='/create' element={<CreateEmployee/>}/>
          <Route path='/add' element={<EmployeeList/>}/>
          <Route path='/update/:id' element={<EditEmployee/>}/>
    
          <Route path='/logout' element={<h1>Logout</h1>}/>
          </Route>

          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
  
      
    </div>
  );
}

export default App;
