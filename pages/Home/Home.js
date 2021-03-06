import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {connect} from 'react-redux'

import {createMeal, incrementCount} from '../../redux/actions'
import {
  // Ad,
  HighScore,
  NewMealDialog,
  SushiAnimation,
} from '../../components'
import {HeaderRight} from '../../components/Header'
import {last} from '../../utils'

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
  const {disableDialogs, highScore, meal, navigation} = props
  const [disabled, setDisabled] = useState(false)
  const [shouldShowDialog, setShouldShowDialog] = useState(!meal && !disableDialogs)
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
    setShouldShowDialog(false)
  }

  const showDialog = useCallback(() => setShouldShowDialog(true))

  // reset button in navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onReset={showDialog} navigation={navigation} />,
      title: meal && meal.name ? meal.name : 'Sushi Counter',
    })
  })

  return (
    <View style={styles.container}>
      {/* we unmount the element when shouldShowDialog is false rather than using the visible prop
          because the race condition causes the defaultMealName to update before the visibility
          prop properly hides the dialog */}
      {shouldShowDialog && (
        <NewMealDialog
          defaultMealName={`New Meal ${props.mealCount + 1}`}
          onMealNameSet={createNewMeal}
          onCancel={() => setShouldShowDialog(false)}
          visible={shouldShowDialog}
        />
      )}
      <HighScore {...highScore} />
      <TouchableOpacity
        disabled={disabled}
        onPress={meal ? incrementCount : showDialog}
        style={styles.button}
      >
        <SushiAnimation style={styles.sushi} ref={animation} />
        <Text style={styles.count}>{meal ? meal.value : '--'}</Text>
      </TouchableOpacity>
    </View>
  )
}

Home.propTypes = {
  meal: PropTypes.shape({
    value: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  mealCount: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  createMeal: PropTypes.func.isRequired,
  highScore: PropTypes.shape({
    value: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  incrementCount: PropTypes.func.isRequired,
  disableDialogs: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  highScore: state.highScore,
  mealCount: state.meals.length,
  meal: state.activeMeal ? last(state.meals) : null,
})

export default connect(mapStateToProps, {createMeal, incrementCount})(Home)
