import React, {useLayoutEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Animated, Button, StyleSheet, Text, View} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'

import {DeleteMealDialog} from '../../components'
import {Meal} from '../../redux/types'
import {deleteMeal} from '../../redux/actions'

import MealCell from './MealCell'
import Stats from './Stats'

const styles = StyleSheet.create({
  fill: {flex: 1},
  rowBehind: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  deleteText: {color: 'white', marginLeft: 'auto'},
})

// eslint-disable-next-line react/prop-types
const renderItem = getPropsFromItem => ({item}) => <MealCell {...getPropsFromItem(item)} />

function renderHiddenItem() {
  return (
		<View style={[styles.rowBehind, styles.fill]}>
			<Text style={styles.deleteText}>Delete</Text>
		</View>
  )
}

function Meals(props) {
  const [isEditMode, setEditMode] = useState(false)
  // a reference to the meal that pending the confirmation dialog before delete
  const [stagedDeleteMeal, setStagedDeleteMeal] = useState(null)
  const isAnimating = useRef({val: false})

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <Button title="Edit" onPress={() => setEditMode(!isEditMode)} />
    })
  })

  const onConfirmDelete = () => {
    props.deleteMeal(stagedDeleteMeal)
    // TODO: fix race condition so there's no flash of missing meal name
    setStagedDeleteMeal(null)
  }

  // TODO: use actual (and persistent) IDs
  const meals = props.meals.map((meal, key) => meal.addKey(`${key}`))
  const animatedValues = meals.reduce((acc, meal) => ({...acc, [meal.key]: new Animated.Value(1)}), {})

  const onSwipeValueChange = ({key, value}) => {
    if (!isAnimating.current.val) {
    console.log(`animating ${key}`)
      Animated
        .timing(animatedValues[key], {toValue: 0, duration: 200, useNativeDriver: false})
        .start(() => isAnimating.current.val = false)
      isAnimating.current.val = true
    }
  }

  return (
    <View style={styles.fill}>
      <DeleteMealDialog
        meal={stagedDeleteMeal}
        onConfirm={onConfirmDelete}
        onCancel={() => setStagedDeleteMeal(null)}
        visible={!!stagedDeleteMeal}
      />
      <Stats meals={meals} />
      <SwipeListView
        disableRightSwipe
        data={meals}
        contentContainerStyle={styles.fill}
        onSwipeValueChange={onSwipeValueChange}
        renderItem={renderItem(meal => ({
          animatedValue: animatedValues[meal.key],
          onDelete: setStagedDeleteMeal,
          showDeleteButton: isEditMode,
          ...meal,
          meal,
        }))}
        renderHiddenItem={renderHiddenItem}
        useNativeDriver={false}
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
