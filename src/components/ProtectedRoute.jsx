import React from "react";
import { Navigate } from "react-router-dom";
 
import { useSelector } from "react-redux";


const ProtectedRoute = ({ children }) => {
    const accessToken=useSelector((state)=>state.accessToken)
  
    return accessToken ? children : <Navigate to="/createAccount" />;
  };

export default ProtectedRoute;