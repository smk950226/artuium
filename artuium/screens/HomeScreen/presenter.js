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
        getInitial: PropTypes.func.isRequired,
        openNoticeModal: PropTypes.func.isRequired,
        closeNoticeModal: PropTypes.func.isRequired,
        showNoticeModal :PropTypes.bool.isRequired,
        noticeNew: PropTypes.bool.isRequired,
        notificationNew: PropTypes.bool.isRequired
    }

    constructor(props){
        super(props)
        const { profile : { initial } } = props;
        this.state = {
            isMovedUp: false,
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
            changedScrollView: false,
            isTop: true,
            startScroll: false,
            initial
        }
        this.animatedValue = new Animated.ValueXY();
        this.value = {x: 0, y: 0};
        this.animatedValue.addListener((value) => this.value = value);

        this.topHeight = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [height - 500, height - 80],
            extrapolate: 'clamp'
        });
        this.menuRadius = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [10, 0],
            extrapolate: 'clamp'
        });
        this.menuWidth = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [width*0.9, width],
            extrapolate: 'clamp'
        });
        this.menuPosition = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [440, 0],
            extrapolate: 'clamp'
        });
        this.headerHeight = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [getStatusBarHeight()+50, 0],
            extrapolate: 'clamp'
        });
        this.headerOpacity = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        });
        this.tabHeight = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [80, 0],
            extrapolate: 'clamp'
        });
        this.initialContentPosition = this.animatedValue.y.interpolate({
            inputRange: [(height-500)*(-1), 0],
            outputRange: [height - 500, height],
            extrapolate: 'clamp'
        });


        this.initialResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: ( event, gestureState ) => {
                
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: async( event, gestureState ) => {
                if(gestureState.dy <= 0){
                    if(gestureState.dy < -100){
                        this.setState({
                            initial: false
                        })
                        const result = await this.props.getInitial(false)
                        this.props.getProfile()
                    }
                }
            },
        })
        this.overflow = false

        this.bannerResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: ( event, gestureState ) => {
                // if(gestureState.dy < 0){
                //     if(!this.state.isMovedUp){
                //         if(gestureState.dy >= -(height-500)){
                //             this.animatedValue.setValue({ x: this.animatedValue.x, y: gestureState.dy });
                //         }
                //     }
                // }
                this.animatedValue.setValue({ x: this.animatedValue.x, y: gestureState.dy });
                if(this.value.y < -10){
                    if(!this.state.startScroll){
                        this.setState({
                            startScroll: true
                        })
                    }
                    if(this.value.y < -(height - 500)){
                        if(!this.state.changedScrollView){
                            this.setState({
                                changedScrollView: true,
                            },() => {
                                Animated.timing( this.props.screenProps.scrollY, {
                                    toValue: 100,
                                    duration: 200,
                                } ).start(() => {

                                });
                            })
                        }
                    }
                    else{
                        if(this.state.changedScrollView){
                            Animated.timing( this.props.screenProps.scrollY, {
                                toValue: 0,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    changedScrollView: false,
                                })
                            });
                        }
                    }
                }
                else{
                    if(this.state.startScroll){
                        this.setState({
                            startScroll: false
                        })
                    }
                }
            },
            onPanResponderGrant: (e, gestureState) => {
                this.animatedValue.setOffset({x: this.value.x, y: this.value.y});
                this.animatedValue.setValue({x: 0, y: 0});
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy < 0){
                    // if(gestureState.dy <= -(height-500)){
                    //     if(!this.state.isMovedUp){
                    //         this.setState({
                    //             isMovedUp: true,
                    //             changedScrollView: true
                    //         })
                    //     }
                    // }
                    // else{
                    //     if(!this.state.isMovedUp){
                    //         Animated.timing( this.animatedValue, {
                    //             toValue: 0,
                    //             duration: 200,
                    //         } ).start(() => {
                    //             this.setState({
                    //                 isMovedUp: false,
                    //                 changedScrollView: false
                    //             })
                    //         });
                    //     }
                    // }
                }
            },
        })
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
        const { changedScrollView, initial } = this.state;
        const { newReviews, recommendedReviews, followingReviews, showNoticeModal, noticeNew, notificationNew } = this.props;
        return (
            <View style={[styles.container]}>
                <Animated.View style={[styles.bgWhite, {width: width, height: this.headerHeight, position: 'absolute', top: 0, opacity: this.headerOpacity, zIndex: 995}]} />
                <Animated.View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 998}
                ]}>
                    <TouchableWithoutFeedback onPress={this.props.openNoticeModal}>
                        <View>
                            {((noticeNew) || (notificationNew)) ? (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification_alert.png')} />
                            ) : (
                                <Image style={{width: 32, height: 32, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Image style={{opacity: this.headerOpacity, height: 40}} resizeMode={'contain'} source={require('../../assets/images/icon_horizontal.png')} />

                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
                        <View>
                            <Image style={{width: 32, height: 32}} source={require('../../assets/images/search.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                {changedScrollView ? (
                    <View style={[styles.container]}>
                        <ScrollView>
                            <Animated.ScrollView { ...this.bannerResponder.panHandlers } scrollEnabled={false} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: this.topHeight, zIndex: 99, position: 'absolute'}]} >
                                <Animated.Image source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            </Animated.ScrollView>
                            <Animated.View style={[styles.center, styles.alignSelfCenter, styles.bgWhite, styles.homeMenuShadow,
                                {width: this.menuWidth, height: 80, borderRadius: this.menuRadius, marginTop: -40},
                                {position: 'absolute',  top: height - 500, zIndex: 99}
                            ]}>
                                <View style={[styles.row, styles.spaceAround, styles.width80]}>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                        <View style={[styles.center, { zIndex: 999 }]}>
                                            <Image style={{width: 24, height: 24}} source={require('../../assets/images/recommend.png')} />
                                            <Text style={[styles.font12, styles.mt5]}>추천 감상</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                        <View style={[styles.center, { zIndex: 999 }]}>
                                            <Image style={{width: 24, height: 24}} source={require('../../assets/images/total.png')} />
                                            <Text style={[styles.font12, styles.mt5]}>전체 감상</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FollowArtwork')}>
                                        <View style={[styles.center, { zIndex: 999 }]}>
                                            <Image style={{width: 24, height: 24}} source={require('../../assets/images/follow.png')} />
                                            <Text style={[styles.font12, styles.mt5]}>팔로우 감상</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </Animated.View>
                            <Animated.View style={[styles.px15, styles.widthFull, {zIndex: 900, marginTop: this.initialContentPosition}]}>
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
                            </Animated.View>
                        </ScrollView>
                    </View>
                ) : (
                    initial ? (
                        <Fragment>
                            <ScrollView scrollEventThrottle={16} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: height - (height/9), zIndex: 10}]} >
                                <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                                <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                                <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            </ScrollView>
                            <View style={[styles.center, styles.alignSelfCenter, styles.bgWhite,
                                {width: width, height: 80, zIndex: 11, borderRadius: 0, position: 'absolute', bottom: 0}
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
                            <Animated.View { ...this.initialResponder.panHandlers } style={[styles.widthFull, styles.screenHeight, styles.justifyContentEnd, styles.alignItemsCenter, styles.bgBlack07, styles.overflowHidden, {position: 'absolute', width: '100%', height, zIndex: 99}]} >
                                <Fragment>
                                    <Text style={[styles.fontMedium, styles.font16, styles.white, styles.textCenter, { lineHeight: 26 }]}>
                                        <Text style={[styles.fontBold]}>위로 스와이프</Text>하면{'\n'}
                                        <Text style={[styles.fontBold]}>홈 화면</Text>이 나타납니다.{'\n'}
                                        아틔움에서 즐거운 시간 보내세요.
                                    </Text>
                                    <Image source={require('../../assets/images/initial_arrow.png')} resizeMode={'contain'} style={[{width: 30, height: 130}, styles.mt10]} />
                                </Fragment>
                            </Animated.View>
                        </Fragment>
                    ) : (
                        <Fragment>
                        <Animated.ScrollView { ...this.bannerResponder.panHandlers } scrollEventThrottle={16} scrollEnabled={this.state.startScroll ? false : true} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {position: 'absolute', width, height: this.topHeight, zIndex: 10}]} >
                            <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                        </Animated.ScrollView>
                        <Animated.View style={[styles.center, styles.alignSelfCenter, styles.bgWhite, styles.homeMenuShadow,
                            {width: this.menuWidth, height: 80, zIndex: 10, borderRadius: this.menuRadius, position: 'absolute', bottom: this.menuPosition}
                        ]}>
                            <View style={[styles.row, styles.spaceAround, styles.width80]}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                    <View style={[styles.center, { zIndex: 999 }]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/recommend.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>추천 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                    <View style={[styles.center, { zIndex: 999 }]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/total.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>전체 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('FollowArtwork')}>
                                    <View style={[styles.center, { zIndex: 999 }]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/follow.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>팔로우 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </Animated.View>
                        <Animated.View { ...this.bannerResponder.panHandlers } style={[styles.px15, styles.widthFull, {zIndex: 900, marginTop: this.initialContentPosition}]}>
                            <Text style={[styles.fontMedium, styles.font15, { marginTop: 80 }]}>아틔움이 엄선한 감상</Text>
                            <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween, styles.mb10]}>
                                <Text style={[styles.fontBold, styles.font20]}>주간 아틔움</Text>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7, { zIndex: 999 }]}>더보기</Text>
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
                                    <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7, { zIndex: 999 }]}>더보기</Text>
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
                        </Animated.View>
                    </Fragment>
                    )
                )}
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
