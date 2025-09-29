import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
function Filter() {
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };
  return (
    <div
      style={{
        marginBottom: 20,
      }}
    >
      filter <input onChange={handleFilter} />
    </div>
  );
}

export default Filter;
