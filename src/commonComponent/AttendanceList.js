import React from 'react'
import {
    Text,
    View,
    Platform
} from 'react-native'
import Switch from 'react-native-customisable-switch';

import {Card, CardSection,Spinner} from './Common'
import {MyriadFont,WindowsWidth} from './global'

const AttendanceList = (props) => {
    const { student_id, name, present} =props.notesInfo;
    const color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.listContainerStyle}>
                    <Text style={[styles.nameStyle, {width: WindowsWidth*0.1, padding: 10,}]}>{student_id}</Text>

                    <View style={styles.dataRow}>
                        <Text style={styles.nameStyle}>{name}</Text>
                        <Switch
                            defaultValue={true}
                            enable={props.disable}
                            value={present}
                            activeText={'P'}
                            inactiveText={'A'}
                            activeTextColor={'#FFF'}
                            fontSize={20}
                            inactiveTextColor={'#FFF'}
                            inactiveBackgroundColor={'#AC0119'}
                            activeBackgroundColor={'#79AF1B'}
                            onChangeValue={() => {
                                props.toggleAttendance(student_id, present)
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
