import React from "react";
import { ButtonStyle } from "./ButtonStyle"
const Button = ({ text, onclick, buttonStyle = "btn btn-success w-100", context = ButtonStyle.PRIMARY }) => {

  const getStyle = () => {
    switch (context) {
      case ButtonStyle.PRIMARY:
        break;

      default:
        break;

    }
  }
  return (
    <span>
      <button onClick={onclick} className={buttonStyle}>{text}</button>
    </span>

  );
};

export default Button;