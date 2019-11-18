import React from 'react';
import { Text, Image, View, TouchableWithoutFeedback } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import AllArtworkScreen from '../screens/AllArtworkScreen';
import FollowArtworkScreen from '../screens/FollowArtworkScreen';
import RecommendArtworkScreen from '../screens/RecommendArtworkScreen';
import sharedRoutes, { sharedOptions } from './sharedRoutes';
import styles from '../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";

const statusBarHeight = getStatusBarHeight()

const HomeRoute = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        AllArtwork: {
            screen: AllArtworkScreen,
            navigationOptions: ({screenProps, navigation}) => ({
                header: (
                    <View style={[{height: 50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
                            <Image source={require('../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                        </TouchableWithoutFeedback>
                        <Text style={[styles.fontBold, styles.font18]}>전체 감상</Text>
                        <Image source={require('../assets/images/icon_sort.png')} style={[{width: 20, height: 17}]} />
                    </View>
                )
            })
        },
        FollowArtwork: {
            screen: FollowArtworkScreen,
            navigationOptions: ({screenProps, navigation}) => ({
                header: (
                    <View style={[{height: 50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
                            <Image source={require('../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                        </TouchableWithoutFeedback>
                        <Text style={[styles.fontBold, styles.font18]}>친구들의 감상</Text>
                        <Image source={require('../assets/images/icon_sort.png')} style={[{width: 20, height: 17}]} />
                    </View>
                )
            })
        },
        RecommendArtwork: {
            screen: RecommendArtworkScreen,
            navigationOptions: ({screenProps, navigation}) => ({
                header: (
                    <View style={[{height: 50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
                            <Image source={require('../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                        </TouchableWithoutFeedback>
                        <Text style={[styles.fontBold, styles.font18]}>추천 감상</Text>
                        <Image source={require('../assets/images/icon_sort.png')} style={[{width: 20, height: 17}]} />
                    </View>
                )
            })
        },
        ...sharedRoutes
    },
    {
        ...sharedOptions
    }
);

const HomeContainer = createAppContainer(HomeRoute)

export default HomeContainer;