import React from "react";
import Input from "../SmallElements/Input"
import Label from "../SmallElements/Label"


const LabeledInput = ({ name, labelText, inputText, inputPlaceholder, onChange }) => {

  return (
    <div className="p-1">
      <Label text={labelText} />
      <br />
      <Input name={name} text={inputText} inputPlaceholder={inputPlaceholder} onChange={onChange} />
    </div>
  );
};

export default LabeledInput;