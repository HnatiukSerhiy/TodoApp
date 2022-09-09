import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type InitialStateType = {
    isCompletedTodosLoading: boolean
    isUnCompletedTodosLoading: boolean
    isCategoriesLoading: boolean
}

const initialState: InitialStateType = {
    isCompletedTodosLoading: false,
    isUnCompletedTodosLoading: false,
    isCategoriesLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<any>) => ({...state, ...action.payload})
    }
})

export const {
    setLoading
} = loadingSlice.actions;
export default loadingSlice;