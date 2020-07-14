import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native'

import Home from './pages/Home'
import Meals from './pages/Meals'
import {ResetMealButton} from './components'

const Stack = createStackNavigator()

export default function HomeNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            title: 'Sushi Counter',
            headerRight: () => <ResetMealButton />,
            headerLeft: () => <Button title="History" onPress={() => navigation.navigate('Meals')} />,
          })}
        />
        <Stack.Screen name="Meals" component={Meals} options={{title: 'Meal History'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
