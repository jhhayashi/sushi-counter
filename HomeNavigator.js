import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Button, Platform} from 'react-native'

import {HeaderLeft} from './components/Header'
import Home from './pages/Home'
import Meals from './pages/Meals'

const Stack = createStackNavigator()

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            ...(HeaderLeft ? {headerLeft: () => <HeaderLeft navigation={navigation} />} : {}),
          })}
        />
        <Stack.Screen
          name="Meals"
          component={Meals}
          options={{title: 'Meal History', headerBackTitle: 'Back'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
