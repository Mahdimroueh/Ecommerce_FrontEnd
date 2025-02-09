const FormRange = ({ label, name, size, price, value, onChange }) => {
  const step = 5;
  const maxPrice = 1000;
  return (
    <div className="form-control">
      <label htmlFor={name} className="label capitalize mr-2">
        <span className="label-text capitalize">{label}: </span>
        <span>{value}</span>
      </label>
      <input
        type="range"
        name={name}
        id="price-range"
        min={0}
        max={maxPrice}
        step={step}
        className={` ${size} range  range-primary`}
        value={value}
        onChange={onChange}
      />
      <div className=" w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-sm">0</span>
        <span className="font-bold text-sm">Max: {value}</span>
      </div>
    </div>
  );
};

export default FormRange;
