import {useState, useEffect} from "react";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

import Cards from "./components/Cards.jsx";
import Nav from "./components/Nav.jsx";
import About from "./views/About.jsx";

import "./App.css";
import Detail from "./views/Detail.jsx";
import ErrorPage from "./views/ErrorPage.jsx";
import Login from "./views/Login.jsx";


function App() {
   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
 
   const [access, setAccess] = useState(false);
   const EMAIL = "joako@gmail.com";
   const PASSWORD = "123456a";

 

   function loginHandler (userData){
      if (userData.password === PASSWORD && userData.email === EMAIL) {
         setAccess(true);
         navigate("/home");
       }
   }
   
  function logoutHandler() {
   setAccess(false);
 }

 useEffect(() => {
   !access && navigate("/");
   //eslint-disable-next-line
 }, [access]);

   function searchHandler(id) {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   function closeHandler(id) {
      // nos llega un string
      let filteredCharacters = characters.filter(
        (character) => character.id !== Number(id)
      );
  
      setCharacters(filteredCharacters);
    }
  
    function randomHandler() {
      let memoria = [];
  
      let randomId = (Math.random() * 826).toFixed();
  
      randomId = Number(randomId);
  
      if (!memoria.includes(randomId)) {
        memoria.push(randomId);
        searchHandler(randomId);
      } else {
        alert("Ese personaje ya fue agregado");
        return;
      }
    }
    return(
    <div className="App">

    {location.pathname !== "/" && (
      <Nav
        onSearch={searchHandler}
        randomize={randomHandler}
        logout={logoutHandler}
      />
    )}

    <Routes>
      <Route path="/" element={<Login login={loginHandler} />} />
      <Route
        path="/home"
        element={<Cards characters={characters} onClose={closeHandler} />}
      />
      <Route path="/about" element={<About />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </div>
);
}

export default App;
