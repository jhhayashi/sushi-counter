import React, {useRef, useState} from 'react'
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

function Home(props) {
  const [disabled, setDisabled] = useState(false)
  const {highScore, meal} = props
  const animation = useRef(null)

  const incrementCount = () => {
    if (disabled) return
    props.incrementCount()
    if (animation.current) animation.current.play(INC_INTERVAL)
    setDisabled(true)
    setTimeout(() => setDisabled(false), INC_INTERVAL)
  }

  return (
    <View style={styles.container}>
      <HighScore {...highScore} />
      <TouchableOpacity
        disabled={disabled}
        onPress={incrementCount}
        style={styles.button}
      >
        <SushiAnimation style={styles.sushi} ref={animation} />
        <Text style={styles.count}>{meal ? meal.value : 0}</Text>
      </TouchableOpacity>
    </View>
  )
}

Home.propTypes = {
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

/*
class Home extends React.Component {
  componentDidMount() {
    if (!this.props.meal) {
      getMealName(this.props.createMeal, this.props.mealCount)
    }
  }

}
*/

const mapStateToProps = state => ({
  highScore: state.highScore,
  mealCount: state.meals.length,
  meal: last(state.meals),
})

export default connect(mapStateToProps, {createMeal, incrementCount})(Home)
