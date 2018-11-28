import React, {Component} from 'react'
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    AsyncStorage, Alert
} from 'react-native'
import FAB from 'react-native-fab'

import {DisplayAreaView} from '../commonComponent/global';
import {Header, Footer, ClassNotesInfo, AddNote,} from '../commonComponent/Common'
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";

var date = new Date();

let monthShortName = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov', 'Dec']

export default class Message extends Component{
    state = {
        isBack:true,
        iName:"bars",
        title: '',
        description: '',
        messageList: [],
        showAddMessage: false,
        showFab: true
    }

    constructor(props){
        super(props);
        this.getRole();
        this.getComplain()
    }

    getComplain = async ()=>{
        const val = await AsyncStorage.getItem("detail");
        let ans = JSON.parse(val);
        callApi(ApiConstant.baseUrl+ApiConstant.complainParent,'get',{},
            {"Content-Type":"application/json","Authorization":ans.token}).then( async (res)=> {
            console.log(res);
            if(res.success === 1){
                this.setState({messageList: res.response})
            }
            //await AsyncStorage.setItem("detail",JSON.stringify(res.data));
        }).catch((err)=>{
            //console.log(err);
            Alert.alert(err.data.error);
        })
    }

    getRole = async () => {
        const userRole = await AsyncStorage.getItem("role")

        if(userRole === 'parent'){
            this.setState({
                showFab: true
            })
        }
    }

    hideAddMessage(){
        this.setState({
            showAddMessage: false,
            title: '',
            description: '',
            showFab: true
        })
    }

    addMessage=async (title, description)=>{
        const val = await AsyncStorage.getItem("detail");
        let ans = JSON.parse(val);
        const data={
            title:title,
            description:description
        };
        debugger;
        callApi(ApiConstant.baseUrl+ApiConstant.complain,'post',data,
            {"Content-Type":"application/json","Authorization":ans.token}).then( async (res)=> {
            console.log('=====',res.data);
            if(res.data.success === 1)
            {
                this.setState({messageList: [ ...this.state.messageList,res.data.response]})
            }
            //await AsyncStorage.setItem("detail",JSON.stringify(res.data));
        }).catch((err)=>{
            //console.log(err);
            Alert.alert(err.data.error);
        });
        this.setState({showAddMessage: false, showFab: true, title: '', description: ''})
    }

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

    renderMessages(){
        return this.state.messageList.map(notes =>
            <ClassNotesInfo key={notes.id} notesInfo={notes}/>
        )
    }

    goBack=()=>{
        this.props.navigation.openDrawer();
    };

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <Header
                    headerText={"Contact to teacher"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />

                <View style={{marginTop: 5, height: DisplayAreaView}}>
                    <View style={{flex: 1}}>
                        <ScrollView>
                            {this.renderMessages()}
                        </ScrollView>
                        {
                            (this.state.showFab) &&
                            <FAB buttonColor="rgb(2,110,115)" onClickAction={() => this.setState({showAddMessage: true, showFab: false})}/>
                        }
                    </View>
                </View>

                {
                    (this.state.showAddMessage) &&
                    <AddNote
                        toggle={() => this.hideAddMessage()}
                        newNote={(title,description) => this.addMessage(title, description)}
                        title={(value) => this.changeTitle(value)}
                        titleValue={this.state.title}
                        description={(value) => this.changeDescription(value)}
                        descriptionValue={this.state.description}
                        heading={'Post Message'}
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
}
