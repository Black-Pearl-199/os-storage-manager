export const UPDATE_USER = 'IT/UPDATE_USER';
export const CREATE_USER = 'IT/CREATE_USER';

/**
 * Create USER Action
 * @param {Object} payload : include user information, personal information and password
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const createUser = ({data, basePath, redirectTo, callback}) => {
    return {
        type: CREATE_USER,
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
 * Update USER Action
 * @param {Object} payload : include user information, personal information and password
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const updateUser = ({data, basePath, redirectTo, callback}) => {
    return {
        type: UPDATE_USER,
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