import { useState } from 'react';
import './App.css';

const cardsImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]

function App() {

  const [cards , setCards] = useState([])
  const [turns , setTurns] = useState(0)

  const shuffleCards = () => {
    const shuffledCards = [...cardsImages, ...cardsImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id : Math.random()}))

    setCards(shuffledCards)
    setTurns(0)

  }



  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map((card)=>(
          <div className='card' key={card.id}>
            <img className='front' src={card.src} alt='card front' />
            <img className='back' src='img/cover.png' alt='card back' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
