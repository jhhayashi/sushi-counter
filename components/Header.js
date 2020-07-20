import * as React from 'react'
import PropTypes from 'prop-types'
import {Button, Platform, StyleSheet, TouchableOpacity, View} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

const IOS = Platform.OS === 'ios'

const styles = StyleSheet.create({
  buttonGroup: {flexDirection: 'row'},
  button: {marginRight: 10},
})

function HeaderLeftIOS({navigation}) {
  return <Button title="History" onPress={() => navigation.navigate('Meals')} />
}

HeaderLeftIOS.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const HeaderLeftAndroid = undefined

export const HeaderLeft = IOS ? HeaderLeftIOS : HeaderLeftAndroid

const HeaderRightProptypes = {
  onReset: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

function HeaderRightIOS(props) {
  return <Button title="Reset" onPress={props.onReset} />
}

HeaderRightIOS.propTypes = HeaderRightProptypes

function IconButton(props) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <MaterialIcons name={props.name} color="black" size={32} />
    </TouchableOpacity>
  )
}

function HeaderRightAndroid(props) {
  if (IOS) return <Button title="Reset" onPress={props.onReset} />
  return (
    <View style={styles.buttonGroup}>
      <IconButton style={styles.button} name="history" onPress={() => props.navigation.navigate('Meals')} />
      <IconButton style={styles.button} name="add-box" onPress={props.onReset} />
    </View>
  )
}

HeaderRightAndroid.propTypes = HeaderRightProptypes

export const HeaderRight = IOS ? HeaderRightIOS : HeaderRightAndroid
