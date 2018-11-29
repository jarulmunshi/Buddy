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
import {DocumentPicker,DocumentPickerUtil} from 'react-native-document-picker';
var data=[];
export default class File extends Component{

    constructor(props){
        super(props);
        //data = props.navigation.state.params.data;
        this.state = {
            active: 'Class',
            materialList: [],
            iName:'long-arrow-left',
            isBack:true,
            isIcon:true,
            uploadFile: false,
            deleteShow: false
        };

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.getRole()
    }

    componentDidMount=async ()=>{
        debugger
        const val = await AsyncStorage.getItem("files");
        let ans = JSON.parse(val);
        if (ans) {
            console.log("ans----",ans);
            this.setState({materialList: ans});
        }
        else {
            debugger;
            //await AsyncStorage.removeItem("files");
            //this.setState({materialList: []});
        }

    };

    showPicker = () => {
        console.log("Document Picker");
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.pdf()],
        },(error,res) => {
            // Android
            console.log(
                res.uri,
                res.type, // mime type
                res.fileName,
                res.fileSize
            );
        });

    };
    getRole = async () => {
        //const userRole = AsyncStorage.getItem("role")
        const val = await AsyncStorage.getItem("detail");
        let ans = JSON.parse(val);
        //const userRole = AsyncStorage.getItem("detail")
        //console.log("----",ans.response.role);
        debugger
        if(ans.response.role === 'Teacher'){
            this.setState({
                uploadFile: true,
                deleteShow: true
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

    renderEmptySection = () =>{
        return(
            <View style={{marginTop: 20}}>
                <Card>
                    <CardSection>
                        <View style={[styles.colorView, {backgroundColor: 'red'}]}/>

                        <View style={styles.infoContainer}>
                            <Text style={styles.standardContainer}>No Note Available</Text>
                        </View>
                    </CardSection>
                </Card>
            </View>
        )
    }

    renderClassInfo(){
        //const userRole = AsyncStorage.getItem("role")
        console.log("dfhg",this.state.classList);
        //console.log("dfhg",this.state.classList);
        const userRole = AsyncStorage.getItem("detail");
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
