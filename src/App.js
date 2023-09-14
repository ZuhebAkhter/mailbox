import React, {   useEffect } from "react";
import Header from "./Components/Navbars/Header";
import Auth from "./Components/Authentication/Auth";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/MainBody/Welcome";
import Viewmessage from "./Components/MainBody/Viewmessage";
import SentMessage from "./Components/MainBody/SentMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "./Store/MessageSlice";


const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    setTimeout(()=>{
      fetcMessageshandler();
    },2000)
  })
  
  const email=localStorage.getItem('user')
  
      const userEmailz=email?.split(/[@.]/).join("");
      
     

  const fetcMessageshandler=async()=>{
    const response= await fetch(`https://emailclient-16191-default-rtdb.firebaseio.com/${userEmailz}.json`)
    const data= await response.json();
    for(const key in data){
      dispatch(addMessage({
        id:key,
        rb:data[key].from,
        sub:data[key].userSub,
        text:data[key].usertext,
        read:data[key].read
    }))
      
     }

  }
  

 


  return (
    <>
    
      <header>
        <Header />
        {/* <Composemail/> */}
      </header>
        <Routes>
          <Route path="/" element={<Auth />} ></Route>
          <Route path="*" element={<Auth/>}></Route>
          <Route path="/welcome" element={<Welcome/>} ></Route>
          <Route path='/welcome/:loadedmessageid' element={<Viewmessage/>}></Route>
          <Route path="/sent" element={<SentMessage/>}></Route>
        </Routes>
        
    </>
  );
};

export default App;
