import {get, pick} from 'lodash/fp'

const DEFAULT_ATTR = {
  name: 'New Meal',
  value: 0,
}

const extractProps = pick(['value', 'name', 'date'])

const getBaseProps = val => {
  if (typeof val === 'string') return JSON.parse(val)
  if (typeof val === 'object') return val
  return DEFAULT_ATTR
}

export class Meal {
  constructor(val) {
    const meal = getBaseProps(val)
    Object.assign(this, extractProps(meal))
    this.date = get('date', val) ? new Date(val.date) : new Date()
  }

  toString() {
    return JSON.stringify({...extractProps(this), date: +this.date})
  }

  addKey = key => {
    this.key = key
    return this
  }

  increment = () => new Meal({...extractProps(this), value: this.value + 1})
}
