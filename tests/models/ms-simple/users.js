'use strict'

const path = require('path')
const mongoose = require('mongoose')
const resource = path.basename(__filename).split('.')[0]

const SubDocument = new mongoose.Schema({
  post: {
    ref: 'posts',
    type: String
  },
}, {
  _id: false
})

const schema = new mongoose.Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  connections: [{
    ref: 'users',
    type: String
  }],

  nested: {
    user: {
      ref: 'users',
      type: String
    }
  },

  subDoc: SubDocument,
  subDocArr: [SubDocument],
}, {
  minimize: false,
  timestamps: true,
  useNestedStrict: true
})

module.exports = mongoose.model(resource, schema, resource)
