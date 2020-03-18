import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AllArtworkScreen from '../screens/AllArtworkScreen';
import FollowArtworkScreen from '../screens/FollowArtworkScreen';
import RecommendArtworkScreen from '../screens/RecommendArtworkScreen';
import sharedRoutes, {sharedOptions} from './sharedRoutes';
import styles from '../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const statusBarHeight = getStatusBarHeight();

const HomeRoute = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
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

const HomeContainer = createAppContainer(HomeRoute);

export default HomeContainer;
