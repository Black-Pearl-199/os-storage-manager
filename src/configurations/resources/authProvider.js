import {AUTH_CHECK, AUTH_ERROR, AUTH_GET_PERMISSIONS, AUTH_LOGIN, AUTH_LOGOUT} from 'react-admin';
import {COLOR_BLACK, COLOR_VIOLET} from "../logging";
import { token } from '../../data-test';

const appName = process.env.REACT_APP_NAME;
export const AUTH_ID = `${appName}.ai`;
export const AUTH_BASIC = `${appName}.ab`;
export const AUTH_TOKEN = `${appName}.at`;
export const AUTH_REFRESH_TOKEN = `${appName}.art`;
export const AUTH_SCOPE = `${appName}.as`;
export const AUTH_USER = `${appName}.au`;
export const AUTH_REMEMBER = `${appName}.arem`;
export const AUTH_STAFF = `${appName}.astf`;
export const AUTH_EXPIRE_IN = `${appName}.aei`;
export const MAIN_STATE = `${appName}.ms`;
export const SAVE_TEMP_DATA = `${appName}.tmpdt`;
const ALL_SAVE = [AUTH_ID, AUTH_BASIC, AUTH_TOKEN, AUTH_REMEMBER, AUTH_REFRESH_TOKEN, AUTH_SCOPE, AUTH_USER, AUTH_STAFF, AUTH_EXPIRE_IN, MAIN_STATE, SAVE_TEMP_DATA];

const clearData = () => ALL_SAVE.forEach(key => localStorage.removeItem(key));

export const saveAccessTokenData = (accessTokenData, rememberLogin) => {
    let {access_token, token_type, refresh_token, scope, itech_user, expires_in} = accessTokenData;
    localStorage.setItem(AUTH_TOKEN, `${token_type} ${access_token}`);
    localStorage.setItem(AUTH_REFRESH_TOKEN, refresh_token);
    localStorage.setItem(AUTH_SCOPE, scope);
    localStorage.setItem(AUTH_STAFF, JSON.stringify(itech_user));
    localStorage.setItem(AUTH_ID, itech_user.id);
    console.log('rememberlogin', rememberLogin)
    if (rememberLogin !== undefined)
        localStorage.setItem(AUTH_REMEMBER, rememberLogin);
    localStorage.setItem(AUTH_EXPIRE_IN, expires_in * 1000 + new Date().getTime());
    return itech_user.id;
};

let refreshing = false;

export const refreshToken = () => {
    const basicAuth = `Basic ${btoa(`${process.env.REACT_APP_USER}:${process.env.REACT_APP_PASSWORD}`)}`;
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN);
    let formData = new FormData();
    formData.append('refresh_token', refreshToken);
    formData.append('grant_type', 'refresh_token');
    const request = new Request(process.env.REACT_APP_AUTH_URL, {
        method: 'POST',
        body: formData,
        headers: new Headers({
            'Authorization': `${basicAuth}`,
        }),
    });
    refreshing = true;
    return fetch(request)
        .then(response => {
            if (response.status < 200 || response.status >= 300) {
                console.groupEnd();
                throw new Error(response.statusText);
            }
            return response.json();
        }, error => {
            console.error('login error', error);
            // toast.error(`Cannot login. Please try again later!`);
            console.groupEnd();
            refreshing = false;
            return Promise.reject(error);
        })
        .then(accessTokenData => {
            console.log('refresh token body', accessTokenData);
            saveAccessTokenData(accessTokenData);
            refreshing = false;
            return Promise.resolve('refresh token success');
        }).catch(error => {
            refreshing = false;
            return Promise.reject(error)
        });
};

