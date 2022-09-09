import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, TodoActionEnum} from "../../../enums/actionEnums";
import {concat, mergeMap, of} from "rxjs";
import {
    addTodo,
    deleteTodo,
    pushCompletedTodos,
    pushUnCompletedTodos,
    solveTodo,
    updateTodo
} from "../../slices/todoSlice";
import {SolveTodoType, TodoType} from "../../../types/todoTypes";
import {setLoading} from "../../slices/loadingSlice";

const getCompletedTodosSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.getCompleted}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return concat(
                of(pushCompletedTodos(action.payload.data.todo.getCompleted as TodoType[])),
                of(setLoading({isCompletedTodosLoading: false}))
            )
        })
    )
}

const getUnCompletedTodosSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.getUnCompleted}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {

            return concat(
                of(pushUnCompletedTodos(action.payload.data.todo.getUnCompleted as TodoType[])),
                of(setLoading({isUnCompletedTodosLoading: false}))
            )
        })
    )
}

const addTodoSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.addTodo}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(addTodo(action.payload.data.todo.add as TodoType))
        })
    )
}

const updateTodoSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.updateTodo}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(updateTodo(action.payload.data.todo.update as TodoType))
        })
    )
}

const solveTodoSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.solveTodo}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(solveTodo(action.payload.data.todo.solve as SolveTodoType))
        })
    )
}

const deleteTodoSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${TodoActionEnum.deleteTodo}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(deleteTodo(action.payload.data.todo.delete as number))
        })
    )
}

export const todoSuccessEpics = combineEpics(
    getCompletedTodosSuccessEpic,
    getUnCompletedTodosSuccessEpic,
    addTodoSuccessEpic,
    updateTodoSuccessEpic,
    solveTodoSuccessEpic,
    deleteTodoSuccessEpic
);