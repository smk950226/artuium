import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProfileScreen from '../screens/ProfileScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ProfileRoute = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ProfileContainer = createAppContainer(ProfileRoute)

export default ProfileContainer;