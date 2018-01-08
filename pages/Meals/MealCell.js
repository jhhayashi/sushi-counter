import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
  mealCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fcfcfc',
    borderBottomColor: '#333',
    borderBottomWidth: StyleSheet.hairlineWidth,
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

const MealCell = props => (
  <View style={styles.mealCell}>
    <View style={styles.flowRight}>
      <Text>
        <Text style={styles.bold}>{props.name}</Text> ({props.date.toDateString()})
      </Text>
    </View>
    <Text style={styles.mealCount}>{props.value}</Text>
  </View>
)

MealCell.propTypes = {
  value: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  name: PropTypes.string.isRequired,
}

export default MealCell
