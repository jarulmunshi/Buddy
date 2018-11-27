import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'

import {WindowsWidth} from './global'
import {Card, CardSection} from './Common'

const News = (props) => {
    const {title, content} = props

    return(
        <View>
            <Card>
                <CardSection>
                    <View>
                        <Text style={[styles.headingStyle, {marginTop: 15}]}>{title}</Text>
                        <View style={styles.newsContainer}>
                            <Text style={styles.newsTextStyle}>{content}</Text>
                        </View>
                    </View>
                </CardSection>
            </Card>
        </View>
    )
}

const styles = {
    headingStyle: {
        marginLeft: 10
    },
    newsContainer: {
        height: 200,
        width: WindowsWidth - 10,
        margin: 5,
        backgroundColor: 'rgb(229,232,232)',
        justifyContent: 'center'
    },
    newsTextStyle: {
        marginLeft: 10,
        marginRight: 10,
        color: 'rgb(86,85,85)'
    },
}

export {News}