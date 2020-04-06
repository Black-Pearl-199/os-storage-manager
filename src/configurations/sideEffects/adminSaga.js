import {all} from 'redux-saga/effects';
// import auth from './auth';
// import callback from './callback';
// import error from './error';
// import i18n from './i18n';
// import notification from './notification';
// import redirection from './redirection';
// import accumulate from './accumulate';
// import refresh from './refresh';
// import undo from './undo';
// import unload from './unload';
import fetch from './fetch';

import i18n from "ra-core/esm/sideEffect/i18n";
import auth from "ra-core/esm/sideEffect/auth";
import redirection from "ra-core/esm/sideEffect/redirection";
import notification from "ra-core/esm/sideEffect/notification";
import unload from "ra-core/esm/sideEffect/unload";
import {undo} from "ra-core";
import accumulate from "ra-core/esm/sideEffect/accumulate";
import refresh from "ra-core/esm/sideEffect/refresh";
import callback from "ra-core/esm/sideEffect/callback";
import error from "ra-core/esm/sideEffect/error";

/**
 * @param {Object} dataProvider A Data Provider function
 * @param {Object} authProvider A Auth Provider function
 * @param {Object} i18nProvider A i18n Provider function
 */
export default (dataProvider, authProvider, i18nProvider) =>
    function* admin() {
        yield all([
            i18n(i18nProvider)(),
            auth(authProvider)(),
            undo(),
            fetch(dataProvider)(),
            error(),
            accumulate(),
            redirection(),
            refresh(),
            notification(),
            callback(),
            unload(),
        ]);
    };
