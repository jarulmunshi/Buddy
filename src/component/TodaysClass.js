import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView, StatusBar, AsyncStorage
} from 'react-native';
import FAB from 'react-native-fab'

import Color from '../helper/theme/Color'
import {DisplayAreaView} from '../commonComponent/global';
import {
    CustomMenu,
    TodaysClassInfo,
    Footer,
    TeacherInfoList,
    CommunityInfo,
    Header,
    TodayClassInfo
} from '../commonComponent/Common'
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

export default class TodaysClass extends Component{

    state = {
        active: 'Class',
        classList: [],
        iName:"bars",
        isBack:true
    };

    componentWillMount = async () =>{
        const val = await AsyncStorage.getItem("detail");
        let ans = JSON.parse(val);
        callApi(ApiConstant.baseUrl+ApiConstant.timeTable,'get',{},
            {"Content-Type":"application/json","Authorization":ans.token}).then( async (res)=> {
            if(res.success === 1){
                this.setState({classList: res.response})
            }
            // console.log("---********----");
            // console.log(this.state.classList);
            //await AsyncStorage.setItem("detail",JSON.stringify(res.data));
        }).catch((err)=>{
            //console.log(err);
            Alert.alert(err.data.error);
        })
    }

    changeActiveState(value){
        this.setState({
            active: value
        })
    }

    renderClassInfo(){
        return this.state.classList.map(classInfo =>
            <TodayClassInfo key={classInfo.standard} classInfo={classInfo} />
        )
    }
    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <StatusBar
                    backgroundColor={Color.headerColor}
                />
                <Header
                    headerText={"Today's Classes"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />

                <View style={{marginTop: 10, height: DisplayAreaView}}>
                        <ScrollView>
                            {this.renderClassInfo()}
                        </ScrollView>
                </View>

                <Footer/>
            </SafeAreaView>
        )
    }
}

const styles ={
    parentContainer: {
        flex: 1,
        backgroundColor:'white'
    },
};
