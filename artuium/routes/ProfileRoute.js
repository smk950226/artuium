import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import sharedRoutes, {sharedOptions} from './sharedRoutes';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
const ProfileRoute = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        header: null,
      },
    },
    EditProfile: {
      screen: EditProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    ...sharedRoutes,
  },
  {
    ...sharedOptions,
  },
);

const ProfileContainer = createAppContainer(ProfileRoute);

export default ProfileContainer;
