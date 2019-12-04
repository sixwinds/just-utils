# [just-utils](https://github.com/sixwinds/just-utils)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/sixwinds/just-utils/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/sixwinds/just-utils/master?style=flat-square)](https://travis-ci.org/sixwinds/just-utils)
[![Coverage Status](https://img.shields.io/coveralls/github/sixwinds/just-utils/master?style=flat-square)](https://coveralls.io/github/sixwinds/just-utils)
[![npm](https://img.shields.io/npm/v/just-utils?style=flat-square)](https://www.npmjs.com/package/just-utils)
[![NPM downloads](http://img.shields.io/npm/dm/just-utils.svg?style=flat-square)](http://www.npmtrends.com/just-utils)

Some commonly used utils in daily business code development. Lib provides limited functionality to support simple project **which makes size of lib small**.

## Characteristics

- ApiSender - Simple encapsulation of web api fetch.
- SimpleDateFormat - Date Formatter which just support pattern: yyyy | M | MM | d | dd | H | HH | m | mm | s | ss.


## Requirements
- Polyfill of fetch should be included independently if your browser doesn't support fetch api.

### Compatibility
Unit tests guarantee support on the following environment:

| IE   | CH   | FF   | SF   | OP   | IOS  | Android   | Node  |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ----- |
| untested | untested | untested | untested | untested | untested | untested | untested |

> Note: Compiling code depend on ES5, so you need import [es5-shim](http://github.com/es-shims/es5-shim/) to compatible with `IE6-8`, here is a [demo](./demo/demo-global.html)

## Directory
```
├── demo - Using demo
├── dist - Compiler output code
├── doc - Project documents
├── src - Source code directory
├── test - Unit tests
├── CHANGELOG.md - Change log
└── TODO.md - Planned features
```

## Usage Instructions

Using npm, download and install the code. 

```bash
$ npm install --save just-utils
```

For node environment：

```js
var JustUtils = require('@just-utils/all');
```

For webpack or similar environment：

```js
import JustUtils from '@just-utils/all';
```

For requirejs environment:

```js
requirejs(['node_modules/@just-utils/all/umd/index.js'], function (JustUtils) {
    // do something...
})
```

For browser environment:

```html
<script src="node_modules//@just-utils/all/umd/index.js"></script>
```

## Documents
[API](./doc/api.md)

## Contribution Guide
For the first time to run, you need to install dependencies firstly.

```bash
$ npm install
```

To build the project:

```bash
$ npm run build
```

To run unit tests:

```bash
$ npm test
```

> Note: The browser environment needs to be tested manually under ```test/browser```

Modify the version number in package.json, modify the version number in README.md, modify the CHANGELOG.md, and then release the new version.

```bash
$ npm run release
```

Publish the new version to NPM.

```bash
$ npm publish
```

## Contributors

[contributors](https://github.com/sixwinds/just-utils/graphs/contributors)

## Change Log
[CHANGELOG.md](./CHANGELOG.md)

## TODO
[TODO.md](./TODO.md)