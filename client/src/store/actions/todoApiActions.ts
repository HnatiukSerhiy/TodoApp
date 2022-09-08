import {createAction} from "@reduxjs/toolkit";
import {AddTodoType, UpdateTodoType} from "../../types/todoTypes";

export const getCompletedTodosApiAction = createAction<number | undefined>('todos/getCompleted/api/request');
export const getUnCompletedTodosApiAction = createAction<number | undefined>('todos/getUnCompleted/api/request');
export const addTodoApiAction = createAction<AddTodoType>('todos/add/api/request');
export const solveTodoApiAction = createAction<number>('todos/solve/api/request');
export const updateTodoApiAction = createAction<UpdateTodoType>('todos/update/api/request');
export const deleteTodoApiAction = createAction<number>('todos/delete/api/request');