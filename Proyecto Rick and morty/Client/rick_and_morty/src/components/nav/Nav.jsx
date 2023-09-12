import SearchBar from "../searchbar/SearchBar";
import {Link} from "react-router-dom";
import style from "./Nav.module.css";
import Logo from "../../assets/logo.png"
function Nav({onSearch, randomize,onLogOut}) {
  return (
    <div className={style.navbar} >
      <div className={style.logo} >
      <img src={Logo}></img>
      </div>
       <SearchBar onSearch={onSearch} />
       <div className={style.buttons}>
        <Link to="/home" className={style.homeButton}>Home</Link>
        <Link to="/about" className={style.aboutButton}>About</Link>
       <button onClick={onLogOut} className={style.logoutButton}>Log Out</button>
      <div >
        <Link to="/favorites" className={style.favButton}>Favorites</Link>
        <Link to="/"></Link>
      </div>

  </div>
    </div>
  );
}

export default Nav;
