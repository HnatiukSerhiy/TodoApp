import {AddCategoryType, UpdateCategoryType} from "../../types/categoryTypes";
import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const addCategoryMutation = (payload: AddCategoryType, feature: string) => {
    const query: string = ``;

    const variables = {
        addCategoryInputModel: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const updateCategoryMutation = (payload: UpdateCategoryType, feature: string) => {
    const query: string = ``;

    const variables = {
        updateCategoryInputModel: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const deleteCategoryMutation = (payload: AddCategoryType, feature: string) => {
    const query: string = ``;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}