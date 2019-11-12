import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExhibitionScreen from '../screens/ExhibitionScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ExhibitionRoute = createStackNavigator(
    {
        Exhibition: {
            screen: ExhibitionScreen
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const ExhibitionContainer = createAppContainer(ExhibitionRoute)

export default ExhibitionContainer;