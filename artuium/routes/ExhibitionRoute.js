import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExhibitionScreen from '../screens/ExhibitionScreen';
import AllExhibitionScreen from '../screens/AllExhibitionScreen';
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
            navigationOptions: ({screenProps, navigation}) => ({
                header: (
                    <View style={[{height: statusBarHeight+50, paddingTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                        <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
                            <Image source={require('../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                        </TouchableWithoutFeedback>
                        <Text style={[styles.fontBold, styles.font18]}>전체 전시</Text>
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

const ExhibitionContainer = createAppContainer(ExhibitionRoute)

export default ExhibitionContainer;