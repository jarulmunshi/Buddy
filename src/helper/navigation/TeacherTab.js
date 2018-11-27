import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import Account from './../../component/Account';
import Welcome from './../../component/Welcome';
import Files from './../../component/Files';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from './../theme/Color';
export default createBottomTabNavigator(
    {
        Home:{
            screen:Welcome,
            navigationOptions: () => ({
                tabBarIcon: () => (
                    <Icon
                        name="home"
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
