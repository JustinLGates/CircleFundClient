import React from "react";
const Checkbox = ({ text }, { onchange }) => {

  return (
    <div className="form-element-container d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <label className="switch-label">{text}</label>
        <div className="d-inline-flex">
          <label class="switch">
            <input onChange={onchange} type="checkbox" defaultChecked={true} />
            <span class="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Checkbox;