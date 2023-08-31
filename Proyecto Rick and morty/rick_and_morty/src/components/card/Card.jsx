import style from "../card/card.module.css"
import { Link } from "react-router-dom";

import {useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {addFavorite, removeFavorite} from "../../redux/actions/actions";
import {useState, useEffect} from "react";

function Card(props) {
  const navigate = useNavigate();
  const {character, onClose, favorites, addFavorite, removeFavorite} = props;
  const [isFav, setFav] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  function navigateHandler() {
    navigate(`/detail/${character.id}`);
  }
  useEffect(() => {
    if (!onClose) {
      setCloseBtn(false);
    }
  }, []);
  useEffect(() => {
    //[rick, morty, mr poppybutthole]
    favorites.forEach((fav) => {
      if (fav.id === character.id) {
        setFav(true);
      }
    });
  }, [favorites]);

  function handleFavorite(character) {
    if (!isFav) {
      addFavorite(character); //{}
      setFav(true);
    } else {
      removeFavorite(character); //id
      setFav(false);
    }
  }

  return (
    <div className={style.component} >
   <div className={style.buttons}>
    
      <img className={style.image} src={character.image} alt="name" onClick={navigateHandler} />
      <h2 className={style.name}> {character.name}</h2>
         {closeBtn && (
        <button className={style.close}
          onClick={() => {
            onClose(character.id);
          }}
        >
          X
        </button>
      )}
      </div>

      {isFav ? (
        <button
          onClick={() => {
            handleFavorite(character.id)
          }} className={style.fav}
        >
          ❤️
        </button>
      ) : (
        <button
          onClick={() => {
            handleFavorite(character)
          }} className={style.fav}
        >
          🤍
        </button>
      )}

<div>
      
      </div>
      <Link to className={style.image}>
         
      </Link>
      <div className={style.dataContainer}>
        <h2 className={style.name}>{character.name}</h2>
        <h2 className={style.data}>
          <span>Status: </span>
          <span className={style.Value}>{character.status}</span>
        </h2>
        <h2 className={style.data}>
          <span>Gender: </span>
          <span className={style.Value}>{character.gender}</span>
        </h2>
      </div>
     
    </div>
  
    
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFavorite: (character) => dispatch(addFavorite(character)),
    removeFavorite: (id) => dispatch(removeFavorite(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);