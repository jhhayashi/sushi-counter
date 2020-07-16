import React from 'react'
import PropTypes from 'prop-types'

import Dialog from 'react-native-dialog'

export default function DeleteMealDialog(props) {
  return (
    <Dialog.Container visible={props.visible}>
      <Dialog.Title>{props.title || "Are you sure?"}</Dialog.Title>
      <Dialog.Description>
        Delete {props.meal && props.meal.name}?
      </Dialog.Description>
      <Dialog.Button label="Cancel" onPress={props.onCancel} />
      <Dialog.Button label="Confirm" onPress={props.onConfirm} />
    </Dialog.Container>
  )
}

DeleteMealDialog.propTypes = {
  meal: PropTypes.shape({name: PropTypes.string.isRequired}),
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
}
