import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SolveTodoType, TodoType} from "../../types/todoTypes";

type InitialStateType = {
    completedTodos: TodoType[]
    unCompletedTodos: TodoType[]
};

const initialState: InitialStateType = {
    completedTodos: [],
    unCompletedTodos: []
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        pushCompletedTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.completedTodos = action.payload;
        },
        pushUnCompletedTodos: (state, action: PayloadAction<TodoType[]>) => {
            state.unCompletedTodos = action.payload
        },
        addTodo: (state, action: PayloadAction<TodoType>) => {
            state.unCompletedTodos.push(action.payload);
        },
        solveTodo: (state, action: PayloadAction<SolveTodoType>) => {
            const index = state.unCompletedTodos.findIndex(todo => todo.id === action.payload.id);
            state.unCompletedTodos[index].isCompleted = true;
            state.unCompletedTodos[index].doneTime = action.payload.doneTime;
        },
        updateTodo: (state, action: PayloadAction<TodoType>) => {
            const index = state.unCompletedTodos.findIndex(todo => todo.id === action.payload.id);
            state.unCompletedTodos[index] = action.payload;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.unCompletedTodos = state.unCompletedTodos.filter(todo => todo.id !== action.payload);
            state.completedTodos = state.completedTodos.filter(todo => todo.id !== action.payload)
        }
    }
});

export const {
    pushCompletedTodos,
    pushUnCompletedTodos,
    addTodo,
    updateTodo,
    solveTodo,
    deleteTodo
} = todoSlice.actions;
export default todoSlice;