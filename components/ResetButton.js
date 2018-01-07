import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-native'
import {connect} from 'react-redux'

import {createMeal} from '../redux/actions'

import resetConfirm from './resetConfirm'
import getMealName from './getMealName'

const ResetButton = props => (
  <Button
    title="Reset"
    onPress={() => resetConfirm(() => getMealName(props.createMeal, props.mealCount))}
  />
)

ResetButton.propTypes = {
  createMeal: PropTypes.func.isRequired,
  mealCount: PropTypes.number.isRequired,
}

export default connect(state => ({mealCount: state.meals.length}), {createMeal})(ResetButton)
