import React from "react";
const Input = ({ text, onChange, placeholder }) => {

  return (
    <input onChange={onChange} placeholder={placeholder} className="input">{text}</input>
  );
};

export default Input;