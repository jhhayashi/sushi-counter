import React from 'react'
import {View} from 'react-native'
import {FacebookAds} from 'expo'

const style = {height: 70}

export default class Ad extends React.Component {
  state = {
    hasError: false,
  }

  componentDidCatch(err) {
    this.handleError(err)
  }

  handleError = () => {
    this.setState({hasError: true})
  }

  render() {
    if (this.state.hasError) return <View />
    return (
      <View style={style}>
        <FacebookAds.BannerAd
          placementId="2048557798713174_2048558958713058"
          type="standard"
          onError={this.handleError}
        />
      </View>
    )
  }
}
