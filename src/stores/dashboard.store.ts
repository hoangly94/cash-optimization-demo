import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import atmCdmReducer from './atmCdm/reducer';
import orgsReducer from './orgs/reducer';
import atmCdmSaga from './atmCdm/sagas';
import orgsSaga from './orgs/sagas';

function* rootSaga() {
    yield all([
        atmCdmSaga(),
        orgsSaga(),
    ]);
}

const rootReducer = combineReducers({
    atmCdm: atmCdmReducer,
    orgs: orgsReducer,
})

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)