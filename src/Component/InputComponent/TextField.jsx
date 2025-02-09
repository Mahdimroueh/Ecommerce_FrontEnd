import React from "react";

const TextField = ({ name, type, value, onChange, label, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label" htmlFor={name}>
        <span className="label-text">{label}</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered"
      />
    </div>
  );
};

export default TextField;
