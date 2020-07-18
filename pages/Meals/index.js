import React, {useCallback, useLayoutEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Animated, Button, Dimensions, StyleSheet, Text, View} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'

import {DeleteMealDialog} from '../../components'
import {Meal} from '../../redux/types'
import {deleteMeal} from '../../redux/actions'

import MealCell from './MealCell'
import Stats from './Stats'

const SLIDE_TO_DELETE_PCT = 51

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
  const {meals} = props
  const [isEditMode, setEditMode] = useState(false)
  // a reference to the meal that pending the confirmation dialog before delete
  const [stagedDeleteMeal, setStagedDeleteMeal] = useState(null)
  // we need to track staged delete separately from showing modal. if we use stagedDeleteMeal
  // to show/hide modal, a race condition shows a null value in the modal as it fades out
  const [showDialog, setShowDialog] = useState(false)
  const [isAnimating, setIsAnimating]  = useState(false)

  const [animatedValues, setAnimatedValues] = useState(meals.reduce((acc, meal) => ({...acc, [meal.id]: new Animated.Value(1)}), {}))

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <Button title="Edit" onPress={() => setEditMode(!isEditMode)} />
    })
  })

  const stageDelete = useCallback(meal => {
    setStagedDeleteMeal(meal)
    setShowDialog(true)
  })

  const cancelDelete = useCallback(() => {
    setStagedDeleteMeal(null)
    setShowDialog(false)
  })

  const onConfirmDelete = () => {
    setIsAnimating(true)
    setShowDialog(false)

    Animated
      .timing(animatedValues[stagedDeleteMeal.id], {toValue: 0, duration: 200, useNativeDriver: false})
      .start(() => {
        setIsAnimating(false)
        props.deleteMeal(stagedDeleteMeal)
        setStagedDeleteMeal(null)
      })
  }


  const onSwipeValueChange = ({key, value}) => {
    if (isAnimating) return
    // all the way open, time to show confimration dialog
    if (Math.abs(value) >= Dimensions.get('window').width) {
      const mealToDelete = props.meals.find(meal => meal.id === key) 
      stageDelete(mealToDelete)
    }
  }

  return (
    <View style={styles.fill}>
      <DeleteMealDialog
        meal={stagedDeleteMeal}
        onConfirm={onConfirmDelete}
        onCancel={cancelDelete}
        visible={showDialog}
      />
      <Stats meals={meals} />
      <SwipeListView
        disableRightSwipe
        data={meals}
        contentContainerStyle={styles.fill}
        keyExtractor={meal => meal.id}
        onSwipeValueChange={onSwipeValueChange}
        renderItem={renderItem(meal => ({
          animatedValue: animatedValues[meal.id],
          onDelete: stageDelete,
          showDeleteButton: isEditMode,
          ...meal,
          meal,
        }))}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        swipeToOpenPercent={SLIDE_TO_DELETE_PCT}
        swipeToClosePercent={SLIDE_TO_DELETE_PCT}
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
