import React, {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
import {AuthContext} from "./utilidades/context";
import {isUserLogedApi} from "./Api/auth";
import SignInSingUp from "./Page/SigniInSingUp/SignInSingUp";
import Routing from "./Routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState (false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect (()=>{
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false);
    setLoadUser (true);
  }, [refreshCheckLogin]);

  if (!loadUser) return null;

  return <AuthContext.Provider value={user}>
    {user ? 
    <Routing setRefreshCheckLogin={setRefreshCheckLogin} /> : <SignInSingUp setRefreshCheckLogin = {setRefreshCheckLogin}/>}

    <ToastContainer 
    position = "top-right"
    autoClose = {5000}
    hideProgressBar
    newestOnTop = {false}
    closeOnClick
    rtl = {false} 
    pauseOnVisibilityChange
    draggable
    pauseOnHover
    />
  </AuthContext.Provider>;
} 


