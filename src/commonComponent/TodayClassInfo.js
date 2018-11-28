import React from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import Color from './../helper/theme/Color';
import {Card, CardSection} from './Common';
import {WindowsWidth,MyriadFont} from './global';

const TodayClassInfo = (props) => {
    const {standard, subject , start_time , division} =props.classInfo;
    const color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'
    var textColor = "";
    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={styles.timingContainer}>
                    <Text style={styles.standardContainer}>{start_time}</Text>
                </View>

                <View style={styles.additionalInfoContainer}>
                    <View style={{justifyContent: 'space-between'}}>
                        <View style={{alignItems:'flex-end', marginRight: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.classContainer}>{standard}</Text>
                                {standard > 2 &&<Text>th</Text>||<Text>rd</Text>}
                                {division ==='A' &&
                                <Text style={[styles.divisonContainer,{color:'rgb(229,115,23)'}]}> {division}</Text> ||
                                division === 'B' &&<Text style={[styles.divisonContainer,{color:'rgb(128,192,105)'}]}> {division}</Text> ||
                                <Text style={[styles.divisonContainer,{color:'rgb(102,183,189)'}]}> {division}</Text>
                                }

                            </View>
                            <Text style={styles.nameContainer}>{subject}</Text>
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
        width: WindowsWidth * 55 /100,
        justifyContent: 'center'
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
