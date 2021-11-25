import {  useEffect, useState } from 'react'

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


  return (
    <div className="App">
      {console.log({ arrayCards })}
    </div>
  );
}

export default App;
