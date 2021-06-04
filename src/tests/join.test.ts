import { urlJoin } from '../join'

type JoinTestCase = [string, string, string[], string]

const urlJoinTestCases: JoinTestCase[] = [
    ['join-empty-parts-to-base', 'http://a.com', [''], 'http://a.com/'],
    ['join-relative-part-to-base', 'http://a.com/', ['aaa'], 'http://a.com/aaa/'],
    ['join-absolute-part-to-base', 'http://a.com', ['/aaa'], 'http://a.com/aaa/'],
    [
        'join-multiple-relative-parts-to-base',
        'http://a.com',
        ['aaa', 'bbb'],
        'http://a.com/aaa/bbb/',
    ],
    [
        'join-multiple-relative-parts-with-slash-to-base',
        'http://a.com',
        ['aaa/', 'bbb'],
        'http://a.com/aaa/bbb/',
    ],
    [
        'join-with-absolute-part-to-base',
        'http://a.com/',
        ['aaa/ccc', '/bbb/ddd'],
        'http://a.com/bbb/ddd/',
    ],
    [
        'join-to-base-with-path',
        'http://a.com/some/url/',
        ['aaa/ccc', 'bbb/ddd'],
        'http://a.com/some/url/aaa/ccc/bbb/ddd/',
    ],
    ['join-back', 'http://a.com/some/url', ['../ccc'], 'http://a.com/some/ccc/'],
    ['join-back-twice', 'http://a.com/some/url/', ['../../ccc'], 'http://a.com/ccc/'],
    ['join-back-too-much', 'http://a.com/some/url/', ['../../../../../ccc'], 'http://a.com/ccc/'],
    [
        'join-base-with-port-and-fragment',
        'https://some-url.com:8122/some/internal/location?#page-fragment',
        ['../../ccc'],
        'https://some-url.com:8122/some/ccc/#page-fragment',
    ],
    [
        'join-base-with-params',
        'http://a.com/some_url?a=b',
        ['internal'],
        'http://a.com/some_url/internal/?a=b',
    ],
    [
        'join-with-params',
        'http://a.com/some_url?a=b',
        ['internal?c=d'],
        'http://a.com/some_url/internal/?a=b&c=d',
    ],
    [
        'join-not-normalized-params',
        'http://a.com/some_url?a=b',
        ['internal?c=d?e=f?g=h'],
        'http://a.com/some_url/internal/?a=b&c=d&e=f&g=h',
    ],
    [
        'join-with-same-key-param',
        'http://a.com/some_url?a=b',
        ['internal?a=c'],
        'http://a.com/some_url/internal/?a=b&a=c',
    ],
    [
        'join-absolute-part-with-params-to-params-base',
        'http://a.com/some_url?a=b',
        ['/internal'],
        'http://a.com/internal/?a=b',
    ],
    [
        'join-absolute-part-with-params-to-params-base',
        'http://a.com/some_url?a=b',
        ['/internal?c=d&e=f'],
        'http://a.com/internal/?a=b&c=d&e=f',
    ],
    [
        'join-with-fragment',
        'http://a.com/some_url?a=b',
        ['internal_path#aaa'],
        'http://a.com/some_url/internal_path/?a=b#aaa',
    ],
    [
        'join-fragment-rewrite',
        'http://a.com/some_url?a=b#existing-fragment',
        ['internal_path#new-fragment'],
        'http://a.com/some_url/internal_path/?a=b#new-fragment',
    ],
]

urlJoinTestCases.forEach(([name, input, args, expected]) => {
    test(`urlJoin-${name}`, () => {
        expect(urlJoin(input, ...args)).toEqual(expected)
    })
})
