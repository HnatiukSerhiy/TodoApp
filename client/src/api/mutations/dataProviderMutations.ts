import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const changeDataProviderMutation = (payload: string, feature: string) => {
    const query: string = ``;

    const variables = {
        dataProvider: payload
    }

    return getGraphQLRequestParams(query, feature, variables)
}