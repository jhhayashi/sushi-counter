import React from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import {incrementCount, resetCount} from '../redux/actions'
import {ResetButton} from '../components'

const INC_INTERVAL = 1000

class Home extends React.Component {
  static navigationOptions = {
    title: 'Sushi Counter',
    headerRight: <ResetButton />,
  }

  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
    resetCount: PropTypes.func.isRequired,
  }

  blockIncUntil = Date.now()

  incrementCount = () => {
    const now = Date.now()
    if (now < this.blockIncUntil) return
    this.props.incrementCount()
    this.blockIncUntil = now + INC_INTERVAL
  }

  render() {
    return (
      <TouchableOpacity onPress={this.incrementCount} style={styles.container}>
        <Text style={styles.count}>{this.props.count}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    fontSize: 48,
  },
}

export default connect(state => state, {incrementCount, resetCount})(Home)
