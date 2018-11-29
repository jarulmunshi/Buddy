import React from 'react';
import {
    Text,
    View,
    TouchableWithoutFeedback,
    StatusBar,
    Image,
    Alert,
    AsyncStorage
} from 'react-native';
import Color from './../helper/theme/Color';
import {WindowsHeight,WindowsWidth} from './global';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationActions, StackActions} from "react-navigation";
const Header = (props) =>{
        const {textStyle,viewStyle,leftIconStyle,subViewStyle2,imageContainer1,rightIconStyle}=headerStyles;
        return(
        <View>
            {/*<StatusBar
                hidden={false}
                backgroundColor={Color.headerColor}
                barStyle="light-content"
            />*/}
            <View style={viewStyle}>
                <View style={leftIconStyle}>
                    {
                        props.isBack&&
                        <TouchableWithoutFeedback onPress={()=>{props.onBackButtonPress()}}>
                            <Icon name={props.iName} size={25} style={{color:Color.headerTextColor,marginLeft:15}}/>
                        </TouchableWithoutFeedback>
                    }

                </View>
                <View style={subViewStyle2}>
                    <Text style={textStyle}>{props.headerText}</Text>
                </View>
                <View style={rightIconStyle}>
                    {
                        props.isAdmin &&
                        <TouchableWithoutFeedback onPress={() =>{
                            Alert.alert(
                                'Log Out',
                                'Are you sue you want to logout?',
                                [
                                    {text: 'Yes', onPress: async () => {
                                            await AsyncStorage.removeItem("role")

                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                            });
                                            props.navigation.dispatch(resetAction);
                                        }},
                                    {text: 'No', onPress: () => {}},
                                ],
                                { cancelable: false }
                            )
                        }}>
                            <Text style={[textStyle, {fontSize: 18, fontWeight: null}]}>Log Out</Text>
                        </TouchableWithoutFeedback>
                    }

                    {
                        props.uploadFile &&
                        <TouchableWithoutFeedback onPress={()=>{props.showPicker()}}>
                            <Image style={imageContainer1} source={require('../images/cloudUp.png')} resizeMode="contain"/>
                        </TouchableWithoutFeedback>
                    }
                </View>
                {/*{props.isIcon &&<Image style={imageContainer1} source={require('../images/cloudUp.png')}/>}*/}
            </View>
        </View>
    )
};
const headerStyles={
    viewStyle:{
        backgroundColor: Color.headerColor,
        height: 50,
        flexDirection: 'row',
        width:WindowsWidth,
    },
    leftIconStyle:{
        width: WindowsWidth * 0.20,
        justifyContent: 'center',
    },
    rightIconStyle:{
        width: WindowsWidth * 0.20,
        justifyContent: 'center',
    },
    subViewStyle2:{
        width:WindowsWidth - (WindowsWidth * 0.40),
        alignItems:'center',
        justifyContent: 'center',
    },
    headerStyle:{
        borderColor:'#ddd',
        shadowColor:'#fff',
        shadowOffset:{width:0,height:5},
        shadowOpacity:0.7,
        flexDirection:'row',
        marginTop:20
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:Color.headerTextColor,
        textAlign: 'center',
    },
    imageContainer1: {
        width: 30,
        height: 25,
        alignSelf: 'center'
    }
};
export {Header};
