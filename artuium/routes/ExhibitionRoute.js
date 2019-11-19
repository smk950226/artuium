import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExhibitionScreen from '../screens/ExhibitionScreen/presenter';
import sharedRoutes, { sharedOptions } from './sharedRoutes';

const ExhibitionRoute = createStackNavigator(
    {
        Exhibition: {
            screen: ExhibitionScreen,
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

const ExhibitionContainer = createAppContainer(ExhibitionRoute)

export default ExhibitionContainer;