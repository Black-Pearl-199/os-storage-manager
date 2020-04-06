export const UPDATE_ATTRIBUTE = 'IT/UPDATE_ATTRIBUTE';
export const CREATE_ATTRIBUTE = 'IT/CREATE_ATTRIBUTE';

/**
 * Create ATTRIBUTE Action
 * @param {Object} payload : include attribute information and attribute_types
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const createAttribute = ({data, basePath, redirectTo, callback}) => {
    return {
        type: CREATE_ATTRIBUTE,
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
 * Update ATTRIBUTE Action
 * @param {Object} payload : include attribute information and attribute_types
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const updateAttribute = ({data, basePath, redirectTo, callback}) => {
    return {
        type: UPDATE_ATTRIBUTE,
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