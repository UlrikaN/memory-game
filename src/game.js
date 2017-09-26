import React from "react"
import './game.css'
import Card from "./card"

class Game extends React.Component {

  state = {

    cards: [
      {src: "/images/bild1.jpg"},
      {src: "/images/bild2.jpg"},
      {src: "/images/bild3.jpg"},
      {src: "/images/bild4.jpg"},
      {src: "/images/bild5.jpg"},
      {src: "/images/bild6.jpg"},
      {src: "/images/bild7.jpg"},
      {src: "/images/bild8.jpg"}
    ]
  }

  render() {
    return (
      <div className="game">
        <h1>Ulrika's memory game</h1>
        <div className="cardArea">
          {this.state.cards.map((card) => (
            <Card src={card.src}/>
          ))}
        </div>
      </div>
    )
  }

}

export default Game
