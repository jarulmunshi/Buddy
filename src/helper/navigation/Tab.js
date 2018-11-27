import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Account from './../../component/Account';
import Welcome from './../../component/Welcome';
import Students from './../../component/StudentDisplay';
import Files from './../../component/Files';
import Users from './../../component/Users';
import Notice from './../../component/Notice';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from './../theme/Color';
export default createBottomTabNavigator(
    {

        Students:{
            screen:Students,
            navigationOptions: () => ({
                tabBarIcon: () => (
                    <Icon
                        name="info"
                        size={24}
                    />
                )
            })
        },
        Files:{
            screen:Files,
            navigationOptions: () => ({
                tabBarIcon: () => (
                    <Icon
                        name="upload"
                        size={24}
                    />
                )
            })
        },
        Users:{
            screen:Users,
            navigationOptions: () => ({
                tabBarIcon: () => (
                    <Icon
                        name="users"
                        size={24}
                    />
                )
            })
        },
        Account:{
            screen:Account,
            navigationOptions: () => ({
                tabBarIcon: () => (
                    <Icon
                        name="user-circle"
                        size={24}
                    />
                )
            })
        }

    },
    {
        tabBarOptions: {
            activeTintColor:Color.darkColor,
            inactiveTintColor: 'gray',
            showIcon:true
        },
        animationEnabled: true,
        swipeEnabled: false,
    }

);