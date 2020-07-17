import {createStore} from 'redux'
import {createMigrate, createTransform, persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage'

import {Meal} from './types'
import reducer from './reducer'

const serializers = {
  highScore: val => val.toString(),
  meals: meals => JSON.stringify(meals.map(meal => meal.toString())),
}

const deserializers = {
  highScore: val => new Meal(val),
  meals: meals => JSON.parse(meals).map(meal => new Meal(meal)),
}

const transforms = [
  createTransform(
    // serialize
    (val, key) => (serializers[key] ? serializers[key](val) : val),
    // deserialize
    (val, key) => (deserializers[key] ? deserializers[key](val) : val)
  ),
]

const migrations = {
  '-1': state => ({highScore: state.highScore, meals: [new Meal(state.highScore)]}),
}

const config = {version: 0, key: 'root', migrate: createMigrate(migrations), storage, transforms}

const persistentReducer = persistReducer(config, reducer)

export default () => {
  const store = createStore(persistentReducer)
  const persistor = persistStore(store)

  // uncomment this to purge redux store on startup
  // persistor.purge()

  return {persistor, store}
}
