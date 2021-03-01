# Changelog

## 1.0.3

- Update build dependencies.

## 1.0.2

- Update build dependencies.

## 1.0.1

- Update `micromatch` dependency.

## 1.0.0

- Rewrite in TypeScript, using microbundle.
- For easier interop with the Danger repo, which has vendored in the new
  version, rewrite tests in Jest.
- Switch from `minimatch` to `micromatch`.
- Add `fileMatch.getKeyedPaths()`, providing more convenient access to paths. This replaces
  `fileMatch.tap()` and `fileMatch.debug()`.

  ```js
  const components = fileMatch('components/**/*.js', '!**/*.test.js')
  const componentTests = fileMatch('!**/*.test.js')

  if (components.edited && !componentTests.edited) {
    warn(
      [
        'This PR modified some components but none of their tests. <br>',
        "That's okay so long as it's refactoring existing code. <br>",
        'Affected files: ',
        components.getKeyedPaths().edited.join(', '),
      ].join('')
    )
  }
  ```

## 0.1.0

Initial release.
