import {apiErrorAction, ApiRequestAction, apiSuccessAction} from "../actions/apiActions";
import {catchError, filter, from, map, mergeMap, of} from "rxjs";
import {ApiRequestActionType} from "../actions/actionTypes";
import {graphQLApiRequest} from "../../api/common/graphqlApiRequest";
import {combineEpics} from "redux-observable";

const apiRequestEpic = (action$: any) => {
    return action$.pipe(
        filter(ApiRequestAction.match),
        mergeMap((action: ApiRequestActionType) => {
            const {body, url, feature} = action.payload;

            return from(graphQLApiRequest({url: url, body: body})).pipe(
                map(json => apiSuccessAction({json, feature})),
                catchError(error => of(apiErrorAction({error, feature}))))
        })
    )
}

const apiEpics = combineEpics(apiRequestEpic);
export default apiEpics;