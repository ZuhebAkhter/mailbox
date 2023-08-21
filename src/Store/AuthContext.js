import React, { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  currentUser: "",
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const UserisLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token)
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const authcontext = {
    token: token,
    isLoggedIn: UserisLoggedIn,
    currentUser: "",
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authcontext}>
      
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
