import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'
import Swiper from 'react-native-swiper';

import {WindowsWidth} from './global'
import {Card, CardSection} from './Common'
import Color from "../helper/theme/Color";
import {MyriadFont} from './global'

const CommunityInfo = (props) => {
    const {title, description, Media} = props.communityInfo

    var slider = []
    for (let i = 0; i < Media.length; i++) {
        debugger
        slider.push(
            <View key={i}>
                <Image key={`images${i}`}
                       source={{uri:`http://192.168.200.34:3000/${Media[i].image_url}`}}
                       style={[styles.dataContainer, {resizeMode: 'contain'}]}/>
            </View>
        )
    }

    return(
        <Card>
            <CardSection>
                <View style={{flex:1}}>
                    <Text style={styles.headingStyle}>{title}</Text>
                    {
                        (Media.length > 0) &&
                            <View style={{height: 200}}>
                                <Swiper style={styles.wrapper}
                                        dot={<View style={{
                                            backgroundColor: Color.lightColor,
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}/>}
                                        activeDot={<View style={{
                                            backgroundColor: Color.headerColor,
                                            width: 8,
                                            height: 8,
                                            borderRadius: 4,
                                            marginLeft: 3,
                                            marginRight: 3,
                                            marginTop: 3,
                                            marginBottom: 3
                                        }}/>}
                                >
                                    {slider}
                                </Swiper>
                            </View>
                    }
                    {
                        (description) &&
                        <View style={styles.newsContainer}>
                            <Text style={styles.newsTextStyle}>{description}</Text>
                        </View>
                    }
                </View>
            </CardSection>
        </Card>
    )
}

const styles = {
    dataContainer:{
        height: 200,
        width: WindowsWidth - 10,
        margin: 5
    },
    wrapper: {
    },
    headingStyle: {
        marginLeft: 10,
        fontFamily: MyriadFont,
        marginTop: 10,
        color: '#000'
    },
    newsContainer: {
        backgroundColor: 'rgb(229,232,232)',
        justifyContent: 'center',
        margin: 5,
        padding: 10,
        fontFamily: MyriadFont
    },
    newsTextStyle: {
        color: 'rgb(86,85,85)',
    },
}

export {CommunityInfo}