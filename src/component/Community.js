import React, {Component} from 'react'
import {
    View,
    SafeAreaView,
    ScrollView, AsyncStorage, Alert
} from 'react-native'

import {DisplayAreaView} from '../commonComponent/global';
import {Header, Footer, CommunityInfo} from '../commonComponent/Common'
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

export default class Community extends Component{

    state = {
        iName:"bars",
        communityData: [],
        isBack:true,
    }

    componentWillMount = async () =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.community,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            console.log(res);
            if(res.success === 1){
                this.setState({communityData: res.response})
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })
    };

    renderCommunityInfo(){
        return this.state.communityData.map(communityData =>
            <CommunityInfo communityInfo={communityData}/>
        )
    }

    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <Header
                    headerText={"Community"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />
                <View style={{marginTop: 5, height: DisplayAreaView}}>
                    <ScrollView>
                        {this.renderCommunityInfo()}
                    </ScrollView>
                </View>

                <Footer/>
            </SafeAreaView>
        )
    }
}

const styles = {
    parentContainer: {
        flex: 1,
    },
}