import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Text, View} from 'react-native'
import {compose, map} from 'lodash/fp'

import {Meal} from '../../redux/types'
import {round, range, mean, median} from '../../utils'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingBottom: 10,
  },
  content: {
    width: 200,
    alignSelf: 'center',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const statsMetadata = [
  {name: 'Average', fn: compose(round, mean)},
  {name: 'Median', fn: compose(round, median)},
  {name: 'Range', fn: values => range(values).join(' - ')},
]

const Stats = props => {
  const {meals} = props
  const values = map('value', meals)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.content}>
        {statsMetadata.map(({name, fn}) => (
          <View key={name} style={styles.statContainer}>
            <Text>{name}:</Text>
            <Text>{fn(values)}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

Stats.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.instanceOf(Meal)),
}

export default Stats
