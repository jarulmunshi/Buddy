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
    const {standard, sname, color , timing , className} =props.classInfo;

    return(
        <Card>
            <TouchableOpacity onPress={()=>props.onBackButtonPress()}>
                <CardSection>
                    <View style={[styles.colorView, {backgroundColor: color}]}></View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.standardContainer}>{sname}</Text>
                    </View>

                    <View style={styles.additionalInfoContainer}>
                        <View style={{ justifyContent: 'space-between'}}>
                            <View style={{alignItems:'flex-end', marginRight: 10}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.classContainer}>{standard}</Text>
                                    <Text style={styles.divisonContainer}> {className}</Text>
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
