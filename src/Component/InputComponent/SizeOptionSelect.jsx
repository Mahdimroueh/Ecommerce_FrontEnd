import useSizeOption from "../../api/FetchSizeOption";
import Loading from "../Helper/Loading";
import SelectInput from "./SelectInput";

const SizeOptionSelect = ({ name, value, onChange, parentCategory }) => {
  const {
    data: sizes,
    isLoading: sizesIsLoading,
    isError: sizesIsError,
  } = useSizeOption(parentCategory);

  if (sizesIsLoading) {
    return <Loading />;
  }
  return (
    <SelectInput
      name={name}
      items={sizes}
      label="sizes"
      value={value}
      onChange={onChange}
    />
  );
};

export default SizeOptionSelect;
