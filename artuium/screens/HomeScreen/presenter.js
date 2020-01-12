import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, PanResponder, Text, ScrollView, Image, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import NoticeScreen from '../../screens/NoticeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

class HomeScreen extends Component {
    static propTypes = {
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        openNoticeModal: PropTypes.func.isRequired,
        closeNoticeModal: PropTypes.func.isRequired,
        showNoticeModal :PropTypes.bool.isRequired,
        noticeNew: PropTypes.bool.isRequired,
        notificationNew: PropTypes.bool.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
        }
    }

    _renderNoticeRouter = () => {
        return (
            <NoticeScreen handleNoticeNewChange={this.props.handleNoticeNewChange} />
        )
    }

    _renderNotificationRouter = () => {
        return (
            <NotificationScreen handleNotificationNewChange={this.props.handleNotificationNewChange} />
        )
    }

    render() {
        const { newReviews, recommendedReviews, followingReviews, showNoticeModal, noticeNew, notificationNew } = this.props;
        return (
            <View style={[styles.container, styles.paddingIOS]}>
                <View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, zIndex: 998}
                ]}>
                    <TouchableWithoutFeedback onPress={this.props.openNoticeModal}>
                        <View>
                            <Image style={{width: 38.4, height: 38.4}} source={require('../../assets/images/notification.png')} />
                            {((noticeNew) || (notificationNew)) && (
                                <View style={[styles.bgRed, styles.circle6, {position: 'absolute', top: 0, right: 0}]} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Image style={{opacity: this.headerOpacity, height: 40}} resizeMode={'contain'} source={require('../../assets/images/icon_horizontal.png')} />

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
                        <View>
                            <Image style={{width: 38.4, height: 38.4}} source={require('../../assets/images/search.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.container]}>
                    <ScrollView>
                        <ScrollView scrollEventThrottle={16} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: 280, zIndex: 10}]} >
                            <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                        </ScrollView>
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
                                        <ArtuiumCard key={index} review={review} size={'small'} navigation={this.props.navigation} />
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
                                pagingEnabled={(newReviews && (newReviews.length > 0)) ? true : false}
                                scrollEnabled={(newReviews && (newReviews.length > 0)) ? true : false}
                                showsHorizontalScrollIndicator={false}
                            >
                                {(newReviews && (newReviews.length > 0)) ? (
                                    newReviews.map((review, index) => (
                                        <ArtuiumCard key={index} review={review} size={'large'} navigation={this.props.navigation} />
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
                            showsHorizontalScrollIndicator={false}
                            >
                                {(followingReviews && (followingReviews.length > 0)) ? (
                                    followingReviews.map((review, index) => (
                                        <ArtuiumCard key={index} review={review} size={'large'} navigation={this.props.navigation} />
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
                <Modal
                visible={showNoticeModal}
                onRequestClose={this.props.closeNoticeModal}
                animationType={'fade'}
                transparent={true}
                >
                    <View style={[styles.container, styles.bgWhite]}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentEnd, styles.px15, styles.borderBtmGrayE6, { marginTop: iosStatusBarHeight, height: 50 }]}>
                            <TouchableWithoutFeedback onPress={this.props.closeNoticeModal}>
                                <View>
                                    <Text style={[styles.fontMedium, styles.font16, styles.gray93]}>
                                        닫기
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TabView
                            navigationState={this.state}
                            onIndexChange={index => this.setState({ index })}
                            swipeEnabled={false}
                            renderScene={SceneMap({
                                first: this._renderNotificationRouter,
                                second: this._renderNoticeRouter
                            })}
                            renderTabBar={props =>
                                <TabBar
                                    {...props}
                                    activeColor = {'#1162d0'}
                                    inactiveColor = {'#e6e6e6'}
                                    labelStyle = {[styles.font15, styles.fontMedium]}
                                    renderLabel={({ route, focused }) => (
                                        <View>
                                             <Text style={[styles.fontMedium, styles.font15, focused ? styles.blue : styles.grayE6]}>
                                                 {route.title}
                                             </Text>
                                             {(route.title === '공지사항') && noticeNew && (
                                                 <View style={[styles.bgRed, styles.circle6, focused ? null : {opacity: 0.4}, {position: 'absolute', top: 0, right: -5}]} />
                                             )}
                                             {(route.title === '알림') && notificationNew && (
                                                 <View style={[styles.bgRed, styles.circle6, focused ? null : {opacity: 0.4}, {position: 'absolute', top: 0, right: -5}]} />
                                             )}
                                        </View>
                                      )}
                                    bounces={false}
                                    indicatorStyle={{ backgroundColor: '#1162d0', height: 1 }}
                                    style={[styles.bgGrayF8]}
                                />
                            }
                        />
                    </View>
                </Modal>
            </View>
        );
    }
}

export default HomeScreen;
