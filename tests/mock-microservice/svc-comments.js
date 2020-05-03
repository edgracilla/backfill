'use strict'

const Backfill = require('../../index')
const model = require('../models/ms-simple/comments')

const _cloneDeep = require('lodash.clonedeep')

class Service {
  constructor(broker) {
    this.backfill = new Backfill({
      schema: model.schema.obj,
      broker: broker
    })
    
    this.data = [
      {
        _id: 'comment1',
        message: 'comment one',
        createdBy: 'user1'
      },
      {
        _id: 'comment2',
        message: 'comment two',
        createdBy: 'user2'
      },
      {
        _id: 'comment3',
        message: 'comment three',
        createdBy: 'user3'
      }
    ]

    this.backfill.broker.register('comments', this)
  }

  async read (_id, meta, options) {
    const { expand } = options
    const docs = this.data.filter(v => v._id === _id)

    if (!docs.length) {
      return Promise.reject('[comments] Record not found!')
    } else {
      let doc = _cloneDeep(docs[0])

      return expand
        ? await this.backfill.expand(doc, expand)
        : doc
    }
  }

  async search (options) {
    const { _id, expand } = options

    return this.data.filter(item => {
      return _id.includes(item._id)
    })
  }
}

module.exports = Service
