import { getGraphQLRequestParams } from "../common/getGraphQLRequestParams";

export const getCategoriesQuery = (feature: string) => {
    const query: string = `
        query getCategories {
            category {
                getCategories {
                    id
                    name
                }
            }
        }`;

    return getGraphQLRequestParams(query, feature, undefined);
}