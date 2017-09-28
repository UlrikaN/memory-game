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
      cards: this.setupGame(),
      points: 0
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
    this.handleFlippedCards()
  }

  handleFlippedCards = () => {
    const flippedCards = this.state.cards.filter((card) => {if (card.isFlipped) {return card}})

    setTimeout(() => {
      let scoreChange = 0

      if (flippedCards.length >= 2) {
        let newCardState = this.state.cards

        if (flippedCards[0].src != flippedCards[1].src) {
          newCardState = this.state.cards.map((card) => {
            card.isFlipped = false
            return card
          })
          scoreChange = scoreChange - 1
        }
        else {
          newCardState = this.state.cards.map((card) => {
            if (card.isFlipped) {
              card.isMatched = true
              card.isFlipped = false
            }
            return card
          })
          scoreChange = scoreChange + 1
        }

        this.setState({points: this.state.points + scoreChange, cards: newCardState})
      }},
      1000
    )
  }

  resetButton = () => {
    this.setState({cards: this.setupGame(), points: 0})
  }

  render() {
    return (
      <div className="game">
        <h1>Ulrika's memory game</h1>
        <p>Points: {this.state.points}</p>
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
