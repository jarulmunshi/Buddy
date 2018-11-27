import React from 'react'
import {
    Text,
    View,
    Image, Platform
} from 'react-native'

import {Card, CardSection} from './Common'
import {WindowsWidth,MyriadFont} from './global'

const ClassInfoList = (props) => {
    const {standard, name, totalStudent, color} =props.classInfo

    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.infoContainer}>
                    <Text style={styles.standardContainer}>{standard}</Text>
                    <Text style={styles.nameContainer}>{name}</Text>
                </View>

                <View style={styles.additionalInfoContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{alignItems:'center', marginRight: 10}}>
                            <Text style={styles.countContainer}>{totalStudent}</Text>
                            <Text style={styles.totalCountContainer}>TOTAL STUDENT</Text>
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
    standardContainer: {
        color: 'rgb(229,115,23)',
        fontSize: 25,
        width: WindowsWidth * 25 /100,
        textAlign: 'center',
        fontFamily: MyriadFont
    },
    nameContainer: {
        color: '#000',
        fontSize: 14,
        marginTop: 5,
        fontFamily: MyriadFont
    },
    countContainer: {
        color: 'rgb(195,206,233)',
        fontSize: 25
    },
    totalCountContainer: {
        fontSize: 12,
        color: 'rgb(117,118,118)',
        marginTop: 5,
        fontFamily: MyriadFont
    },
    imageContainer: {
        width: 20,
        height: 20,
        margin: 5
    }
}

export {ClassInfoList}