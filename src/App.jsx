import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { HashRouter, Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import ProductId from './pages/ProductId';
import Purchases from './pages/Purchases';
import NavBar from './components/NavBar';
import Button from 'react-bootstrap/Button';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoutes from './components/ProtectedRoutes';
function App() {
 
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className="App">
      <HashRouter>
        <NavBar/>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/productsId/:id" element={<ProductId/>} />
          
          <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases/>} />
          </Route>
        </Routes>
      </HashRouter>

    </div>
  )
}

export default App
