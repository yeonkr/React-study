import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  isLoggdIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggdIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 모든 함수 재평가 후에 실행된다.  함수가 실행된 후에 유즈이펙트가 실행됨
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true); // state업뎃되고
    }
  }, []); // 앱이 처음 실행될때만 이 함수 실행됨 왜냐면 의존성배열에 아무것도 없기 때문
  // 즉, 의존성이 변경될때만 재실행된다.

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1"); // 무언가를 저장할때.
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggdIn: isLoggdIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
