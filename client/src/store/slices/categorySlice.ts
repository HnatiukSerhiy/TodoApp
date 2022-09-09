import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CategoryType} from "../../types/categoryTypes";

type InitialStateType = CategoryType[];

const initialState: InitialStateType = [];

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        pushCategories: (state, action: PayloadAction<CategoryType[]>) => action.payload,
        addCategory: (state, action: PayloadAction<CategoryType>) => [...state, action.payload],
        updateCategory: (state, action: PayloadAction<CategoryType>) => {
            const index = state.findIndex(category => category.id === action.payload.id)
            state[index] = action.payload;
        },
        deleteCategory: (state, action: PayloadAction<number>) =>
            state.filter(category => category.id !== action.payload)
    }
});

export const {
    pushCategories,
    addCategory,
    updateCategory,
    deleteCategory
} = categorySlice.actions;

export default categorySlice;