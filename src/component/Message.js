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
        showFab: false
    }

    constructor(props){
        super(props);
        this.getRole();
        this.getComplain()
    }

    getComplain = async ()=>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.complainParent,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            console.log(res);
            if(res.success === 1){
                this.setState({messageList: res.response})
            }
        }).catch((err)=>{

            Alert.alert(err.data.error);
        })
    };

    getRole = async () => {
        const userRole = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userRole);
        console.log("//////",userRole);
        if(userData.response.role === 'Parent'){
            this.setState({
                showFab: true
            })
        }else {
            this.setState({
                showFab: false
            })
        }
    };

    hideAddMessage(){
        this.setState({
            showAddMessage: false,
            title: '',
            description: '',
            showFab: true
        })
    }

    addMessage=async (title, description)=>{
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        const data={
            title:title,
            description:description
        };
        callApi(ApiConstant.baseUrl+ApiConstant.complain,'post',data,
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
            if(res.data.success === 1)
            {
                this.setState({messageList: [res.data.response,...this.state.messageList]})
            }
        }).catch((err)=>{
            Alert.alert(err.data.error);
        });
        this.setState({showAddMessage: false, showFab: true, title: '', description: ''})
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
};
