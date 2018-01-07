import {last, withoutLast} from '../utils'

import {INCREMENT_COUNT, CREATE_MEAL} from './actions'
import {Meal} from './types'

const DEFAULT_STATE = {highScore: new Meal(), meals: []}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INCREMENT_COUNT: {
      const meal = last(state.meals).increment()
      const highScore = meal.value > state.highScore.value ? meal : state.highScore
      return {...state, highScore, meals: [...withoutLast(state.meals), meal]}
    }
    case CREATE_MEAL:
      return {...state, meals: [...state.meals, new Meal({value: 0, name: action.payload.name})]}
    default:
      return state
  }
}
