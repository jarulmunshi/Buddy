import React from 'react';
import {TextInput,Text,View} from 'react-native';
import Color from './../helper/theme/Color';
import {WindowsWidth,WindowsHeight} from "./global";
const Input =({label,value,onChange,placeholder,secureTextEntry,keyboardType,editable,autoCapitalize,style,borderWidth,borderColor,multiline,height,placeholderTextColor,color})=>{
    return(
     <View style={[inputStyles.containerStyle,style]}>
         <TextInput
             secureTextEntry={secureTextEntry}
             placeholder={placeholder}
             placeholderTextColor={placeholderTextColor ? {placeholderTextColor} : Color.headerColor}
             autoCorrect={false}
             value={value}
             onChangeText={onChange}
             style={[inputStyles.inputStyle,borderColor ? {borderColor} : null ,borderWidth ? {borderWidth}: null, height ? {height}: null, color? {color} : Color.headerColor]}
             keyboardType={keyboardType||'default'}
             editable={editable||true}
             autoCapitalize={autoCapitalize||true}
             underlineColorAndroid={'transparent'}
             multiline={multiline}
         />
     </View>
    )
};

const inputStyles={
    textStyle:{
        paddingLeft:5,
        color:Color.headerColor
    },
    inputStyle:{
        color:Color.headerColor,
        borderWidth:0.5,
        borderColor:Color.headerColor,
        fontSize:20,
        width:WindowsWidth * 0.8,
        paddingLeft:15,
        padding: 5
    },
    containerStyle:{
        alignItems:'center',
        padding: 5
    }
};
export {Input}
