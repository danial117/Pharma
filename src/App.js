import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./scenes/SignUp";
import './main.css'
import NewsBlog from "./scenes/News";
import HomePage from "./scenes/HomePage";
import ProductPage from "./scenes/ProductPage";
import About from "./scenes/About";
import Order from "./scenes/Order";
import PayPalButtonComponent from "./components/PaypalButtonComponent";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAccessToken,setContent } from "./state";
import BrandPage from "./scenes/BrandPage";
import { UserOrder } from "./scenes/UserOrders";
import Contact from "./scenes/Contact";
import NewsPage from "./scenes/NewsPage";





const App=()=>{
  const dispatch=useDispatch()


  useEffect(()=>{
    fetch('http://localhost:3002/content/',{
     method:'GET'
    }).then((response)=>response.json()).then((data)=>{
    
     dispatch(setContent({data:data}))
    })
},[])

  
  


  return(
    <div className="app">
    <BrowserRouter >

    
    <Routes>
      <Route path='/' element={<HomePage/>}> </Route>
      <Route path='/userOrders' element={<UserOrder/>}> </Route>
      <Route path='/productPage/:productId' element={<ProductPage/>}> </Route>
      <Route path='/createAccount' element={<SignUp />}></Route>
      <Route path="/about" element={<About/>} />
      <Route path="/news" element={<NewsBlog/>} />
      <Route path="/news/:newsId" element={<NewsPage/>} />
      <Route path="/brand/:brandId" element={<BrandPage/>} />
      <Route path='/order' element={<ProtectedRoute><Order /></ProtectedRoute>}></Route>
      </Routes>

      
    

    </BrowserRouter> 
    </div>
  )

  


}



export default App;