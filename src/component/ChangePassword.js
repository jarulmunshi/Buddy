import React,{Component} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    StatusBar,
    Alert,
    AsyncStorage,
} from 'react-native';
import {Input,Button,Link,Header,Footer} from "../commonComponent/Common";
import Color from './../helper/theme/Color';
import {WindowsWidth,WindowsHeight,DisplayAreaView} from "../commonComponent/global";
import {passwordEmpty, checkPassword} from "../validation/Validation";
import Icon from "react-native-vector-icons/FontAwesome";
import {callApi} from '../services/ApiCall';
import ApiConstant from '../services/ApiConstant';
class ChangePassword extends Component{
    constructor(props){
        super(props);
        this.state={
            //iName:'long-arrow-left',
            iName:"bars",
            isBack:true,
            opass:'',
            npass:'',
            cpass:'',
            passError:'',
            cpassError:'',
            npassError:''
        };
    }

    onBackButtonPress=()=>{
        this.props.navigation.openDrawer();
    };

    validateUser= async ()=> {
        if(passwordEmpty(this.state.cpass) && passwordEmpty(this.state.opass) && passwordEmpty(this.state.npass)){
            this.setState({iconError:'exclamation-circle',passError:'Require',cpassError:'Require',npassError:'Require'});
        }
        else if(passwordEmpty(this.state.cpass) || passwordEmpty(this.state.npass || passwordEmpty(this.state.npass))){
            if(passwordEmpty(this.state.npass)){
                this.setState({iconError:'exclamation-circle',npassError:'Require'});
            }
            else if(passwordEmpty(this.state.opass)){
                this.setState({iconError:'exclamation-circle',passError:'Require'});
            }
            else {
                this.setState({iconError:'exclamation-circle',cpassError:'Require'});
            }
        }
        else if(!checkPassword(this.state.npass)){
            Alert.alert("new password must contain six characters");
        }
        else {
            if(this.state.npass !== this.state.cpass){
                Alert.alert('New password and confirm password must be same..!');
            }
            else {
                const data={
                    oldPassword:this.state.opass,
                    password:this.state.npass
                };
                const val = await AsyncStorage.getItem("detail");
                let ans = JSON.parse(val);
                console.log(ans.token);
                callApi(ApiConstant.baseUrl+ApiConstant.changePassword,'put',data,
                    {"Content-Type":"application/json","Authorization":ans.token}).then( async (res)=> {
                    console.log(res);
                    //await AsyncStorage.setItem("detail",JSON.stringify(res.data));
                    this.setState({opass:'',npass:'',cpass:''});
                    Alert.alert("Password Updated Successfully");
                }).catch((err)=>{
                    console.log(err);
                    Alert.alert(err.data.error);
                });
            }

        }

    };
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                <StatusBar
                    backgroundColor={Color.headerColor}
                />
                <Header
                    headerText="Change Password"
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.onBackButtonPress}
                />
                <View style={{alignItems: 'center', height: DisplayAreaView}}>
                <KeyboardAvoidingView enabled={true} keyboardVerticalOffset={100}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Input
                                placeholder="Enter old password"
                                onChange={(value)=>this.setState({opass:value,passError:''})}
                                value={this.state.opass}
                                autoCapitalize={false}
                                secureTextEntry={true}
                                style={{paddingTop:20,color:Color.headerColor}}
                                borderWidth={1}
                                borderColor={Color.headerColor}
                            />
                        </View>
                        <View style={{left:WindowsWidth *0.85,alignItems:'center',justifyContent: 'center',position: 'absolute'
                            ,top:WindowsHeight * 0.045}}>
                            {this.state.passError !=="" &&
                            <Icon name={this.state.iconError} size={20} style={{color: 'red'}}/>}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Input
                                placeholder="Enter new password"
                                onChange={(value)=>this.setState({npass:value,npassError:''})}
                                value={this.state.npass}
                                autoCapitalize={false}
                                secureTextEntry={true}
                                style={{paddingTop:20,color:Color.headerColor}}
                                borderWidth={1}
                                borderColor={Color.headerColor}
                            />
                        </View>
                        <View style={{left:WindowsWidth *0.85,alignItems:'center',justifyContent: 'center',position: 'absolute'
                            ,top:WindowsHeight * 0.046}}>
                            {this.state.npassError !=="" &&
                            <Icon name={this.state.iconError} size={20} style={{color: 'red'}}/>}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Input
                                placeholder="Enter confirm password"
                                onChange={(value)=>this.setState({cpass:value,cpassError:''})}
                                value={this.state.cpass}
                                autoCapitalize={false}
                                secureTextEntry={true}
                                style={{paddingTop:20}}
                                borderWidth={1}
                                borderColor={Color.headerColor}
                            />
                        </View>
                        <View style={{alignItems:'center',justifyContent: 'center',left:WindowsWidth *0.85,position: 'absolute'
                            ,top:WindowsHeight * 0.046}}>
                            {this.state.cpassError !=="" &&
                            <Icon name={this.state.iconError} size={20} style={{color: 'red'}}/>}
                        </View>
                    </View>

                    <Button style={{paddingTop:20}} onPress={this.validateUser}>SUBMIT</Button>

                </KeyboardAvoidingView>
                </View>

                <Footer/>
            </SafeAreaView>
        )
    }
}
export default ChangePassword;
