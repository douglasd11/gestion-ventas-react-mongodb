import Login from './components/Login';
import Home from './components/home';
import AgregarUsuario from './components/usuarios/AgregarUsuario';
import EditarUsuario from './components/usuarios/EditarUsuario';
import ListaUsuarios from './components/usuarios/ListaUsuarios';
import AgregarRol from './components/usuarios/roles/AgregarRol';
import EditarRol from './components/usuarios/roles/EditarRol';
import ListaRoles from './components/usuarios/roles/ListaRoles';
import ListaVentas from './components/ventas/ListaVentas';
import AgregarVenta from './components/ventas/AgregarVenta';
import EditarVenta from './components/ventas/EditarVenta';
import './index.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ListaProductos from './components/productos/ListaProductos';
import AgregarProducto from './components/productos/AgregarProducto';
import EditarProducto from './components/productos/EditarProducto';


function App() {
  return (
    <div className="App">

      <nav className="navbar narbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand text-center d-flex align-items-center text-light"> 
            <img src="/logo.png" alt="Logo" width="80" height="80" className="d-inline-block align-text-top rounded-circle me-4"/>
            <h3>REBAJA | Sistema gestion de ventas</h3>
          </a>
        </div>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} exact></Route>
          <Route path='/inicio' element={<Home/>} exact></Route>

          <Route path='/listaUsuarios' element={<ListaUsuarios/>} exact></Route>
          <Route path='/agregarUsuario' element={<AgregarUsuario/>} exact></Route>
          <Route path='/editarUsuario/:idusuario' element={<EditarUsuario/>} exact></Route>

          <Route path='/listaRoles' element={<ListaRoles/>} exact></Route>
          <Route path='/agregarRol' element={<AgregarRol/>} exact></Route>
          <Route path='/editarRol/:idrol' element={<EditarRol/>} exact></Route>

          <Route path='/listaVentas' element={<ListaVentas/>} exact></Route>
          <Route path='/agregarVenta' element={<AgregarVenta/>} exact></Route>
          <Route path='/editarVenta/:idventa' element={<EditarVenta/>} exact></Route> 

          <Route path='/listaProductos' element={<ListaProductos/>} exact></Route>
          <Route path='/agregarProducto' element={<AgregarProducto/>} exact></Route>
          <Route path='/editarProducto/:idproducto' element={<EditarProducto/>} exact></Route> 

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
