import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TodoType} from "../../types/todoTypes";

type InitialStateType = TodoType[];

const initialState: InitialStateType = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        pushTodos: (state, action: PayloadAction<TodoType[]>) => [...state, ...action.payload],
        addTodo: (state, action: PayloadAction<TodoType>) => [...state, action.payload],
        updateTodo: (state, action: PayloadAction<TodoType>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index] = action.payload;
        },
        deleteTodo: (state, action: PayloadAction<number>) =>
            state.filter(todo => todo.id !== action.payload)
    }
});

export const {
    pushTodos,
    addTodo,
    updateTodo,
    deleteTodo
} = todoSlice.actions;
export default todoSlice;