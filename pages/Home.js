import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {incrementCount, resetCount} from '../redux/actions'
import {Ad, ResetButton, SushiAnimation} from '../components'

const INC_INTERVAL = 2000

class Home extends React.Component {
  static navigationOptions = {
    title: 'Sushi Counter',
    headerRight: <ResetButton />,
  }

  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
    resetCount: PropTypes.func.isRequired,
  }

  state = {
    disabled: false,
  }

  incrementCount = () => {
    const now = Date.now()
    if (this.state.disabled) return
    this.props.incrementCount()
    this.playAnimation()
    this.disable()
    setTimeout(this.enable, INC_INTERVAL)
  }

  disable = () => { this.setState({disabled: true}) }
  enable = () => { this.setState({disabled: false}) }

  setAnimationRef = ref => {
    this.animation = ref
  }

  playAnimation = () => {
    if (this.animation) this.animation.play(INC_INTERVAL)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={this.incrementCount}
          style={styles.button}
        >
          <SushiAnimation style={styles.sushi} ref={this.setAnimationRef} />
          <Text style={styles.count}>{this.props.count}</Text>
        </TouchableOpacity>
        <Ad />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  count: {
    flex: 1,
    fontSize: 72,
    textAlign: 'center',
  },
  sushi: {
    flex: 2,
  },
})

export default connect(state => state, {incrementCount, resetCount})(Home)
