import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {SolveTodoType, TodoType} from "../../types/todoTypes";

type InitialStateType = TodoType[];

const initialState: InitialStateType = [
    {
        id: 1,
        description: "demo todo",
        deadline: "2022-02-02",
        doneTime: undefined,
        category: {
            id: 1,
            name: "Home"
        },
        isCompleted: false
    },
    {
        id: 2,
        description: "second demo",
        deadline: "2022-09-07",
        doneTime: undefined,
        category: {
            id: 2,
            name: "Education"
        },
        isCompleted: false
    }
];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        pushTodos: (state, action: PayloadAction<TodoType[]>) => [...state, ...action.payload],
        addTodo: (state, action: PayloadAction<TodoType>) => [...state, action.payload],
        solveTodo: (state, action: PayloadAction<SolveTodoType>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            state[index].isCompleted = true;
            state[index].doneTime = action.payload.doneTime;
        },
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
    solveTodo,
    deleteTodo
} = todoSlice.actions;
export default todoSlice;