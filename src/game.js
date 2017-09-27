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
      isMatched: false
    }))
    return cardSetup
  }

  handleCardClicked = (cardSrc) => {
    alert(cardSrc)
    const newCardState = this.state.cards.map((card) => {
      card.isFlipped = true
    return card
  })
    this.setState({cards: newCardState})
    //this.setState({cards: })
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
              src={card.src}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onClick={this.handleCardClicked}
            />
          ))}
        </div>
      </div>
    )
  }

}

export default Game
