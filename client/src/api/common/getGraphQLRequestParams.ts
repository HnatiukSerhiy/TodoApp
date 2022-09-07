import {getGraphQLBodyRequest} from "./getGraphQLBodyRequest";

export const getGraphQLRequestParams = (query: string, feature?: string, variables?: any) => {
    const apiUrl = '';
    const requestBody = getGraphQLBodyRequest(query, variables)

    return {
        url: apiUrl,
        body: requestBody,
        feature: feature
    }
}