import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text, ScrollView, Image, Platform, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

const { width, height } = Dimensions.get('window')

const data = [
    {
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4.5,
        name: '라쿤',
        date: '5 일전',
        comments: 32,
        likes: 32
    },
    {
        image: 'http://mblogthumb3.phinf.naver.net/MjAxOTAxMDNfOTEg/MDAxNTQ2NDgxOTgwNTcz.I3sUkC74k5K1fExm6woYSK8DhlgA6MZsqmB91SLCsIcg.vb2MUoFo6xYjZnWOBvnI_jDklXM3jKR8xrbj5tlDjFwg.JPEG.allthat_art/01_5347.JPG?type=w800',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 1,
        name: '라쿤',
        date: '5 일전',
        comments: 32,
        likes: 32
    },
    {
        image: 'https://t1.daumcdn.net/cfile/tistory/2218C34D55096EE51F',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 5,
        name: '라쿤',
        date: '5 일전',
        comments: 32,
        likes: 32
    },
    {
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4,
        name: '라쿤',
        date: '5 일전',
        comments: 32,
        likes: 32
    },
    {
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 3.5,
        name: '라쿤',
        date: '5 일전',
        comments: 32,
        likes: 32
    }
]

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
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
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
                        <Animated.ScrollView style={[{width: width, height: imageHeight}]} horizontal={true} pagingEnabled={true}>
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/mona.jpeg')} style={[{width: width, height: imageHeight}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/monc.jpg')} style={[{width: width, height: imageHeight}]} />
                            <Animated.Image resizeMode={'cover'} source={require('../../assets/images/goh.jpeg')} style={[{width: width, height: imageHeight}]} />
                        </Animated.ScrollView>
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
                    <View style={[styles.px15, { marginTop: 40 }]}>
                        <Text style={[styles.fontMedium, styles.font15]}>아틔움이 엄선한 감상</Text>
                        <View style={[styles.row, styles.alignItemsEnd, styles.justifyContentBetween]}>
                            <Text style={[styles.fontBold, styles.font20, styles.mb10]}>주간 아틔움</Text>
                            <Text style={[styles.fontMedium, styles.font15, styles.mb10, styles.textUnderline, styles.grayA7]}>더보기</Text>
                        </View>
                        <View style={[styles.row, styles.justifyContentBetween, styles.flexWrap, styles.widthFull]}>
                        {data.map((da, index) => {
                            if(index < 4){
                                return(
                                    <ArtuiumCard key={index} artwork={da} size={'small'} />
                                )
                            }
                        })}
                        </View>
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }
}

HomeScreen.propTypes = {

}

export default HomeScreen;
