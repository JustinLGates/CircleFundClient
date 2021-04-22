import React from "react";
const Input = ({ text, onChange, placeholder }) => {

  return (
    <input onChange={onChange} placeholder={placeholder} className="m-1 input">{text}</input>
  );
};

export default Input;