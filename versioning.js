import compareVersions from 'compare-versions'
import {flatten} from 'lodash/fp'

import packageJson from './package.json'

export const changelog = [
  {version: '1.6.0', changes: ['Added swiping to delete meals', 'Show recent changes when app opens']},
]

export function getChangelog(prevVersion, currentVersion = packageJson.version) {
  const newVersions = changelog.filter(({version}) => compareVersions(version, prevVersion) >= 0 && compareVersions(version, currentVersion) <=0)
  return flatten(newVersions.map(version => version.changes))
}
