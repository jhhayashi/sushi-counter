import React from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {createMeal, incrementCount} from '../redux/actions'
import {Ad, getMealName, HighScore, ResetMealButton, SushiAnimation} from '../components'
import {last} from '../utils'

const INC_INTERVAL = 2000

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

class Home extends React.Component {
  static propTypes = {
    meal: PropTypes.shape({
      value: PropTypes.number.isRequired,
    }),
    mealCount: PropTypes.number.isRequired,
    createMeal: PropTypes.func.isRequired,
    highScore: PropTypes.shape({
      value: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    incrementCount: PropTypes.func.isRequired,
  }

  state = {
    disabled: false,
  }

  componentDidMount() {
    if (!this.props.meal) {
      getMealName(this.props.createMeal, this.props.mealCount)
    }
  }

  setAnimationRef = ref => {
    this.animation = ref
  }

  incrementCount = () => {
    if (this.state.disabled) return
    this.props.incrementCount()
    this.playAnimation()
    this.disable()
    setTimeout(this.enable, INC_INTERVAL)
  }

  disable = () => {
    this.setState({disabled: true})
  }
  enable = () => {
    this.setState({disabled: false})
  }

  playAnimation = () => {
    if (this.animation) this.animation.play(INC_INTERVAL)
  }

  render() {
    const {highScore, meal} = this.props
    return (
      <View style={styles.container}>
        <HighScore {...highScore} />
        <TouchableOpacity
          disabled={this.state.disabled}
          onPress={this.incrementCount}
          style={styles.button}
        >
          <SushiAnimation style={styles.sushi} ref={this.setAnimationRef} />
          <Text style={styles.count}>{meal ? meal.value : 0}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  highScore: state.highScore,
  mealCount: state.meals.length,
  meal: last(state.meals),
})

export default connect(mapStateToProps, {createMeal, incrementCount})(Home)
