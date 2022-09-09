import {getGraphQLRequestParams} from "../common/getGraphQLRequestParams";
import {AddTodoType, UpdateTodoType} from "../../types/todoTypes";

export const addTodoMutation = (payload: AddTodoType, feature: string) => {
    const query: string = `
        mutation addTodo($todo: AddTodoInputModel!) {
            todo {
                add (inputTodoModel: $todo) {
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
        todo: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const updateTodoMutation = (payload: UpdateTodoType, feature: string) => {
    const query: string = `
        mutation updateTodo($todo: UpdateTodoInputModel!) {
            todo {
                update (todoInputModel: $todo) {
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
        todo: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const solveTodoMutation = (payload: number, feature: string) => {
    const query: string = `
        mutation solveTodo ($id: Int!) {
            todo {
                solve(id: $id)
            }
        }`;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}

export const deleteTodoMutation = (payload: number, feature: string) => {
    const query: string = `
        mutation deleteTodo ($id: Int!) {
            todo {
                delete (id: $id)
            }
        }`;

    const variables = {
        id: payload
    }

    return getGraphQLRequestParams(query, feature, variables);
}