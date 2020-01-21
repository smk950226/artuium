import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, PanResponder, Text, ScrollView, Image, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

class HomeScreen extends Component {
    static propTypes = {
        banners: PropTypes.array,
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        noticeNew: PropTypes.bool.isRequired,
        notificationNew: PropTypes.bool.isRequired
    }

    render() {
        const { banners, newReviews, recommendedReviews, followingReviews, noticeNew, notificationNew } = this.props;
        return (
            <View style={[styles.container, styles.paddingIOS]}>
                <View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, zIndex: 998}
                ]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Alert', { notificationNew, noticeNew, handleNoticeNewChange: this.props.handleNoticeNewChange, handleNotificationNewChange: this.props.handleNotificationNewChange })}>
                        <View style={[styles.flex1]}>
                            {((noticeNew) || (notificationNew)) ? (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification_alert.png')} />
                            ) : (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Image style={{opacity: this.headerOpacity, height: 40, flex: 1}} resizeMode={'contain'} source={require('../../assets/images/icon_horizontal.png')} />

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
                        <View style={[styles.flex1, styles.alignItemsEnd]}>
                            <Image style={{width: 32, height: 32}} source={require('../../assets/images/search.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.container]}>
                    <ScrollView>
                        {banners && banners.length > 0 ? (
                            <ScrollView alwaysBounceVertical={false} alwaysBounceVertical={false} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: 280, zIndex: 10}]} >
                                {banners.map((ban, index) => (
                                    <TouchableWithoutFeedback key={index} onPress={() => this.props.navigation.navigate('Alert', { notificationNew, noticeNew, handleNoticeNewChange: this.props.handleNoticeNewChange, handleNotificationNewChange: this.props.handleNotificationNewChange, index: 1 })}>
                                        <View>
                                            <Image resizeMode={'cover'} source={{uri: ban.image ? ban.image : ''}} resizeMode={'cover'} style={[{height: '100%', width}]} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))}
                            </ScrollView>
                        ) : (
                            <ScrollView alwaysBounceVertical={false} scrollEventThrottle={16} alwaysBounceVertical={false} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: 280, zIndex: 10}]} >
                                <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                                <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                                <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            </ScrollView>
                        )}
                        <View style={[styles.center, styles.alignSelfCenter, styles.bgWhite, styles.homeMenuShadow,
                            {width: width*0.9, height: 80, borderRadius: 10, marginTop: -40, zIndex: 999 },
                        ]}>
                            <View style={[styles.row, styles.spaceAround, styles.width80]}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                    <View style={[styles.center]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/recommend.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>추천 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                    <View style={[styles.center]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/total.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>전체 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FollowArtwork')}>
                                    <View style={[styles.center]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/follow.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>팔로우 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={[styles.px15, styles.widthFull, {zIndex: 900, marginTop: -40}]}>
                            <Text style={[styles.fontMedium, styles.font15, {marginTop: 80}]}>아틔움이 엄선한 감상</Text>
                            <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween, styles.mb10]}>
                                <Text style={[styles.fontBold, styles.font20]}>주간 아틔움</Text>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7]}>더보기</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.row, (recommendedReviews && (recommendedReviews.length > 0)) ? styles.justifyContentBetween : styles.justifyContentCenter, styles.flexWrap, styles.widthFull]}>
                                {(recommendedReviews && (recommendedReviews.length > 0)) ? (
                                    recommendedReviews.map((review, index) => (
                                        <ArtuiumCard from={'Home'} key={index} review={review} size={'small'} navigation={this.props.navigation} />
                                    ))
                                ) : (
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                                )}
                            </View>
                            <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7]}>지금 아틔움에서는</Text>
                            <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween, styles.mb15]}>
                                <Text style={[styles.fontBold, styles.font20]}>새로운 감상</Text>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7]}>더보기</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <ScrollView
                                horizontal={(newReviews && (newReviews.length > 0)) ? true : false}
                                alwaysBounceVertical={false}
                                pagingEnabled={(newReviews && (newReviews.length > 0)) ? true : false}
                                scrollEnabled={(newReviews && (newReviews.length > 0)) ? true : false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {(newReviews && (newReviews.length > 0)) ? (
                                    newReviews.map((review, index) => (
                                        <ArtuiumCard from={'Home'} key={index} review={review} size={'large'} navigation={this.props.navigation} />
                                    ))
                                ) : (
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                                )}
                            </ScrollView>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.mt15]}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                    <View style={[styles.bgBlack, styles.borderRadius5, styles.py10, { width: 220 }]}>
                                        <Text style={[styles.textCenter, styles.fontMedium, styles.font16, styles.white]}>새로운 감상 확인하기 </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <Text style={[styles.fontMedium, styles.font15, {marginTop: 60}, styles.grayA7]}>친구들의 이야기를 들어보세요</Text>
                            <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween, styles.mb15]}>
                                <Text style={[styles.fontBold, styles.font20]}>친구들의 감상</Text>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FollowArtwork')}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7]}>더보기</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <ScrollView
                            horizontal={(followingReviews && (followingReviews.length > 0)) ? true : false}
                            pagingEnabled={(followingReviews && (followingReviews.length > 0)) ? true : false}
                            scrollEnabled={(followingReviews && (followingReviews.length > 0)) ? true : false}
                            alwaysBounceVertical={false}
                            showsHorizontalScrollIndicator={false}
                            >
                                {(followingReviews && (followingReviews.length > 0)) ? (
                                    followingReviews.map((review, index) => (
                                        <ArtuiumCard from={'Home'} key={index} review={review} size={'large'} navigation={this.props.navigation} />
                                    ))
                                ) : (
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                                )}
                            </ScrollView>
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.mt15, { marginBottom: 60 }]}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FollowArtwork')}>
                                    <View style={[styles.bgBlack, styles.borderRadius5, styles.py10, { width: 220 }]}>
                                        <Text style={[styles.textCenter, styles.fontMedium, styles.font16, styles.white]}>친구들의 감상 확인하기 </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default HomeScreen;
