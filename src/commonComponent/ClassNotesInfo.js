import React from 'react'
import {
    Text,
    View,
    Image, Platform
} from 'react-native'

import {Card, CardSection} from './Common'
import {MyriadFont, WindowsWidth} from './global'

const ClassNotesInfo = (props) => {
    const {title, description, createdDate, color} =props.notesInfo

    return(
        <Card>
            <CardSection>
                <View style={[styles.colorView, {backgroundColor: color}]}></View>

                <View style={{padding:10, width: WindowsWidth}}>
                    <Text style={styles.titleText}>{title}</Text>

                    <Text style={styles.descriptionText}>{description}</Text>

                    <Text style={[styles.descriptionText, {alignSelf: 'flex-end', fontSize: 16}]}>{createdDate}</Text>
                </View>

            </CardSection>
        </Card>
    )
}

const styles = {
    colorView: {
        width: 3,
    },
    titleText: {
        color: 'rgb(60,60,60)',
        fontSize: 22,
        fontFamily: MyriadFont
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: MyriadFont,
        color: 'rgb(146,146,146)'
    }
}

export {ClassNotesInfo}