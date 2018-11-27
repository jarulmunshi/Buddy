import React from 'React';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {WindowsHeight,WindowsWidth} from './global';
import Color from './../helper/theme/Color';
import {NavigationActions, StackActions} from "react-navigation";

navigate = (props, key) =>{
    props.navigation.navigate(key);
    props.navigation.closeDrawer()
}

const drawerImageparent=(props)=> {
    return(
        <SafeAreaView>
            <View
                style={{
                    height: WindowsHeight,
                }}
            >
                <View style={{paddingLeft: WindowsWidth * 0.60}}>
                    <TouchableOpacity onPress={()=>props.navigation.closeDrawer()}>
                        <Icon name="times" size={30} style={{color:Color.drawerTextColor}}/>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center',height:WindowsHeight * 0.01}}
                >
                    <Image onPress={()=>navigate(props,'StudyMaterial')} source={require('./../images/CoberArt1024-500.png')} style={{height:WindowsHeight * 0.15, width: WindowsWidth * 0.60}} resizeMode="contain"/>
                </View>
                <View style={{top:WindowsHeight * 0.20}}>
                    <TouchableOpacity style={[style.viewStyle,{borderTopWidth:1,borderTopColor:'gray'}]}
                                      onPress={() => navigate(props,'Home')}>
                        <Text style={style.textStyle}>Attendance / Notes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.viewStyle}
                                      onPress={() => navigate(props,'TimeTable')}>
                        <Text style={style.textStyle}>Time Table</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.viewStyle}
                                      onPress={()=>navigate(props,'Community')}>
                        <Text style={style.textStyle}>Community</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.viewStyle} onPress={()=>navigate(props,'Message')}>
                        <Text style={style.textStyle}>Contact to teacher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.viewStyle} onPress={()=>navigate(props,'StudyMaterial')}>
                        <Text style={style.textStyle}>Study Materials</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.viewStyle} onPress={()=>navigate(props,'ChangePassword')}>
                        <Text style={style.textStyle}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: WindowsHeight * 0.30 }}>
                    <TouchableOpacity onPress={()=>{
                        Alert.alert(
                            'Log Out',
                            'Are you sue you want to logout?',
                            [
                                {text: 'Yes', onPress: async () => {
                                        await AsyncStorage.removeItem("detail")

                                        const resetAction = StackActions.reset({
                                            index: 0,
                                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                                        });
                                        props.navigation.dispatch(resetAction);
                                    }},
                                {text: 'No', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                        )
                    }}>
                        <Text style={{textAlign: 'center',color:"red",fontSize:25}}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )};
const style={
    viewStyle: {
        borderBottomWidth: 1,
        borderBottomColor:'gray',
        height:WindowsHeight * 0.08,
        justifyContent: 'center'
    },
    textStyle:{
        color:Color.drawerTextColor,
        fontSize: 18,
        marginLeft: 10
    }
}

export {drawerImageparent}
