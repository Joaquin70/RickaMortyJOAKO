import Card from "../card/Card";
import style from "../cards/cards.module.css"

export default function Cards({characters, onClose}) {
   return (
     <div className={style.mainContainer}>
       {characters.map((character) => (
         <Card key={character.id} character={character} onClose={onClose} />
       ))}
     </div>
   );
 }
 
