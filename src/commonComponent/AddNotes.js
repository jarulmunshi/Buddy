import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Alert,
    Image,
    Platform
} from 'react-native'

import {WindowsHeight, WindowsWidth, MyriadFont} from '../commonComponent/global';
import {Input, Button} from './Common'

const AddNote = (props) => {
    return(
        <View style={{backgroundColor:'rgba(0,0,0,0.5)', height: WindowsHeight, width: WindowsWidth, position: 'absolute'}}>
        <TouchableOpacity style={{height: 40, position: 'absolute', top: Platform.OS === 'ios'? 50 : 0, right: 5}} onPress={props.toggle}>
            <Image source={require('../images/close.png')}></Image>
        </TouchableOpacity>
            <View style={{height:WindowsHeight-40,width:WindowsWidth,position:'absolute',top: 40,justifyContent:'center',alignItems:'center'}}>
                <View style={styles.viewContainer}>
                <View style={styles.headingContainer}>
                    <Text style={styles.textStyle}>{props.heading}</Text>
                </View>
                <View style={{margin: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Input
                            borderWidth={1}
                            placeholder={'Title'}
                            placeholderTextColor={'rgb(119,119,119)'}
                            color={'rgb(119,119,119)'}
                            onChange={(value) => props.title(value)}
                        />
                        <Text style={{fontSize: 25, color: 'red'}}>*</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Input
                            multiline={true}
                            borderWidth={1}
                            placeholder={'Details'}
                            placeholderTextColor={'rgb(119,119,119)'}
                            color={'rgb(119,119,119)'}
                            height={150}
                            onChange={(value) => props.description(value)}
                        />

                        <Text style={{fontSize: 25, color: 'red'}}>*</Text>
                    </View>

                    <Button style={{marginLeft: 2, marginTop: 10}} onPress={() => {
                        if(props.titleValue.trim().length === 0 || props.descriptionValue.trim().length === 0)
                            Alert.alert("Please enter Title and Message")
                        else
                            props.newNote(props.titleValue, props.descriptionValue)
                    }}>SUBMIT</Button>
                </View>
            </View>
            </View>
        </View>
    )
}

const styles = {
    viewContainer: {
        marginLeft: 25,
        marginRight: 25,
        backgroundColor: 'rgb(217,217,217)'
    },
    headingContainer: {
        height: 40,
        backgroundColor: 'rgb(51,51,51)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: '#FFF',
        fontSize: 22,
        marginTop: 5,
        fontFamily: MyriadFont
    }
}

export {AddNote}