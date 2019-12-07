import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';

const LoggedOutNavigation = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null
        }
    }
},
{
    mode: 'modal'
})

const LoggedOutContainer = createAppContainer(LoggedOutNavigation)

export default LoggedOutContainer;        