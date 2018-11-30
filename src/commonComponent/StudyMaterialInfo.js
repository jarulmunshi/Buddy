import React from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import Color from './../helper/theme/Color';
import {Card, CardSection} from './Common'
import {WindowsWidth,MyriadFont} from './global'

const StudyMaterialInfo = (props) => {
    const {standard, subject, subject_id , division_id , division,id} =props.classInfo;
    const color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'
    return(
        <Card>
            <TouchableOpacity onPress={()=> props.onBackButtonPress(subject_id || id ,division_id || null)}>
                <CardSection>
                    <View style={[styles.colorView, {backgroundColor: color}]}></View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.standardContainer}>{subject}</Text>
                    </View>

                    <View style={styles.additionalInfoContainer}>
                        <View style={{ justifyContent: 'space-between'}}>
                            <View style={{alignItems:'flex-end', marginRight: 10}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.classContainer}>{standard}</Text>
                                    {standard > 3 &&<Text>th</Text>||standard === 3 &&<Text>rd</Text>
                                    ||standard === 2 &&<Text>nd</Text>||standard === 1 &&<Text>st</Text>}
                                    {division ==='A' &&
                                    <Text style={[styles.divisonContainer,{color:'rgb(229,115,23)'}]}> {division}</Text> ||
                                    division === 'B' &&<Text style={[styles.divisonContainer,{color:'rgb(128,192,105)'}]}> {division}</Text> ||
                                    <Text style={[styles.divisonContainer,{color:'rgb(102,183,189)'}]}> {division}</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </CardSection>
            </TouchableOpacity>
        </Card>
    )
};

const styles = {
    colorView: {
        width: 3,
    },
    infoContainer: {
        padding: 25,
        width: WindowsWidth * 55 /100
    },
    additionalInfoContainer: {
        padding: 25,
        width: WindowsWidth * 45 /100
    },
    standardContainer: {
        color: 'rgb(7, 7, 7)',
        fontSize: 30,
        width: WindowsWidth * 75 /100,
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

export {StudyMaterialInfo}
