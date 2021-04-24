import React from "react";
import Input from "../SmallElements/Input"
import Label from "../SmallElements/Label"


const LabeledInput = ({ name, labelText, inputText, inputPlaceholder, onChange }) => {

  return (
    <div className="labeled-input">
      <Label text={labelText} />
      <Input name={name} text={inputText} inputPlaceholder={inputPlaceholder} onChange={onChange} />
    </div>
  );
};

export default LabeledInput;