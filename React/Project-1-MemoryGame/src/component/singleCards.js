import './SingleCards.css'

export default function singleCards({card,handleChoice,flipped}) {

    const handleClick= () =>{
        handleChoice(card)
    }

    return(
        <div className='card' >
            <div className={flipped ? "flipped" : ""}>
              <img className='front' src={card.src} alt='card front' />
              <img 
                className='back' 
                src='img/cover.png' 
                onClick={handleClick}
                alt='card back' 
              />
            </div>          
          </div>
    )
}