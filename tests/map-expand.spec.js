
const _isEqual = require('lodash.isequal')
const refMapper = require('../lib/ref-mapper')
const mapExpand = require('../lib/map-expand')

const model = require('./models/map-expand-schema')

const verifiedMap = {
  aa: 'AA',
  'bb.xx': 'BB',
  'cc.deep.yy': 'CC',
  'dd.deep.deeper.zz': 'DD',
  'foo*': 'NO_STAR_IN_EXP_PARAM',
  'bar*': 'WITH_STAR_IN_EXP_PARAM',
  'cat*.aa': 'R_OBJ',
  'dog*.aa.bb': 'R_OBJ_S_D',
  'fox*.aa.bb*': 'R_OBJ_S_D_R'
}

const verifiedResult = {
  aa: { ref: 'AA', expand: 'e1' },
  'bb.xx': { ref: 'BB', expand: 'e2.se1' },
  'cc.deep.yy': { ref: 'CC', expand: 'e3.se2' },
  'dd.deep.deeper.zz': { ref: 'DD', expand: 'e4' },
  'foo*': { ref: 'NO_STAR_IN_EXP_PARAM' },
  'bar*': { ref: 'WITH_STAR_IN_EXP_PARAM', expand: 'e1' },
  'cat*.aa': { ref: 'R_OBJ', expand: 'e2' },
  'dog*.aa.bb': { ref: 'R_OBJ_S_D', expand: 'e3' },
  'fox*.aa.bb*': { ref: 'R_OBJ_S_D_R', expand: 'e4' }
}

const targetExpands = 'aa.e1,bb.xx.e2.se1,cc.deep.yy.e3.se2,dd.deep.deeper.zz.e4,foo,bar*e1,cat*aa.e2,dog*aa.bb.e3,fox*aa.bb*e4'

describe(`map expand test`, () => {
  it('should match to verified result', (done) => {
    const refMap = refMapper(model.schema.obj)
    const result = mapExpand(refMap, targetExpands)

    console.log(result)

    expect(_isEqual(verifiedMap, refMap)).toBe(true)
    expect(_isEqual(verifiedResult, result)).toBe(true)
    done()
  })
})