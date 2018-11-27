import React from 'react';
import { Image,Text } from 'react-native';
import TodaysClass from './../../component/TodaysClass';
import Home from './../../component/Home';
import Color from './../theme/Color';
import {drawerImageparent} from './../../commonComponent/Common';
import {DrawerNavigator,DrawerItems} from 'react-navigation';
import {WindowsHeight,WindowsWidth} from './../../commonComponent/global';
import ChangePassword from "../../component/ChangePassword";
import StudyMaterial from "../../component/StudyMaterial";
import File from "../../component/File";
import TimeTable from "../../component/TimeTable";
import Community from "../../component/Community";
import Message from "../../component/Message";
import NotesList from "../../component/NotesList";

const DrawerParents = DrawerNavigator({
        Home:{
            screen:NotesList
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
        TimeTable: {
            screen: TimeTable
        },
        Community: {
            screen: Community
        },
        Message: {
            screen: Message
        }
    },
    {
        drawerWidth: WindowsWidth * 0.7,
        contentComponent:drawerImageparent,
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

export default DrawerParents;
