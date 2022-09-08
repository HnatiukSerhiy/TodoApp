import {useDispatch} from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import actions from "../store/actions";

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
}