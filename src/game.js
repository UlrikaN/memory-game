import React from "react"
import './game.css'
import Card from "./card"
import shuffle from 'shuffle-array'
import uuidv4 from "uuid/v4"
import Timer from "./timer"
import Highscore from "./highscore"

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
      cards: this.setupGame(photos.length),
      points: 0,
      clicks: 0,
      welcome: true,
      gameTime: 0,
      value: 0
    }
  }

  handleChange = (event) => {
    return this.setState({cards: this.setupGame(event.target.value), value: event.target.value})
  }

  setupGame = (uniqueCards) => {
    const chosenPhotos = photos.slice(0, uniqueCards)
    const doublePhotos = chosenPhotos.concat(chosenPhotos)
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

    this.setState({cards: newCardState, clicks: this.state.clicks + 1})
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
    return this.setState({cards: this.setupGame(), points: 0, clicks: 0, welcome: true})
  }

  startButton = () => {
    return this.setState({welcome: false})
  }

  handleTimer = (time) => {
    return this.setState({gameTime: time})
  }

  render() {
    const allCards = this.state.cards.filter((item) => {
      if (!item.isMatched) {
        return true
      }
      else {
        return false
      }
    })

    if (this.state.welcome) {
      return (
        <div className="game">
          <h1>Ulrika's memory game</h1>
          <div className="wrapper">
            <h2> Welcome </h2>
            <h3> How many unique cards do you wish to memorise? (1-8) </h3>
            <form onSubmit={this.handleSubmit}>
              <label>
                <p>Number of unique cards: </p>
                <input className="numberBox" type="number" min="1" max={photos.length} value={this.state.value} onChange={this.handleChange} />
              </label>
              <input className="numberSubmit" type="submit" value="Start" onClick={this.startButton} />
            </form>
          </div>
        </div>
      )
    }
    else if (allCards.length > 0) {
      return (
        <div className="game">
          <h1>Ulrika's memory game</h1>
          <p>Points: {this.state.points}</p>
          <p>Cards turned: {this.state.clicks}</p>
          <Timer onUpdate={this.handleTimer}/>
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
          <p>Cards turned: {this.state.clicks}</p>
          <p>Time elapsed: {this.state.gameTime} seconds</p>
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
