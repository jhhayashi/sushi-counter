import {INCREMENT_COUNT, RESET_COUNT} from './actions'
import {HighScore} from './types'

const DEFAULT_STATE = {count: 0, highScore: new HighScore(0)}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INCREMENT_COUNT: {
      const count = state.count + 1
      const highScore = count > state.highScore.value ? new HighScore(count) : state.highScore
      return {...state, highScore, count}
    }
    case RESET_COUNT:
      return {...state, count: 0}
    default:
      return state
  }
}
