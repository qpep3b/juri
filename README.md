# Urigami

A tiny library providing parsing and joining urls

## Installation
```
npm install urigami
```

## Usage

```js
import {urlJoin, urlParse} from 'urigami'

urlJoin('http://a.com/some/url', 'aaa/ccc', 'bbb/ddd') // http://a.com/some/url/aaa/ccc/bbb/ddd/
urlJoin('http://a.com/some/url', '../../ccc')          // http://a.com/ccc/
urlJoin('http://a.com', 'aaa/ccc', '/bbb/ddd')         // http://a.com/bbb/ddd/ (because /bbb/ddd is absolute)

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

## Coming features
* Joining urls with request params (now not working)
```js
// Works wrong (expected http://a.com/some_url/internal/?a=b)
urlJoin('http://a.com/some_url?a=b', 'internal')  // returns 'http://a.com/some_url/internal'
```
