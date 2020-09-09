import React from 'react';
import {connect} from "react-redux";

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {updatePosition}  from './service'


class SpeedDetection extends React.Component {

    detecting = null

    componentDidMount() {
        this.permissionsLocation()
            .then(Location.hasServicesEnabledAsync)
            .then(this.testLocation)
            .catch( error => console.log("error", error))
    }

    componentWillUnmount() {
        clearInterval(this.detecting)
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
        clearInterval(this.detecting)
        this.detecting = setInterval(this.updateLocation, 200)
    }

    updateLocation = async () => {
        this.setState({error: false})

        const location2 = Location.getCurrentPositionAsync({})
        await location2.then(
            l => this.props.updatePosition(l.coords.speed)
        )

    }

    render = () => null
}


export default connect(null, {updatePosition})(SpeedDetection)
