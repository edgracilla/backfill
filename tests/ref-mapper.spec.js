
const mapper = require('../lib/ref-mapper')
const model = require('./models/ref-mapper-shcema')

describe(`ref mapper test`, () => {
  it('should match all keys', (done) => {
    const map = mapper(model.schema.obj)
    console.log(map)

    for (const key in map) {
      if (map.hasOwnProperty(key)) {
        const isKeyMatch = !!key.match(`${map[key].replace(/[*.]/g, '\\$&')}$`)
        expect(isKeyMatch).toBe(true)
      }
    }
    done()
  })
})