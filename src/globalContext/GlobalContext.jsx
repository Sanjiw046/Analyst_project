import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const globalVar = createContext();

const GlobalContext = ({ children }) => {

  const { Provider } = globalVar;

  const [showLoader, setShowLoader] = useState(false);
  const [userLogin, setUserLogin] = useState(null);
  const [user, setUser] = useState(null);

  const doLogin = () => {
    const token = localStorage.getItem("access");

    if (token) {
      setUserLogin(token);

      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.log("Invalid token");
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    doLogin();
  }, []);

  return (
    <Provider
      value={{
        showLoader,
        setShowLoader,
        userLogin,
        setUserLogin,
        user,
        setUser
      }}
    >
      {children}
    </Provider>
  );
};

export default GlobalContext;