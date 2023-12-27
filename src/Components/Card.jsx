import { useEffect, useState } from 'react';
import './Card.css';

const Card = (props) => {
  const [wasClicked, setWasClicked] = useState(false);

  const handleOnClick = () => {
    setWasClicked(true);
    if(wasClicked){
      props.endCurrentStage();
    }else{
      props.incrementScore();
    }
    props.randomizeCards();
  }
  
  useEffect(() => {
    if(props.reset){
      setWasClicked(false);
    }
  }, [props.reset]);

  return(
    <div className="card" key={props.image} onClick={handleOnClick}>
      <img src={props.image} alt={props.name}></img>
      <br></br>
      <span>
        <strong>{props.name}</strong>
      </span>
    </div>
  )
}

export default Card;