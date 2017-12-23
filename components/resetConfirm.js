import {Alert} from 'react-native'

export default onConfirm => Alert.alert(
  'Are you sure?',
  'Reset the counter and start a new meal?',
  [
    {text: 'Cancel', style: 'cancel'},
    {text: 'Reset', onPress: onConfirm},
  ]
)
