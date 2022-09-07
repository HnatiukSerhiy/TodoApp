import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";
import {AddTodoType, UpdateTodoType} from "../../types/todoTypes";

export const addTodoMutation = (payload: AddTodoType, feature: string) => {
    const query: string = ``;

    const variables = {
        addTodoInputModel: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const updateTodoMutation = (payload: UpdateTodoType, feature: string) => {
    const query: string = ``;

    const variables = {
        updateTodoInputModel: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const deleteTodoMutation = (payload: number, feature: string) => {
    const query: string = ``;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}