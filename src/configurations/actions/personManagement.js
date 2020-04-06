export const UPDATE_PERSON = 'IT/UPDATE_PERSON';
export const CREATE_PERSON = 'IT/CREATE_PERSON';

/**
 * Create PERSON Action
 * @param {Object} payload : include person information and addressPerson
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const createPerson = ({data, basePath, redirectTo, callback}) => {
    return {
        type: CREATE_PERSON,
        payload: data,
        meta: {
            onSuccess: {
                basePath,
                redirectTo: redirectTo,
                callback: callback,
            }
        }
    }
};

/**
 * Update PERSON Action
 * @param {Object} payload : include person information and addressPerson
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const updatePerson = ({data, basePath, redirectTo, callback}) => {
    return {
        type: UPDATE_PERSON,
        payload: data,
        meta: {
            onSuccess: {
                basePath,
                redirectTo: redirectTo,
                callback: callback,
            }
        }
    }
};