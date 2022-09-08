import {RootState} from "../index";

export const selectDataProvider = (state: RootState) => state.dataProvider.name;