import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView
} from 'react-native'
import FAB from 'react-native-fab'

import Color from '../helper/theme/Color'
import {DisplayAreaView} from '../commonComponent/global';
import {CustomMenu, ClassInfoList, Footer, TeacherInfoList, CommunityInfo, Header} from '../commonComponent/Common'

export default class Admin extends Component{

    state = {
        active: 'Class',
        classList: [
            {
                "standard": "11th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"red"
            },
            {
                "standard": "12th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"green"
            },
            {
                "standard": "10th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"blue"
            },
            {
                "standard": "8th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"pink"
            },
            {
                "standard": "9th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"grey"
            },
            {
                "standard": "11th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"red"
            },
            {
                "standard": "12th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"green"
            },
            {
                "standard": "10th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"blue"
            },
            {
                "standard": "8th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"pink"
            },
            {
                "standard": "9th",
                "name":"JORDAN ALEX",
                "totalStudent": 54,
                "color":"grey"
            },
        ],
        teacherList: [
            {
                "teacherName": "TAIMUR KHAN",
                "subjects":"MATHS, SCIENCE",
                "mobileNo": "+91 9890768978",
                "email":"ABC@GMAIL.COM",
                "color":"red"
            },
            {
                "teacherName": "GOPI PATEL",
                "subjects":"SOCIAL SCIENCE, PHYSICS",
                "mobileNo": "+91 9890768978",
                "email":"ABC@GMAIL.COM",
                "color":"green"
            },
            {
                "teacherName": "AXAY MISHRA",
                "subjects":"MATHS, PHYSICS",
                "mobileNo": "+91 9890768978",
                "email":"ABC@GMAIL.COM",
                "color":"blue"
            },
            {
                "teacherName": "RACHANA PATEL",
                "subjects":"ENGLISH, SPORTS",
                "mobileNo": "+91 9890768978",
                "email":"ABC@GMAIL.COM",
                "color":"pink"
            },
            {
                "teacherName": "RUTA ZALA",
                "subjects":"HINDI, MATHS",
                "mobileNo": "+91 9890768978",
                "email":"ABC@GMAIL.COM",
                "color":"grey"
            }
        ],
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
        ]
    }

    changeActiveState(value){
        this.setState({
            active: value
        })
    }

    renderClassInfo(){
        return this.state.classList.map(classInfo =>
            <ClassInfoList key={classInfo.standard} classInfo={classInfo} />
        )
    }

    renderTeacherInfo(){
        return this.state.teacherList.map(teacherInfo =>
            <TeacherInfoList key={teacherInfo.teacherName} teacherInfo={teacherInfo} />
        )
    }

    renderCommunityInfo(){
        return this.state.communityData.map(communityData =>
            <CommunityInfo communityInfo={communityData}/>
        )
    }

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>

                <Header headerText={"School Buddy"} isAdmin={true} navigation={this.props.navigation}/>

                <View style={{marginTop: 20, height: DisplayAreaView}}>

                    <CustomMenu
                        menus={["Class", "Teacher", "Community"]}
                        active={this.state.active}
                        activeChange={(value) => this.changeActiveState(value)}
                    />

                    {
                        (this.state.active === 'Class') &&
                            <ScrollView>
                                {this.renderClassInfo()}
                            </ScrollView>
                    }

                    {
                        (this.state.active === 'Teacher') &&
                        <ScrollView>
                            {this.renderTeacherInfo()}
                        </ScrollView>
                    }

                    {
                        (this.state.active === 'Community') &&
                        <ScrollView>
                            {this.renderCommunityInfo()}
                        </ScrollView>
                    }


                    <FAB buttonColor="rgb(2,110,115)" onClickAction={() => console.log("FAB clicked")}/>
                </View>

                <Footer/>
            </SafeAreaView>
        )
    }
}

const styles ={
    parentContainer: {
        flex: 1,
    },
}