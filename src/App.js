import React from 'react';
import {Route, Switch} from "react-router-dom";
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import withContext from 'recompose/withContext';
import {TranslationProvider} from 'react-admin';
import * as PropTypes from "prop-types";
import Login from './pages/login/Login';
import Main from "./pages/main/Main";
import authProvider from "./configurations/resources/authProvider";
import dataProvider from "./configurations/resources/iTechDataProvider";
import {createBrowserHistory} from "history";

import {createGenerateClassName, MuiThemeProvider} from '@material-ui/core/styles';
import {createMuiTheme} from "@material-ui/core";
import variables from "./assets/scss/abstracts/_variables.scss";
import {index, LOCALE_VI} from "./configurations/messages";

import {JssProvider} from 'react-jss';
import NoAccess from "./pages/noAccess/NoAccess";
import createAdminStore from "./configurations/createAdminStore";
import {MessageBox} from "./components/messageBox";

const i18nProvider = locale => index[locale];
const history = createBrowserHistory();

const saveLocale = localStorage.getItem('saveLocale');

const adminStore = createAdminStore({
    authProvider,
    dataProvider,
    i18nProvider,
    history,
    locale: saveLocale ? saveLocale : LOCALE_VI
});
const iTechTheme = createMuiTheme(
    {
        palette: {
            primary: {
                light: variables.primaryBgColorHover,
                main: variables.primaryBgColor,
                dark: variables.primaryBgDark,
                contrastText: variables.primaryTextColor
            },
            secondary: {
                main: '#f44336',
                dark: '#ba000d',
                contrastText: '#000',
            },
        },
        typography: {
            useNextVariants: true,
        }
    });

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: false,
    productionPrefix: 'c',
});

/*const notificationAnchor = {
    horizontal: 'center',
    vertical: 'top'
}*/

const App = () => (
    <JssProvider generateClassName={generateClassName}>
        <Provider store={adminStore}>
            <TranslationProvider>
                <MuiThemeProvider theme={iTechTheme}>
                    <ConnectedRouter history={history}>
                        <div className="w-100 h-100">
                            <Switch>
                                <Route exact path="/login" component={Login}/>
                                <Route exact path='/no-access' component={NoAccess}/>
                                <Route path="/" component={Main}/>
                            </Switch>
                            {/*<MyNotification anchorOrigin={notificationAnchor} autoHideDuration={2000}/>*/}
                            <MessageBox/>
                        </div>
                    </ConnectedRouter>
                </MuiThemeProvider>
            </TranslationProvider>
        </Provider>
    </JssProvider>
);

export default withContext(
    {
        authProvider: PropTypes.func
    },
    () => ({authProvider})
)(App);
