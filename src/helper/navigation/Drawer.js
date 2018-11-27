import React from 'react';
import { Image,Text } from 'react-native';
import TodaysClass from './../../component/TodaysClass';
import Home from './../../component/Home';
import Color from './../theme/Color';
import {drawerImage} from './../../commonComponent/Common';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import {WindowsHeight,WindowsWidth} from './../../commonComponent/global';
import ChangePassword from "../../component/ChangePassword";
import StudyMaterial from "../../component/StudyMaterial";
import File from "../../component/File";
import ManageClass from "../../component/ManageClass";
const Drawer = DrawerNavigator({
        Home:{
            screen:TodaysClass
        },
        ChangePassword:{
            screen:ChangePassword
        },
        TodaysClass:{
            screen:TodaysClass
        },
        StudyMaterial:{
            screen:StudyMaterial
        },
        File:{
            screen:File
        },
        ManageClass: {
            screen: ManageClass
        }
},
    {
    drawerWidth: WindowsWidth * 0.7,
    contentComponent:drawerImage,
    contentOptions: {
        activeTintColor: 'black',
        activeBackgroundColor : 'transparent',
        inactiveTintColor : 'black',
        itemsContainerStyle: {
            marginVertical: 0,
        },
        iconContainerStyle: {
            opacity: 1,
        },
        itemStyle :{
            height : 50,
        }
    }
});

export default Drawer;
