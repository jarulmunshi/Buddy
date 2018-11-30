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
import {Card,CardSection} from "../commonComponent/Common";
import {DisplayAreaView, MyriadFont, WindowsWidth} from '../commonComponent/global';
import {
    FileInfo,
    Footer,
    Header
} from '../commonComponent/Common'
import StudyMaterial from "./StudyMaterial";
import RNFetchBlob from 'react-native-fetch-blob'
import {DocumentPicker,DocumentPickerUtil} from 'react-native-document-picker';
import {callApi} from "../services/ApiCall";
import ApiConstant from "../services/ApiConstant";
var data=[];
let s_id,d_id;
export default class File extends Component{
    constructor(props){
        super(props);
        data = props.navigation.state.params;
        s_id = data.s_id;
        d_id = data.d_id;
        this.state = {
            active: 'Class',
            materialList: [],
            iName:'long-arrow-left',
            isBack:true,
            isIcon:true,
            uploadFile: false,
            deleteShow: false,
            flag:1
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.getRole()
    }

    showPicker = () => {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.pdf()],
        },(error,res) => {
            if(error){
                Alert.alert(error)
            }else {
                // Android
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.fileName,
                    res.fileSize
                );
            }
        });

    };

    getRole = async () => {
        //const userRole = AsyncStorage.getItem("role")
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        if(userData.response.role === 'Teacher'){
            this.setState({
                uploadFile: true,
                deleteShow: true
            })
        }
    };

    componentWillMount=async () =>{
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        const userDetail = await AsyncStorage.getItem("detail");
        let userData = JSON.parse(userDetail);
        callApi(ApiConstant.baseUrl+ApiConstant.studyMaterialSubject + `${s_id}` + `/${d_id}`,'get',{},
            {"Content-Type":"application/json","Authorization":userData.token}).then( async (res)=> {
                console.log(res);
            if(res.success === 1){
                this.setState({materialList: res.response});
            }else {
                this.setState({flag:0})
            }
        }).catch((err)=>{
            console.log(err);
            //Alert.alert(err.data.error);
        });

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

    renderEmptySection = () =>{
        return(
            <View style={{marginTop: 20}}>
                <Card>
                    <CardSection>
                        <View style={[styles.colorView, {backgroundColor: 'red'}]}/>

                        <View style={styles.infoContainer}>
                            <Text style={styles.standardContainer}>No File Uploaded</Text>
                        </View>
                    </CardSection>
                </Card>
            </View>
        )
    };

    renderClassInfo(){
        return this.state.materialList.map(classInfo =>
            <FileInfo key={classInfo.id} classInfo={classInfo} deleteshow={this.state.deleteShow} delete={(id) => this.deleteFile(id)}
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
                    showPicker={this.showPicker}
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
        padding: 10,
        width: WindowsWidth
    },
    standadContainer: {
        color: 'rgb(7, 7, 7)',
        fontSize: 50,
        width: WindowsWidth ,
        fontFamily: MyriadFont,
        fontWeight: 600
    }
};
