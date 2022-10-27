import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 앱이 시작될때마다 데이터가 유지되었는지 확인하고 그렇다면 자동으로 사용자를 로그인시킴 이를 위해 유즈이펙트 실행

  useEffect(() => {
    // 모든 함수 재평가 후에 실행된다.  함수가 실행된 후에 유즈이펙트가 실행됨
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true); // state업뎃되고
    }
  }, []); // 앱이 처음 실행될때만 이 함수 실행됨 왜냐면 의존성배열에 아무것도 없기 때문
  // 즉, 의존성이 변경될때만 재실행된다.

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); // 무언가를 저장할때.
    setIsLoggedIn(true);
  };

  // 단순히
  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
