import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ArtworkScreen from '../screens/ArtworkScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ArtworkRoute = createStackNavigator(
    {
        Artwork: {
            screen: ArtworkScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ArtworkContainer = createAppContainer(ArtworkRoute)

export default ArtworkContainer;