import React from "react";

const SelectInput = ({ name, value, onChange, items, label }) => {
  return (
    <div className="form-control gap-y-2 ">
      <label htmlFor={name} className="label p-0">
        <span className="label-text capitalize">{label}</span>
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`select select-bordered `}
      >
        <option value="">all {label}</option>
        {items?.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
