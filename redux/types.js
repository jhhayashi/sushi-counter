export class Meal {
  constructor(val) {
    if (typeof val === 'string') {
      const highScore = JSON.parse(val)
      this.value = highScore.value
      this.date = new Date(highScore.date)
    } else if (typeof val === 'object') {
      this.value = val.value
      this.date = new Date(val.date)
    } else {
      this.value = val
      this.date = new Date()
    }
  }

  toString() {
    return JSON.stringify({value: this.value, date: +this.date})
  }

  increment = () => new Meal({value: this.value + 1, date: +this.date})
}
