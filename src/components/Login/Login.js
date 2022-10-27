import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect(() => {
  //   return () => {};
  // }, [enteredPassword]); // 의존성을 추가해 스테이트가 변경될때마다 이펙트실행이 표시된다. 이메일칸에 키를 입력해도 안뜨고 비번칸에만 왜냐면 비번칸만 의존성을 추가했으니까.
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    // 보통 사이드이펙트를 처리하기 위해 사용한다 유즈이펙트는.
    // 사용자 입력 데이터의 사이드이펙트. 뭔가에 대한 응답으로 실행되는 코드를 다루는데 도움된다.
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid); // 이 코드는 모든 키 입력에 대해 한번만 실행된다. 수십개가 아니라. 굳
    }, 500); // 사용자가 타이핑을 중지했을때

    return () => {
      clearTimeout(identifier); //
    }; // 클린업함수. 클린업프로세스로서 실행됨 유즈이펙트가 다음번에 이 함수를 실행하기 전까지.
    // 이 함수는 유즈에픅트 함수가 실행될때 처음 실행되는 경우를 제외하고 실행됨.
    // 클린업함수는 첫번째 사이드이펙트함수가 실행되기 전엔 실행되지 않음. 그후에 실행됨
  }, [emailIsValid, passwordIsValid]);
  //setFormIsValids는 실행하지않음.  함수 그 자체를 의존성으로 추가한다. 생략도 가능한데 이런 스테이트 업뎃 함수는 기본적으로 리액트에 의해 절대 변경되지 않기때문
  // 그래서 생략가능. 엔터이메일, 엔터패스워드는 바뀔 수 있음
  // 유즈이펙트는 사이드이펙트(http리퀘스트, 키입력을 듣고 입력된 데이터를 저장)를 처리하게 위해 사용함.
  // 즉 키 입력에 대한 응답으로 해당폼의 유효성을 확인하고 업데이트하는 것이 사이드이펙트다. 사용자 입력데이터의 사이드이펙트다.
  // 유즈이펙트는 무언가에 대한 응답으로 실행되는 코드를 다루는데 도움된다.

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
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
