'use strict'

const Backfill = require('../../index')
const model = require('../models/ms-simple/posts')

const _cloneDeep = require('lodash.clonedeep')

class Service {
  constructor(broker) {
    this.backfill = new Backfill({
      schema: model.schema.obj,
      broker
    })

    this.data = [
      {
        _id: 'post1',
        content: 'content one',
        comments: ['comment1'],
        createdBy: 'user1'
      },
      {
        _id: 'post2',
        content: 'content two',
        comments: ['comment1', 'comment2'],
        createdBy: 'user2'
      },
      {
        _id: 'post3',
        content: 'content three',
        comments: ['comment1', 'comment2', 'comment3'],
        createdBy: 'user3'
      }
    ]

    this.backfill.broker.register('posts', this)
  }

  async read (_id, meta, options) {
    const docs = this.data
      .filter(v => v._id === _id)

    if (!docs.length) {
      return Promise.reject('Record not found!')
    } else {
      return Promise.resolve(_cloneDeep(docs[0]))
    }
  }

  async search (options) {
    
  }
}

module.exports = Service
