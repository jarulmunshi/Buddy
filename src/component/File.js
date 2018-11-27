import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    SafeAreaView,
    StatusBar,
    AsyncStorage,
    BackHandler
} from 'react-native'
import Color from '../helper/theme/Color'
import {DisplayAreaView} from '../commonComponent/global';
import {
    FileInfo,
    Footer,
    Header
} from '../commonComponent/Common'
import StudyMaterial from "./StudyMaterial";
import RNFetchBlob from 'react-native-fetch-blob'

export default class File extends Component{


    constructor(props){
        super(props)
        this.state = {
            active: 'Class',
            classList: [
                {
                    "date": "23 NOV 2018",
                    "head":"SEMESTER 1 CHAPTER 1-3",
                    "color":"red",
                    "isactive":"1"
                },
                {
                    "date": "23 NOV 2018",
                    "head":"SEMESTER 1 CHAPTER 1-3",
                    "color":"green",
                    "isactive":"1"
                },
                {
                    "date": "23 NOV 2018",
                    "head":"SEMESTER 1 CHAPTER 1-3",
                    "color":"blue",
                    "isactive":"1"
                },
                {
                    "date": "23 NOV 2018",
                    "head":"SEMESTER 1 CHAPTER 1-3",
                    "color":"orange",
                    "isactive":"1"
                }
            ],
            iName:'long-arrow-left',
            isBack:true,
            isIcon:true,
            uploadFile: false
        };


        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.getRole()
    }

    getRole = async () => {
        const userRole = AsyncStorage.getItem("role")

        debugger
        if(userRole === 'teacher'){
            this.setState({
                uploadFile: true
            })
        }
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('StudyMaterial');
        return true;
    }

    goBack=()=>{
        this.props.navigation.navigate('StudyMaterial');
    };

    renderClassInfo(){
        const userRole = AsyncStorage.getItem("role")

        return this.state.classList.map(classInfo =>
            <FileInfo key={classInfo.standard} classInfo={classInfo} deleteshow={userRole} delete={(id) => this.deleteFile(id)}
                      downloadFile={(id) => this.downloadFile(id)}/>
        )
    }

    deleteFile(id){
        debugger
        let i = 2

        const filteredItems = this.state.classList.slice(0, i-1).concat(this.state.classList.slice(i, this.state.classList.length))

        this.setState({classList:filteredItems })
    }
    downloadFile(id){
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache : true,
            })
            .fetch('GET', 'http://www.example.com/file/example.zip', {
                //some headers ..
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path())
            })
    }

    render(){
        return(
            <SafeAreaView style={styles.parentContainer}>
                <StatusBar
                    backgroundColor={Color.headerColor}
                />
                <Header
                    headerText={"Files"}
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    isIcon={this.state.isIcon}
                    onBackButtonPress={this.goBack}
                    uploadFile={this.state.uploadFile}
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
