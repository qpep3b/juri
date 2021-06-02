import {urlJoin} from '../join'

type JoinTestCase = [string, string, string[], string]

const urlJoinTestCases: JoinTestCase[] = [
    ['join-empty-parts-to-base', 'http://a.com', [''], 'http://a.com/'],
    ['join-relative-part-to-base', 'http://a.com', ['aaa'], 'http://a.com/aaa/'],
    ['join-absolute-part-to-base', 'http://a.com', ['/aaa'], 'http://a.com/aaa/'],
    ['join-multiple-relative-parts-to-base', 'http://a.com', ['aaa', 'bbb'], 'http://a.com/aaa/bbb/'],
    ['join-multiple-relative-parts-with-slash-to-base', 'http://a.com', ['aaa/', 'bbb'], 'http://a.com/aaa/bbb/'],
    ['join-with-absolute-part-to-base', 'http://a.com', ['aaa/ccc', '/bbb/ddd'], 'http://a.com/bbb/ddd/'],
    ['join-to-base-with-path', 'http://a.com/some/url', ['aaa/ccc', 'bbb/ddd'], 'http://a.com/some/url/aaa/ccc/bbb/ddd/'],
    ['join-back', 'http://a.com/some/url', ['../ccc'], 'http://a.com/some/ccc/'],
    ['join-back-twice', 'http://a.com/some/url', ['../../ccc'], 'http://a.com/ccc/'],
]

urlJoinTestCases.forEach(
    ([name, input, args, expected]) => {
        test(`urlJoin-${name}`, () => {
            expect(
                urlJoin(input, ...args)
            ).toEqual(expected)
        })
    }
)