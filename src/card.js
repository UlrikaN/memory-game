import React from "react"
import './card.css'

const Card = (props) => (
  <div className="card" onClick={props.onClick}>
    <img src={props.src}/>
  </div>
)

export default Card
