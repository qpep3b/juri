const SYMBOL_NOT_FOUND = -1

export const splitOnce = (source: string, delimitter: string): [string, string | null] => {
    const delimitterIndex = source.indexOf(delimitter)
    if (delimitterIndex === SYMBOL_NOT_FOUND) {
        return [source, null]
    }

    return [source.slice(0, delimitterIndex), source.slice(delimitterIndex + 1)]
}

export const normalizeParams = (incomingParams: string): string => {
    return incomingParams.replace(/\?/g, '&')
}
