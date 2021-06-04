/*
WIP: suppeorting RFC 3986 specification:
         foo://example.com:8042/over/there?name=ferret#nose
         \_/   \______________/\_________/ \_________/ \__/
          |           |            |            |        |
       scheme     authority       path        query   fragment
          |   _____________________|__
         / \ /                        \
         urn:example:animal:ferret:nose
*/

export { urlParse } from './parse'
export { urlJoin } from './join'
