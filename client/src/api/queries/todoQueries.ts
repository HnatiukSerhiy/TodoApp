import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const getCompletedTodosQuery = (payload: number, feature: string) => {
    const query: string = '';

    const variables = {
        categoryId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUnCompletedTodosQuery = (payload: number, feature: string) => {
    const query: string = '';

    const variables = {
        categoryId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}