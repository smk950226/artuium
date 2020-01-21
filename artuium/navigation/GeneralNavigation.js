import React from 'react';
import { Easing, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import TabContainer from './TabNavigation';
import ExhibitionDetailScreen from '../screens/ExhibitionDetailScreen';
import ExhibitionContentScreen from '../screens/ExhibitionContentScreen';
import ExhibitionArtworkScreen from '../screens/ExhibitionArtworkScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import OthersProfileScreen from '../screens/OthersProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import ArtworkDetailScreen from '../screens/ArtworkDetailScreen';
import ArtworkContentScreen from '../screens/ArtworkContentScreen';
import AlertScreen from '../screens/AlertScreen';

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
    ExhibitionArtwork: {
        screen: ExhibitionArtworkScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    EditProfile: {
        screen: EditProfileScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            header: null
        }
    },
    ArtworkDetail: {
        screen: ArtworkDetailScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    ArtworkContent: {
        screen: ArtworkContentScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    OthersProfile: {
        screen: OthersProfileScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    },
    Alert: {
        screen: AlertScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: null
        })
    }
},
{
    mode: 'slide',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
})

const GeneralContainer = createAppContainer(GeneralNavigation)

export default GeneralContainer;        