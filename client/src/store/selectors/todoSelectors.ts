// export const selectCompletedTodos
import {RootState} from "../index";

export const selectCompletedTodos = (state: RootState) => state.todos.filter(todo => todo.isCompleted);
export const selectUnCompletedTodos = (state: RootState) => state.todos.filter(todo => !todo.isCompleted);