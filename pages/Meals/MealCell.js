import React from 'react'
import PropTypes from 'prop-types'
import {Button, StyleSheet, Text, View} from 'react-native'

import {Meal} from '../../redux/types'

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

const dateFormatter = new Intl.DateTimeFormat(undefined, {weekday: "short", day: "numeric", month: "numeric", year: "2-digit"})

const MealCell = props => (
  <View style={styles.mealCell}>
    <View style={styles.flowRight}>
      <Text>
        <Text style={styles.bold}>{props.name}</Text> ({dateFormatter.format(props.date)})
      </Text>
    </View>
    <Text style={styles.mealCount}>{props.value}</Text>
    {props.showDeleteButton && <Button title="Delete" onPress={() => props.onDelete(props.meal)} />}
  </View>
)

MealCell.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onDelete: PropTypes.func.isRequired,
  meal: PropTypes.instanceOf(Meal),
  name: PropTypes.string.isRequired,
  showDeleteButton: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

export default MealCell
