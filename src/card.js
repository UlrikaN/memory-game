import React from "react"
import './card.css'

class Card extends React.Component {

  getClassName = () => {
    if (this.props.isFlipped) {
      return "card"
    }
    else if (this.props.isMatched) {
      return "card Gone"
    }
    else {
      return "card Back"
    }
  }

  handleClick = () => {
    if (!this.props.isMatched) {
      this.props.whenClicked(this.props.id)
    }
  }

  render() {
    return (
      <div className={this.getClassName()} onClick={this.handleClick}>
        <img src={this.props.isFlipped ? this.props.src : "/images/bild.jpg"} alt="A memory card"/>
      </div>
    )
  }
}

export default Card
