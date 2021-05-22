import React from "react";
const Input = ({ inputValue, text, onChange, placeholder }) => {

  return (
    <input value={inputValue} onChange={onChange} placeholder={placeholder} className="input">{text}</input>
  );
};

export default Input;