import React from 'react';
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'

import Store from './store'
import SpeedDetection from './app/speedDetection2'
import SpeedValue from './app/speedValue'

const app = () => (
    <Provider store={Store}>
        <PersistGate persistor={persistStore(Store)}>
            <SpeedDetection />
            <SpeedValue speedValue={0} />
        </PersistGate>
    </Provider>
);


export default app

