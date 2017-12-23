import {INCREMENT_COUNT, RESET_COUNT} from './actions'

const DEFAULT_STATE = {count: 0}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {...state, count: state.count + 1}
    case RESET_COUNT:
      return DEFAULT_STATE
    default:
      return state
  }
}
