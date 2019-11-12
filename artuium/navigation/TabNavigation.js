import React from 'react';
import { View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import styles from '../styles';
import HomeContainer from '../routes/HomeRoute';
import ExhibitionContainer from '../routes/ExhibitionRoute';
import ArtworkContainer from '../routes/ArtworkRoute';
import ProfileContainer from '../routes/ProfileRoute';
import TabBar from '../components/TabBar';

const TabNavigation = createBottomTabNavigator({
    홈: {
        screen: HomeContainer,
        navigationOptions: {
            header: null,
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_home.png') : require('../assets/images/icon_home.png')} style={styles.iconTab} />
            ),
        }
    },
    전시: {
        screen: ExhibitionContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_exhibition.png') : require('../assets/images/icon_exhibition.png')} style={styles.iconTab} />
            )
        }
    },
    아트워크: {
        screen: ArtworkContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_artwork.png') : require('../assets/images/icon_artwork.png')} style={styles.iconTab} />
            )
        }
    },
    MY: {
        screen: ProfileContainer,
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Image source={focused ? require('../assets/images/icon_profile.png') : require('../assets/images/icon_profile.png')} style={styles.iconTab} />
            )
        }
    }
},
{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#000000',
        inactiveTintColor: 'rgb(209,209,209)',
        labelPosition: 'below-icon',
        style: {
            backgroundColor: '#ffffff',
            height: 60,
            borderTopColor: "rgb(209,209,209)",
        },
        labelStyle: {
            fontSize: 10,
            fontFamily: 'NotoSansKR-Medium',
            includeFontPadding: false,
        }
    },
    tabBarComponent: props => (
        <TabBar {...props} />
    )
});

const TabContainer = createAppContainer(TabNavigation);

export default TabContainer;