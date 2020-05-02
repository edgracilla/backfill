'use strict'

const path = require('path')
const mongoose = require('mongoose')
const resource = path.basename(__filename).split('.')[0]

const Schema = mongoose.Schema

const schema = new mongoose.Schema({
  aa: {
    type: String,
    ref: 'AA'
  },
  bb: new Schema({
    xx: {
      type: String,
      required: true,
      ref: 'BB'
    }
  }),
  cc: {
    deep: new Schema({
      yy: {
        type: String,
        required: true,
        ref: 'CC'
      }
    })
  },
  dd: {
    deep: new Schema({
      deeper: {
        zz: {
          type: String,
          required: true,
          ref: 'DD'
        }
      }
    })
  },

  foo: [{
    type: String,
    ref: 'NO_STAR_IN_EXP_PARAM'
  }],
  bar: [{
    type: String,
    ref: 'WITH_STAR_IN_EXP_PARAM'
  }],
  cat: [{
    aa: {
      type: String,
      ref: 'R_OBJ'
    }
  }],
  dog: [{
    aa: new Schema({
      bb: {
        type: String,
        required: true,
        ref: 'R_OBJ_S_D'
      }
    })
  }],
  fox: [{
    aa: new Schema({
      bb: [{
        type: String,
        required: true,
        ref: 'R_OBJ_S_D_R'
      }]
    })
  }],
}, {
  minimize: false,
  timestamps: true,
  useNestedStrict: true
})

module.exports = mongoose.model(resource, schema, resource)
