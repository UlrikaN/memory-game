import React from "react"
import './game.css'
import Card from "./card"

const Game = () => (
  <div className="game">
    <h1>Ulrika's memory game</h1>
    <div className="cardArea">
      <Card src="/images/bild1.jpg"/>
      <Card src="/images/bild2.jpg"/>
      <Card src="/images/bild3.jpg"/>
      <Card src="/images/bild4.jpg"/>
      <Card src="/images/bild5.jpg"/>
      <Card src="/images/bild6.jpg"/>
      <Card src="/images/bild7.jpg"/>
      <Card src="/images/bild8.jpg"/>
      <Card src="/images/bild1.jpg"/>
      <Card src="/images/bild2.jpg"/>
      <Card src="/images/bild3.jpg"/>
      <Card src="/images/bild4.jpg"/>
      <Card src="/images/bild5.jpg"/>
      <Card src="/images/bild6.jpg"/>
      <Card src="/images/bild7.jpg"/>
      <Card src="/images/bild8.jpg"/>
    </div>
  </div>
)

export default Game
