import React from 'react';
import {View,ActivityIndicator} from 'react-native';
const Spinner = ({size}) =>{
    return(
        <View style={spinnerStyles.spinnerStyle}>
            <ActivityIndicator size={size || 'large'}/>
        </View>
    );
};
const spinnerStyles={
    spinnerStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:20
    }
};

export {Spinner}