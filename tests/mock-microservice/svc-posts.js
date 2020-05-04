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
    const { expand } = options
    const docs = this.data.filter(v => v._id === _id)

    if (!docs.length) {
      return Promise.reject('[posts] Record not found!')
    } else {
      let doc = _cloneDeep(docs[0])

      return expand
        ? await this.backfill.expand(doc, expand)
        : doc
    }
  }

  async search (options) {
    const { _id, expand } = options

    let docs = this.data.filter(item => {
      return _id.includes(item._id)
    })

    if (!expand) return docs
    
    await this.backfill.expands(docs, expand)

    return docs
  }
}

module.exports = Service
