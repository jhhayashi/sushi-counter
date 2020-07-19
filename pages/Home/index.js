import React, {useState} from 'react'
import {connect} from 'react-redux'

import packageJson from '../../package.json'
import {ChangelogDialog} from '../../components'
import {setLastAppVersion} from '../../redux/actions'

import Home from './Home'

function HomePage(props) {
  const [showChangelog, setShowChangelog] = useState(props.lastAppVersion !== packageJson.version)

  const onClose = () => {
    setShowChangelog(false)
    props.setLastAppVersion(packageJson.version)
  }

  return (
    <React.Fragment>
      <ChangelogDialog
        visible={showChangelog}
        onClose={onClose}
        prevVersion={props.lastAppVersion}
        currentVersion={packageJson.version}
      />
      <Home navigation={props.navigation} disableDialogs={showChangelog} />
    </React.Fragment>
  )
}

export default connect(state => ({lastAppVersion: state.lastAppVersion}), {setLastAppVersion})(HomePage)
