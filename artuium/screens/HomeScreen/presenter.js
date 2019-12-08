import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, PanResponder, Text, ScrollView, Image, Modal, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import NoticeScreen from '../../screens/NoticeScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

class HomeScreen extends Component {
        static propTypes = {
            newReviews: PropTypes.array,
            recommendedReviews: PropTypes.array,
            followingReviews: PropTypes.array,
            initial: PropTypes.bool.isRequired,
            getInitial: PropTypes.func.isRequired,
            openNoticeModal: PropTypes.func.isRequired,
            closeNoticeModal: PropTypes.func.isRequired,
            showNoticeModal :PropTypes.bool.isRequired,
            noticeNew: PropTypes.bool.isRequired
        }

    constructor(props){
        super(props)
        this.state = {
            panY: new Animated.ValueXY(),
            scrollY: new Animated.Value(height),
            scrollY2: new Animated.Value(height),
            isMovedUp: false,
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: ( event, gestureState ) => {
                console.log(gestureState.dx, gestureState.dy)
                if(gestureState.dy < 0){
                    if(!this.state.isMovedUp){
                        this.state.panY.setValue({ y: gestureState.dy });
                    }
                }
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy <= 0){
                    if(gestureState.dy < -100){
                        Animated.timing( this.state.scrollY, {
                            toValue: 0.3,
                            duration: 200,
                        } ).start(() => {
                            this.setState({
                                isMovedUp: true
                            })
                        });
                    }
                    else{
                        if(!this.state.isMovedUp){
                            Animated.timing( this.state.scrollY, {
                                toValue: 1,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    isMovedUp: false
                                })
                            });
                        }
                    }
                }
                else{
                    if(gestureState.dy > 100){
                        if(this.state.isMovedUp){
                            Animated.timing( this.state.scrollY, {
                                toValue: 1,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    isMovedUp: false
                                })
                            });
                        }
                        else{
                            Animated.timing( this.state.scrollY, {
                                toValue: 0.3,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    isMovedUp: true
                                })
                            });
                        }
                    }
                    else{
                        if(!this.state.isMovedUp){
                            Animated.timing( this.state.scrollY, {
                                toValue: 1,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    isMovedUp: false
                                })
                            });
                        }
                        else{
                            Animated.timing( this.state.scrollY, {
                                toValue: 0.3,
                                duration: 200,
                            } ).start(() => {
                                this.setState({
                                    isMovedUp: true
                                })
                            });
                        }
                    }
                }
            },
        })

        this.initialResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: ( event, gestureState ) => {
                
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy <= 0){
                    if(gestureState.dy < -100){
                        this.props.getInitial(false)
                    }
                }
            },
        })
    }

    _renderNoticeRouter = () => {
        return (
            <NoticeScreen handleNoticeNewChange={this.props.handleNoticeNewChange} />
        )
    }

    render() {
        const imageHeight = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [height*8/9, height/3],
            extrapolate: 'clamp'
        });
        const menuWidth = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [width, width*0.9],
            extrapolate: 'clamp'
        });
        const menuHeight = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [height/9, 80],
            extrapolate: 'clamp'
        });
        const menuRadius = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 10],
            extrapolate: 'clamp'
        });
        const statusBarMargin = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, getStatusBarHeight() + 50],
            extrapolate: 'clamp'
        });
        const menuMarginL = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, width*0.05],
            extrapolate: 'clamp'
        });
        const headerOpacity = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const menuPosition = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 40],
            extrapolate: 'clamp'
        });
        const bottomView = this.props.screenProps.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [height, (height/3) + getStatusBarHeight() + 90],
            extrapolate: 'clamp'
        });
        const imgHeight = this.state.scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [height, 600],
            extrapolate: 'clamp'
        })
        const { newReviews, recommendedReviews, followingReviews, initial, showNoticeModal, noticeNew } = this.props;
        return (
            <View style={[styles.container]}>
                <Animated.View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 900}
                ]}>
                    <TouchableWithoutFeedback onPress={this.props.openNoticeModal}>
                        <View>
                            <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                            {noticeNew && (
                                <View style={[styles.bgRed, styles.circle6, {position: 'absolute', top: 0, right: 0}]} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Text style={{opacity: headerOpacity}}>아틔움 로고자리</Animated.Text>
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/search.png')} />
                </Animated.View>
                <Animated.View style={{width: width, height: statusBarMargin, backgroundColor: 'white', opacity: headerOpacity}} />
                <Animated.ScrollView
                    ref="scrollView"
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.props.screenProps.scrollY
                            }
                        }}]
                    )}
                    bounces={false}
                    scrollEventThrottle={16}
                    stickyHeaderIndices={[0]}
                >
                    <Animated.View style={[styles.widthFull]}>
                        <Animated.ScrollView style={[{width: width, height: imageHeight}]} horizontal={true} pagingEnabled={true}>
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} style={[{width: width, height: imageHeight}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} style={[{width: width, height: imageHeight}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} style={[{width: width, height: imageHeight}]} />
                        </Animated.ScrollView>
                        <Animated.View style={[styles.center, styles.bgWhite, styles.homeMenuShadow,
                            {width: menuWidth, height: menuHeight, borderRadius: menuRadius, bottom: menuPosition, marginLeft: menuMarginL, zIndex: 998}
                        ]}>
                            <View style={[styles.row, styles.spaceAround, styles.width80, styles.height200]}>
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
                        </Animated.View>
                    </Animated.View>
                    <Animated.View style={{height: (height*2/3)-getStatusBarHeight()-100, zIndex: 1}} />
                    <View style={{height: 0}} />
                </Animated.ScrollView>
                <Animated.ScrollView
                    style={[styles.px15, styles.pt20, styles.widthFull, {position: 'absolute', top: bottomView, zIndex: 999, height: (height*2/3)-getStatusBarHeight()-170}]}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.props.screenProps.scrollY2
                            }
                        }}]
                    )}
                    bounces={false}
                    scrollEventThrottle={16}
                >
                    <Text style={[styles.fontMedium, styles.font15]}>아틔움이 엄선한 감상</Text>
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
                        <TouchableWithoutFeedback>
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
                        <TouchableWithoutFeedback>
                            <View style={[styles.bgBlack, styles.borderRadius5, styles.py10, { width: 220 }]}>
                                <Text style={[styles.textCenter, styles.fontMedium, styles.font16, styles.white]}>친구들의 감상 확인하기 </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Animated.ScrollView>
                {initial && (
                    <Animated.View { ...this.initialResponder.panHandlers } style={[styles.widthFull, styles.heightFull, styles.justifyContentEnd, styles.alignItemsCenter, styles.bgBlack07, styles.overflowHidden, {position: 'absolute', width: '100%'}]} >
                        <Text style={[styles.fontMedium, styles.font16, styles.white, styles.textCenter, { lineHeight: 26 }]}>
                            <Text style={[styles.fontBold]}>위로 스와이프</Text>하면{'\n'}
                            <Text style={[styles.fontBold]}>홈 화면</Text>이 나타납니다.{'\n'}
                            아틔움에서 즐거운 시간 보내세요.
                        </Text>
                    </Animated.View>
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
                                first: this._renderNoticeRouter,
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
