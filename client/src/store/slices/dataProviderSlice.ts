import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DataProviderEnum} from "../../enums/utilsEnum";

type InitialStateType = {
    name: DataProviderEnum
};

const initialState: InitialStateType = {
    name: DataProviderEnum.SQLServer
};

const dataProviderSlice = createSlice({
    name: 'dataProvider',
    initialState,
    reducers: {
        setDataProvider: (state, action: PayloadAction<DataProviderEnum>) => {
            state.name = action.payload
        }
    }
})

export const {
    setDataProvider
} = dataProviderSlice.actions;
export default dataProviderSlice;