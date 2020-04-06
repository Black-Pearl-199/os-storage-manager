export const UPDATE_CLIENT = 'IT/UPDATE_CLIENT';
export const CREATE_CLIENT = 'IT/CREATE_CLIENT';

/**
 * Create CLIENT Action
 * @param {Object} payload : include client information and password
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const createClient = ({data, basePath, redirectTo, callback}) => {
    return {
        type: CREATE_CLIENT,
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
 * Update CLIENT Action
 * @param {Object} payload : include client information and password
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const updateClient = ({data, basePath, redirectTo, callback}) => {
    return {
        type: UPDATE_CLIENT,
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