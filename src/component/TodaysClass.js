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
import {Card,CardSection} from "../commonComponent/Common";
import Color from '../helper/theme/Color'
import {DisplayAreaView, MyriadFont, WindowsWidth} from '../commonComponent/global';
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
        isBack:true,
        flag:1
    };

    componentWillMount = async () =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.timeTable,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            if(res.success === 1){
                this.setState({classList: res.response})
            }else {
                this.setState({flag:0});
            }

        }).catch((err)=>{
            Alert.alert(err.data.error);
        })
    };

    changeActiveState(value){
        this.setState({
            active: value
        })
    }

    renderEmptySection = () =>{
        return(
            <View style={{marginTop: 20}}>
                <Card>
                    <CardSection>
                        <View style={[styles.colorView, {backgroundColor: 'red'}]}/>

                        <View style={styles.infoContainer}>
                            <Text style={styles.standardContainer}>No Schedule Available Yet </Text>
                        </View>
                    </CardSection>
                </Card>
            </View>
        )
    };

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
                            {this.state.flag ? this.renderClassInfo() : this.renderEmptySection()}
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
    colorView: {
        width: 2,
    },
    infoContainer: {
        padding: 15,
        width: WindowsWidth
    },
    standadContainer: {
        color: 'rgb(7, 7, 7)',
        fontSize: 50,
        width: WindowsWidth ,
        fontFamily: MyriadFont,
        fontWeight: 600
    },
};
