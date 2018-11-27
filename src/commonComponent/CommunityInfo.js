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
    const {title, description, images} = props.communityInfo

    return(
        <Card>
            <CardSection>
                <View style={{flex:1}}>
                    <Text style={styles.headingStyle}>{title}</Text>
                    {
                        (images) &&
                            <View style={styles.dataContainer}>
                                <Swiper style={styles.wrapper}
                                        dot={<View style={{
                                            backgroundColor: '#FFF',
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
                                    <View>
                                        <Image style={styles.dataContainer} source={{uri: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg"}}/>
                                    </View>
                                    <View>
                                        <Image style={styles.dataContainer} source={{uri: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg"}}/>
                                    </View>
                                    <View>
                                        <Image style={styles.dataContainer} source={{uri: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg"}}/>
                                    </View>
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
        height: 200,
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