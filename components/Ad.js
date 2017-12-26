import React from 'react'
import {View} from 'react-native'
import {FacebookAds} from 'expo'

export default props => (
  <View style={{height: 70}}>
    <FacebookAds.BannerView
      placementId="2048557798713174_2048558958713058"
      type="standard"
    />
  </View>
)
