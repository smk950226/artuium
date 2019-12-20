import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from '../screens/ProfileScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';
import LikeListScreen from '../screens/LikeListScreen';

const ProfileRoute = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                header: null
            }
        },
        LikeList: {
            screen: LikeListScreen,
            navigationOptions: ({screenProps, navigation}) => ({
                header: null
            })
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ProfileContainer = createAppContainer(ProfileRoute)

export default ProfileContainer;