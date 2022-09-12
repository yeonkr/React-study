import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button"} // 타입이 지정되지 않을경우를 대비해서 그냥 버튼도 써줌
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
