import {combineReducers} from "redux";
import todoSlice from "./slices/todoSlice";
import categorySlice from "./slices/categorySlice";
import {configureStore} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import apiEpics from "./epics/apiRequestEpic";
import {todoEpics} from "./epics/todo/todoEpics";
import {todoSuccessEpics} from "./epics/todo/todoSuccessEpics";
import {categoryEpics} from "./epics/category/categoryEpics";
import {categorySuccessEpics} from "./epics/category/categorySuccessEpics";
import dataProviderSlice from "./slices/dataProviderSlice";
import {dataProviderEpics} from "./epics/dataProvider/dataProviderEpics";
import {dataProviderSuccessEpics} from "./epics/dataProvider/dataProviderSuccessEpics";
import loadingSlice from "./slices/loadingSlice";

const rootEpic = combineEpics(apiEpics, todoEpics, todoSuccessEpics, categoryEpics,
    categorySuccessEpics, dataProviderEpics, dataProviderSuccessEpics);

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
    todos: todoSlice.reducer,
    categories: categorySlice.reducer,
    dataProvider: dataProviderSlice.reducer,
    loading: loadingSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [
        epicMiddleware
    ]
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;