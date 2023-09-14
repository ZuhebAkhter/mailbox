import React, { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  currentUser: "",
  login: (token) => {},
  logout: () => {},
  setPrf:(user) => {}

});

export const AuthContextProvider = (props) => {
    const initialToken=localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);
  const [user,setUser]= useState(null)

  const UserisLoggedIn = !!token;

  const loginHandler = (token) => {
    localStorage.setItem('token',token)
    setToken(token)
  };
  const logoutHandler = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null);
    setUser(null)
  };
  const setuserHandler=(user)=>{
    localStorage.setItem('user',user)
    setUser(user)
  }

  const authcontext = {
    token: token,
    isLoggedIn: UserisLoggedIn,
    currentUser: user,
    login: loginHandler,
    logout: logoutHandler,
    setPrf:setuserHandler
  };

  return (
    <AuthContext.Provider value={authcontext}>
      
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
