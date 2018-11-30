import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView, StatusBar, AsyncStorage
} from 'react-native'
import Color from '../helper/theme/Color'
import {DisplayAreaView} from '../commonComponent/global';
import {
    StudyMaterialInfo,
    Footer,
    Header,
    TodayClassInfo
} from '../commonComponent/Common'
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

export default class StudyMaterial extends Component{

    state = {
        active: 'Class',
        classList: [],
        iName:"bars",
        isBack:true,
        dataList: []
    };
    displayClasslist = async () =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.studyMaterial,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            console.log(res);
            if(res.success === 1){
                this.setState({classList: res.response});
            }else{

            }

        }).catch((err)=>{
            Alert.alert(err.data.error);
        })

    };

    componentWillMount(){
        this.displayClasslist();
    }

    changeActiveState(value){
        this.setState({
            active: value
        })
    };

    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    goNext=async (sid,did)=>{
        this.props.navigation.navigate('File',{s_id:sid,d_id:did});
        // const userDetail = await AsyncStorage.getItem("detail");
        // let userData = JSON.parse(userDetail);
        // callApi(ApiConstant.baseUrl+ApiConstant.studyMaterialSubject + `${sid}` + `/${did}`,'get',{},
        //     {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
        //         console.log(res);
        //     if(res.success === 1){
        //         await AsyncStorage.setItem("files",JSON.stringify(res.response));
        //         this.props.navigation.navigate('File',{s_id:sid,d_id:did});
        //     }else {
        //         await AsyncStorage.removeItem("files");
        //         this.props.navigation.navigate('File');
        //     }
        // }).catch((err)=>{
        //     console.log(err);
        //     //Alert.alert(err.data.error);
        // });
    };

    renderClassInfo(){
        return this.state.classList.map(classInfo =>
            <StudyMaterialInfo key={classInfo.standard} classInfo={classInfo}
                               onBackButtonPress={(sid, did) => this.goNext(sid, did)}/>
        )
    };


    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <StatusBar
                    backgroundColor={Color.headerColor}
                />
                <Header
                    headerText={"Study Material"}
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
