import React from "react"
import './game.css'
import Card from "./card"
import shuffle from 'shuffle-array'
import uuidv4 from "uuid/v4"

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
      isMatched: false,
      id: uuidv4()

    }))
    return cardSetup
  }

  handleCardClicked = (cardId) => {
    const newCardState = this.state.cards.map((card) => {
      if (card.id === cardId) {
        card.isFlipped = true
      }
    return card
  })
    this.setState({cards: newCardState})
  }

  resetButton = () => {
    this.setState({cards: this.setupGame()})
  }

  render() {
    return (
      <div className="game">
        <h1>Ulrika's memory game</h1>
        <button onClick={this.resetButton}>Reset!</button>
        <div className="cardArea">
          {this.state.cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              src={card.src}
              whenClicked={this.handleCardClicked}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
            />
          ))}
        </div>
      </div>
    )
  }

}

export default Game
