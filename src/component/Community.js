import React, {Component} from 'react'
import {
    View,
    SafeAreaView,
    ScrollView
} from 'react-native'

import {DisplayAreaView} from '../commonComponent/global';
import {Header, Footer, CommunityInfo} from '../commonComponent/Common'

export default class Community extends Component{

    state = {
        iName:"bars",
        communityData: [
            {
                "title":"NEWS",
                "description": "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY. LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY. LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY."
            },
            {
                "title":"SPORTS FESTIVAL",
                "images": [
                    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg",
                    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg",
                    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg"
                ]
            },
            {
                "title":"SPORTS FESTIVAL",
                "description": "LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY. LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY. LOREM IPSUM IS SIMPLY DUMMY TEXT OF THE PRINTING AND TESTING INDUSTRY.",
                "images": [
                    "https://akm-img-a-in.tosshub.com/indiatoday/images/story/201601/india-rio2-1_647_011316083442_0.jpg",
                ]
            }
        ],
        isBack:true,
    }

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