import {createAction} from "@reduxjs/toolkit";
import {DataProviderEnum} from "../../enums/utilsEnum";

export const changeDataProviderApiAction = createAction<DataProviderEnum>('dataProvider/change/api/request');