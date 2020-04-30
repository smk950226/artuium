import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import sharedRoutes, {sharedOptions} from './sharedRoutes';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
const ProfileRoute = createStackNavigator(
  {
    Profile: {
      screen: MyProfileScreen,
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
