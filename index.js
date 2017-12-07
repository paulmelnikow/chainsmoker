'use strict'

const minimatch = require('minimatch')
const mapValues = require('lodash.mapvalues')

function chainsmoker(pathObject) {
  function matchPatterns(patterns) {
    return mapValues(pathObject, pathArray => {
      const isExclude = p => p.startsWith('!')
      const excludePatterns = patterns.filter(p => isExclude(p))
      const includePatterns = patterns.filter(p => !isExclude(p))

      const included = includePatterns.reduce(
        (accum, pattern) => accum.concat(minimatch.match(pathArray, pattern)),
        []
      )

      return excludePatterns.reduce(
        (accum, pattern) => minimatch.match(accum, pattern),
        included
      )
    })
  }

  function finalize(results) {
    return mapValues(results, pathArray => pathArray.length > 0)
  }

  const fileMatch = (...patterns) => finalize(matchPatterns(patterns))

  Object.assign(fileMatch, {
    tap: callback => (...patterns) => {
      const results = matchPatterns(patterns)
      callback(results)
      return finalize(results)
    },
    debug: (...patterns) => {
      const results = matchPatterns(patterns)
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(results, null, 2))
      return finalize(results)
    },
  })

  return fileMatch
}

module.exports = chainsmoker
