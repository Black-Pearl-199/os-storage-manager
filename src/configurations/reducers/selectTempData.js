import { USER_LOGOUT } from 'ra-core';
import { cloneDeep } from 'lodash';
import { SELECT_TEMP_DATA, REMOVE_TEMP_DATA } from '../actions';
import { SAVE_TEMP_DATA } from '../resources/authProvider';

const saved = localStorage.getItem(SAVE_TEMP_DATA);
const initialState = saved ? JSON.parse(saved) : {};
export default (previousState = initialState, action) => {
    const { type, payload } = action;
    if (type === SELECT_TEMP_DATA) {
        // console.log('select template data', previousState, action);
        const { data, resource } = payload;
        const newState = data ? { ...previousState, [resource]: data } : previousState;
        localStorage.setItem(SAVE_TEMP_DATA, JSON.stringify(newState));
        // console.log(newState);
        return newState;
    } if (type === REMOVE_TEMP_DATA) {
        const { resource } = payload;
        const newState = cloneDeep(previousState);
        delete newState[resource];
        // console.log(newState);
        localStorage.setItem(SAVE_TEMP_DATA, JSON.stringify(newState));
        return newState;
    }
    if (type === USER_LOGOUT) return initialState;
    return previousState;
};
