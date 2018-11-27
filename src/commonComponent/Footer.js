import React from 'react';
import {
    Image,
    View,
    Platform
} from 'react-native';
import {WindowsHeight,WindowsWidth,} from './global';

const footerHeight = Platform.OS === 'ios' ? 50 : 78

const Footer = (props) =>{
    return(
        <View style={styles.footerStyle}>
            <Image source={require('./../images/Footer1.png')} resizeMode="contain"
                   style={{ width: WindowsWidth }}/>
        </View>
    )
};
const styles={
    footerStyle:{
        top: WindowsHeight - footerHeight,
        //backgroundColor:'red',
        position: 'absolute',
        height: footerHeight,
        width: WindowsWidth
        //alignItems: 'center'
    }
};
export {Footer};
