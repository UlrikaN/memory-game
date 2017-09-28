import React from "react"

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {elapsed: 0}
  }

  componentDidMount = () => {
    this.timer = setInterval(this.tick, 50)
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  tick = () => {
    this.setState({elapsed: new Date() - this.props.start})
  }

  render() {
    const elapsed = Math.round(this.state.elapsed / 100)
    let seconds = (elapsed / 10).toFixed(1)
    return (
      <div>
        <p>You have been playing for <b>{seconds} seconds</b></p>
      </div>
    )
  }
}

export default Timer
