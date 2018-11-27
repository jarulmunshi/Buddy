import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
} from 'react-native'

import Color from '../helper/theme/Color'
import {LatoFont, WindowsHeight, WindowsWidth} from './global';

const width = WindowsWidth - 20
var tab = 0

const CustomMenu = (props) => {
    tab = props.menus.length
    return(
        <View style={style.container}>
            {
                props.menus.map((menu, i) => {
                    return(
                    <TouchableOpacity
                        key={`${i}`}
                        onPress={() => props.activeChange(menu)}
                        style={[menu === props.active ? {backgroundColor: Color.menuActiveColor } : null, {paddingVertical: 5},
                            i === 0 ? { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 } : null,
                            i === props.menus.length - 1 ? { borderTopRightRadius: 5, borderBottomRightRadius: 5 } : null
                        ]}>
                            <Text style={[style.textStyle, {width: width/tab}]}>{menu}</Text>
                    </TouchableOpacity>
                )})
            }
        </View>
    )
}

const style = {
    container: {
        flexDirection: 'row',
        margin: 10,
        width: width,
        backgroundColor: Color.menuNormalColor,
        borderRadius:5,
    },
    textStyle: {
        fontSize: 15,
        color: '#FFF',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: LatoFont,
        padding: 5
    }
}

export {CustomMenu}