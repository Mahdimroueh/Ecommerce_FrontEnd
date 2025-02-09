import React from "react";

const TextAreaInput = ({ value, name, onChange }) => {
  return (
    <div className="form-control gap-y-2 ">
      <label htmlFor={name} className="label p-0">
        <span className="label-text capitalize">{name}</span>
      </label>
      <textarea
        name={name}
        rows={3}
        value={value}
        onChange={onChange}
        className="textarea-primary border rounded-md"
      ></textarea>
    </div>
  );
};

export default TextAreaInput;
