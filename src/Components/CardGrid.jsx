import { useState, useEffect } from 'react';
import Card from './Card';
import './CardGrid.css'
import Pokemon from '/Users/shiva/OneDrive/Desktop/Coding Files/Web Dev/Frontend/React/Memory Card game/memory-card-game/public/game-logo.jpg';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function getNewCard(url, randInt){
  let response = await fetch(url + randInt.toString());
  let data = await response.json();
  let card = {image: data.sprites.front_default, name: data.name};
//  console.log(card);
  return card;
}

const  CardGrid = (props) => {
  const [cardList, setCardList] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    async function getCardList(){
      const tempCardList = [];
      for(let i = 0; i < 15; i++){
        let randInt = getRandomIntInclusive(i*10 + 1, (i+1)*10);
        tempCardList.push(getNewCard(url, randInt));
      }
      const resolvedCards = await Promise.all(tempCardList);
      setCardList(resolvedCards);
      // console.log(cardList);
    }
    getCardList();

    return () => {
      setCardList([]);
    }
  },[]);

  useEffect(() => {
    console.log(cardList);
  }, [cardList]);

  // const cardList = [
  //   {image: Pokemon, name: "Pokemon 1"},
  //   {image: Pokemon, name: "Pokemon 2"},
  //   {image: Pokemon, name: "Pokemon 3"},
  //   {image: Pokemon, name: "Pokemon 4"},
  //   {image: Pokemon, name: "Pokemon 5"},
  //   {image: Pokemon, name: "Pokemon 6"},
  //   {image: Pokemon, name: "Pokemon 7"},
  //   {image: Pokemon, name: "Pokemon 8"},
  //   {image: Pokemon, name: "Pokemon 9"},
  //   {image: Pokemon, name: "Pokemon 10"},
  //   {image: Pokemon, name: "Pokemon 11"},
  //   {image: Pokemon, name: "Pokemon 12"},
  //   {image: Pokemon, name: "Pokemon 13"},
  //   {image: Pokemon, name: "Pokemon 14"},
  //   {image: Pokemon, name: "Pokemon 15"},
  // ]

  const [positions, setPositions] = useState([]);
  useEffect(() => {
    setPositions(cardList.map((value, index) => index));
  }, [cardList]);
  // console.log(positions);

  const shuffleArray = (array) => {
		let shuffledArray = array.slice(0);
		for (let i = 0; i < shuffledArray.length; i++) {
			const j = Math.floor(Math.random() * shuffledArray.length);
			[shuffledArray[i], shuffledArray[j]] = [
				shuffledArray[j],
				shuffledArray[i],
			];
		}
    // console.log(shuffledArray);
		return shuffledArray;
	};

  const randomizeCards = () => {
		setPositions(shuffleArray(positions));
	};

  return (
		<div id="card-grid">
			{positions.map((position) => {
				return (
					<Card
						key={cardList[position].name}
						image={cardList[position].image}
						name={cardList[position].name}
						reset={props.reset}
						endCurrentStage={props.endCurrentStage}
						incrementScore={props.incrementScore}
						randomizeCards={randomizeCards}
					/>
				);
			})}
		</div>
	);
}

export default CardGrid;