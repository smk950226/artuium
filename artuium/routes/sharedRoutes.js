import React, { Fragment } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, Platform } from 'react-native';
import LikeListScreen from '../screens/LikeListScreen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../styles';

const iosStatusBarHeight = getStatusBarHeight()


const sharedRoutes = {
    LikeList: {
        screen: LikeListScreen,
        navigationOptions: ({screenProps, navigation}) => ({
            header: (
                <View style={[{height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                    <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
                        <Image source={require('../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font20]}>빠라바라밤님이 좋아한</Text>
                    <View style={[{width: 9, height: 17}]} />
                </View>
            )
        })
    }
};

const sharedOptions = {
    
};

export { sharedOptions };

export default sharedRoutes;