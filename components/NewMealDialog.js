import React, {useState} from 'react'
import PropTypes from 'prop-types'
import Dialog from 'react-native-dialog'

export default function NewMealDialog(props) {
  const [mealName, setMealName] = useState(undefined)
  const onSubmit = () => {
    if (mealName === '') return
    props.onMealNameSet(mealName || props.defaultMealName)
  }
  return (
    <Dialog.Container visible={props.visible}>
      <Dialog.Title>{props.title || 'Create a New Meal'}</Dialog.Title>
      <Dialog.Description>Enter a name for this meal</Dialog.Description>
      <Dialog.Input
        clearButtonMode="always"
        value={mealName}
        defaultValue={props.defaultMealName}
        onChangeText={setMealName}
      />
      <Dialog.Button label="Cancel" onPress={props.onCancel} />
      <Dialog.Button label="OK" onPress={onSubmit} />
    </Dialog.Container>
  )
}

NewMealDialog.propTypes = {
  defaultMealName: PropTypes.string,
  onMealNameSet: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
}
