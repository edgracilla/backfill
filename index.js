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

    console.log('bck: --a', expandMap)
    console.log('bck: --b', expandKeys)
    console.log('bck: --c', expands)
    
    for (let i = 0; i < expandKeys.length; i++) {
      const path = expandKeys[i]
      const value = _get(doc, path)
      const { ref:targetSvc, expand } = expandMap[path]

      console.log('bck: b', path, value)
      console.log('bck: c', targetSvc, expand)

      console.log('bck: d', value)
      

      
      
      
      try {
        let ret = await this.broker.call(`${targetSvc}.read`, value, {}, { expand })
        
        // _set(doc, path, ret)
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