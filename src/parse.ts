import { splitOnce, normalizeParams } from './utils'

export interface UrlParams {
    [param: string]: string | string[]
}

export const parseParams = (params: string): UrlParams => {
    // Input: string like that: 'lorem=ipsum&foo=bar'
    if (params === undefined) return {}
    const normalized = normalizeParams(params)
    const pairs = normalized.split('&')
    return pairs.reduce(mergeParams, {})
}

export const mergeParams = (params: UrlParams, keyValuePair: string): UrlParams => {
    const [key, value] = keyValuePair.split('=')

    if (value === undefined) return params

    if (Object.keys(params).includes(key)) {
        if (params[key] instanceof Array) {
            return {
                ...params,
                [key]: [...params[key], value],
            }
        }

        return {
            ...params,
            [key]: [params[key] as string, value],
        }
    }

    return {
        ...params,
        [key]: value,
    }
}

export interface ParsedUrl {
    schema: string
    host: string
    port: number | null
    path: string
    rawParams: string
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
        /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, //  RFC 3986 [page 51]
    )

    const schema = match[2] || null
    const source = match[4] || ''
    const [host, port] = _parseSource(source)
    const path = match[5] || '/'
    const rawParams = match[7] || ''
    const params = parseParams(rawParams)
    const fragment = match[9] || null

    return {
        schema,
        host,
        port,
        path,
        rawParams,
        params,
        fragment,
    }
}

const _parseSource = (source: string): [string, number | null] => {
    const [host, port] = splitOnce(source, ':')
    return [host, port ? parseInt(port) : null]
}
