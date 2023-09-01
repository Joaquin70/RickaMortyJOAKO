import {useState, useEffect} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
function Detail() {
  const [character, setCharacter] = useState({});

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios(`https://rickandmortyapi.com/api/character/${id}`).then(({data}) => {
      if (data.name) {
        setCharacter(data);
      } else {
        window.alert("No hay personajes con ese ID");
      }
    });
    return setCharacter({});
    //eslint-disable-next-line
  }, []);
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={style.component}>
      <div>

        <h2 className={style.name}>{character.name}</h2>
        <img src={character.image} alt={character.name} />
      </div>
      <div>
        <div className={style.data} >
          <h3>Species:</h3>
          <p className={style.value} >{character.species}</p>
        </div>
        <div className={style.data}>
          <h3>Gender:</h3>
          <p className={style.value}>{character.gender}</p>
        </div>
        <div className={style.data}>
          <h3>Status:</h3>
          <p className={style.value}>{character.status}</p>
        </div>
        <div className={style.data}>
          <h3>Origin:</h3>
          <p className={style.value}>{character.origin?.name}</p>
        </div>
        <div className={style.data}>
          <h3>Location:</h3>
          <p className={style.value}>{character.location?.name}</p>
        </div>
        <button onClick={goBack} className={style.back}>
          BACK
        </button>
      </div>
    </div>
  );
}

export default Detail;
