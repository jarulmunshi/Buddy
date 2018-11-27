import React from 'react';
import {TextInput,Text,View,TouchableOpacity} from 'react-native';
import Color from './../helper/theme/Color';
import {WindowsWidth,WindowsHeight} from "./global";
const Link =({children})=>{
    return(
        <TouchableOpacity>
            <Text style={Styles.textStyle}>{children}</Text>
        </TouchableOpacity>
    )
};

const Styles={
    textStyle:{
        color:Color.headerColor,
        fontSize: 16,
        paddingTop: 15
    },
    inputStyle:{
        color:Color.headerColor,
        borderWidth:0.5,
        borderColor:Color.headerColor,
        fontSize:14,
        lineHeight:48,
        width:WindowsWidth * 0.8,
        paddingLeft:15
    },
    containerStyle:{
        alignItems:'center',
        padding: 5
    }
};
export {Link}
