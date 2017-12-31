import React from 'react'
import PropTypes from 'prop-types'
import {Text, View, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
})

const HighScore = props => (
  <View style={styles.container}>
    <Text style={styles.center}>
      <Text style={styles.bold}>High Score</Text>: {props.value} on {props.date.toDateString()}
    </Text>
  </View>
)

HighScore.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  value: PropTypes.number.isRequired,
}

export default HighScore
