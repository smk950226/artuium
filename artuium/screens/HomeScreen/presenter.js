import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, PanResponder, Text, ScrollView, Image, Modal, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
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
            getInitial: PropTypes.func.isRequired,
            openNoticeModal: PropTypes.func.isRequired,
            closeNoticeModal: PropTypes.func.isRequired,
            showNoticeModal :PropTypes.bool.isRequired,
            noticeNew: PropTypes.bool.isRequired
        }

    constructor(props){
        super(props)
        this.state = {
            topHeight: new Animated.Value(height - (height/9)),
            menuWidth: new Animated.Value(width),
            menuRadius: new Animated.Value(0),
            menuPosition: new Animated.Value(0),
            headerHeight: new Animated.Value(0),
            headerOpacity: new Animated.Value(0),
            containerPosition: new Animated.ValueXY(),
            isMovedUp: false,
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
            changedScrollView: false,
            isTop: true
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy <= 0){
                    if(gestureState.dy < -100){
                        Animated.parallel([
                            Animated.timing( this.state.topHeight, {
                                toValue: height/3+80,
                                duration: 200,
                            }), 
                            Animated.timing( this.state.menuWidth, {
                                toValue: width*0.9,
                                duration: 200,
                            }),
                            Animated.timing( this.state.menuRadius, {
                                toValue: 10,
                                duration: 200,
                            }),
                            Animated.timing( this.state.menuPosition, {
                                toValue: 500,
                                duration: 200,
                            }),
                            Animated.timing( this.state.headerHeight, {
                                toValue: getStatusBarHeight()+50,
                                duration: 200,
                            }),
                            Animated.timing( this.state.headerOpacity, {
                                toValue: 1,
                                duration: 200,
                            }),
                            Animated.timing( this.props.screenProps.scrollY, {
                                toValue: 100,
                                duration: 200,
                            }),
                        ]).start(() => {
                            this.setState({
                                isMovedUp: true
                            })
                        });
                    }
                    else{
                        this.setState({
                            isMovedUp: false
                        })
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

        this.bannerResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => false,
            onPanResponderMove: ( event, gestureState ) => {
                if(gestureState.dy < 0){
                    if(!this.state.isMovedUp){
                        if(gestureState.dy >-100){
                            this.state.containerPosition.setValue({ x: this.state.containerPosition.x, y: gestureState.dy });
                        }
                    }
                }
                else{
                    if(this.state.isMovedUp){
                        if(gestureState.dy < 50){
                            this.state.containerPosition.setValue({ x: this.state.containerPosition.x, y: gestureState.dy });
                        }
                    }
                }
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy <= 0){
                    if(gestureState.dy < -100){
                        if(!this.state.isMovedUp){
                            Animated.parallel([
                                Animated.timing( this.state.containerPosition, {
                                    toValue: 0,
                                    duration: 200,
                                }),
                                Animated.timing( this.state.topHeight, {
                                    toValue: height - 500,
                                    duration: 200,
                                }), 
                                Animated.timing( this.state.menuWidth, {
                                    toValue: width*0.9,
                                    duration: 200,
                                }),
                                Animated.timing( this.state.menuRadius, {
                                    toValue: 10,
                                    duration: 200,
                                }),
                                Animated.timing( this.state.menuPosition, {
                                    toValue: 380,
                                    duration: 200,
                                }),
                                Animated.timing( this.state.headerHeight, {
                                    toValue: getStatusBarHeight()+50,
                                    duration: 200,
                                }),
                                Animated.timing( this.state.headerOpacity, {
                                    toValue: 1,
                                    duration: 200,
                                }),
                                Animated.timing( this.props.screenProps.scrollY, {
                                    toValue: 100,
                                    duration: 200,
                                }),
                            ]).start(() => {
                                this.setState({
                                    isMovedUp: true,
                                    changedScrollView: true
                                })
                            });
                        }
                    }
                    else{
                        Animated.timing( this.state.containerPosition, {
                            toValue: 0,
                            duration: 200,
                        } ).start(() => {
                            
                        });
                    }
                }
                else{
                    if(gestureState.dy > 50){
                        if(this.state.isMovedUp){
                            this.setState({
                                isMovedUp: false,
                                changedScrollView: false
                            }, () => {
                                Animated.parallel([
                                    Animated.timing( this.state.containerPosition, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.state.topHeight, {
                                        toValue: height - 80,
                                        duration: 200,
                                    }), 
                                    Animated.timing( this.state.menuWidth, {
                                        toValue: width,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.state.menuRadius, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.state.menuPosition, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.state.headerHeight, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.state.headerOpacity, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                    Animated.timing( this.props.screenProps.scrollY, {
                                        toValue: 0,
                                        duration: 200,
                                    }),
                                ]).start(() => {
                                    this.setState({
                                        isMovedUp: false,
                                        changedScrollView: false
                                    })
                                });
                            })
                            
                        }
                    }
                    else{
                        Animated.timing( this.state.containerPosition, {
                            toValue: 0,
                            duration: 200,
                        } ).start(() => {
                            
                        });
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
        const { topHeight, menuWidth, menuRadius, headerOpacity, menuPosition, headerHeight, changedScrollView, startScroll } = this.state;
        const { newReviews, recommendedReviews, followingReviews, initial, showNoticeModal, noticeNew } = this.props;
        return (
            <View style={[styles.container]}>
                <Animated.View style={[styles.bgWhite, {width: width, height: headerHeight, position: 'absolute', top: 0, opacity: headerOpacity, zIndex: 995}]} />
                <Animated.View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 998}
                ]}>
                    <TouchableWithoutFeedback onPress={this.props.openNoticeModal}>
                        <View>
                            <Image style={{width: 24, height: 24}} source={require('../../assets/images/notification.png')} />
                            {noticeNew && (
                                <View style={[styles.bgRed, styles.circle6, {position: 'absolute', top: 0, right: 0}]} />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                    <Animated.Text style={{opacity: headerOpacity}}>아틔움 로고자리</Animated.Text>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Search')}>
                        <View>
                            <Image style={{width: 24, height: 24}} source={require('../../assets/images/search.png')} />
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                {changedScrollView ? (
                    <ScrollView>
                        <Animated.ScrollView scrollEventThrottle={16} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {width, height: height - 500, zIndex: 99, position: 'absolute', top: 0}, {transform: [{ translateY: this.state.containerPosition.y },{ scale: 1.0 }]}]} >
                            <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                        </Animated.ScrollView>
                        <Animated.View { ...this.bannerResponder.panHandlers } style={[styles.center, styles.alignSelfCenter, styles.bgWhite, styles.homeMenuShadow,
                            {width: width*0.9, height: 80, borderRadius: 10, marginTop: -40},
                            {position: 'absolute', top: height - 500, zIndex: 99, transform: [{ translateY: this.state.containerPosition.y },{ scale: 1.0 }]}
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
                        </Animated.View>
                        <View style={[styles.px15, styles.widthFull, {zIndex: 900, marginTop: height - 500}]}>
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
                ) : (
                    <Fragment>
                        <Animated.ScrollView { ...this.bannerResponder.panHandlers } scrollEventThrottle={16} horizontal={true} pagingEnabled={true} style={[styles.bgWhite, {position: 'absolute', width, height: topHeight, zIndex: 10, transform: [{ translateY: this.state.containerPosition.y },{ scale: 1.0 }]}]} >
                            <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} resizeMode={'cover'} style={[{height: '100%', width}]} />
                        </Animated.ScrollView>
                        <Animated.View style={[styles.center, styles.alignSelfCenter, styles.bgWhite, styles.homeMenuShadow,
                            {width: menuWidth, height: 80, borderRadius: menuRadius, position: 'absolute', bottom: menuPosition, transform: [{ translateY: this.state.containerPosition.y },{ scale: 1.0 }]}
                        ]}>
                            <View style={[styles.row, styles.spaceAround, styles.width80]}>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('RecommendArtwork')}>
                                    <View style={[styles.center]}>
                                        <Image style={{width: 24, height: 24}} source={require('../../assets/images/recommend.png')} />
                                        <Text style={[styles.font12, styles.mt5]}>추천 감상</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableOpacity style={[styles.profileBtn]} onPress={()=>this.props.logout()}>
                                    <Text style={[styles.fontMedium, styles.font15, {color: '#a8a8a8'}]}>로그아웃</Text>
                                </TouchableOpacity>
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
                    </Fragment>
                )}
                
                {/* <ScrollView style={{zIndex: 900}} scrollEnabled={this.state.isMovedUp} bounces={false}>
                    {this.state.isMovedUp ? 
                    <View style={[styles.alignItemsCenter, {height: height/3+80, marginTop: getStatusBarHeight()+50}]}>
                        <ScrollView scrollEventThrottle={16} onScroll={() => console.log('scrolled')} style={[{width, height: height/3}]} horizontal={true} pagingEnabled={true}>
                            <Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} style={[{width, height: height/3}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} style={[{width, height: height/3}]} />
                            <Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} style={[{width, height: height/3}]} />
                        </ScrollView>
                        <View style={[styles.center, styles.bgWhite, styles.homeMenuShadow,
                            {width: width*0.9, height: 80, borderRadius: 10, bottom: 40}
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
                        </View>
                    </View>
                    :
                    <Animated.View {...this.panResponder.panHandlers} style={[styles.alignItemsCenter, {height: topHeight, marginTop: headerHeight}]}>
                        <Animated.ScrollView ref={x => this._scrollView = x} style={[{width}]} horizontal={true} pagingEnabled={true}>
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} style={[{width: width}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} style={[{width: width}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} style={[{width: width}]} />
                        </Animated.ScrollView>
                        <Animated.View style={[styles.center, styles.bgWhite, styles.homeMenuShadow,
                            {width: menuWidth, height: menuHeight, borderRadius: menuRadius, bottom: menuPosition}
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
                    }
                    <View style={[styles.px15, styles.widthFull, {zIndex: 900}]}>
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
                {initial && (
                    <Animated.View { ...this.initialResponder.panHandlers } style={[styles.widthFull, styles.heightFull, styles.justifyContentEnd, styles.alignItemsCenter, styles.bgBlack07, styles.overflowHidden, {position: 'absolute', width: '100%', zIndex: 999}]} >
                        <Text style={[styles.fontMedium, styles.font16, styles.white, styles.textCenter, { lineHeight: 26 }]}>
                            <Text style={[styles.fontBold]}>위로 스와이프</Text>하면{'\n'}
                            <Text style={[styles.fontBold]}>홈 화면</Text>이 나타납니다.{'\n'}
                            아틔움에서 즐거운 시간 보내세요.
                        </Text>
                    </Animated.View>
                )} */}
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
