'use strict'

const Backfill = require('../../index')
const model = require('../models/ms-simple/users')

const _cloneDeep = require('lodash.clonedeep')

class Service {
  constructor(broker) {
    this.backfill = new Backfill({
      schema: model.schema.obj,
      broker
    })

    this.data = [
      {
        _id: 'user1',
        name: 'John Joe',
        connections: ['user2'],
    
        // for complex expand testing
        nested: { user: 'user1' },
        subDoc: { post: 'post1' },
        subDocArr: [{ post: 'post2' }, { post: 'post3' }],
        
      }, {
        _id: 'user2',
        name: 'Jane',
        connections: ['user3'],
        nested: { user: 'user2' },
      }, {
        _id: 'user3',
        name: 'Joe',
        connections: ['user4']
      }, {
        _id: 'user4',
        name: 'James',
        connections: ['user3']
      }
    ]

    this.backfill.broker.register('users', this)
  }

  async read (_id, meta, options) {
    const { expand } = options
    const docs = this.data.filter(v => v._id === _id)

    if (!docs.length) {
      return Promise.reject('[users] Record not found!')
    } else {
      let doc = _cloneDeep(docs[0])

      return expand
        ? await this.backfill.expand(doc, expand)
        : doc
    }
  }

  async search (options) {
    
  }
}

module.exports = Service
