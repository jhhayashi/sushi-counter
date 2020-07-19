import React from 'react'
import PropTypes from 'prop-types'
import {Animated, StyleSheet, Text, View} from 'react-native'

import {Meal} from '../../redux/types'

// need to hardcode this so that we can animated all cells
const HEIGHT = 60

const styles = StyleSheet.create({
  mealCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fcfcfc',
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: HEIGHT,
  },
  mealCount: {
    paddingLeft: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  flowRight: {
    flexDirection: 'row',
    flex: 1,
  },
})

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: 'numeric',
  month: 'numeric',
  year: '2-digit',
})

const MealCell = props => (
  <Animated.View
    style={[
      styles.mealCell,
      {height: props.animatedValue.interpolate({inputRange: [0, 1], outputRange: [0, HEIGHT]})},
    ]}
  >
    <View style={styles.flowRight}>
      <Text>
        <Text style={styles.bold}>{props.name}</Text> ({dateFormatter.format(props.date)})
      </Text>
    </View>
    <Text style={styles.mealCount}>{props.value}</Text>
  </Animated.View>
)

MealCell.propTypes = {
  animatedValue: PropTypes.instanceOf(Animated.Value),
  date: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func.isRequired,
  meal: PropTypes.instanceOf(Meal),
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default MealCell
