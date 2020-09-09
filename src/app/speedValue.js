import React from 'react';
import {Text, View} from "react-native";
import PropTypes from 'prop-types';

import {connect} from "react-redux";
const SpeedValue =  ({speedValue}) => {
    console.log(speedValue)
    return (
        <View style={{
            flex:1,
            flexDirection: "column",
            fontSize: 50,
            alignSelf: "center",
            textAlign: "center",
            justifyContent:'center'
        }}>
            <Text style={{fontSize: 70}}>SPEED: {speedValue}</Text>
        </View>
    )
}

export default connect(({app: {speedValue}}) => ({speedValue}))(SpeedValue)
