'use strict'

function refMapper (schema) {
  const refmap = {}

  const crawler = function (schema, refmap, root) {
    if (schema.ref && root) {
      refmap[root] = schema.ref
      return
    }

    if (Array.isArray(schema)) {
      return crawler(schema[0], refmap, `${root}*`)
    }

    Object.keys(schema).forEach(field => {
      const prop = schema[field]
      const propCname = prop.constructor.name
      const mKey = root ? `${root}.${field}` : field

      if (prop.ref) {
        refmap[mKey] = prop.ref
      } else {
        if (Array.isArray(prop)) {
          const arrPropCname = prop[0].constructor.name

          if (prop[0].ref) {
            refmap[`${mKey}*`] = prop[0].ref
          } else if (arrPropCname === 'Schema') {
            crawler(prop[0].obj, refmap, `${mKey}*`)
          } else if (arrPropCname === 'Array') {
            crawler(prop[0], refmap, `${mKey}*`)
          } else if (arrPropCname === 'Object') {
            crawler(prop[0], refmap, `${mKey}*`)
          }
          
        } else if (propCname === 'Schema') {
          crawler(prop.obj, refmap, `${mKey}`)
        } else if (propCname === 'Object') {
          crawler(prop, refmap, `${mKey}`)
        }
      }
    })
  }

  crawler(schema, refmap)
  return refmap
}

module.exports = refMapper
