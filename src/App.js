import { useEffect, useState } from 'react'

import css from './icon/css.png'
import html from './icon/html.png'
import js from './icon/js.png'
import react from './icon/react.png'
import api from './icon/api.png'
import github from './icon/github.png'
import question from './icon/question.png'
import React from 'react'
import './App.css';

const initialCards = [
  { id: 1, img: css },
  { id: 2, img: html },
  { id: 3, img: js },
  { id: 4, img: react },
  { id: 5, img: api },
  { id: 6, img: github },
]

const pairOfArrayCards = [...initialCards, ...initialCards]


function App() {

  const [arrayCards, setArrayCards] = useState([])
  const [openCards, setOpenCards] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)


  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  useEffect(() => {
    setArrayCards(shuffle(pairOfArrayCards))
  }, [])

  const flipCard = (index) => () => {
    setOpenCards(opened => [...opened, index])
    setMoves(preMove => preMove + 1)
  }

  useEffect(() => {
    if (openCards < 2) return
    const firstMatched = arrayCards[openCards[0]]
    const secondMatched = arrayCards[openCards[1]]

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id])
    }

    if(openCards.length === 2) setTimeout(() => setOpenCards([]), 1000)

  },[openCards])


  const handleGameRestart = () => {
    setOpenCards([]);
    setMatched([])
    setMoves(0)
    setArrayCards(shuffle(pairOfArrayCards))
  }


  return (
    <div className="container">
      <p className="number-of-strokes">Сделано ходов: {moves}</p>
      <div className="cards">
        {arrayCards.map((item, index) => {
          let isFlipped = false;
          if (openCards.includes(index)) isFlipped = true;
          if (matched.includes(item.id)) isFlipped = true;
          return (
            <div onClick={flipCard(index) }key={index} className={`card ${isFlipped ? 'flipped' : '' }`}>
              <div className='inner'>
                <div className='front'>
                  <img src={item.img} width="100" alt="front-card" />
                </div>
                <div>
                  <img src={question} alt="question-mark"/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <button className="button-restart" onClick={handleGameRestart}>Начать заново </button>
    </div>
  );
}

export default App;
