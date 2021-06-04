# Urigami
[![npm](https://img.shields.io/npm/dt/urigami)](https://www.npmjs.com/package/urigami)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/urigami@latest)](https://bundlephobia.com/result?p=urigami@latest)
[![codecov](https://codecov.io/gh/qpep3b/urigami/branch/master/graph/badge.svg)](https://codecov.io/gh/qpep3b/urigami)

A tiny library providing parsing and joining urls

## Installation
```
npm install urigami
```

## Usage

```js
const {urlJoin, urlParse} = require('urigami')

console.log(urlJoin('http://a.com/some/url', 'aaa/ccc', 'bbb/ddd'))
// output: http://a.com/some/url/aaa/ccc/bbb/ddd/
console.log(urlJoin('http://a.com/some/url', '../../ccc'))
// output: http://a.com/ccc/
console.log(urlJoin('http://a.com', 'aaa/ccc', '/bbb/ddd'))
// output: http://a.com/bbb/ddd/ (because /bbb/ddd is absolute)

urlParse('https://some-url.com:8122/some/internal/location?lorem=ipsum&foo=bar#page-fragment')
/* returns
{
    schema: 'https',
    host: 'some-url.com',
    port: 8122,
    path: '/some/internal/location',
    params: {
        lorem: 'ipsum',
        foo: 'bar',
    },
    fragment: 'page-fragment'
}
*/
```

## Important info about joining urls
* incoming relative url is joined to current path
```js
urlJoin('http://a.com/some/url', 'aaa/ccc')
// returns 'http://a.com/some/url/aaa/ccc/'
```
* incoming absolute path rewrites current
```js
urlJoin('http://a.com', 'aaa/ccc', '/bbb/ddd')
// returns: 'http://a.com/bbb/ddd/'
```
* query params are always merging
```js
urlJoin('http://a.com/some_url?a=b', 'internal?c=d')
// returns: 'http://a.com/some_url/internal/?a=b&c=d'
```
* every incoming fragment rewrites current fragment 
```js
urlJoin('http://a.com/some_url?a=b#existing-fragment', 'internal_path#new-fragment')
// returns: 'http://a.com/some_url/internal_path/?a=b#new-fragment'
```
