import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import './stylesheets/alignments.css'
import './stylesheets/custom.css'
import './stylesheets/form-elements.css'
import './stylesheets/sizes.css'
import './stylesheets/theme.css'
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';


function App() {
  return (
    <div className="App">
      <p>Book My Show Front end</p>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/Admin' element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
