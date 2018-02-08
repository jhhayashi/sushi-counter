import {Alert} from 'react-native'

export default (onConfirm, message) =>
  Alert.alert('Are you sure?', message, [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Reset', onPress: onConfirm},
  ])
