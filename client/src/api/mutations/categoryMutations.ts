import {AddCategoryType, UpdateCategoryType} from "../../types/categoryTypes";
import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const addCategoryMutation = (payload: AddCategoryType, feature: string) => {
    const query: string = `
        mutation addCategory ($category: AddCategoryInputModel!) {
            category {
                add (categoryInputModel: $category) {
                    id
                    name
                }
            }
        }`;

    const variables = {
        category: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const updateCategoryMutation = (payload: UpdateCategoryType, feature: string) => {
    const query: string = `
        mutation updateCategory ($category: UpdateCategoryInputModel!) {
            category {
                update (categoryInputModel: $category) {
                    id
                    name
                }
            }
        }`;

    const variables = {
        category: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const deleteCategoryMutation = (payload: AddCategoryType, feature: string) => {
    const query: string = `
        mutation deleteCategory ($id: Int!) {
            category {
                delete(id: $id)
            }
        }`;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}