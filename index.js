'use strict'

const _get = require('lodash.get')
const _set = require('lodash.set')

const refMapper = require('./lib/ref-mapper')
const mapExpand = require('./lib/map-expand')

class Backfill {
  constructor(options) {
    this.broker = options.broker
    this.refMap = refMapper(options.schema)
  }

  async expand(doc, expands) {
    const expandMap = mapExpand(this.refMap, expands)
    const expandKeys = Object.keys(expandMap)

    for (let i = 0; i < expandKeys.length; i++) {
      let ePath = expandKeys[i]
      const { ref, expand } = expandMap[ePath]
      
      console.log('--a', this.refMap)
      console.log('--b', ref, expand)

      const hasArray = !!ePath.match(/\\*/)
      const isPlainArray = !!ePath.match(/\*$/)

      if (isPlainArray) {
        ePath = ePath.slice(0, -1)
      }

      let value = _get(doc, ePath)
      console.log('--c', value)

      // TODO: ArrayOfObject !!

      try {
        let ret

        if (isPlainArray) {
          ret = await this.broker.call(`${ref}.search`, {
            _id: value,
            listOnly: true,
            expand
          })
        } else {
          ret = await this.broker.call(`${ref}.read`, value, {}, { expand })
        }
        
        _set(doc, ePath, ret)
      } catch (err) {
        console.log('-- Backfill Err --')
        console.log(err)
        console.log('-- Backfill Err --')
      }
    }

    return doc
  }
}

module.exports = Backfill