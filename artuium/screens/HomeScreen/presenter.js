import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, ScrollView, Image, Platform, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class HomeScreen extends React.Component {
    render() {
        const imageHeight = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [height*8/9, height/3],
            extrapolate: 'clamp'
        });
        const menuWidth = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [width, width*0.9],
            extrapolate: 'clamp'
        });
        const menuHeight = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [height/9, 80],
            extrapolate: 'clamp'
        });
        const menuRadius = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 10],
            extrapolate: 'clamp'
        });
        const statusBarMargin = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, getStatusBarHeight()+50],
            extrapolate: 'clamp'
        });
        const menuMarginL = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, width*0.05],
            extrapolate: 'clamp'
        });
        const headerOpacity = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const menuPosition = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 40],
            extrapolate: 'clamp'
        });
        return (
            <View style={[styles.container]}>
                <Animated.View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px20,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 900}
                ]}>
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                    <Animated.Text style={{opacity: headerOpacity}}>아틔움 로고자리</Animated.Text>
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/search.png')} />
                </Animated.View>
                <Animated.View style={{width: width, height: statusBarMargin, backgroundColor: 'white', opacity: headerOpacity}} />
                <Animated.ScrollView
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.props.screenProps.scrollY
                            }
                        }}]
                    )}
                    scrollEventThrottle={16}
                    stickyHeaderIndices={[0]}
                >
                    <Animated.View style={[styles.widthFull]}>
                        <Animated.Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} style={[{width: width, height: imageHeight}]} />
                        <Animated.View style={[styles.center, styles.bgWhite, styles.homeMenuShadow,
                            {width: menuWidth, height: menuHeight, borderRadius: menuRadius, bottom: menuPosition, marginLeft: menuMarginL}
                        ]}>
                            <View style={[styles.row, styles.spaceAround, styles.width80, styles.height100]}>
                                <View style={[styles.center]}>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/images/recommend.png')} />
                                    <Text style={[styles.font12, styles.mt5]}>추천 감상</Text>
                                </View>
                                <View style={[styles.center]}>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/images/total.png')} />
                                    <Text style={[styles.font12, styles.mt5]}>전체 감상</Text>
                                </View>
                                <View style={[styles.center]}>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/images/follow.png')} />
                                    <Text style={[styles.font12, styles.mt5]}>팔로우 감상</Text>
                                </View>
                            </View>
                        </Animated.View>
                    </Animated.View>
                    <View style={[styles.mt30, styles.px20]}>
                        <Text style={[styles.fontMedium, styles.font15]}>아틔움이 엄선한 감상</Text>
                        <Text style={[styles.fontBold, styles.font20, styles.mb10]}>주간 아틔움</Text>
                        <View style={{width: 300, height: 200, backgroundColor: 'blue', marginBottom: 20}} />
                        <View style={{width: 300, height: 200, backgroundColor: 'blue', marginBottom: 20}} />
                        <View style={{width: 300, height: 200, backgroundColor: 'blue', marginBottom: 20}} />
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }
}

HomeScreen.propTypes = {

}

export default HomeScreen;
