/*
    About joining urls:
    * incoming absolute path rewrites current
    * incoming relative url is joined to current path
    * query params are merging
    * every incoming fragment rewrites current fragment 
*/

import { urlParse, ParsedUrl, mergeParams } from './parse'
import { splitOnce, normalizeParams } from './utils'

export const urlJoin = (base: string, ...args: string[]): string => {
    const parsedBase = urlParse(base)

    const reducedUrl: ParsedUrl = args.reduce((reducedUrl, incomingUrl) => {
        const [incomingPathWithParams, incomingFragment] = splitOnce(incomingUrl, '#')
        const [incomingPath, incomingParams] = splitOnce(incomingPathWithParams, '?')

        return {
            ...reducedUrl,
            path: mergePath(reducedUrl.path, incomingPath),
            rawParams: mergeRawParams(reducedUrl.rawParams, incomingParams || ''),
            params: mergeParams(reducedUrl.params, incomingParams || ''),
            fragment: incomingFragment ? incomingFragment : reducedUrl.fragment,
        }
    }, parsedBase)

    return urlToString(reducedUrl)
}

const mergeRawParams = (reducedRawParams: string, incomingParams: string): string => {
    return incomingParams
        ? [reducedRawParams, normalizeParams(incomingParams) as string].join('&')
        : reducedRawParams
}

const mergePath = (reducedPath: string, incomingPath: string): string => {
    if (!incomingPath) return wrapSlashIfRequired(reducedPath)
    if (incomingPath.startsWith('/')) return wrapSlashIfRequired(incomingPath)

    const reducedPathParts = reducedPath.split(/\/+/).filter(value => value.length)
    const incomingPathParts = incomingPath.split(/\/+/).filter(value => value.length)

    const resultParts = incomingPathParts.reduce(joinUrlParts, reducedPathParts)

    const result = resultParts.join('/')
    return wrapSlashIfRequired(result)
}

const joinUrlParts = (mergedParts: string[], currentIncomingPart: string): string[] => {
    if (currentIncomingPart == '..') {
        if (!mergedParts.length) return []
        return mergedParts.slice(0, -1)
    }

    return [...mergedParts, currentIncomingPart]
}

const urlToString = (parsedUrl: ParsedUrl): string => {
    const portPart = parsedUrl.port ? `:${parsedUrl.port}` : ''
    const paramsPart = parsedUrl.rawParams.length ? `?${parsedUrl.rawParams}` : ''
    const fragmentPart = parsedUrl.fragment ? `#${parsedUrl.fragment}` : ''
    return `${parsedUrl.schema}://${parsedUrl.host}${portPart}${parsedUrl.path}${paramsPart}${fragmentPart}`
}

const wrapSlashIfRequired = (path: string): string => {
    if (!path.length) return '/'
    return path.startsWith('/')
        ? path.endsWith('/')
            ? path
            : `${path}/`
        : path.endsWith('/')
        ? `/${path}`
        : `/${path}/`
}
