import React, { useState } from "react";
import LabeledInput from "../Composites/LabeledInput"
import Label from "../SmallElements/Label"


const EditMultiText = ({ save, inputValue, name, labelText, textArray, onAdd, onRemove, onChange }) => {

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
          <div>

            <div className="d-flex">
              <div className="flex-grow-1">
                <LabeledInput className="pr-2"
                  inputValue={inputValue}
                  name={name}
                  labelText={labelText}
                  onChange={(e) => onChange(e.target.value)} />
              </div>

              <span className="p-1 mr-1">
                <button className=" btn btn-success mr-4" onClick={onAdd}><i className="fa fa-plus"></i></button>
              </span>
            </div>
            {
              textArray.map((item, index) =>
                <div key={index} className="d-flex">
                  <div className="flex-grow-1 labeled-input pl-5">
                    <Label text={`${index + 1}. ${item}`}></Label>
                  </div>

                  <span className="p-1 mr-1">
                    <button className=" btn btn-danger mr-4" onClick={e => onRemove(e, index)} ><i className="fa fa-minus"></i></button>
                  </span>
                </div>
              )
            }
            {textArray.length > 0 ? (
              <div className="labeled-input py- pl-5">
                <Label text={`${textArray.length + 1}. ${inputValue}`} />
              </div>)
              : (<></>)
            }
            <button className="btn btn-success ml-4" onClick={(e) => saveData(e)}>SAVE</button>

          </div>
          :
          <div onClick={(e) => setEditing(true)} className="labeled-input action highlight-on-hover">
            {
              textArray.map((item, index) =>
                <div key={index} className="d-flex">
                  <div className="flex-grow-1 labeled-input pl-5">
                    <h5>{index + 1 + ". " + item}</h5>
                  </div>

                  <span className="p-1 mr-1">
                    <button className="btn btn-danger mr-4" onClick={e => onRemove(e, index)} ><i className="fa fa-minus"></i></button>
                  </span>
                </div>
              )
            }
          </div>
      }
    </div>
  );
};

export default EditMultiText;