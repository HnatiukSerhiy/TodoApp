export type ApiRequestParamsType = {
    url: string,
    body?: string,
    feature?: string,
}

export type ApiSuccessType = {
    json: string,
    feature: string,
}

export type ApiErrorType = {
    error: string,
    feature: string,
}