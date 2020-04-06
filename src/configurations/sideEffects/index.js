import {all} from 'redux-saga/effects';
import fetchProgress from './fetchProgress';
import tabChange from './tabChange';
import searchOne from "./searchOne";
export default (dataProvider) =>
    function* iTech() {
        yield all([
            fetchProgress(),
            tabChange(),
            searchOne(dataProvider)()
        ]);
    };
