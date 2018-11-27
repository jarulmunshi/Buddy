import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView, StatusBar
} from 'react-native'
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

export default class TodaysClass extends Component{

    state = {
        active: 'Class',
        classList: [
            {
                "standard": "11th",
                "className": "A",
                "sname":"Mathematics",
                "timing": "10:00",
                "color":"red"
            },
            {
                "standard": "12th",
                "className": "A",
                "sname":"Science",
                "timing": "10:30",
                "color":"green"
            },
            {
                "standard": "10th",
                "className": "A",
                "sname":"English",
                "timing": "11:10",
                "color":"blue"
            },
            {
                "standard": "08th",
                "className": "A",
                "sname":"Science",
                "timing": "11:40",
                "color":"pink"
            },
            {
                "standard": "09th",
                "className": "A",
                "sname":"Mathemetics",
                "timing": "12:10",
                "color":"grey"
            },
            {
                "standard": "11th",
                "className": "A",
                "sname":"English",
                "timing": "01:00",
                "color":"red"
            },
        ],
        iName:"bars",
        isBack:true
    };

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
