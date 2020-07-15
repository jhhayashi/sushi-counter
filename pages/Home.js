import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {createMeal, incrementCount} from '../redux/actions'
import {Ad, getMealName, HighScore, NewMealDialog, ResetMealButton, SushiAnimation} from '../components'
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
  const {highScore, meal} = props
  const [disabled, setDisabled] = useState(false)
  const [showDialog, setShowDialog] = useState(!meal)
  const animation = useRef(null)

  const incrementCount = () => {
    if (disabled) return
    props.incrementCount()
    if (animation.current) animation.current.play(INC_INTERVAL)
    setDisabled(true)
    setTimeout(() => setDisabled(false), INC_INTERVAL)
  }

  const createNewMeal = mealName => {
    props.createMeal(mealName)
    setShowDialog(false)
  }

  return (
    <View style={styles.container}>
      {/* we unmount the element when showDialog is false rather than using the visible prop
          because the race condition causes the defaultMealName to update before the visibility
          prop properly hides the dialog */}
      {showDialog && <NewMealDialog
        defaultMealName={`New Meal ${props.mealCount + 1}`}
        onMealNameSet={createNewMeal}
        onCancel={() => setShowDialog(false)}
        visible={showDialog}
      />}
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

const mapStateToProps = state => ({
  highScore: state.highScore,
  mealCount: state.meals.length,
  meal: last(state.meals),
})

export default connect(mapStateToProps, {createMeal, incrementCount})(Home)
