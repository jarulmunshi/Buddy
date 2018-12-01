import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    SafeAreaView, AsyncStorage
} from 'react-native'
import FAB from 'react-native-fab'

import {WindowsHeight, WindowsWidth,DisplayAreaView} from '../commonComponent/global';
import {Header, Footer, CustomMenu, CalendarView, ClassNotesInfo, AddNote, AttendanceList} from '../commonComponent/Common'
import Color from '../helper/theme/Color'
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

var date = new Date();

let monthShortName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec']

export default class ManageClass extends Component{
    constructor(props){
        super(props);
        this.getData();
    }

    getData = async () =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.classNotes,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            if(res.success === 1){
                this.setState({notesList: res.response})
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })
    };

    state = {
        active: 'Attendance',
        isBack:true,
        iName:"bars",
        notesList: [],
        showCalendar: false,
        showAddNote: false,
        attendanceList: [],
        title: '',
        description: '',
        todayDate: date.getDate()+" "+monthShortName[date.getMonth()]+" "+date.getFullYear(),
        present: 0,
        absent: 0,
    };

    componentWillMount = async () =>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.todayAttendance,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
                console.log(res);
            if(res.success === 1){
                this.setState({attendanceList: res.response})
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })

    };

    componentDidMount(){
        this.setState({
            present: this.state.attendanceList.filter((obj) => obj.present === true).length,
            absent: this.state.attendanceList.filter((obj) => obj.present === false).length,
        })
    };

    changeActiveState(value){
        this.setState({
            active: value
        })
    }

    hideCalendar(){
        this.setState({
            showCalendar: false
        })
    }

    hideAddNote(){
        this.setState({
            showAddNote: false,
            title: '',
            description: ''
        })
    }

    toggleSwitch(id, value){
        let newState = Object.assign({}, this.state);
        newState.attendanceList[id].present = !value;
        this.setState(newState);

        this.setState({
            present: this.state.attendanceList.filter((obj) => obj.present === true).length,
            absent: this.state.attendanceList.filter((obj) => obj.present === false).length,
        })
    }

    renderClassNotes(){
        return this.state.notesList.map(notes =>
            <ClassNotesInfo key={notes.id} notesInfo={notes}/>
        )
    }

    renderAttendanceList(){
        return this.state.attendanceList.map(attendance =>
            <AttendanceList key={attendance.id}
                            notesInfo={attendance}
                            toggleAttendance={(id, value) => this.toggleSwitch(id, value)}
            />
        )
    }

    addNote = async (title, description)=>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        const data={
            title:title,
            description:description
        };
        callApi(ApiConstant.baseUrl+ApiConstant.classNotes,'post',data,
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            if(res.data.success === 1)
            {
                this.setState({notesList: [ ...this.state.notesList,res.data.response]})
            }
        }).catch((err)=>{
            //console.log(err);
            Alert.alert(err.data.error);
        });
        this.setState({showAddNote: false, title: '', description: ''})
    };

    changeTitle(value){
        this.setState({
            title: value
        })
    }

    changeDescription(value){
        this.setState({
            description: value
        })
    }

    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    changeDate=async (day, month, year)=>{
        this.setState({
            todayDate: day+" "+monthShortName[month-1]+" "+year,
            dateToday: year+"-"+month+"-"+day,
            showCalendar: false,
        });
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.dateWiseAttendance + `${this.state.dateToday}`,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            console.log(res);
             if(res.success === 1){
                 this.setState({attendanceList: res.response})
             }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        })

    };

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <Header
                    headerText={"Manage Class"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />

                <View style={{marginTop: 5, height: DisplayAreaView}}>

                    <CustomMenu
                        menus={["Attendance", "Class Notes"]}
                        active={this.state.active}
                        activeChange={(value) => this.changeActiveState(value)}
                    />

                    {
                        (this.state.active === 'Attendance') &&
                            <View style={{flex: 1}}>
                                <View style={styles.attendanceContainer}>
                                    <TouchableOpacity onPress={() => this.setState({showCalendar: true})}>
                                        <View style={styles.attendanceViewStyle}>
                                            <Image
                                                source={require('../images/calendar.png')}
                                                style={styles.imageStyle}
                                            />
                                            <Text style={[styles.textStyle, {marginRight: 5}]}>{this.state.todayDate}</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <View style={styles.attendanceViewStyle}>
                                        <Text style={[styles.textStyle, {color: 'rgb(109,109,109)', fontSize: 20}]}>{'PRESENT'}</Text>
                                        <View style={[styles.CircleShapeView, {backgroundColor: '#79AF1B'}]}>
                                            <Text style={{color:'#FFF', fontSize: 14}}>{this.state.present}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.attendanceViewStyle}>
                                        <Text style={[styles.textStyle, {color: 'rgb(109,109,109)', fontSize: 20}]}>{'ABSENT'}</Text>
                                        <View style={[styles.CircleShapeView, {backgroundColor: '#AC0119'}]}>
                                            <Text style={{color:'#FFF', fontSize: 14}}>{this.state.absent}</Text>
                                        </View>
                                    </View>
                                </View>
                                <ScrollView style={{marginTop: 10}}>
                                    {this.renderAttendanceList()}
                                </ScrollView>
                            </View>
                    }

                    {
                        (this.state.active === 'Class Notes') &&
                            <View style={{flex: 1}}>
                                <ScrollView>
                                    {this.renderClassNotes()}
                                </ScrollView>
                                <FAB buttonColor="rgb(2,110,115)" onClickAction={() => this.setState({showAddNote: true})}/>
                            </View>

                    }

                </View>

                {
                    (this.state.showCalendar) &&
                    <CalendarView
                        toggle={() => this.hideCalendar()}
                        changeDate={(day,month,year) => this.changeDate(day, month, year)}
                    />
                }

                {
                    (this.state.showAddNote) &&
                    <AddNote
                        toggle={() => this.hideAddNote()}
                        newNote={(title,description) => this.addNote(title, description)}
                        title={(value) => this.changeTitle(value)}
                        titleValue={this.state.title}
                        description={(value) => this.changeDescription(value)}
                        descriptionValue={this.state.description}
                        heading={'Add Notes'}
                    />
                }

                <Footer/>
            </SafeAreaView>
        )
    }
}

const styles = {
    parentContainer: {
        flex: 1,
    },
    attendanceContainer: {
        marginTop: 5,
        height: 50,
        backgroundColor: 'rgb(241,241,241)',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        width: WindowsWidth
    },
    attendanceViewStyle: {
        flexDirection: 'row',
        width: WindowsWidth/3,
        justifyContent: 'center'
    },
    imageStyle: {
        height: 20,
        width: 20
    },
    textStyle: {
        fontSize: 17,
        marginLeft: 5,
        color: Color.extraDark,
    },
    CircleShapeView: {
        width: 20,
        height: 20,
        borderRadius: 20/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
}
