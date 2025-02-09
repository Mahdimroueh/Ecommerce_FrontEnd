import useCategory from "../../api/FetchCategory";
import Loading from "../Helper/Loading";
import SelectInput from "./SelectInput";

const CategorySelector = ({ name, value, onChange, parentCategory }) => {
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
  } = useCategory(parentCategory === "men" ? 1 : 2);

  if (!categories && categoryIsLoading) {
    return <Loading />;
  }
  return (
    <SelectInput
      name={name}
      items={categories}
      label="category"
      value={value}
      onChange={onChange}
    />
  );
};

export default CategorySelector;
