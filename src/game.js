import React from "react"
import './game.css'
import Card from "./card"
import shuffle from 'shuffle-array'
import uuidv4 from "uuid/v4"
import Timer from "./timer"

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
    const cardSetup = doublePhotos.map((url) => ({
      src: url,
      isFlipped: false,
      isMatched: false,
      id: uuidv4()
    }))
    return cardSetup
  }

  filteredFlippedCards = () => {
    const filteredFlippedCards = this.state.cards.filter((card) => {return card.isFlipped})
    return filteredFlippedCards
  }

  handleCardClicked = (clickedCardId) => {
    const newCardState = this.state.cards.map((card) => {
      const flippedCards = this.filteredFlippedCards()

      if (flippedCards.length < 2) {
        if (card.id === clickedCardId) {
          card.isFlipped = true
        }
      }

      return card
    })

    this.setState({cards: newCardState})
    this.handleFlippedCards()
  }

  handleFlippedCards = () => {
    const flippedCards = this.filteredFlippedCards()

    setTimeout(() => {
      let scoreChange = 0

      if (flippedCards.length >= 2) {
        let newCardState = this.state.cards

        if (flippedCards[0].src !== flippedCards[1].src) {
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
          scoreChange = scoreChange + 2
        }

        this.setState({points: this.state.points + scoreChange, cards: newCardState})
      }},
      1000
    )
  }

  resetButton = () => {
    return this.setState({cards: this.setupGame(), points: 0})
  }

  render() {
    const allCards = this.state.cards.filter((item) => {
      if (!item.isMatched) {
        return true
      }
      else {
        return false
      }})
    if (allCards.length > 0) {
      return (
        <div className="game">
          <h1>Ulrika's memory game</h1>
          <p>Points: {this.state.points}</p>
          <Timer start={Date.now()}/>
          <button className = "reset" onClick={this.resetButton}>Reset!</button>
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
    else {
      return (
        <div className="game">
          <h1>Ulrika's memory game</h1>
          <p>Points: {this.state.points}</p>
          <div className="wrapper">
            <h2> Success! </h2>
            <h3> Play again? </h3>
            <button className="success" onClick={this.resetButton}>Yes!</button>
          </div>
        </div>
      )
    }
  }

}

export default Game
