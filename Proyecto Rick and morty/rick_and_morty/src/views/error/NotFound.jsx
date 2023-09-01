import style from "./NotFound.module.css";
import img from "../../assets/logo.png"
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className={style.NotFound}>
    <div>
     <img src={img} alt="logo" />
      <h1>404</h1>
      <p>Page not found</p>
    </div>
    <div className={style.button}>
      <Link to="/home">
        <button>Take me Home</button>
      </Link>
    </div>
  </div>
  );
}

export default NotFound;