import {createStore} from 'redux'
import {createTransform, persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import {HighScore} from './types'
import reducer from './reducer'

const transforms = [
  createTransform(
    // serialize
    (val, key) => (key === 'highScore' ? val.toString() : val),
    // deserialize
    (val, key) => (key === 'highScore' ? new HighScore(val) : val)
  ),
]

const config = {key: 'root', storage, transforms}

const persistentReducer = persistReducer(config, reducer)

export default () => {
  const store = createStore(persistentReducer)
  const persistor = persistStore(store)
  return {persistor, store}
}
