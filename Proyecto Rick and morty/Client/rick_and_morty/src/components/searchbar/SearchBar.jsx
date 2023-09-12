import styles from"./SearchBar.module.css"
import searchIcon from "../../assets/descarga.png";
import randomIcon from "../../assets/random.png";
import favIcon from "../../assets/fav.png";
import {useState} from "react";

export default function SearchBar({onSearch}) {
  const [id, setId] = useState("");

  function changeHandler(event) {
    setId(event.target.value);
  }
  function handleRandomClick() {
    const randomId = Math.floor(Math.random() * 826) + 1;

    onSearch(randomId);

    setId("");
  }
  return (
    <div className={styles.searchBar} >
       
      <button className={styles.random} onClick={handleRandomClick}>
        <img src={randomIcon}  />
      </button>
      <input
        type="search"
        onChange={changeHandler}
        value={id}
        placeholder="Igrese Un ID"
      />
      <button  className={styles.search} onClick={() => {onSearch(id);}} >
      <img src={searchIcon} />
      </button>
    
    </div>
  );
}