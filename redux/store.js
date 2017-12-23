import {createStore} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import reducer from './reducer'

const config = {key: 'root', storage}

const persistentReducer = persistReducer(config, reducer)

export default () => {
  const store = createStore(persistentReducer)
  const persistor = persistStore(store)
  return {persistor, store}
}
