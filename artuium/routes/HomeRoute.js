import React from 'react';
import { Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AllArtworkScreen from '../screens/AllArtworkScreen';
import FollowArtworkScreen from '../screens/FollowArtworkScreen';
import RecommendArtworkScreen from '../screens/RecommendArtworkScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';
import styles from '../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight()

const HomeRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        AllArtwork: {
            screen: AllArtworkScreen,
            navigationOptions: {
                header: null
            }
        },
        FollowArtwork: {
            screen: FollowArtworkScreen,
            navigationOptions: {
                header: null
            }
        },
        RecommendArtwork: {
            screen: RecommendArtworkScreen,
            navigationOptions: {
                header: null
            }
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const HomeContainer = createAppContainer(HomeRoute)

export default HomeContainer;