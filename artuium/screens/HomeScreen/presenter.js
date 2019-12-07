import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, PanResponder, Text, ScrollView, Image, Alert, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

const { width, height } = Dimensions.get('window')

const data = [
    {
        id: 1,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4.5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    },
    {
        id: 2,
        image: 'http://mblogthumb3.phinf.naver.net/MjAxOTAxMDNfOTEg/MDAxNTQ2NDgxOTgwNTcz.I3sUkC74k5K1fExm6woYSK8DhlgA6MZsqmB91SLCsIcg.vb2MUoFo6xYjZnWOBvnI_jDklXM3jKR8xrbj5tlDjFwg.JPEG.allthat_art/01_5347.JPG?type=w800',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 1,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    },
    {
        id: 3,
        image: 'https://t1.daumcdn.net/cfile/tistory/2218C34D55096EE51F',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    },
    {
        id: 4,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    },
    {
        id: 5,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 3.5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    }
]

class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            panY: new Animated.ValueXY(),
            scrollY: new Animated.Value(height),
            scrollY2: new Animated.Value(height),
            isMovedUp: false
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
        const { isMovedUp } = this.state;
        console.log(this.state.scrollY)
        return (
            <View style={[styles.container]}>
                <Animated.View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 900}
                ]}>
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/notification.png')} />
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
                    style={[styles.px15, styles.pt20, {position: 'absolute', top: bottomView, zIndex: 999, height: (height*2/3)-getStatusBarHeight()-170}]}
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
                    <View style={[styles.row, styles.justifyContentBetween, styles.flexWrap, styles.widthFull]}>
                    {data.map((da, index) => {
                        if(index < 4){
                            return(
                                <ArtuiumCard key={index} artwork={da} size={'small'} navigation={this.props.navigation} />
                            )
                        }
                    })}
                    </View>
                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7]}>지금 아틔움에서는</Text>
                    <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween, styles.mb15]}>
                        <Text style={[styles.fontBold, styles.font20]}>새로운 감상</Text>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                            <Text style={[styles.fontMedium, styles.font15, styles.textUnderline, styles.grayA7]}>더보기</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {data.map((da, index) => {
                            return(
                                <ArtuiumCard key={index} artwork={da} size={'large'} />
                            )
                        })}
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
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {data.map((da, index) => {
                            return(
                                <ArtuiumCard key={index} artwork={da} size={'large'} />
                            )
                        })}
                    </ScrollView>
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.mt15, { marginBottom: 60 }]}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.bgBlack, styles.borderRadius5, styles.py10, { width: 220 }]}>
                                <Text style={[styles.textCenter, styles.fontMedium, styles.font16, styles.white]}>친구들의 감상 확인하기 </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }
}

HomeScreen.propTypes = {

}

export default HomeScreen;
