'use strict'

const _get = require('lodash.get')

function mapExpand (refMap, expands) {
  const refKeys = Object.keys(refMap)
  const mMap = {} // master map

  expands = expands
    .replace(/\*\.|\*/g, '*.')
    .replace(/\s/g, '')
    .split(',')

  for (let i = 0; i < expands.length; i++) {
    const eKey = expands[i]

    for (let j = 0; j < refKeys.length; j++) {
      const rKey = refKeys[j]
      const re = new RegExp(`^${rKey.replace(/[*.]/g, '\\$&')}([*.]|$)`)

      if (eKey.match(re) || (rKey.match(/\*$/) && rKey.slice(0, -1) === eKey)) {
        const ref = _get(refMap, rKey)
        const expand = eKey.split(`${rKey}.`)[1]

        if (ref) {
          if (!mMap[rKey]) {
            mMap[rKey] = { ref }
            if (expand) mMap[rKey].expand = expand
          } else {
            mMap[rKey].expand = mMap[rKey].expand
              ? `${mMap[rKey].expand},${expand}`
              : expand
          }

          break
        }
      }
    }
  }

  return mMap
}

module.exports = mapExpand
