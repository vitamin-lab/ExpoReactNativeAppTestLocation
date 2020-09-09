import React from 'react';
import {connect} from "react-redux";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';


import * as TaskManager from "expo-task-manager";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {updatePosition} from './service'

const TASK = "background-speedDetection-task"


class SpeedDetection extends React.Component {

    state = {
        location: null
    }

    componentDidMount() {
        activateKeepAwake();
        this.permissionsLocation()
            .then(Location.hasServicesEnabledAsync)
            .then(this.defineTask)
            .then(this.testLocation)
            .catch( error => console.log("error", error))
    }

    componentWillUnmount() {
        deactivateKeepAwake();
       // TaskManager.unregisterTaskAsync(TASK)
        Location.stopLocationUpdatesAsync(TASK)
        TaskManager.unregisterTaskAsync(TASK)
    }


    defineTask = async () => {
        const exist = await TaskManager.isTaskRegisteredAsync(TASK)
        !exist && TaskManager.defineTask(TASK, ({data: {locations}, error}) => {
            if (error) {
                // check `error.message` for more details.
                return;
            }
            this.props.updatePosition(locations[0])
        })
        return Promise.resolve()
    }

    permissionsLocation = async () => {
        let perm = await Permissions.getAsync(Permissions.LOCATION);
        if (perm.status === 'granted') {
            return Promise.resolve()
        }
        perm = await Permissions.askAsync(Permissions.LOCATION)
        if (perm.status === 'granted') {
            return Promise.resolve()
        }
        return Promise.reject()
    }


    testLocation = () => {
        Location.startLocationUpdatesAsync(TASK, {timeInterval: 500} )
    }


    render = () => <React.Fragment />
}


export default connect(null, {updatePosition})(SpeedDetection)
