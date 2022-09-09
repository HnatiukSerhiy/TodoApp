import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const changeDataProviderMutation = (payload: string, feature: string) => {
    const query: string = `
        mutation changeDataProvider ($name: String!) {
            dataProvider {
                changeDataProvider (dataProviderName: $name)
            }
        }`;

    const variables = {
        name: payload
    }

    return getGraphQLRequestParams(query, feature, variables)
}