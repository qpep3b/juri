import { normalizeParams } from '../utils'

test(`normalize-params`, () => {
    expect(normalizeParams('a=1&b=2?c=3?d=5')).toEqual('a=1&b=2&c=3&d=5')
})
