'use strict'
/** Capabilities (browsers) */
const capabilities = [
  { browserName: 'chrome' }
]

module.exports = capabilities.map(c => ({ desiredCapabilities: c }))
