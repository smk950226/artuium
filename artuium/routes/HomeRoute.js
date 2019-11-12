import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const HomeRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
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