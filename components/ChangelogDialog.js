import React from 'react'
import {StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types'
import Dialog from 'react-native-dialog'

import {getChangelog} from '../versioning'

const styles = StyleSheet.create({
  leftText: {textAlign: 'left'},
})

export default function ChangelogDialog(props) {
  const changelog = getChangelog(props.prevVersion, props.currentVersion)

  // don't show dialog if there aren't any changes
  if (!changelog.length) {
    props.onClose()
    return null
  }

  return (
    <Dialog.Container visible={props.visible}>
      <Dialog.Title>Recent Changes</Dialog.Title>
      {changelog.map((change, i) => (
        <Dialog.Description key={i} style={styles.leftText}>{`\u2022 ${change}`}</Dialog.Description>
      ))}
      <Dialog.Button label="Close" onPress={props.onClose} />
    </Dialog.Container>
  )
}

ChangelogDialog.propTypes = {
  currentVersion: PropTypes.string.isRequired,
  prevVersion: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
}
