import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   return () => {};
  // }, [enteredPassword]); // 의존성을 추가해 스테이트가 변경될때마다 이펙트실행이 표시된다. 이메일칸에 키를 입력해도 안뜨고 비번칸에만 왜냐면 비번칸만 의존성을 추가했으니까.

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      ); // 이 코드는 모든 키 입력에 대해 한번만 실행된다. 수십개가 아니라. 굳
    }, 500);

    return () => {
      clearTimeout(identifier); //
    }; // 클린업함수. 클린업프로세스로서 실행됨 유즈이펙트가 다음번에 이 함수를 실행하기 전까지.
    // 이 함수는 유즈에픅트 함수가 실행될때 처음 실행되는 경우를 제외하고 실행됨.
    // 클린업함수는 첫번째 사이드이펙트함수가 실행되기 전엔 실행되지 않음. 그후에 실행됨
  }, [setFormIsValid, enteredEmail, enteredPassword]);
  //setFormIsValids는 실행하지않음.  함수 그 자체를 의존성으로 추가한다. 생략도 가능한데 이런 스테이트 업뎃 함수는 기본적으로 리액트에 의해 절대 변경되지 않기때문
  // 그래서 생략가능. 엔터이메일, 엔터패스워드는 바뀔 수 있음
  // 유즈이펙트는 사이드이펙트(http리퀘스트, 키입력을 듣고 입력된 데이터를 저장)를 처리하게 위해 사용함.
  // 즉 키 입력에 대한 응답으로 해당폼의 유효성을 확인하고 업데이트하는 것이 사이드이펙트다. 사용자 입력데이터의 사이드이펙트다.
  // 유즈이펙트는 무언가에 대한 응답으로 실행되는 코드를 다루는데 도움된다.

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
