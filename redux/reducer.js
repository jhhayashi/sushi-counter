import {last, withoutLast} from '../utils'

import {INCREMENT_COUNT, RESET_COUNT} from './actions'
import {Meal} from './types'

const DEFAULT_STATE = {highScore: new Meal(0), meals: [new Meal(0)]}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INCREMENT_COUNT: {
      const meal = last(state.meals).increment()
      const highScore = meal.value > state.highScore.value ? meal : state.highScore
      return {...state, highScore, meals: [...withoutLast(state.meals), meal]}
    }
    case RESET_COUNT:
      return {...state, meals: [...state.meals, new Meal(0)]}
    default:
      return state
  }
}
