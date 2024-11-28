import { useEffect, useState } from 'react';
import SingleCards from './component/SingleCards';
import './App.css';

const cardsImages = [
  {"src": "/img/helmet-1.png" , mached:false},
  {"src": "/img/potion-1.png" , mached:false},
  {"src": "/img/ring-1.png" , mached:false},
  {"src": "/img/scroll-1.png" , mached:false},
  {"src": "/img/shield-1.png" , mached:false},
  {"src": "/img/sword-1.png" , mached:false}
]

function App() {

  const [cards , setCards] = useState([])
  const [turns , setTurns] = useState(0)

  const [choiceOne , setChoiceOne] = useState(null)
  const [choiceTwo , setChoiceTwo] = useState(null)

  const [disabled , setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id : Math.random()}))

  
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards :
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src ===  choiceOne.src){
              return{...card, mached :true}
            }
            else{
              return card
            }
          })
        })

        resetTurn()
      }
      else {
        setTimeout(() => {
          resetTurn()

        }, 1000);
        
      }
    }

  },[choiceOne,choiceTwo])

  //resect choices and increase turn :
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)

    setTurns(pervTurn => pervTurn + 1)
    setDisabled(false)

  }
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card)=>(
          <SingleCards 
          card={card} 
          key={card.id} 
          handleChoice={handleChoice} 
          flipped={ card === choiceOne || card === choiceTwo || card.mached }
          disabled = { disabled }
          />
        ))}
      </div>

      <p>Turns : {turns}</p>
    </div>
  );
}

export default App;
