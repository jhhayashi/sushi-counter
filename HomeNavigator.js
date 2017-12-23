import React from 'react'
import {StackNavigator} from 'react-navigation'

import Home from './pages/Home'

export default StackNavigator({
  Home: {
    screen: Home,
  },
})
