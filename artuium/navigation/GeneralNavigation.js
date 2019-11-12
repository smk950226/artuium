import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabContainer from './TabNavigation';

const GeneralNavigation = createStackNavigator({
    Root: {
        screen: TabContainer,
        navigationOptions: {
            header: null
        }
    }
})

const GeneralContainer = createAppContainer(GeneralNavigation)

export default GeneralContainer;        