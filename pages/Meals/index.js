import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {FlatList, StyleSheet, View} from 'react-native'

import {Meal} from '../../redux/types'

import MealCell from './MealCell'
import Stats from './Stats'

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})

// eslint-disable-next-line react/prop-types
const renderItem = ({item}) => <MealCell {...item} />

function Meals(props) {
  const meals = props.meals.map((meal, key) => meal.addKey(`${key}`))
  return (
    <View style={styles.fill}>
      <Stats meals={meals} />
      <FlatList
        contentContainerStyle={styles.fill}
        data={meals}
        renderItem={renderItem}
      />
    </View>
  )
}

Meals.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.instanceOf(Meal)),
}

export default connect(state => ({meals: state.meals}))(Meals)
