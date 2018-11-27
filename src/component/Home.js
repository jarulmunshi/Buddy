import React,{Component} from 'react';
import {View,Text,SafeAreaView, StatusBar} from 'react-native';
import {Header,Footer} from "../commonComponent/Common";

import Color from '../helper/theme/Color'

class Home extends Component{
    static navigationOptions = {
        drawerLabel: `Today's Class`
    };
    constructor(props){
        super(props);
        this.state={
            //iName:'long-arrow-left',
            iName:"bars",
            isBack:true
        };
    }
    goBack=()=>{
        this.props.navigation.openDrawer();
    }
    render(){
        return(
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                <StatusBar
                    backgroundColor={Color.headerColor}
                />
                <Header
                    headerText="Home"
                    iName={this.state.iName}
                    isBack={this.state.isBack}
                    onBackButtonPress={this.goBack}
                />
                <View style={{backgroundColor:"white",alignItems:'center'}}>
                    <Text style={{color:Color.headerColor,fontSize:25}}>Welcome to Buddy App</Text>
                </View>
                <Footer/>
            </SafeAreaView>
        )
    }
}

export default Home;
