import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {routerMiddleware, routerReducer} from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import {all, fork} from 'redux-saga/effects';
import {
    adminReducer,
    defaultI18nProvider,
    i18nReducer,
    formMiddleware,
    USER_LOGOUT,
} from 'react-admin';
import iTechSideEffect from "./sideEffects";
import {ITECH_REDUCER} from "./reducers";
import ITechReducers from './reducers';
import adminSaga from './sideEffects/adminSaga';

export default ({
                    authProvider,
                    dataProvider,
                    i18nProvider = defaultI18nProvider,
                    history,
                    locale = 'en',
                }) => {
    const reducer = combineReducers({
            admin: adminReducer,
            i18n: i18nReducer(locale, i18nProvider(locale)),
            form: formReducer,
            router: routerReducer,
            [ITECH_REDUCER]: ITechReducers
        });

    // const messages = i18nProvider(locale);
    // const reducer = createAppReducer({[ITECH_REDUCER]: ITechReducers}, locale, messages);

    const resettableAppReducer = (state, action) =>
        reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider, i18nProvider),
                // add your own sagas here
                iTechSideEffect(dataProvider),
                // fetchProgress()
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        resettableAppReducer,
        { /* set your initial state here */},
        compose(
            applyMiddleware(
                sagaMiddleware,
                formMiddleware,
                routerMiddleware(history),
                // LogRocket.reduxMiddleware()
                // add your own middlewares here
            ),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f
            // add your own enhancers here
        )
    );
    sagaMiddleware.run(saga);
    return store;
};