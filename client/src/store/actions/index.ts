import todoSlice from "../slices/todoSlice";
import categorySlice from "../slices/categorySlice";
import {
    addCategoryApiAction,
    deleteCategoryApiAction,
    getCategoriesApiAction,
    updateCategoryApiAction
} from "./categoryApiActions";
import {
    addTodoApiAction, deleteTodoApiAction,
    getCompletedTodosApiAction,
    getUnCompletedTodosApiAction,
    solveTodoApiAction, updateTodoApiAction
} from "./todoApiActions";
import dataProviderSlice from "../slices/dataProviderSlice";
import {changeDataProviderApiAction} from "./dataProviderApiActions";

export default {
    ...todoSlice.actions,
    ...categorySlice.actions,
    ...dataProviderSlice.actions,
    getCategoriesApiAction,
    addCategoryApiAction,
    updateCategoryApiAction,
    deleteCategoryApiAction,
    getCompletedTodosApiAction,
    getUnCompletedTodosApiAction,
    addTodoApiAction,
    solveTodoApiAction,
    updateTodoApiAction,
    deleteTodoApiAction,
    changeDataProviderApiAction
}