import {useState, useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

import Cards from "./components/cards/Cards.jsx";
import Nav from "./components/nav/Nav.jsx"
import Detail from "./views/detail/Detail.jsx";
import NotFound from "./views/error/NotFound.jsx";
import Login from "./views/login/Login.jsx";
import Favorites from "./views/favorites/Favorites.jsx";
import About from "./views/about/About.jsx";

import "./App.css";


function App() {
   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
 
   
   const [access, setAccess] = useState(true);

   async function loginHandler(userData) {
    try {
      const {email, password} = userData;
      const URL = "http://localhost:3001/rickandmorty/login/";
      const {data} = await axios(URL + `?email=${email}&password=${password}`);
      const {access} = data; //true / false
      setAccess(access);
      access && navigate("/home");
    } catch (error) {
      alert(error);
    }
  }
  
  
   
 // function logoutHandler() {
   //setAccess(false);
 //}

 useEffect(() => {
   !access && navigate("/");
   //eslint-disable-next-line
 }, [access]);


 async function searchHandler(id) {
  try {
    const {data} = await axios(
      `http://localhost:3001/rickandmorty/character/${id}`
    );

    if (data.name) {
      setCharacters((oldChars) => [...oldChars, data]);
    } else {
      throw new Error("¡No hay personajes con este ID!");
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}
  

   function closeHandler(id) {
      // nos llega un string
      let filteredCharacters = characters.filter(
        (character) => character.id !== Number(id)
      );
  
      setCharacters(filteredCharacters);
    }

  //  function randomHandler() {
    //  let memoria = [];
  
      //let randomId = (Math.random() * 826).toFixed();
  
     // randomId = Number(randomId);
  
      //if (!memoria.includes(randomId)) {
       // memoria.push(randomId);
       // searchHandler(randomId);
      //} else {
        //alert("Ese personaje ya fue agregado");
        //return;
      //}
    //}
    
    function onLogOut(){
      setAccess(false)
    }
    return(
    <div className="App">

    {location.pathname !== "/" && (
      <Nav
      onLogOut={onLogOut}
        onSearch={searchHandler}
       // randomize={randomHandler}
        //logout={logoutHandler}
       
      />
    )}
  
    <Routes>
      <Route path="/"   element={<Login login={loginHandler} />} />   
      <Route
        path="/home"
        element={<Cards characters={characters} onClose={closeHandler} />}
    
        
      />
      <Route path="/about" element={<About />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </div>
);
}

export default App;
