import React, { useState } from "react";
import Input from "../SmallElements/Input"
import Label from "../SmallElements/Label"


const LabeledInput = ({ save, inputValue, name, labelText, inputText, inputPlaceholder, onChange, textIsLink }) => {

  const [editing, setEditing] = useState(false)

  const saveData = (e) => {
    e.preventDefault()
    save()
    setEditing(false);
  }

  const handleClick = (e) => {
    if (!textIsLink) {
      setEditing(true)
    }
  }

  return (
    <div>
      {
        editing ?
          <div className="labeled-input shadow action highlight">
            <Label text={labelText} />
            <Input inputValue={inputValue} name={name} text={inputText} inputPlaceholder={inputPlaceholder} onChange={onChange} />
            <button className="btn btn-success ml-4" onClick={(e) => saveData(e)}>SAVE</button>
            <button className="btn btn-danger ml-4" onClick={() => setEditing(false)}>CANCEL</button>
          </div>
          :

          <div onDoubleClick={() => setEditing(true)} onClick={(e) => handleClick(e)} className="labeled-input action boxed-2 highlight my-3">
            <div className="">
              <h5 className="d-inline">{labelText}</h5>
              {
                textIsLink ?
                  <a href={inputValue} className="d-inline px-3 text-primary">{inputValue}</a>
                  :
                  <label className="d-inline px-3">{inputValue}</label>
              }
            </div>
          </div>
      }
    </div>
  );
};

export default LabeledInput;