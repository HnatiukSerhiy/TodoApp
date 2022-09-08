import {filter, mergeMap, of} from "rxjs";
import {DataProviderActionEnum} from "../../../enums/actionEnums";
import {ApiRequestAction} from "../../actions/apiActions";
import {ApiRequestParamsType} from "../../../types/apiTypes";
import {changeDataProviderApiAction} from "../../actions/dataProviderApiActions";
import {changeDataProviderMutation} from "../../../api/mutations/dataProviderMutations";
import {combineEpics} from "redux-observable";

const changeDataProviderEpic = (action$: any) => {
    return action$.pipe(
        filter(changeDataProviderApiAction.match),
        mergeMap((action: any) => {
            const apiRequestParams = {
                ...changeDataProviderMutation(action.payload, DataProviderActionEnum.change)
            }

            return of(ApiRequestAction(apiRequestParams as ApiRequestParamsType))
        })
    )
}

export const dataProviderEpics = combineEpics(changeDataProviderEpic);