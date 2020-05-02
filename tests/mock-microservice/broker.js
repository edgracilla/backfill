'use strict'

class MockService {
  constructor () {
  }

  register (resource, service) {
    this[resource] = service
  }

  async call (svcDotAction, value, meta, options) {
    const [service, action] = svcDotAction.split('.')

    if (!this[service]) {
      return Promise.reject('Service not found!')
    }

    if (action === 'read') {
      return await this[service].read(value, meta, options)
    } else if (action === 'search') {
      // value is options (search, only accept 1 param)
      return await this[service].search(value)
    }
  }
}


module.exports = MockService