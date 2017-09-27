import React from "react"
import './card.css'

class Card extends React.Component {

  handleClick = () => {
    alert(this.props.isFlipped)
  }

  render() {
    return (
      <div className="card" onClick={this.handleClick}>
        <img src= {this.props.isFlipped ? this.props.src : "/images/bild.jpg"}/>
      </div>
    )
  }
}

export default Card
