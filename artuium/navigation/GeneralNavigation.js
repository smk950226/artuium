import React from 'react';
import { Easing, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabContainer from './TabNavigation';
import ExhibitionDetailScreen from '../screens/ExhibitionDetailScreen';
import ExhibitionContentScreen from '../screens/ExhibitionContentScreen';

const GeneralNavigation = createStackNavigator({
    Root: {
        screen: TabContainer,
        navigationOptions: {
            header: null
        }
    },
    ExhibitionDetail: {
        screen: ExhibitionDetailScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    ExhibitionContent: {
        screen: ExhibitionContentScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
},
{
    mode: 'modal',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
})

const GeneralContainer = createAppContainer(GeneralNavigation)

export default GeneralContainer;        