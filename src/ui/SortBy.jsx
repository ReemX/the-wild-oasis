import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, type }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      type={type}
      options={options}
      onChange={handleChange}
      value={sortBy}
    ></Select>
  );
}

export default SortBy;
