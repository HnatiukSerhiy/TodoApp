import {filter, mergeMap, of} from "rxjs";
import {
    addCategoryApiAction,
    deleteCategoryApiAction,
    getCategoriesApiAction,
    updateCategoryApiAction
} from "../../actions/categoryApiActions";
import {getCategoriesQuery} from "../../../api/queries/categoryQueries";
import {CategoryActionEnum} from "../../../enums/actionEnums";
import {ApiRequestAction} from "../../actions/apiActions";
import {ApiRequestParamsType} from "../../../types/apiTypes";
import {
    addCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation
} from "../../../api/mutations/categoryMutations";
import {combineEpics} from "redux-observable";

const getCategoriesEpic = (action$: any) => {
    return action$.pipe(
        filter(getCategoriesApiAction.match),
        mergeMap(() => {
            const apiRequestParams = {
                ...getCategoriesQuery(CategoryActionEnum.get)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const addCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter(addCategoryApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...addCategoryMutation(action.payload, CategoryActionEnum.addCategory)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const updateCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter(updateCategoryApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...updateCategoryMutation(action.payload, CategoryActionEnum.updateCategory)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

const deleteCategoryEpic = (action$: any) => {
    return action$.pipe(
        filter(deleteCategoryApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...deleteCategoryMutation(action.payload, CategoryActionEnum.deleteCategory)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

export const categoryEpics = combineEpics(
    getCategoriesEpic,
    addCategoryEpic,
    updateCategoryEpic,
    deleteCategoryEpic
);