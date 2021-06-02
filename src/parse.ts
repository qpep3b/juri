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

const SYMBOL_NOT_FOUND = -1

export interface UrlParams {
    [param: string]: string | string[]
}

export const parseParams = (params: string): UrlParams => {
    // Input: string like that: 'lorem=ipsum&foo=bar'
    if (params === undefined) return {}
    const pairs = params.split('&')
    return pairs.reduce((result, currentElement) => {
        const [key, value] = currentElement.split('=')

        if (value === undefined) return result

        if (Object.keys(result).includes(key)) {
            if (result[key] instanceof Array) {
                return {
                    ...result,
                    [key]: [...result[key], value]
                }
            }

            return {
                ...result,
                [key]: [result[key], value]
            }
        }

        return {
            ...result,
            [key]: value
        }
    }, {})
}

export interface ParsedUrl {
    schema: string
    host: string
    port: number | null
    path: string
    params: UrlParams | null
    fragment: string | null
}
/* 
    if we have url like
    https://some-url.com:8122/some/internal/location?lorem=ipsum&foo=bar#page-fragment
    ParsedUrl will be
    {
        schema: 'https',
        host: 'some-url.com',
        port: 8122,
        path: 'some/internal/location',
        params: {
            lorem: 'ipsum',
            foo: 'bar',
        },
        fragment: 'page-fragment'
    }
*/
export const urlParse = (url: string): ParsedUrl => {
    const match = url.match(
        /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/   //  RFC 3986 [page 51]
    )

    const schema = match[2] || null
    const source = match[4] || ''
    const [host, port] = _parseSource(source)
    const path = match[5] || '/'
    const params = parseParams(match[7])
    const fragment = match[9] || null

    return {
        schema,
        host,
        port,
        path,
        params, 
        fragment,
    }
}

const _parseSource = (source: string): [string, number | null] => {
    const colonIndex = source.indexOf(':')
    if (colonIndex === SYMBOL_NOT_FOUND) {
        return [source, null]
    }

    const [host, port] = [source.slice(0, colonIndex), source.slice(colonIndex+1)]
    return [host, parseInt(port)]
}
