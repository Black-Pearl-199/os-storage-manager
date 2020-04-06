export const UPDATE_RELATION_PERSON = 'IT/UPDATE_RELATION_PERSON';
export const CREATE_RELATION_PERSON = 'IT/CREATE_RELATION_PERSON';

/**
 * Create RELATION Action
 * @param {Object} payload : include RELATION information and RELATION_types
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const createRelationPerson = ({data, basePath, redirectTo, callback}) => {
    return {
        type: CREATE_RELATION_PERSON,
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
 * Update RELATION Action
 * @param {Object} payload : include RELATION information and RELATION_types
 * @param {Function} callback: callback nếu update thành công
 * @param {String} basePath: đường dẫn gốc để tạo url redirect
 * @param {String} redirectTo: view dc chuyển hướng, là 1 trong các view [list, show, edit]
 */
export const updateRelationPerson = ({data, basePath, redirectTo, callback}) => {
    return {
        type: UPDATE_RELATION_PERSON,
        payload: data,
        meta: {
            onSuccess: {
                basePath,
                redirectTo: redirectTo,
                callback: callback,
            }
        }
    }
}