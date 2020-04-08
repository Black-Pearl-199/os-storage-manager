import { fetchUtils } from "ra-core/esm/index";
import jsonServerProvider from "./jsonServerProvider";
import moment from "moment/moment";
import { dateStoreFormat, uuidv4 } from "../../utils";
import { AUTH_TOKEN } from "./authProvider";

export const UPDATE_ARRAY = "UPDATE_ARRAY";
export const CREATE_ARRAY = "CREATE_ARRAY";
export const GET_EXTEND = "GET_EXTEND";

export const USERS = "user";
export const PASSWORDS = "password";

export const OPERATION_RESOURCES = "resource";
export const SCOPES = "scope";
export const AVATARS = 'avatar';
export const ME = 'me';

export const STORAGE_TAG = 'storage_tag';

export const ADMIN_ALL = [
    USERS,
    PASSWORDS
];

export const RESOURCES = [...ADMIN_ALL, OPERATION_RESOURCES, SCOPES, AVATARS, ME, STORAGE_TAG];

const fetchHttpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({});
        options.headers.set('Content-Type', 'application/json');
    }
    options.headers.set("Corporate-Id", "001");
    options.headers.set("Request-Id", uuidv4());
    options.headers.set("Request-Time", moment().format(dateStoreFormat));

    options.headers.set("Authorization", localStorage.getItem(AUTH_TOKEN));
    console.log(localStorage.getItem(AUTH_TOKEN));
    // options.headers.set('User-Id', localStorage.getItem(AUTH_ID));

    console.log("create http client", options.headers.get("Authorization"));

    // options.headers.set('x-auth-token', localStorage.getItem(AUTH_TOKEN));

    return fetchUtils.fetchJson(url, options);
};

const dataProviders = [
    {
        dataProvider: jsonServerProvider(
            process.env.REACT_APP_ROOT_URL,
            fetchHttpClient
        ),
        resources: RESOURCES
    }
];

export default (type, resource, params) => {
    // console.log("dataProvider type ", type, ", resource ", resource, ", params", params)

    const mapping = dataProviders.find(dp => dp.resources.includes(resource));

    return mapping.dataProvider(type, resource, params);
};
