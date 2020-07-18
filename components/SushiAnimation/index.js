import React from 'react'
import {Animated} from 'react-native'
import PropTypes from 'prop-types'
import Lottie from 'lottie-react-native'

import sushi from './sushi.json'

export default class SushiAnimation extends React.Component {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  }

  state = {
    progress: new Animated.Value(0),
  }

  setLottieRef = ref => {
    this.animation = ref
  }

  play = duration => {
    if (this.animation) {
      Animated.timing(this.state.progress, {toValue: 1, duration, useNativeDriver: true}).start(
        this.reset
      )
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
      <Lottie
        ref={this.setLottieRef}
        progress={this.state.progress}
        source={sushi}
        style={this.props.style}
        loop
      />
    )
  }
}
