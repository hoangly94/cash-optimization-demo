import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import dashboardRootReducer from './dashboardRoot/reducer';
import atmCdmReducer from './atmCdm/reducer';
import orgsReducer from './orgs/reducer';
import dashboardRootSaga from './dashboardRoot/sagas';
import atmCdmSaga from './atmCdm/sagas';
import orgsSaga from './orgs/sagas';

const rootReducer = combineReducers({
    root: dashboardRootReducer,
    atmCdm: atmCdmReducer,
    orgs: orgsReducer,
})

function* rootSaga() {
    yield all([
        dashboardRootSaga(),
        atmCdmSaga(),
        orgsSaga(),
    ]);
}

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)