import React from 'react';
import {View} from 'react-native';
const CardSection = (props) =>{
    return(
        <View style={cardSectionStyles.containerStyle}>
            {props.children}
        </View>
    );
};
const cardSectionStyles ={
    containerStyle:{
        borderBottomWidth:1,
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        flexDirection:'row',
        borderColor:'#ddd',
        position:'relative'
    }
};
export {CardSection};
