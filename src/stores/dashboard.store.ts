import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';

import baseReducer from './_base/reducer';
import authReducer from './auth/reducer';
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
import pycRegistrationReducer from './pyc/registration/reducer';
import pycSearchOrgsReducer from './pyc/searchOrgs/reducer';
import pycSearchPersReducer from './pyc/searchPers/reducer';
import routeManagementNormalReducer from './routeManagement/normal/reducer';
import routeTrackingReducer from './routeTracking/reducer';
import reportOrgsReducer from './report/orgs/reducer';
import reportSpecialReducer from './report/special/reducer';

import baseSaga from './_base/sagas';
import authSaga from './auth/sagas';
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
import pycRegistrationSaga from './pyc/registration/sagas';
import pycSearchOrgsSaga from './pyc/searchOrgs/sagas';
import pycSearchPersSaga from './pyc/searchPers/sagas';
import routeManagementSaga from './routeManagement/normal/sagas';
import routeTrackingSaga from './routeTracking/sagas';
import reportOrgsSaga from './report/orgs/sagas';
import reportSpecialSaga from './report/special/sagas';

const rootReducer = combineReducers({
    base: baseReducer,
    auth: authReducer,
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
    pycRegistration: pycRegistrationReducer,
    pycSearchOrgs: pycSearchOrgsReducer,
    pycSearchPers: pycSearchPersReducer,
    routeManagement: routeManagementNormalReducer,
    routeTracking: routeTrackingReducer,
    reportOrgs: reportOrgsReducer,
    reportSpecial: reportSpecialReducer,
})

function* rootSaga() {
    yield all([
        baseSaga(),
        authSaga(),
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
        pycRegistrationSaga(),
        pycSearchOrgsSaga(),
        pycSearchPersSaga(),
        routeManagementSaga(),
        routeTrackingSaga(),
        reportOrgsSaga(),
        reportSpecialSaga(),
    ]);
}

const sagaMiddleware = createSagaMiddleware();

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);