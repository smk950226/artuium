import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createSwitchNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen/CreateProfileScreen';

const LoggedOutNavigation = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    CreateProfile: {
      screen: CreateProfileScreen,
      navigationOptions: ({screenProps, navigation}) => ({
        header: null,
      }),
    },
  },
  {
    mode: 'modal',
  },
);

const LoggedOutContainer = createAppContainer(LoggedOutNavigation);

export default LoggedOutContainer;
