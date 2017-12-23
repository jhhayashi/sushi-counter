import React from 'react'
import {Button, Text} from 'react-native'
import {connect} from 'react-redux'

import {resetCount} from '../redux/actions'

import resetConfirm from './resetConfirm'

const ResetButton = props => <Button title="Reset" onPress={() => resetConfirm(props.resetCount)} />

export default connect(null, {resetCount})(ResetButton)
