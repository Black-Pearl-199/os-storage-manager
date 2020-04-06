export const SEARCH_ONE = 'IT/SEARCH_ONE';
export const SEARCH_ONE_SUCCESS = 'IT/SEARCH_ONE_SUCCESS';

export const searchOne = (resource, filter, callback, notFoundMsg) => {
    return {
        type: SEARCH_ONE,
        payload: {filter},
        meta: {
            resource,
            onDone: {
                callback: callback
            },
            onNotFound: notFoundMsg && {
                notification: {body: notFoundMsg, level: 'warning'}
            }
        }
    }
};