import React from 'react'
import {
    Text,
    View,
    Platform,
} from 'react-native'
import Switch from 'react-native-customisable-switch';

import {Card, CardSection} from './Common'
import {MyriadFont,WindowsWidth} from './global'

const AttendanceList = (props) => {
    const {id, rollNo, name, present, color} =props.notesInfo
    debugger
    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.listContainerStyle}>
                    <Text style={[styles.nameStyle, {width: WindowsWidth*0.1, padding: 10,}]}>{rollNo}</Text>

                    <View style={styles.dataRow}>
                        <Text style={styles.nameStyle}>{name}</Text>
                        <Switch
                            defaultValue={true}
                            value={present}
                            activeText={'P'}
                            inactiveText={'A'}
                            activeTextColor={'#FFF'}
                            fontSize={20}
                            inactiveTextColor={'#FFF'}
                            inactiveBackgroundColor={'#AC0119'}
                            activeBackgroundColor={'#79AF1B'}
                            onChangeValue={(value) => {
                                props.toggleAttendance(id-1, present)
                            }}
                        />
                    </View>
                </View>

            </CardSection>
        </Card>
    )
}

const styles = {
    colorView: {
        width: 3,
    },
    dataRow: {
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: WindowsWidth * 0.9
    },
    listContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: WindowsWidth
    },
    nameStyle: {
        color: '#000',
        fontSize: 22,
        fontFamily: MyriadFont,
        marginTop: 5
    },
}

export {AttendanceList}