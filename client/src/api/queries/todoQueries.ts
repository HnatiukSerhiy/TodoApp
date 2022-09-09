import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";

export const getCompletedTodosQuery = (payload: number, feature: string) => {
    const query: string = `
        query getCompleted($categoryId: Int) {
            todo {
                getCompleted(categoryId: $categoryId) {
                    id
                    description
                    doneTime
                    category {
                        id
                        name
                    }
                    isCompleted
                }
            }
        }`;

    const variables = {
        categoryId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const getUnCompletedTodosQuery = (payload: number, feature: string) => {
    const query: string = `
        query getUnCompleted($categoryId: Int) {
            todo {
                getUnCompleted(categoryId: $categoryId) {
                    id
                    description
                    deadline
                    category {
                        id
                        name
                    }
                    isCompleted
                }
            }
        }`;

    const variables = {
        categoryId: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}