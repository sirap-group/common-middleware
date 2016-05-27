# common-middleware [![NPM version](https://img.shields.io/npm/v/common-middleware.svg?style=flat)](https://www.npmjs.com/package/common-middleware) [![NPM downloads](https://img.shields.io/npm/dm/common-middleware.svg?style=flat)](https://npmjs.org/package/common-middleware) [![Build Status](https://img.shields.io/travis/jonschlinkert/common-middleware.svg?style=flat)](https://travis-ci.org/jonschlinkert/common-middleware)

Common middleware for applications built with base-methods (like assemble, verb, generate, and update)

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install common-middleware --save
```

## Usage

```js
var middleware = require('common-middleware');
var assemble = require('assemble-core');

// create your app
var app = assemble();

// register the middleware
app.use(middleware());
```

## Middleware

The following middleware are included.

### [front matter](index.js#L43)

Parses front-matter on files that match `options.extRegex` and
adds the resulting data object to `file.data`. This object is
passed as context to the template engine at render time.

### [escape templates](index.js#L56)

Uses C-style macros to escape templates with `{%= foo %}` or
`<%= foo %>` syntax, so they will not be evaluated by a template
engine when `.render` is called.

### [JSON on-load](index.js#L97)

Adds a `json` property to the `file` object when the file extension
matches `options.jsonRegex`. This allows JSON files to be updated
by other middleware or pipeline plugins without having to parse and
stringify with each modification.

### [JSON pre-write](index.js#L124)

If `file.contents` has not already been updated directly, the `file.contents` property
is updated with stringified JSON before writing the file back to the file
system.

## Options

### options.jsonRegex

Customize the regex used for matching JSON files.

**Example**

```js
app.use(middleware({jsonRegex: /\.json$/}));
```

### options.extRegex

Customize the regex used for matching template file extensions.

**Example**

```js
app.use(middleware({jsonRegex: /\.(hbs|tmpl)$/}));
```

### options.escapeRegex

Customize the regex used for matching the extensions of files with templates to escape.

**Example**

```js
app.use(middleware({jsonRegex: /\.(tmpl|hbs)$/}));
```

## Related projects

You might also be interested in these projects:

[base](https://www.npmjs.com/package/base): base is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://www.npmjs.com/package/base) | [homepage](https://github.com/node-base/base)

* [assemble-core](https://www.npmjs.com/package/assemble-core): The core assemble application with no presets or defaults. All configuration is left to the… [more](https://www.npmjs.com/package/assemble-core) | [homepage](https://github.com/assemble/assemble-core)
* [generate](https://www.npmjs.com/package/generate): Fast, composable, highly extendable project generator with a user-friendly and expressive API. | [homepage](https://github.com/generate/generate)
* [update](https://www.npmjs.com/package/update): Easily keep anything in your project up-to-date by installing the updaters you want to use… [more](https://www.npmjs.com/package/update) | [homepage](https://github.com/update/update)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

This document was generated by [verb](https://github.com/verbose/verb), please don't edit directly. Any changes to the readme must be made in [.verb.md](.verb.md). See [Building Docs](#building-docs).

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/common-middleware/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/jonschlinkert/common-middleware/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on May 27, 2016._