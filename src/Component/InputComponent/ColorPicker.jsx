import useColor from "../../api/FetchColor";
import Loading from "../Helper/Loading";
import SelectInput from "./SelectInput";

const ColorPicker = ({ name, value, onChange, label }) => {
  const {
    data: colors,
    isLoading: colorsIsLoading,
    isError: colorsIsError,
  } = useColor();

  if (colorsIsLoading) {
    return <Loading />;
  }
  return (
    <SelectInput
      name={name}
      items={colors}
      label="color"
      value={value}
      onChange={onChange}
    />
  );
};

export default ColorPicker;
