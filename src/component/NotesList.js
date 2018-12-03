import React, {Component} from 'react';
import {Calendar} from 'react-native-calendars';
import {View, StyleSheet, SectionList, Text, SafeAreaView, AsyncStorage, Alert} from 'react-native';
import {
    Footer,
    Header,
    Card,
    CardSection
} from '../commonComponent/Common'
import moment from 'moment';
import _ from 'lodash';
import {DisplayAreaView, MyriadFont, WindowsWidth} from "../commonComponent/global";

import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

var date = new Date();
let monthShortName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec']

export default class NotesList extends Component {
    constructor(props) {
        super(props);

    }
    state = {
        notesList: [],
        dataList:[],
        allData:[],
        date:moment().format('YYYY-MM-DD'),
        markDates:{},
        iName: 'bars',
        isBack: true,
        notesDate: date.getFullYear()+"-"+(date.getMonth()+1),
        attendanceData: []
    };

    componentDidMount = async () => {
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        let dateObj={};
        let temp234 = [];
        let obj=[],mtemp=[];
        let tempmark=[];
        callApi(ApiConstant.baseUrl+ApiConstant.parentStudentAttendanceNotes,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( (res)=> {
            console.log(res);
            if(res.success === 1){
                temp234= res.respones.map((item)=>{
                    item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
                    return item;
                })
                const data=_.groupBy(temp234,'createdAt');

                const notList=Object.values(data);
                const dates=Object.keys(data);

                dates.map((item)=>{
                    dateObj[moment(item).format('YYYY-MM-DD')]={selected: false,marked: true, dotColor: 'green'}
                })
                notList.map((items)=>{
                    obj.push({
                        title:moment(items[0].createdAt).format('YYYY-MM-DD'),
                        data:items
                    })
                })
                const temp = _.find(obj,{'title':this.state.date})
                if(Boolean(temp)) {
                    mtemp.push({
                        title: Object.values(temp)[0],
                        data: Object.values(temp)[1]
                    })
                }
                console.log(obj)
                callApi(ApiConstant.baseUrl+ApiConstant.studentAttendance,'get',{},
                    {"Content-Type":"application/json","Authorization":userData.token}).then( (res)=> {
                    if(res.success === 1){
                        let temp23= res.response.map((item)=>{
                            item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
                            return item;
                        })
                        let markAbsent =[];

                        tempmark = dateObj;

                        temp23.map(item=>{
                            tempmark[moment(item.createdAt).format('YYYY-MM-DD')]={selected: true,marked: true, dotColor: 'green', selectedColor:'red'}
                            markAbsent.push(moment(item.createdAt).format('YYYY-MM-DD'))//[moment(item.createdAt).format('YYYY-MM-DD')]={selected: true,marked: true, dotColor: 'green', selectedColor:'red'}
                        })
                        console.log(dateObj)
                        tempmark[moment().format('YYYY-MM-DD')]={selected: true,marked: true, dotColor: 'green'}
                        this.setState({
                            markDates: tempmark,notesList:temp234,dataList:mtemp,allData:obj,attendanceData:markAbsent
                        })
                    }

                }).catch((err)=>{
                    Alert.alert(err.data.error);
                })
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })


    }

    renderItem = (item) => {
        const {title, description, createdAt} =item;
        return(
            <Card>
                <CardSection>
                    <View style={[styles.colorView, {backgroundColor: 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'}]}/>

                    <View style={styles.infoContainer}>
                        <Text style={styles.standadContainer}>{title}</Text>
                        <Text style={{fontFamily: MyriadFont,color:'#707070' }}>{description}</Text>
                        <Text style={styles.dateText}>{moment(createdAt).format('DD MMM YYYY')}</Text>
                    </View>


                </CardSection>
            </Card>
        )
    }

    dateByData(date) {
        if (this.state.allData.some((d) => d.title.toString() === date.toString())) {
            let dateObj = {};
            if (date in this.state.markDates) {
                const data = _.groupBy(this.state.notesList, 'createdAt');
                debugger
                const dates = Object.keys(data);

                dates.map((item) => {
                    dateObj[item] = {selected: false, marked: true, dotColor: 'green'}
                })
                dateObj[date] = {selected: true, marked: true, dotColor: 'green'}
                this.state.attendanceData.map(item=>{
                    dateObj[item] = {selected: true,marked: true, dotColor: 'green', selectedColor:'red'}
                })
            }
            let mtemp = [];
            const temp = _.find(this.state.allData, {'title': date})
            debugger
            mtemp.push({
                title: Object.values(temp)[0],
                data: Object.values(temp)[1]
            })
            this.setState({dataList: mtemp, date: moment(date).format('YYYY-MM-DD'), markDates: dateObj})
        }else{
            let dateObj = {};
            const data = _.groupBy(this.state.notesList, 'createdAt');
            const dates = Object.keys(data);

            dates.map((item) => {
                dateObj[item] = {selected: false, marked: true, dotColor: 'green'}

            })
            dateObj[date] = {selected: true, marked: false, dotColor: 'green'}
            this.state.attendanceData.map(item=>{
                dateObj[item] = {selected: true,marked: true, dotColor: 'green', selectedColor:'red'}
            })
            console.log(dateObj)
            this.setState({ dataList: [], markDates: dateObj, date: moment(date).format('YYYY-MM-DD') })
        }
    }

    renderEmptySection = () =>{
        return(
            <View style={{marginTop: 20}}>
                <Card>
                    <CardSection>
                        <View style={[styles.colorView, {backgroundColor: 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'}]}/>

                        <View style={styles.infoContainer}>
                            <Text style={styles.standardContainer}>No Note Available</Text>
                        </View>
                    </CardSection>
                </Card>
            </View>
        )
    }

    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    render() {
        const date=moment().format('YYYY-MM-DD');
        return (
            <SafeAreaView style={styles.parentContainer}>
                <Header
                    headerText={"School Buddy"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />
                <View style={{marginTop:5,height: DisplayAreaView}}>
                    <Calendar
                        style={styles.calendar}
                        current={this.state.date}
                        firstDay={1}
                        markedDates={this.state.markDates}
                        onDayPress={(day) => {
                            console.log(day)
                            this.dateByData(day.dateString)
                        }}

                    />
                    {this.state.dataList.length === 0 ?
                            this.renderEmptySection()
                        :
                        <SectionList
                            renderItem={({ item, index, section }) => this.renderItem(item)}
                            sections={this.state.dataList}
                            style={{marginTop: 20}}
                        />
                    }

                </View>

                <Footer/>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    colorView: {
        width: 2,
    },
    infoContainer: {
        padding: 10,
        width: WindowsWidth
    },
    additionalInfoContainer: {
        padding: 10,
        width: WindowsWidth * 45 /100
    },
    standadContainer: {
        color: 'rgb(7, 7, 7)',
        fontSize: 20,
        width: WindowsWidth ,
        fontFamily: MyriadFont
    },

    calendar: {
        borderTopWidth: 1,
        paddingTop: 5,
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 350,
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee',
        fontFamily: MyriadFont

    },
    dateText: {
        textAlign: 'right',
        fontFamily: MyriadFont

    },
    container: {
        flex: 1,
        backgroundColor: 'gray'
    }
});
