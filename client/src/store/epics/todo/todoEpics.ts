import {filter, mergeMap, of} from "rxjs";
import {
    addTodoApiAction, deleteTodoApiAction,
    getCompletedTodosApiAction,
    getUnCompletedTodosApiAction, solveTodoApiAction,
    updateTodoApiAction
} from "../../actions/todoApiActions";
import {getCompletedTodosQuery, getUnCompletedTodosQuery} from "../../../api/queries/todoQueries";
import {TodoActionEnum} from "../../../enums/actionEnums";
import {ApiRequestAction} from "../../actions/apiActions";
import {ApiRequestParamsType} from "../../../types/apiTypes";
import {
    addTodoMutation,
    deleteTodoMutation,
    solveTodoMutation,
    updateTodoMutation
} from "../../../api/mutations/todoMutations";
import {combineEpics} from "redux-observable";

const getCompletedTodosEpic = (action$: any) => {
    return action$.pipe(
        filter(getCompletedTodosApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getCompletedTodosQuery(action.payload, TodoActionEnum.getCompleted)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const getUnCompletedTodosEpic = (action$: any) => {
    return action$.pipe(
        filter(getUnCompletedTodosApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...getUnCompletedTodosQuery(action.payload, TodoActionEnum.getUnCompleted)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const addTodoEpic = (action$: any) => {
    return action$.pipe(
        filter(addTodoApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...addTodoMutation(action.payload, TodoActionEnum.addTodo)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const updateTodoEpic = (action$: any) => {
    return action$.pipe(
        filter(updateTodoApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...updateTodoMutation(action.payload, TodoActionEnum.updateTodo)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const solveTodoEpic = (action$: any) => {
    return action$.pipe(
        filter(solveTodoApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...solveTodoMutation(action.payload, TodoActionEnum.solveTodo)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const deleteTodoEpic = (action$: any) => {
    return action$.pipe(
        filter(deleteTodoApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...deleteTodoMutation(action.payload, TodoActionEnum.deleteTodo)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

export const todoEpics = combineEpics(
    getCompletedTodosEpic,
    getUnCompletedTodosEpic,
    addTodoEpic,
    updateTodoEpic,
    deleteTodoEpic,
    solveTodoEpic
)