import {combineEpics, ofType} from "redux-observable";
import {ApiActionEnum, DataProviderActionEnum} from "../../../enums/actionEnums";
import {mergeMap, of} from "rxjs";
import {setDataProvider} from "../../slices/dataProviderSlice";
import {DataProviderEnum} from "../../../enums/utilsEnum";

const changeDataProviderSuccessEpic = (action$: any) => {
    return action$.pipe(
        ofType(`${DataProviderActionEnum.change}${ApiActionEnum.apiSuccess}`),
        mergeMap((action: any) => {
            return of(setDataProvider(action.payload.data.dataProvider.change as DataProviderEnum))
        })
    )
}

export const dataProviderSuccessEpics = combineEpics(changeDataProviderSuccessEpic);