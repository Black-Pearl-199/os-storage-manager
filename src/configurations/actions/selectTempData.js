import {cleanObject} from "../../utils";

export const SELECT_TEMP_DATA = 'IT/SELECT_TEMP_DATA';
export const REMOVE_TEMP_DATA = 'IT/REMOVE_TEMP_DATA';

export const selectTempData = (resource, data, basePath, redirectTo, tab) => {
    const meta = {basePath, redirectTo, tab};
    cleanObject(meta);
    console.log('select template data', resource, data, basePath, redirectTo, tab);
    return {
        type: SELECT_TEMP_DATA,
        payload: {data, resource},
        meta
    }
};

export const removeTempData = (resource) => ({
    type: REMOVE_TEMP_DATA,
    payload: { resource }
});
