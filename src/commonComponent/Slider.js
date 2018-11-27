import React from 'react'
import {
    View,
    Text,
    Image
} from 'react-native'

import {WindowsWidth} from './global'
import Swiper from 'react-native-swiper';
import Color from '../helper/theme/Color'
import {Card, CardSection} from './Common'

const Slider = (props) => {
    const {title, url} = props

    return(

        <Card>
            <CardSection>
                <View style={styles.dataContainer}>
                    <Text style={styles.headingStyle}>{title}</Text>
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
        marginLeft: 5
    },
}

export {Slider}