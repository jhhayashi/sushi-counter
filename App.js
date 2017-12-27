import React from 'react'
import {FacebookAds} from 'expo'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/es/integration/react'

import HomeNavigator from './HomeNavigator'
import configureStore from './redux/store'

const {store, persistor} = configureStore()

// add device to receive test ads. should receive real ones once approved by fb
FacebookAds.AdSettings.addTestDevice(FacebookAds.AdSettings.currentDeviceHash)

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <HomeNavigator />
    </PersistGate>
  </Provider>
)
