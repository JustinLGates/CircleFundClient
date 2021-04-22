import React from "react";
const Button = ({ text, onclick, buttonStyle = "btn btn-success w-100" }) => {

  return (
    <button onClick={onclick} className={buttonStyle}>{text}</button>
  );
};

export default Button;