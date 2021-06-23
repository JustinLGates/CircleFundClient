import React, { useState } from "react";
import Input from "../SmallElements/Input"
import Label from "../SmallElements/Label"


const LabeledInput = ({ save, inputValue, name, labelText, inputText, inputPlaceholder, onChange }) => {

  const [editing, setEditing] = useState(false)

  const saveData = (e) => {
    e.preventDefault()
    save()
    setEditing(false);
  }

  return (
    <div>
      {
        editing ?
          <div className="labeled-input action highlight">
            <Label text={labelText} />
            <Input inputValue={inputValue} name={name} text={inputText} inputPlaceholder={inputPlaceholder} onChange={onChange} />
            <button className="btn btn-success ml-4" onClick={(e) => saveData(e)}>SAVE</button>
          </div>
          :
          <div onClick={(e) => setEditing(true)} className="labeled-input action highlight-on-hover">
            <div>
              <label className="d-inline">{labelText}</label>
              <h5 className="d-inline px-3">{inputValue}</h5>
            </div>
          </div>
      }
    </div>
  );
};

export default LabeledInput;