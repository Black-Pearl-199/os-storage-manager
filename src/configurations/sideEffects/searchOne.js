import {call, put, takeEvery} from "redux-saga/effects";
import {FETCH_END, FETCH_ERROR, FETCH_START, GET_LIST} from "ra-core";
import {SEARCH_ONE, SEARCH_ONE_SUCCESS} from "../actions";
// import {GET_EXTEND, PATIENT_IDENTIFIERS, PATIENTS} from "../resources";
// import {injectIdentifierData} from "./getExtend";

function* handleActions(dataProvider, action) {
    const {payload, meta} = action;
    const {filter} = payload;
    const {resource, onDone, onNotFound} = meta;

    yield put({type: FETCH_START});

    let response, data, result;
    try {
        // check tồn tại modality info
        response = yield call(dataProvider, GET_LIST, resource, {filter});
        data = response.data;
        if (data.length && data.length > 0) {
            result = data[0];

            // get identifier data for patient object
            // if (resource === PATIENTS) {
            //     let identifiers = yield call(dataProvider, GET_EXTEND, PATIENTS, {
            //         id: result.id,
            //         extendResource: PATIENT_IDENTIFIERS
            //     });
            //     if (identifiers.data && identifiers.data.length)
            //         result = injectIdentifierData(result, identifiers.data);
            // }
            yield put({type: SEARCH_ONE_SUCCESS, payload: result, meta: {...onDone}})
        } else {
            yield put({type: SEARCH_ONE_SUCCESS, payload: undefined, meta: {...onDone, ...onNotFound}})
        }

    } catch (error) {
        console.error(error);
        yield put({type: FETCH_ERROR, payload: result, meta: {...onDone}});
    } finally {
        yield put({type: FETCH_END});
    }
}

const takeFetchAction = action => SEARCH_ONE === action.type;

export default (dataProvider) => function* () {
    yield takeEvery(takeFetchAction, handleActions, dataProvider);
};
