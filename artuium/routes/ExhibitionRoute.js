import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExhibitionScreen from '../screens/ExhibitionScreen';
import AllExhibitionScreen from '../screens/AllExhibitionScreen';
import AllExhibitionReviewScreen from '../screens/AllExhibitionReviewScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';
import styles from '../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight()

const ExhibitionRoute = createStackNavigator(
    {
        Exhibition: {
            screen: ExhibitionScreen,
            navigationOptions: {
                header: null
            }
        },
        AllExhibition: {
            screen: AllExhibitionScreen,
            navigationOptions: {
                header: null
            }
        },
        AllExhibitionReview: {
            screen: AllExhibitionReviewScreen,
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