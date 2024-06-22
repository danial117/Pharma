import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./scenes/SignUp";
import './main.css'

import HomePage from "./scenes/HomePage";
import ProductPage from "./scenes/ProductPage";
import About from "./scenes/About";
import Order from "./scenes/Order";
import PayPalButtonComponent from "./components/PaypalButtonComponent";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccessToken } from "./state";









const App=()=>{
  


  return(
    <div className="app">
    <BrowserRouter >

    
    <Routes>
      <Route path='/' element={<HomePage/>}> </Route>
      <Route path='/productPage/:productId' element={<ProductPage/>}> </Route>
      <Route path='/createAccount' element={<SignUp />}></Route>
      <Route path="/about" element={<About/>} />
      <Route path='/order' element={<ProtectedRoute><Order /></ProtectedRoute>}></Route>
      </Routes>

      
    

    </BrowserRouter> 
    </div>
  )

  


}



export default App;