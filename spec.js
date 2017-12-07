'use strict'

const { test, given } = require('sazerac')
const chainsmoker = require('.')

describe('chainsmoker', function() {
  const created = ['added.js', 'also/added.js', 'this/was/also/Added.js']
  const modified = [
    'changed.js',
    'also/changed.js',
    'changed.md',
    'this_is_changed.sh',
  ]
  const deleted = ['deleted.js', 'also/deleted.md']

  const fileMatch = chainsmoker({ created, modified, deleted })

  test(fileMatch, function() {
    given('**/*.md').expect({ created: false, modified: true, deleted: true })
    given('**/*.js').expect({ created: true, modified: true, deleted: true })
    given('**/*[A-Z]*.js').expect({
      created: true,
      modified: false,
      deleted: false,
    })
    given('**/*_*').expect({ created: false, modified: true, deleted: false })
    given('also/*', '!**/*.md').expect({
      created: true,
      modified: true,
      deleted: false,
    })
  })
})
