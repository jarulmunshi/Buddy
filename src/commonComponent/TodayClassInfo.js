import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import Color from './../helper/theme/Color';
import {Card, CardSection} from './Common'
import {WindowsWidth,MyriadFont} from './global'

const TodayClassInfo = (props) => {
    const {standard, sname, color , timing , className} =props.classInfo;

    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.timingContainer}>
                    <Text style={styles.standardContainer}>{timing}</Text>
                </View>

                <View style={styles.additionalInfoContainer}>
                    <View style={{ justifyContent: 'space-between'}}>
                        <View style={{alignItems:'flex-end', marginRight: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.classContainer}>{standard}</Text>
                                <Text style={styles.divisonContainer}> {className}</Text>
                            </View>
                            <Text style={styles.nameContainer}>{sname}</Text>
                        </View>
                    </View>
                </View>
            </CardSection>
        </Card>
    )
};

const styles = {
    colorView: {
        width: 3,
    },
    timingContainer: {
        padding: 10,
        width: WindowsWidth * 55 /100
    },
    additionalInfoContainer: {
        padding: 10,
        width: WindowsWidth * 45 /100
    },
    standardContainer: {
        color: 'rgb(7, 7, 7)',
        fontSize: 40,
        fontFamily: MyriadFont
    },
    nameContainer: {
        color: Color.drawerTextColor,
        fontSize: 24,
        marginTop: 5,
        fontFamily: MyriadFont
    },
    classContainer: {
        color: 'rgb(104, 102, 102)',
        fontSize: 25,
        marginTop: 5,
        fontFamily: MyriadFont
    },
    divisonContainer: {
        color: 'rgb(229,115,23)',
        fontSize: 25,
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
};

export {TodayClassInfo}
