import {urlParse, ParsedUrl, UrlParams} from './parse'

export const urlJoin = (base: string, ...args: string[]): string => {
    const parsedBase = urlParse(base)

    const reducedPath = args.reduce((reducedPath, currentIncome) => {
        if (!currentIncome) return wrapSlashIfRequired(reducedPath)
        if (currentIncome.startsWith('/')) return wrapSlashIfRequired(currentIncome)

        const reducedPathParts = reducedPath.split(/\/+/).filter(value => value.length)
        const incomingPathParts = currentIncome.split(/\/+/).filter(value => value.length)
        
        const resultParts = incomingPathParts.reduce((mergedParts, currentIncomingPart) => {
            if (currentIncomingPart == '..') {
                if (!mergedParts.length) return []
                return mergedParts.slice(0, -1)
            }

            return [
                ...mergedParts,
                currentIncomingPart,
            ]
        }, reducedPathParts)
        
        const result = resultParts.join('/')
        return wrapSlashIfRequired(result)
    }, parsedBase.path)

    const path = reducedPath.length ? reducedPath : '/'
    return urlToString({
        ...parsedBase,
        path,
    })
}

const urlToString = (parsedUrl: ParsedUrl): string => {
    const portPart = parsedUrl.port ? `:${parsedUrl.port}` : ''
    const paramsPart = Object.keys(parsedUrl.params).length ? '?' : ''   // ToDo: serializing params
    const fragmentPart = parsedUrl.fragment ? `#${parsedUrl.fragment}` : ''
    return `${parsedUrl.schema}://${parsedUrl.host}${portPart}${parsedUrl.path}${paramsPart}${fragmentPart}`
}

const wrapSlashIfRequired = (path: string): string => {
    return path.startsWith('/') 
        ? path.endsWith('/') ? path : `${path}/`
        : path.endsWith('/') ? `/${path}` : `/${path}/`
}