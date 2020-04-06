import { USER_LOGIN_SUCCESS, USER_LOGOUT } from "ra-core";
import { AUTH_STAFF } from "../resources/authProvider";

const initialState = JSON.parse(localStorage.getItem(AUTH_STAFF)) || {};

export default (previousState = initialState, action) => {
    const { type, payload } = action;
    if (type === USER_LOGIN_SUCCESS) {
        console.log("user login success", previousState, action);
        const { itech_user } = payload.accessTokenData;
        return itech_user ? itech_user : previousState;
    } else if (type === USER_LOGOUT) {
        return {};
    } else {
        return previousState;
    }
};
