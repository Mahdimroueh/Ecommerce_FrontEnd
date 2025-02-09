import useBrand from "../../api/FetchBrand";
import Loading from "../Helper/Loading";
import SelectInput from "./SelectInput";

const BrandSelect = ({ name, value, onChange, parentCategory }) => {
  const {
    data: brand,
    isLoading: brandIsLoading,
    isError: brandIsError,
  } = useBrand();

  if (brandIsLoading) {
    return <Loading />;
  }
  return (
    <SelectInput
      name={name}
      items={brand}
      label="brand"
      value={value}
      onChange={onChange}
    />
  );
};

export default BrandSelect;
