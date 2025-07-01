import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Cart from './screens/Cart/Cart'
import Order from './screens/PlaceOrder/PlaceOrder'
import Home from './screens/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import MyOrders from './screens/MyOrders/MyOrders'
import Verify from './screens/Verify/Verify'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [ShowLogin, SetShowLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <ToastContainer />
      {ShowLogin ? <LoginPopUp SetShowLogin={SetShowLogin} /> : null}
      <div className='app'>
        <Navbar
          ShowLogin={ShowLogin}
          SetShowLogin={SetShowLogin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          <Route path='verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
