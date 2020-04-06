import {combineReducers} from "redux";
import selectTempData from "./selectTempData";
import staff from './staff';

export const ITECH_REDUCER = 'iTech';
export const TEMP_DATA_REDUCER = 'tempData';
export const STAFF = 'staff';

export default combineReducers({
    [TEMP_DATA_REDUCER]: selectTempData,
    [STAFF]: staff
})