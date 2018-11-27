import React from 'react'
import {
    Text,
    View,
    Image, Platform
} from 'react-native'

import {Card, CardSection} from './Common'
import {MyriadFont, WindowsWidth} from './global'

const TeacherInfoList = (props) => {
    const {teacherName, subjects, mobileNo, email, color} =props.teacherInfo

    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.infoContainer}>
                    <Text style={styles.nameContainer}>{teacherName}</Text>
                    <Text style={styles.subjectContainer}>{subjects}</Text>
                </View>

                <View style={styles.additionalInfoContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <View style={{alignItems:'center', marginRight: 10}}>
                            <Text style={styles.mobileNoContainer}>{mobileNo}</Text>
                            <Text style={styles.emailContainer}>{email}</Text>
                        </View>

                        <View style={{marginRight: 10}}>
                            <Image style={[styles.imageContainer, {tintColor:'rgb(94,138,155)'}]} source={require('../images/icons8-edit-128.png')}/>
                            <Image style={[styles.imageContainer, {tintColor: 'rgb(168,0,0)', marginTop: 0}]} source={require('../images/rubbish-bin.png')}/>
                        </View>
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
    infoContainer: {
        padding: 10,
        width: WindowsWidth * 55 /100
    },
    additionalInfoContainer: {
        padding: 10,
        width: WindowsWidth * 45 /100
    },
    nameContainer: {
        color: 'rgb(229,115,23)',
        fontSize: 24,
        fontFamily: MyriadFont
    },
    subjectContainer: {
        color: '#000',
        fontSize: 14,
        marginTop: 5,
        fontFamily: MyriadFont,
    },
    mobileNoContainer: {
        color: 'rgb(109,109,109)',
        fontSize: 12,
        fontFamily: MyriadFont
    },
    emailContainer: {
        fontSize: 12,
        color: 'rgb(109,109,109)',
        marginTop: 10,
        fontFamily: MyriadFont,
    },
    imageContainer: {
        width: 20,
        height: 20,
        margin: 5
    }
}

export {TeacherInfoList}