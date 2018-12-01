import React, {Component} from 'react'
import {
    View,
    SafeAreaView,
    Text,
    ScrollView,
    Image, Platform,
    FlatList,
    TouchableOpacity, AsyncStorage, Alert
} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion';

import Color from '../helper/theme/Color'
import {WindowsHeight, WindowsWidth, DisplayAreaView} from '../commonComponent/global';
import {Header, Footer, TimeTableList, Card, CardSection} from '../commonComponent/Common';
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";
import _ from 'lodash';
import moment from "moment";


export default class TimeTable extends Component {
    state = {
        iName: "bars",
        isBack: true,
        active: [],
        collapsed: false,
        timeTable: [],
        isExpanded: null
    };

    componentDidMount = async() =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.studentTimeTable,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            if(res.success === 1){
                const data=_.groupBy(res.response,'day');
                const dayList = Object.entries(data);
                let schedules=[];
                const daysArray = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                dayList.map((item,i) => {
                        schedules.push({
                            id:i+1,
                            day:item[0],
                            schedule:item[1]
                        })
                });
                let temp=[];
                daysArray.map((item,i)=>{
                    if(!(schedules.some((d) => d.day.toString() === item.toString()))){
                        temp.push({
                            id:i+1,
                            day:item,
                            schedule:[]
                        })
                    } else{
                        const o=_.find(schedules, function(o) { if(o.day.toString() === item.toString()){return o.id}; });
                        debugger
                        temp.push({
                            id:i+1,
                            day:item,
                            schedule:schedules[o.id-1].schedule
                        })
                    }

                })
                debugger
                // dayList.map((item,i) => {
                //     schedules.push({
                //         id:i+1,
                //         day:item[0],
                //         schedule:item[1]
                //     })
                // });

                // let timeTableData=[];
                // _.forEach(schedules,(item,i)=>{
                //     if(_.includes(schedules,daysArray)){
                //         timeTableData.push({
                //             id:i+1,
                //             day:item[0],
                //             schedule: item[1]
                //         })
                //     }else {
                //         timeTableData.push({
                //             id:i+1,
                //             day:item[0],
                //             schedule: null
                //         })
                //     }
                // });
                //console.log(timeTableData);
                debugger;
               this.setState({timeTable: temp});

            }else {
                console.log("dgdggruhirug igriureg")
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })
    };

    goBack = () => {
        this.props.navigation.openDrawer();
    };

    _renderHeader = timeTable => {
        return (
            <Card>
                <CardSection>
                    <View style={[styles.colorView, {backgroundColor: timeTable.color}]}></View>

                    <View style={styles.header}>
                        <Text style={styles.headerText}>{timeTable.day}</Text>
                        <Image
                            source={timeTable.id - 1 === this.state.active[0] ? require('../images/up.png') : require('../images/down.png')}/>
                    </View>
                </CardSection>
            </Card>
        );
    };

    renderTimeTable({item, index}){
        return (
            <View>
                <TouchableOpacity onPress={() => {this.setState({isExpanded: (this.state.isExpanded === index) ? null : index}) }}>
                    <Card>
                        <CardSection>
                            <View style={[styles.colorView, {backgroundColor: item.color}]}></View>

                            <View style={styles.header}>
                                <Text style={styles.headerText}>{item.day}</Text>
                                <Image source={(this.state.isExpanded === index )? require('../images/up.png') : require('../images/down.png')}/>
                            </View>
                        </CardSection>
                    </Card>
                </TouchableOpacity>
                {
                    (this.state.isExpanded === index) &&
                        this.onExapand(item.schedule,index)

                }
            </View>
        );
    };

    onExapand =(schedule, index) => {
        debugger;
        this.myFlatlist.scrollToOffset({viewPosition:0,y:0, animated: true})
       // this.myFlatlist.scrollToIndex({index:index,animated:true})
        return schedule.map(data =>
            <TimeTableList timeTable={data}/>
        )
    }

    _renderContent = timeTable => {
        if(timeTable.schedule.length > 0){
            console.log(timeTable.schedule.length);
        }else {
            console.log(timeTable.schedule.length);
        }
        return timeTable.schedule.map(data =>
            <TimeTableList timeTable={data}/>
        )
    };

    _updateSections = active => {
        this.setState({active});
    };

    render() {
        return (
            <SafeAreaView style={styles.parentContainer}>
                <Header
                    headerText={"Time Table"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />

                <View style={{marginTop: 5, height: DisplayAreaView}}>
                    <ScrollView>
                    <Accordion
                    sections={this.state.timeTable}
                    activeSections={this.state.active}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                    underlayColor={'#FFF'}
                    />
                    </ScrollView>
                    {/*<FlatList
                        ref={(ref) => this.myFlatlist = ref}
                        style={{flex: 1}}
                        data={this.state.timeTable}
                        renderItem={(item) => this.renderTimeTable(item)}

                    />*/}
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
    textStyle: {
        fontSize: 22,
        marginLeft: 5,
        color: Color.extraDark
    },
    header: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: WindowsWidth
    },
    headerText: {
        color: '#E25C00',
        fontSize: 26,
    },
    colorView: {
        width: 3,
    },
}
