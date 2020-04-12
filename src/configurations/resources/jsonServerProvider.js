import {
    CREATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY,
} from "ra-core";

import { stringify } from "query-string";
import {
    CREATE_ARRAY,
    GET_EXTEND,
    UPDATE_ARRAY,
    OPERATION_RESOURCES,
    AVATARS,
    PASSWORDS,
} from "./iTechDataProvider";
import { MSG_CODE } from "../apiEndpoint";
import { cleanObject, isEmpty } from "../../utils";
import { COLOR_BLACK, COLOR_BLUE, COLOR_GREEN } from "../logging";
export const PREFIX_FILTER = "prefix";
export const POSTFIX_FILTER = "postfix";

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (function (apiUrl, httpClient) {
    if (httpClient === void 0) {
        httpClient = fetchUtils.fetchJson;
    }
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = function (type, resource, params) {
        let url = "";
        const options = {};
        console.log(`Params`, params);
        let { pagination = {}, sort = {}, filter } = params;

        let prefix, postfix;
        if (filter) {
            prefix = filter[PREFIX_FILTER];
            postfix = filter[POSTFIX_FILTER];
            delete filter[PREFIX_FILTER];
            delete filter[POSTFIX_FILTER];
            cleanObject(filter);
        }
        // let baseUrl = `${apiUrl}/${prefix ? `${prefix}/` : ''}${resource}${postfix ? `/${postfix}` : ''}`;

        const baseUrl = `${apiUrl}/${prefix ? `${prefix}/` : ""}${resource}${
            postfix ? `/${postfix}` : ""
        }`;

        cleanObject(sort);
        switch (type) {
            case GET_LIST: {
                /*if (resource === USERS && filter) {
                        console.log('Params filter', filter);
                        const {v} = filter;
                        if (v === true) delete filter['v'];
                    }*/
                let { page = 1, perPage = 10 } = pagination;
                if (isNaN(perPage)) perPage = 10;
                const { field = "id", order = "ASC" } = sort;
                const paginationInfo = {
                    offset: `${(page - 1) * perPage}`,
                    limit: `${perPage}`,
                    orderAsc: `${order === "ASC"}`,
                    orderBy: `${field}`,
                };
                console.log("Filter", filter);
                if (!isEmpty(filter)) {
                    options.method = "POST";
                    options.body = JSON.stringify({ ...filter });
                    url = `${apiUrl}/${
                        prefix ? `${prefix}/` : ""
                    }search/${resource}?${stringify(paginationInfo)}`;
                } else {
                    url = `${baseUrl}?${stringify(paginationInfo)}`;
                    options.method = "GET";
                }
                break;
            }
            case GET_MANY: {
                const query = params.ids
                    .map((aid) => (aid.hasOwnProperty("id") ? aid.id : aid))
                    .join(",");
                url = `${baseUrl}?ids=${query}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = pagination;
                const { field, order } = sort;
                const query = {
                    ...fetchUtils.flattenObject(filter),
                    [params.target]: params.id,
                    _sort: field,
                    _order: order,
                    _start: (page - 1) * perPage,
                    _end: page * perPage,
                };
                // url = apiUrl + "/" + resource + "?" + stringify(query);
                // console.log('bbbbb',query);
                url = `${baseUrl}?ids=${query.id.map((obj) => obj.id)}`;
                break;
            }
            case GET_ONE:
                url = `${baseUrl}/${params.id}`;
                break;
            case UPDATE:
                url = `${baseUrl}`;
                options.method = "PUT";
                if (resource === AVATARS) {
                    const { data } = params;
                    const { file } = data;
                    const formData = new FormData();
                    formData.append("file", file);
                    options.body = formData;
                    options.headers = new Headers({});
                } else {
                    options.body = JSON.stringify(params.data);
                }
                break;
            case CREATE:
                if (resource === PASSWORDS) {
                    url = params.data.prefix
                        ? `${process.env.REACT_APP_ROOT_URL}/${params.data.prefix}/${PASSWORDS}`
                        : baseUrl;
                } else {
                    url = `${baseUrl}`;
                }
                options.method = "POST";
                options.body = JSON.stringify(params.data);
                break;
            case DELETE:
                url = `${baseUrl}/${params.id}`;
                if (params.purge) {
                    url = `${url}?purge=true`;
                }
                options.method = "DELETE";
                options.body = JSON.stringify(
                    params.reason ? params.reason : "user delete"
                );
                break;
            case GET_EXTEND:
                url = `${baseUrl}/${params.extendResource}/${params.id}`;
                options.method = "GET";
                break;
            default:
                throw new Error("Unsupported fetch action type " + type);
        }
        console.log("Requesting url ", url, " with options ", options);
        return { url: url, options: options };
    };
    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} requestParams The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = function (
        response,
        type,
        resource,
        requestParams
    ) {
        // const headers = response.headers;
        console.groupCollapsed(
            `%cFETCH RESPONSE %c${type} ${resource}`,
            COLOR_GREEN,
            COLOR_BLACK
        );
        const json = response.json;
        console.log(json);
        console.groupEnd();
        let { header, body } = json;
        let { responseCode } = header;
        let { numOfRecords } = header;
        switch (type) {
            case GET_LIST:
            case GET_MANY:
            case GET_MANY_REFERENCE:
                if (responseCode === MSG_CODE.FOUND) {
                    if (resource === AVATARS) {
                        numOfRecords = 1;
                        body = [{ ...body, id: resource }];
                    }
                    if (!numOfRecords) {
                        throw new Error(
                            "The numOfRecords header is missing in the response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
                        );
                    }
                    return {
                        data: body, //.map(item => ({...item, tmp: item})),
                        total: numOfRecords,
                    };
                } else {
                    return {
                        data: [], //.map(item => ({...item, tmp: item})),
                        total: 0,
                    };
                }
            case DELETE:
                if (responseCode === MSG_CODE.UPDATED) {
                    return { data: { id: requestParams.id } };
                } else {
                    if (
                        resource === OPERATION_RESOURCES &&
                        responseCode === MSG_CODE.BAD_REQUEST
                    ) {
                        throw new Error(
                            "commons.message.cannotDeleteResource",
                            { id: requestParams.id }
                        );
                    } else if (responseCode < MSG_CODE.BAD_REQUEST) {
                        // success
                        return { data: body };
                    } else {
                        return { data: header };
                    }
                }
            case UPDATE:
            case CREATE:
                if (responseCode === MSG_CODE.DUPLICATED) {
                    switch (resource) {
                        case OPERATION_RESOURCES:
                            throw new Error(
                                "page.resource.notification.create.duplicated"
                            );
                        default:
                            throw new Error("commons.message.duplicate");
                    }
                }
                return { data: body };
            case GET_ONE:
            case GET_EXTEND:
                if (responseCode < MSG_CODE.BAD_REQUEST) {
                    // success
                    return { data: body };
                } else {
                    return { data: header };
                }
            default:
                return body;
        }
    };
    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return function (type, resource, params) {
        console.groupCollapsed(
            `%cFETCH REQUEST  %c${type} ${resource}`,
            COLOR_BLUE,
            COLOR_BLACK
        );
        // console.log("Linh....................", type, resource, params)
        // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(function (id) {
                    console.groupEnd();
                    return httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(params.data),
                    });
                })
            ).then(function (responses) {
                console.groupEnd();
                return {
                    data: responses.map(function (response) {
                        return response.json;
                    }),
                };
            });
        }
        // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            if (params.ids.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            } else console.log("delete many", params);
            return Promise.all(
                params.ids.map(function (id) {
                    console.log(DELETE_MANY, `${apiUrl}/${resource}/${id}`);
                    console.groupEnd();
                    return httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(
                            params.reason ? params.reason : "user delete"
                        ),
                    });
                })
            ).then(function (responses) {
                console.log(DELETE_MANY, responses);
                console.groupEnd();
                return {
                    data: responses.map(function (response) {
                        return response.json;
                    }),
                };
            });
        }

        // new by TungLT
        if (type === UPDATE_ARRAY) {
            if (params.data.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            } else
                return Promise.all(
                    params.data.map(function (obj) {
                        console.log(UPDATE_ARRAY, `${apiUrl}/${resource}`, obj);
                        console.groupEnd();
                        return httpClient(`${apiUrl}/${resource}`, {
                            method: "PUT",
                            body: JSON.stringify(obj),
                        });
                    })
                ).then(function (responses) {
                    console.log(UPDATE_ARRAY, responses);
                    console.groupEnd();
                    return {
                        data: responses.map(function (response) {
                            return response.json;
                        }),
                    };
                });
        }

        if (type === CREATE_ARRAY) {
            if (params.data.length === 0) {
                console.groupEnd();
                return Promise.resolve();
            } else console.groupEnd();
            return Promise.all(
                params.data.map(function (obj) {
                    console.log(CREATE_ARRAY, `${apiUrl}/${resource}`, obj);
                    return httpClient(`${apiUrl}/${resource}`, {
                        method: "POST",
                        body: JSON.stringify(obj),
                    });
                })
            ).then(function (responses) {
                console.log(CREATE_ARRAY, responses);
                console.groupEnd();
                return {
                    data: responses.map(function (response) {
                        return response.json;
                    }),
                };
            });
        }

        const request = convertDataRequestToHTTP(type, resource, params);
        console.groupEnd();
        const { url, options } = request;
        return httpClient(url, options).then(function (response) {
            return convertHTTPResponse(response, type, resource, params);
        });
    };
});
