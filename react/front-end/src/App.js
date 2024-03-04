// impor  t logo from './logo.svg';
import './App.css';
import Nav from "./components/nav";
// import Footer from "./components/footer"
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Private from './components/pc';
import SignUp   from './components/SignUp';
import Login from './components/login';
import Employee from './components/product';
import List from './components/list';
import UpdateProduct from './components/updateproduct'

function App() {

  return (
    <div className="App">
      <BrowserRouter>   
        <Nav />
        <Routes>
          <Route element={<Private />}>
          <Route path='/' element={<List/>}/>
          <Route path='/add' element={<Employee/>}/>
          <Route path='/update/:id' element={<UpdateProduct/>}/>
    
          <Route path='/logout' element={<h1>Logout</h1>}/>
          </Route>

          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Footer/> */}
      
    </div>
  );
}

export default App;
