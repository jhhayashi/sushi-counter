import React from 'react'
import PropTypes from 'prop-types'
import {DangerZone} from 'expo'

import sushi from './sushi.json'

const {Lottie: LottieView} = DangerZone

export default class SushiAnimation extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  setLottieRef = ref => {
    this.animation = ref
  }

  play = () => {
    if (this.animation) {
      this.animation.play()
      setTimeout(() => this.animation.reset(), this.props.duration)
    }
  }

  render() {
    return (
      <LottieView
        ref={this.setLottieRef}
        duration={this.props.duration}
        source={sushi}
        style={this.props.style}
        loop={false}
      />
    )
  }
}
