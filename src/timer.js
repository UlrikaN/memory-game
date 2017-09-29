import React from "react"

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {elapsed: 0}
  }

  componentDidMount = () => {
    this.timer = setInterval(this.tick, 50)
    this.start = Date.now()
  }

  componentWillUnmount = () => {
    clearInterval(this.timer)
  }

  tick = () => {
    const newTime = new Date() - this.start
    const newTimeSeconds = (Math.round(newTime / 100) / 10 ).toFixed(1)
    this.setState({elapsed: newTime}, () => {this.props.onUpdate(newTimeSeconds)})
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
