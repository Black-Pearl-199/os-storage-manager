import {
    CREATE,
    CRUD_GET_LIST,
    DELETE,
    DELETE_MANY,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
} from 'react-admin';
import {CRUD_DELETE} from "ra-core";

export const IT_CRUD_GET_LIST = 'IT/CRUD_GET_LIST';
export const IT_CRUD_GET_LIST_LOADING = 'IT/CRUD_GET_LIST_LOADING';
export const IT_CRUD_GET_LIST_FAILURE = 'IT/CRUD_GET_LIST_FAILURE';
export const IT_CRUD_GET_LIST_SUCCESS = 'IT/CRUD_GET_LIST_SUCCESS';
export const ITCrudGetList = function (params) {
    let {resource, pagination, sort, filter} = params;
    return ({
        type: CRUD_GET_LIST,
        payload: {pagination: pagination, sort: sort, filter: filter},
        meta: {
            resource: resource,
            fetch: GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_GET_ALL = 'IT/CRUD_GET_ALL';
export const IT_CRUD_GET_ALL_LOADING = 'IT/CRUD_GET_ALL_LOADING';
export const IT_CRUD_GET_ALL_FAILURE = 'IT/CRUD_GET_ALL_FAILURE';
export const IT_CRUD_GET_ALL_SUCCESS = 'IT/CRUD_GET_ALL_SUCCESS';
export const ITCrudGetAll = function ({...params}) {
    const {resource, sort, filter, maxResults, callback} = params;
    // console.log('ITCrud get all', params)
    return ({
        type: IT_CRUD_GET_ALL,
        payload: {sort: sort, filter: filter, pagination: {page: 1, perPage: maxResults}},
        meta: {
            resource: resource,
            fetch: GET_LIST,
            onSuccess: {
                callback: callback,
            },
            onFailure: {
                notification: {
                    body: `ra.notification.http_error`,
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_GET_ONE = 'IT/CRUD_GET_ONE';
export const IT_CRUD_GET_ONE_LOADING = 'IT/CRUD_GET_ONE_LOADING';
export const IT_CRUD_GET_ONE_FAILURE = 'IT/CRUD_GET_ONE_FAILURE';
export const IT_CRUD_GET_ONE_SUCCESS = 'IT/CRUD_GET_ONE_SUCCESS';
export const ITCrudGetOne = function ({...params}) {
    let {resource, id, basePath, refresh, filter} = params;
    if (refresh === void 0) {
        refresh = true;
    }
    return ({
        type: IT_CRUD_GET_ONE,
        payload: {id: id, filter},
        meta: {
            resource: resource,
            fetch: GET_ONE,
            basePath: basePath,
            onFailure: {
                notification: {
                    body: 'ra.notification.item_doesnt_exist',
                    level: 'warning',
                },
                redirectTo: 'list',
                refresh: refresh,
            },
        },
    });
};
export const IT_CRUD_CREATE = 'IT/CRUD_CREATE';
export const IT_CRUD_CREATE_LOADING = 'IT/CRUD_CREATE_LOADING';
export const IT_CRUD_CREATE_FAILURE = 'IT/CRUD_CREATE_FAILURE';
export const IT_CRUD_CREATE_SUCCESS = 'IT/CRUD_CREATE_SUCCESS';
export const ITCrudCreate = function (params) {
    let {resource, data, basePath, redirectTo, resourceName, callback, filter, meta} = params;
    console.log('action create params', params);
    // const id = data.id;
    if (redirectTo === void 0) {
        redirectTo = 'edit';
    }
    return ({
        type: IT_CRUD_CREATE,
        payload: {data: data, filter},
        meta: {
            resource: resource,
            fetch: CREATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.created',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    },
                },
                redirectTo: redirectTo,
                basePath: basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: {
                        ...data
                    }
                },
            },
            ...meta
        },
    });
};
export const IT_CRUD_UPDATE = 'IT/CRUD_UPDATE';
export const IT_CRUD_UPDATE_LOADING = 'IT/CRUD_UPDATE_LOADING';
export const IT_CRUD_UPDATE_FAILURE = 'IT/CRUD_UPDATE_FAILURE';
export const IT_CRUD_UPDATE_SUCCESS = 'IT/CRUD_UPDATE_SUCCESS';
export const IT_CRUD_UPDATE_OPTIMISTIC = 'IT/CRUD_UPDATE_OPTIMISTIC';
export const ITCrudUpdate = function (params) {
    let {resource, id, data, previousData, basePath, redirectTo, resourceName, callback, filter, meta} = params;
    console.log('call update', params);
    if (redirectTo === void 0) {
        redirectTo = 'show';
    }
    return ({
        type: IT_CRUD_UPDATE,
        payload: {id: id, data: data, previousData: previousData, filter},
        meta: {
            resource: resource,
            fetch: UPDATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    },
                },
                redirectTo: redirectTo,
                basePath: basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: {
                        ...data
                    }
                },
            },
            ...meta
        },
    });
};
export const IT_CRUD_UPDATE_MANY = 'IT/CRUD_UPDATE_MANY';
export const IT_CRUD_UPDATE_MANY_LOADING = 'IT/CRUD_UPDATE_MANY_LOADING';
export const IT_CRUD_UPDATE_MANY_FAILURE = 'IT/CRUD_UPDATE_MANY_FAILURE';
export const IT_CRUD_UPDATE_MANY_SUCCESS = 'IT/CRUD_UPDATE_MANY_SUCCESS';
export const IT_CRUD_UPDATE_MANY_OPTIMISTIC = 'IT/CRUD_UPDATE_MANY_OPTIMISTIC';
export const ITCrudUpdateMany = function (params) {
    let {resource, ids, data, basePath, refresh, resourceName, filter} = params;
    if (refresh === void 0) {
        refresh = true;
    }
    return ({
        type: IT_CRUD_UPDATE_MANY,
        payload: {ids: ids, data: data, filter},
        meta: {
            resource: resource,
            fetch: UPDATE_MANY,
            cancelPrevious: false,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length,
                        resource_name: resourceName
                    },
                },
                basePath: basePath,
                refresh: refresh,
                unselectAll: true,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_DELETE = 'IT/CRUD_DELETE';
export const IT_CRUD_DELETE_LOADING = 'IT/CRUD_DELETE_LOADING';
export const IT_CRUD_DELETE_FAILURE = 'IT/CRUD_DELETE_FAILURE';
export const IT_CRUD_DELETE_SUCCESS = 'IT/CRUD_DELETE_SUCCESS';
export const IT_CRUD_DELETE_OPTIMISTIC = 'IT/CRUD_DELETE_OPTIMISTIC';
export const ITCrudDelete = function ({...params}) {
    let {resource, id, previousData, basePath, redirectTo, resourceName, reason, callback, filter, purge, optimistic = false} = params;
    if (redirectTo === void 0) {
        redirectTo = 'list';
    }
    console.log('crud delete params', params);
    return ({
        type: CRUD_DELETE,
        payload: {id, previousData, reason, filter, purge},
        meta: {
            resource: resource,
            fetch: DELETE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                        resource_name: resourceName
                    },
                },
                redirectTo: redirectTo,
                basePath: basePath,
                callback
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                    messageArgs: {
                        ...previousData,
                        resource_name: resourceName
                    }
                },
            },
            optimistic
        },
    });
};
export const IT_CRUD_DELETE_MANY = 'IT/CRUD_DELETE_MANY';
export const IT_CRUD_DELETE_MANY_LOADING = 'IT/CRUD_DELETE_MANY_LOADING';
export const IT_CRUD_DELETE_MANY_FAILURE = 'IT/CRUD_DELETE_MANY_FAILURE';
export const IT_CRUD_DELETE_MANY_SUCCESS = 'IT/CRUD_DELETE_MANY_SUCCESS';
export const IT_CRUD_DELETE_MANY_OPTIMISTIC = 'IT/CRUD_DELETE_MANY_OPTIMISTIC';
export const ITCrudDeleteMany = function ({...params}) {
    let {resource, ids, basePath, resourceName, refresh, filter} = params;
    if (refresh === void 0) {
        refresh = true;
    }
    return ({
        type: IT_CRUD_DELETE_MANY,
        payload: {ids: ids, filter},
        meta: {
            resource: resource,
            fetch: DELETE_MANY,
            onSuccess: {
                notification: {
                    body: 'ra.notification.deleted',
                    level: 'info',
                    messageArgs: {
                        smart_count: ids.length,
                        resource_name: resourceName
                    },
                },
                basePath: basePath,
                refresh: refresh,
                unselectAll: true,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_GET_MANY = 'IT/CRUD_GET_MANY';
export const IT_CRUD_GET_MANY_LOADING = 'IT/CRUD_GET_MANY_LOADING';
export const IT_CRUD_GET_MANY_FAILURE = 'IT/CRUD_GET_MANY_FAILURE';
export const IT_CRUD_GET_MANY_SUCCESS = 'IT/CRUD_GET_MANY_SUCCESS';
// Reference related actions
export const ITCrudGetMany = function (resource, ids) {
    return ({
        type: IT_CRUD_GET_MANY,
        payload: {ids: ids},
        meta: {
            resource: resource,
            fetch: GET_MANY,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_GET_MATCHING = 'IT/CRUD_GET_MATCHING';
export const IT_CRUD_GET_MATCHING_LOADING = 'IT/CRUD_GET_MATCHING_LOADING';
export const IT_CRUD_GET_MATCHING_FAILURE = 'IT/CRUD_GET_MATCHING_FAILURE';
export const IT_CRUD_GET_MATCHING_SUCCESS = 'IT/CRUD_GET_MATCHING_SUCCESS';
export const ITCrudGetMatching = function ({...params}) {
    let {reference, relatedTo, pagination, sort, filter} = params;
    return ({
        type: IT_CRUD_GET_MATCHING,
        payload: {pagination: pagination, sort: sort, filter: filter},
        meta: {
            resource: reference,
            relatedTo: relatedTo,
            fetch: GET_LIST,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export const IT_CRUD_GET_MANY_REFERENCE = 'IT/CRUD_GET_MANY_REFERENCE';
export const IT_CRUD_GET_MANY_REFERENCE_LOADING = 'IT/CRUD_GET_MANY_REFERENCE_LOADING';
export const IT_CRUD_GET_MANY_REFERENCE_FAILURE = 'IT/CRUD_GET_MANY_REFERENCE_FAILURE';
export const IT_CRUD_GET_MANY_REFERENCE_SUCCESS = 'IT/CRUD_GET_MANY_REFERENCE_SUCCESS';
export const ITCrudGetManyReference = function ({...params}) {
    let {reference, target, id, relatedTo, pagination, sort, filter, source} = params;
    return ({
        type: IT_CRUD_GET_MANY_REFERENCE,
        payload: {target: target, id: id, pagination: pagination, sort: sort, filter: filter, source: source},
        meta: {
            resource: reference,
            relatedTo: relatedTo,
            fetch: GET_MANY_REFERENCE,
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
