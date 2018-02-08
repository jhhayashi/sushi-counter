import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-native'
import {connect} from 'react-redux'

import {createMeal} from '../redux/actions'

import resetMealConfirm from './resetMealConfirm'
import getMealName from './getMealName'

const ResetMealButton = props => (
  <Button
    title="Reset"
    onPress={() => resetMealConfirm(() => getMealName(props.createMeal, props.mealCount))}
  />
)

ResetMealButton.propTypes = {
  createMeal: PropTypes.func.isRequired,
  mealCount: PropTypes.number.isRequired,
}

export default connect(state => ({mealCount: state.meals.length}), {createMeal})(ResetMealButton)
