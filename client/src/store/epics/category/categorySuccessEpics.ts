import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, CategoryActionEnum} from "../../../enums/actionEnums";
import {mergeMap, of} from "rxjs";
import {CategoryType} from "../../../types/categoryTypes";
import {addCategory, deleteCategory, pushCategories, updateCategory} from "../../slices/categorySlice";

const getCategoriesSuccessEpics = (action$: any) => {
    return action$.pipe(
        ofType(`${CategoryActionEnum.get}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(pushCategories(action.payload.data.category.getAll as CategoryType[]))
        })
    )
}

const addCategorySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CategoryActionEnum.addCategory}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(addCategory(action.payload.data.category.add as CategoryType))
        })
    )
}

const updateCategorySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CategoryActionEnum.updateCategory}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(updateCategory(action.payload.data.category.update as CategoryType))
        })
    )
}

const deleteCategorySuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${CategoryActionEnum.deleteCategory}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(deleteCategory(action.payload.data.category.delete as number))
        })
    )
}

export const categorySuccessEpics = combineEpics(
    getCategoriesSuccessEpics,
    addCategorySuccessEpic,
    updateCategorySuccessEpic,
    deleteCategorySuccessEpic
);