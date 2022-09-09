import {getGraphQLBodyRequest} from "./getGraphQLBodyRequest";

export const getGraphQLRequestParams = (query: string, feature?: string, variables?: any) => {
    const apiUrl = process.env.REACT_APP_API_URL! as string;
    const requestBody = getGraphQLBodyRequest(query, variables)

    return {
        url: apiUrl,
        body: requestBody,
        feature: feature
    }
}