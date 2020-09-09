import {createStore, applyMiddleware} from 'redux'
import {persistCombineReducers} from 'redux-persist'
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'

import stateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import app from './app/reducers'

const rootPersistConfig = {
    key: 'root_location',
    storage,
    stateReconciler
};

const rootReducer = persistCombineReducers(rootPersistConfig, {app});

export default createStore(rootReducer, {}, applyMiddleware(thunk))
