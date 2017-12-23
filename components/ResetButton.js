import React from 'react'
import {Button, Text} from 'react-native'
import {connect} from 'react-redux'

import {resetCount} from '../redux/actions'

const ResetButton = props => <Button title="Reset" onPress={props.resetCount} />

export default connect(null, {resetCount})(ResetButton)
