import {AlertIOS} from 'react-native'

export default (onMealNameSet, mealCount) =>
  AlertIOS.prompt(
    'Set Meal Name',
    'Enter a name for this meal',
    [{text: 'OK', onPress: onMealNameSet}],
    'plain-text',
    `New Meal ${mealCount + 1}`
  )
