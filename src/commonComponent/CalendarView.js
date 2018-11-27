import React from 'react'
import {
    View,
    TouchableOpacity,
    Alert
} from 'react-native'
import { Calendar} from 'react-native-calendars';
import {WindowsHeight, WindowsWidth} from '../commonComponent/global';

const CalendarView = (props) => {
    return(
        <TouchableOpacity  style={styles.viewContainer} onPress={props.toggle}>
            <View>
                <Calendar
                    style={{width:WindowsWidth-50, marginLeft: 25, marginRight: 25}}
                    onDayPress={(day) => {props.changeDate(day.day, day.month, day.year)}}
                />
            </View>
        </TouchableOpacity>
    )
}

const styles = {
    viewContainer: {
        height:WindowsHeight,
        width:WindowsWidth,
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center'}
    }


export {CalendarView}