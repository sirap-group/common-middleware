# common-middleware [![NPM version](https://badge.fury.io/js/common-middleware.svg)](http://badge.fury.io/js/common-middleware)  [![Build Status](https://travis-ci.org/jonschlinkert/common-middleware.svg)](https://travis-ci.org/jonschlinkert/common-middleware)

> Common middleware for applications built with base-methods (like assemble, verb, generate, and update)

## Install

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i common-middleware --save
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

## Related projects

* [assemble-core](https://www.npmjs.com/package/assemble-core): The core assemble application with no presets or defaults. All configuration is left to the… [more](https://www.npmjs.com/package/assemble-core) | [homepage](https://github.com/assemble/assemble-core)
* [base-methods](https://www.npmjs.com/package/base-methods): Starter for creating a node.js application with a handful of common methods, like `set`, `get`,… [more](https://www.npmjs.com/package/base-methods) | [homepage](https://github.com/jonschlinkert/base-methods)
* [generate](https://www.npmjs.com/package/generate): Project generator, for node.js. | [homepage](https://github.com/generate/generate)
* [update](https://www.npmjs.com/package/update): Update the year in all files in a project using glob patterns. | [homepage](https://github.com/jonschlinkert/update)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/common-middleware/issues/new).

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 29, 2015._