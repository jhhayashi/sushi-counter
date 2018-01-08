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

class Meals extends React.Component {
  static propTypes = {
    meals: PropTypes.arrayOf(PropTypes.instanceOf(Meal)),
  }

  static navigationOptions = {
    title: 'Meal History',
  }

  state = {
    meals: this.props.meals.map((meal, key) => meal.addKey(key)),
  }

  componentWillReceiveProps(newProps) {
    if (this.props.meals !== newProps.meals) {
      this.setState({meals: newProps.meals.map((meal, key) => meal.addKey(key))})
    }
  }

  render() {
    return (
      <View style={styles.fill}>
        <Stats meals={this.props.meals} />
        <FlatList
          contentContainerStyle={styles.fill}
          data={this.state.meals}
          renderItem={renderItem}
        />
      </View>
    )
  }
}

export default connect(state => ({meals: state.meals}))(Meals)
