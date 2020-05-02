'use strict'

const path = require('path')
const mongoose = require('mongoose')
const resource = path.basename(__filename).split('.')[0]

let Schema = mongoose.Schema

let schema = new Schema({
  _id: {
    type: String,
    required: true,
    ref: '_id'
  },
  arr1d: [{
    type: String,
    required: true,
    ref: '*'
  }],
  arr2d: [[{
    type: String,
    required: true,
    ref: '**'
  }]],
  arr3d: [[[{
    type: String,
    required: true,
    ref: '***'
  }]]],
  arr4d: [[[[{
    type: String,
    required: true,
    ref: '****'
  }]]]],

  arr1dObj1: [{
    foo: {
      type: String,
      required: true,
      ref: '*.foo'
    }
  }],
  arr2dObj1: [[{
    foo: {
      type: String,
      required: true,
      ref: '**.foo'
    }
  }]],
  arr1dObj2: [{
    foo: {
      bar: {
        type: String,
        required: true,
        ref: '*.foo.bar'
      }
    }
  }],
  arr2dObj2: [[{
    foo: {
      bar: {
        type: String,
        required: true,
        ref: '**.foo.bar'
      }
    }
  }]],
  arr1dObj3: [{
    foo: {
      bar: {
        beer: {
          type: String,
          required: true,
          ref: '*.foo.bar.beer'
        }
      }
    }
  }],

  arrNest1: [[{
    foo: {
      bar: [[{
        type: String,
        required: true,
        ref: '**.foo.bar**'
      }]]
    }
  }]],
  arrNest2: [{
    foo: [{
      bar: [{
        beer: [{
          type: String,
          required: true,
          ref: '*.foo*.bar*.beer*'
        }]
      }]
    }]
  }],

  schemaObj: new Schema({
    foo: {
      type: String,
      required: true,
      ref: '.foo'
    },
    bar: {
      type: String,
      required: true,
      ref: '.bar'
    }
  }, {_id: false}),
  schemaObjArr: [new Schema({
    foo: {
      type: String,
      required: true,
      ref: '*.foo'
    },
    bar: {
      type: String,
      required: true,
      ref: '*.bar'
    }
  }, {_id: false})],
  schemaObjArrObjArr: [new Schema({
    foo: [{
      type: String,
      required: true,
      ref: '*.foo*'
    }],
    bar: [{
      type: String,
      required: true,
      ref: '*.bar*'
    }]
  }, {_id: false})],
  schemaObjArrSchemaObj: [new Schema({
    foo: new Schema({
      foo: {
        type: String,
        required: true,
        ref: '*.foo.foo'
      },
      bar: {
        type: String,
        required: true,
        ref: '*.foo.bar'
      }
    }, {_id: false})
  }, {_id: false})]
})

module.exports = mongoose.model(resource, schema, resource)
