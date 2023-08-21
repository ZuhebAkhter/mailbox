import React, { useContext, useEffect,useCallback } from "react";
import Header from "./Components/Navbars/Header";
import Auth from "./Components/Authentication/Auth";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/MainBody/Welcome";
import Home from "./Components/MainBody/Home";
import AuthContext from "./Store/AuthContext";

const App = () => {
  const authCtx=useContext(AuthContext);
  const emailofUser=authCtx.currentUser;
  console.log('emails',emailofUser)
  
  // useEffect(()=>{
  //   fetcMessageshandler();
  // },[])

  // const fetcMessageshandler=async()=>{
  //   const response= await fetch(`https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/basheergmailcom.json`)
  //   const data= await response.json();
  //   console.log(data)
  // }


  return (
    <>
      <header>
        <Header />
      </header>
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="*" element={<Auth/>}></Route>
          <Route path="/welcome" element={<Welcome/>}></Route>
        </Routes>
    </>
  );
};

export default App;
