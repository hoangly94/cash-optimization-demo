import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects';
import atmCdmReducer from './atmCdm/reducer';
import saga from './atmCdm/sagas';

function* rootSaga() {
    yield all([
        saga(),
    ]);
}

const rootReducer = combineReducers({
    atmCdmSearch: atmCdmReducer,
})

const sagaMiddleware = createSagaMiddleware()

export default createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga)