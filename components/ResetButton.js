import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-native'
import {connect} from 'react-redux'

import {resetCount} from '../redux/actions'

import resetConfirm from './resetConfirm'

const ResetButton = props => <Button title="Reset" onPress={() => resetConfirm(props.resetCount)} />

ResetButton.propTypes = {
  resetCount: PropTypes.func.isRequired,
}

export default connect(null, {resetCount})(ResetButton)
