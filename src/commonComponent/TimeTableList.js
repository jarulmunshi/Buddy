import React from 'react'
import {
    Text,
    View,
    Image,
    Platform
} from 'react-native'

import {Card, CardSection} from './Common'
import {MyriadFont, WindowsWidth} from './global'

const TimeTableList = (props) => {
    const {start_time, end_time, subject, name} =props.timeTable;
    const color='rgba(' + Math.round(Math.random() * 255) + ','
        + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ', 0.15)';
    debugger;
    return(
         <View style={styles.listContainer}>
            <View style={[styles.containerStyle, {backgroundColor: color}]}>
                <Text style={styles.titleText}>{start_time} To {end_time}</Text>
                <Text style={styles.titleText}>{subject}</Text>
                <Text style={styles.titleText}>{name}</Text>
            </View>
        </View>
    )
}

const styles = {
    colorView: {
        width: Platform.OS === 'ios'? 2 : 4,
    },
    titleText: {
        color: 'rgb(60,60,60)',
        fontSize: 18,
        fontFamily: MyriadFont
    },
    containerStyle: {
        width: WindowsWidth-40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 5,
        marginTop: 5
    },
    listContainer: {
        width: WindowsWidth,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FFF'
    }
};

export {TimeTableList}
