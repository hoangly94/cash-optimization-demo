import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';

import baseReducer from './_base/reducer';
import dashboardRootReducer from './dashboardRoot/reducer';
import orgsReducer from './category/orgs/reducer';
import atmCdmReducer from './category/atmCdm/reducer';
import nhnnTctdReducer from './category/nhnnTctd/reducer';
import vehicleReducer from './category/vehicle/reducer';
import personReducer from './category/person/reducer';
import titleReducer from './category/title/reducer';
import currencyReducer from './category/currency/reducer';
import priorityReducer from './category/priority/reducer';
import regionReducer from './category/region/reducer';
import areaReducer from './category/area/reducer';
import functionReducer from './category/function/reducer';
import registrationReducer from './authority/registration/reducer';
import searchOrgsReducer from './authority/searchOrgs/reducer';
import searchPersReducer from './authority/searchPers/reducer';

import baseSaga from './_base/sagas';
import dashboardRootSaga from './dashboardRoot/sagas';
import orgsSaga from './category/orgs/sagas';
import atmCdmSaga from './category/atmCdm/sagas';
import nhnnTctdSaga from './category/nhnnTctd/sagas';
import vehicleSaga from './category/vehicle/sagas';
import personSaga from './category/person/sagas';
import titleSaga from './category/title/sagas';
import currencySaga from './category/currency/sagas';
import prioritySaga from './category/priority/sagas';
import regionSaga from './category/region/sagas';
import areaSaga from './category/area/sagas';
import functionSaga from './category/function/sagas';
import registrationSaga from './authority/registration/sagas';
import searchOrgsSaga from './authority/searchOrgs/sagas';
import searchPersSaga from './authority/searchPers/sagas';

const rootReducer = combineReducers({
    base: baseReducer,
    root: dashboardRootReducer,
    orgs: orgsReducer,
    atmCdm: atmCdmReducer,
    nhnnTctd: nhnnTctdReducer,
    vehicle: vehicleReducer,
    person: personReducer,
    title: titleReducer,
    currency: currencyReducer,
    priority: priorityReducer,
    region: regionReducer,
    area: areaReducer,
    function: functionReducer,
    registration: registrationReducer,
    searchOrgs: searchOrgsReducer,
    searchPers: searchPersReducer,
})

function* rootSaga() {
    yield all([
        baseSaga(),
        dashboardRootSaga(),
        atmCdmSaga(),
        orgsSaga(),
        nhnnTctdSaga(),
        vehicleSaga(),
        personSaga(),
        titleSaga(),
        currencySaga(),
        prioritySaga(),
        regionSaga(),
        areaSaga(),
        functionSaga(),
        registrationSaga(),
        searchOrgsSaga(),
        searchPersSaga(),
    ]);
}

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)