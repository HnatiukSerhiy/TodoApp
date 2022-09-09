import {RootState} from "../index";

export const selectCompletedTodos = (state: RootState) => state.todos.completedTodos;
export const selectUnCompletedTodos = (state: RootState) => state.todos.unCompletedTodos;