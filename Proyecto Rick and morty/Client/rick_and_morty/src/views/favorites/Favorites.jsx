// import {connect} from "react-redux";
import {useSelector, useDispatch} from "react-redux";
import {sortById, filterByGender, reset} from "../../redux/actions/actions";
import Cards from "../../components/cards/Cards";
import style from "./favorites.module.css"
function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  function sortHandler(event) {
    dispatch(sortById(event.target.value));
  }

  function filterHandler(event) {
    dispatch(filterByGender(event.target.value));
  }

  function resetHandler() {
    dispatch(reset());
  }

  return (
    <div className={style.selectors}>
      <select placeholder="Gender" onChange={filterHandler}>
        {["Male", "Female", "unknown", "Genderless"].map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <select placeholder="Sort" onChange={sortHandler}>
        {["Ascendente", "Descendente"].map((order) => (
          <option key={order} value={order}>
            {order}
          </option>
        ))}
      </select>
      <button onClick={resetHandler} className={style.reset}>RESET</button>
      <div className={style.cards}>
      <Cards characters={favorites} className={style.cards}/>
    </div>
    </div>
  );
}

export default Favorites;