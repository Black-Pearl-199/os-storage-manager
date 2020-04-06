import {call, takeEvery} from "redux-saga/effects";
import TabsManager from "../../components/layouts/TabsManager";

function* handleFetchProgress(action) {
    console.log('handle tab change side effect', action);
    console.log(TabsManager);
    const {tab} = action.meta;
    const {context, tabKey} = tab;

    yield call(TabsManager.tabSelect, context, tabKey);
}

const takeFetchAction = action => (action.meta && action.meta.tab);

export default function* () {
    yield takeEvery(takeFetchAction, handleFetchProgress);
};
