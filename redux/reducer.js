import {last, withoutLast} from '../utils'

import {DELETE_MEAL, INCREMENT_COUNT, CREATE_MEAL, SET_ACTIVE_MEAL} from './actions'
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
      return {
        ...state,
        activeMeal: true,
        meals: [...state.meals, new Meal({value: 0, name: action.payload.name})],
      }
    case DELETE_MEAL:
      const index = state.meals.indexOf(action.payload.meal)
      const activeMeal = state.activeMeal && index != state.meals.length - 1
      return {...state, activeMeal, meals: state.meals.filter(meal => meal !== action.payload.meal)}

    // TODO: implement this correctly
    // currently, the active meal is just the last one. while this is true in most cases,
    // it is not true if the last meal is deleted. perhaps the correct way is to give the
    // meals IDs and track this via ID, but for now, we can implement a hack where this value
    // is a boolean and is flipped true when a new meal is created and false if a deleted meal
    // is the active (last) one.
    case SET_ACTIVE_MEAL:
      return {...state, activeMeal: action.payload.activeMeal}
    default:
      return state
  }
}
