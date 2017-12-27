import React from 'react'
import {Animated} from 'react-native'
import PropTypes from 'prop-types'
import {DangerZone} from 'expo'

import sushi from './sushi.json'

const {Lottie: LottieView} = DangerZone

export default class SushiAnimation extends React.Component {
  static propTypes = {
    style: PropTypes.any,
  }

  state = {
    progress: new Animated.Value(0),
  }

  setLottieRef = ref => {
    this.animation = ref
  }

  play = duration => {
    if (this.animation) {
      Animated.timing(this.state.progress, {toValue: 1, duration}).start(this.reset)
    }
  }

  reset = ({finished} = {finished: true}) => {
    if (finished && this.animation) {
      this.animation.reset()
      this.setState({progress: new Animated.Value(0)})
    }
  }

  render() {
    return (
      <LottieView
        ref={this.setLottieRef}
        progress={this.state.progress}
        source={sushi}
        style={this.props.style}
        loop
      />
    )
  }
}
