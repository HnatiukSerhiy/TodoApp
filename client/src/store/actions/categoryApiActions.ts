import {createAction} from "@reduxjs/toolkit";
import {AddCategoryType, UpdateCategoryType} from "../../types/categoryTypes";

export const getCategoriesApiAction = createAction('categories/get/api/request');
export const addCategoryApiAction = createAction<AddCategoryType>('categories/add/api/request');
export const updateCategoryApiAction = createAction<UpdateCategoryType>('categories/update/api/request');
export const deleteCategoryApiAction = createAction<number>('categories/delete/api/request');