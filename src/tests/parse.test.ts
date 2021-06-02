import {urlParse, parseParams} from '../parse'

type TestCase = [string, string, Object]

const parseParamsTestCases: TestCase[] = [
    ['empty-params', '', {}],
    ['single-ampersand', '&', {}],
    ['double-ampersand', '&&', {}],
    ['no-key-value', '=', {'': ''}],
    ['no-key', '=a', {'': 'a'}],
    ['no-value', 'a=', {a: ''}],
    ['key-value', 'a=b', {a: 'b'}],
    ['ampersand-key-value', '&a=b', {a: 'b'}],
    ['key-valueslist', 'a=1&a=2', {a: ['1', '2']}],
    ['multiple-pairs', 'a=1&b=2', {a: '1', b: '2'}]
]

const parseUrlTestCases: TestCase[] = [
    ['https-schema', 'https://github.com/qpep3b/react-recrud', {
        schema: 'https',
        host: 'github.com',
        port: null,
        path: '/qpep3b/react-recrud',
        params: {},
        fragment: null,
    }],
    ['ip-v4', 'http://127.0.0.1', {
        schema: 'http',
        host: '127.0.0.1',
        port: null,
        path: '/',
        params: {},
        fragment: null,
    }],
    ['ip-v4-with-port', 'http://127.0.0.1:5152/location?foo=bar', {
        schema: 'http',
        host: '127.0.0.1',
        port: 5152,
        path: '/location',
        params: {
            foo: 'bar'
        },
        fragment: null,
    }],
    ['full-url', 'https://some-url.com:8122/some/internal/location?lorem=ipsum&foo=bar#page-fragment', {
        schema: 'https',
        host: 'some-url.com',
        port: 8122,
        path: '/some/internal/location',
        params: {
            lorem: 'ipsum',
            foo: 'bar',
        },
        fragment: 'page-fragment'
    }],
    ['simple-url', 'http://some-url.com', {
        schema: 'http',
        host: 'some-url.com',
        port: null,
        path: '/',
        params: {},
        fragment: null,
    }],
]

parseParamsTestCases.forEach(
    ([name, input, expected]) => {
        test(`parseParams-${name}`, () => {
            expect(
                parseParams(input)
            ).toEqual(expected)
        })
    }
)

parseUrlTestCases.forEach(
    ([name, input, expected]) => {
        test(`parseUrl-${name}`, () => {
            expect(
                urlParse(input)
            ).toEqual(expected)
        })
    }
)