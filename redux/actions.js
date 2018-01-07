export const INCREMENT_COUNT = 'INCREMENT_COUNT'
export const CREATE_MEAL = 'CREATE_MEAL'

export const incrementCount = () => ({type: INCREMENT_COUNT})
export const createMeal = name => ({type: CREATE_MEAL, payload: {name}})
