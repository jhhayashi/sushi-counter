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

// since we weren't creating IDs at first, and there was a bug that made some dates
// the same, we need to ensure IDs are unique some other way
const ids = new Set()
function createId(maybeUniqueId, attempt = 0) {
  const stringified = `${maybeUniqueId}-${attempt}`
  if (!ids.has(stringified)) {
    ids.add(stringified)
    return stringified
  }

  return createId(maybeUniqueId, attempt + 1)
}

export class Meal {
  constructor(val) {
    const meal = getBaseProps(val)
    Object.assign(this, extractProps(meal))
    this.date = get('date', meal) ? new Date(meal.date) : new Date()
    this.id = createId(+this.date)
  }

  toString() {
    return JSON.stringify({...extractProps(this), date: +this.date})
  }

  increment = () => new Meal({...extractProps(this), value: this.value + 1})
}