export const checkTokenExpire = () => {
    if (!refreshing) {
        return new Promise((resolve, reject) => {
            const expireTime = parseInt(localStorage.getItem(AUTH_EXPIRE_IN), 10);
            const currentTime = new Date().getTime();
            const expired = isNaN(expireTime) || expireTime <= currentTime;
            console.log('check token expiration');
            console.log(expireTime - currentTime);
            resolve(expired);
        })
    } else {
        return new Promise((resolve, reject) => {
            let waiter = setInterval(() => {
                if (!refreshing) {
                    const expireTime = parseInt(localStorage.getItem(AUTH_EXPIRE_IN), 10);
                    const currentTime = new Date().getTime();
                    const expired = isNaN(expireTime) || expireTime <= currentTime;
                    console.log('check token expiration');
                    console.log(expireTime - currentTime);
                    clearInterval(waiter);
                    resolve(expired);
                }
            }, 100);
        })
    }
};

export default (type, params) => {
    // console.log("authProvider type ", type, " params ", params);
    console.groupCollapsed(`%cAUTH_PROVIDER %c${type}`, COLOR_VIOLET, COLOR_BLACK);
    console.log('create auth request with params', params);

    switch (type) {
        case AUTH_LOGIN:
            return saveAccessTokenData(token, false);
            // const {username, password, remember} = params;
            // const basicAuth = `Basic ${btoa(`${process.env.REACT_APP_USER}:${process.env.REACT_APP_PASSWORD}`)}`;
            // let formData = new FormData();
            // formData.append('username', username);
            // formData.append('password', password);
            // formData.append('grant_type', 'password');
            // const request = new Request(process.env.REACT_APP_AUTH_URL, {
            //     method: 'POST',
            //     body: formData,
            //     headers: new Headers({
            //         'Authorization': `${basicAuth}`,
            //     }),
            // });
            // return fetch(request)
            //     .then(
            //         response => {
            //             if (response.status < 200 || response.status >= 300) {
            //                 console.groupEnd();
            //                 throw new Error(response.statusText);
            //             }
            //             return response.json();
            //         }, error => {
            //             console.error('login error', error);
            //             // toast.error(`Cannot login. Please try again later!`);
            //             console.groupEnd();
            //             return Promise.reject(error);
            //         })
            //     .then((accessTokenData) => {
            //         console.log(new Date().getTime());
            //         console.log('login data', accessTokenData);
            //         if (accessTokenData['itech_user']) {
            //             saveAccessTokenData(accessTokenData, remember);
            //             console.groupEnd();
            //             return Promise.resolve({accessTokenData});
            //         } else {
            //             clearData();
            //             console.groupEnd();
            //             return Promise.reject();
            //         }
            //     });
                // .then(id =>
                //     iTechDataProvider(GET_ONE, PROVIDER_STAFF, {id})
                // )
                // .then(({data}) => {
                //     console.log('get staff data', data);
                //     if (data.id) {
                //         localStorage.setItem(AUTH_STAFF, JSON.stringify(data));
                //         // localStorage.setItem(AUTH_TOKEN, '1');
                //         console.groupEnd();
                //         return Promise.resolve({data});
                //     } else {
                //         clearData();
                //         console.groupEnd();
                //         return Promise.reject();
                //     }
                // });
        case AUTH_LOGOUT:
            console.log('logout');
            clearData();
            console.groupEnd();
            return Promise.resolve();
        case AUTH_CHECK:
            // TODO check permissions
            // console.log('check auth', localStorage.getItem(AUTH_ID));
            return checkTokenExpire().then(expired => {
                // console.log('aaaaaaaaaaaaaaaaaaaaaa', expired);
                if (!expired) {
                    console.groupEnd();
                    return Promise.resolve();
                } else {
                    console.log('token expire -> refresh');
                    console.groupEnd();
                    return Promise.reject();
                }
            });
        case AUTH_ERROR:
            const {message, status, body} = params;
            console.log('fetch error', message, status, body);
            console.groupEnd();
            // return (status > 400 && status !== 500 && status !== 404) ? Promise.reject() : Promise.resolve();
            return Promise.resolve();    
        case AUTH_GET_PERMISSIONS:
            const iTechUser = JSON.parse(localStorage.getItem(AUTH_USER));
            console.log('current iTech user', iTechUser);
            console.groupEnd();
            return iTechUser ? Promise.resolve(iTechUser['authorities']) : Promise.reject();
        default:
            console.groupEnd();
            return Promise.reject('Unknown method');
    }
}
;
