import React from "react"
import './game.css'
import Card from "./card"
import shuffle from 'shuffle-array'

const photos = [
  "/images/bild1.jpg",
  "/images/bild2.jpg",
  "/images/bild3.jpg",
  "/images/bild4.jpg",
  "/images/bild5.jpg",
  "/images/bild6.jpg",
  "/images/bild7.jpg",
  "/images/bild8.jpg"]

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      cards: this.setupGame()
    }
  }

  setupGame = () => {
    const doublePhotos = photos.concat(photos)
    shuffle(doublePhotos)
    const cardSetup = doublePhotos.map((card) => ({
      src: card,
      isFlipped: false,
      isClicked: false,
      isMatched: false
    }))
    return cardSetup
  }

  render() {
    return (
      <div className="game">
        <h1>Ulrika's memory game</h1>
        <div className="cardArea">
          {this.state.cards.map((card) => (
            <Card
              src={card.src}
              isFlipped={card.isFlipped}
              isClicked={card.isClicked}
              isMatched={card.isMatched}
            />
          ))}
        </div>
      </div>
    )
  }

}

export default Game
