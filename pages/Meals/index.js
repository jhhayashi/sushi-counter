import React, {useLayoutEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, FlatList, StyleSheet, View} from 'react-native'

import {Meal} from '../../redux/types'
import {deleteMeal} from '../../redux/actions'

import MealCell from './MealCell'
import Stats from './Stats'

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
})

// eslint-disable-next-line react/prop-types
const renderItem = props => ({item}) => <MealCell {...props} {...item} meal={item} />

function Meals(props) {
  const [isEditMode, setEditMode] = useState(false)

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <Button title="Edit" onPress={() => setEditMode(!isEditMode)} />
    })
  })

  const meals = props.meals.map((meal, key) => meal.addKey(`${key}`))
  return (
    <View style={styles.fill}>
      <Stats meals={meals} />
      <FlatList
        contentContainerStyle={styles.fill}
        data={meals}
        renderItem={renderItem({onDelete: props.deleteMeal, showDeleteButton: isEditMode})}
      />
    </View>
  )
}

Meals.propTypes = {
  deleteMeal: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.instanceOf(Meal)),
  navigation: PropTypes.shape({
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
}

export default connect(state => ({meals: state.meals}), {deleteMeal})(Meals)
