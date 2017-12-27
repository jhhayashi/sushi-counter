import React from 'react'
import {View} from 'react-native'
import {FacebookAds} from 'expo'

const style = {height: 70}

export default () => (
  <View style={style}>
    <FacebookAds.BannerView placementId="2048557798713174_2048558958713058" type="standard" />
  </View>
)
