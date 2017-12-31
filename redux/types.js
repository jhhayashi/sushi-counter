export class HighScore {
  constructor(val) {
    if (typeof val === 'string') {
      const highScore = JSON.parse(val)
      this.value = highScore.value
      this.date = new Date(highScore.date)
    } else {
      this.value = val
      this.date = new Date()
    }
  }

  toString() {
    return JSON.stringify({value: this.value, date: +this.date})
  }
}
