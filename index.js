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
      
      // console.log('--a', this.refMap)
      // console.log('--c', ePath, expandMap[ePath])
      // console.log('--b', ref, expand)

      const hasArray = !!ePath.match(/\*/)
      const isPlainArray = !!ePath.match(/\*$/)
      
      if (hasArray && !isPlainArray) {
        const [root, subKey] = ePath.split(/\*\.(.+)/)
        const arrValues = _get(doc, root)

        const curatedValues = await this.expandArrObj(arrValues, subKey, ref, expand)
        _set(doc, root, curatedValues)
      } else {
        try {
          ePath = isPlainArray
            ? ePath.slice(0, -1)
            : ePath
          
          const value = _get(doc, ePath)

          const ret = isPlainArray
            ? await this.broker.call(`${ref}.search`, { _id: value, listOnly: true, expand })
            : await this.broker.call(`${ref}.read`, value, {}, { expand })

          _set(doc, ePath, ret)
        } catch (err) {
          console.log(err)
        }
      }
    }

    return doc
  }

  async expands (docs, expands) {
    for (let i = 0; i < docs.length; i++) {
      await this.expand(docs[i], expands)
    }
  }

  async expandArrObj (values, subKey, ref, expand) {
    const ids = values.map(item => _get(item, subKey))

    try {
      const ret = await this.broker
        .call(`${ref}.search`, { _id: ids, listOnly: true, expand })
      
      const curated = values.map(vItem => {
        for (let i = 0; i < ret.length; i++) {
          if (_get(vItem, subKey) === ret[i]._id) {
            return _set({}, subKey, ret[i])
          }
        }
      })

      return curated
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = Backfill