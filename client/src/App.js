import React from "react";
import {Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// Pages import
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import AddProduct from "./components/AddProduct";
import BidProduct from "./components/BidProduct";
import Products from "./components/Products";
import Nav from "./components/Nav";

import socketIO from 'socket.io-client';


const socket = socketIO.connect('http://localhost:4000');

function App ()  {
  return (
    <>
      <Router>
        <div>
          {/* Nav is available at the top of all the pages as a navigation bar */}
          <Nav socket={socket}/>
          <Routes>
            <Route path='/' element={Dashboard}/>
            <Route path="/login" element={<Login/>} />
            <Route path="register" element={<Register />} />
            <Route path="/products" element={<Products/>} />
            <Route path="/products/add" element={<AddProduct socket={socket}/>} />
              {/* Uses dynamic routing  */}
            <Route path="products/bid/:name/:price" element={<BidProduct socket={socket} />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}
export default App;