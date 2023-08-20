import React from "react";
import Header from "./Components/Navbars/Header";
import Auth from "./Components/Authentication/Auth";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Components/MainBody/Welcome";

const App = () => {
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
