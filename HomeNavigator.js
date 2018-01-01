import {StackNavigator} from 'react-navigation'

import Home from './pages/Home'
import Meals from './pages/Meals'

export default StackNavigator({
  Home: {
    screen: Home,
  },
  Meals: {
    screen: Meals,
  },
})
