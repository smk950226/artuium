import React from 'react';
import { View, Text, ScrollView, Image, Animated, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ExhibitionCard from '../../components/ExhibitionCard'
import ExhibitionCard2 from '../../components/ExhibitionCard2'
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const data = [
    {
        id: 1,
        image: 'http://daljin.com/File/edtImg/1fa04f03_001.jpg',
        title: '반추상',
        intro: '거짓말로 이야기하는 창작',
        place: '국립현대미술관',
        date: '2019.06.27-2019.09.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 2,
        image: 'https://cphoto.asiae.co.kr/listimglink/1/2016101309160570554_1.jpg',
        title: '영감공감',
        intro: '거짓말로 이야기하는 창작',
        place: '금호 갤러리',
        date: '2019.10.19-2019.10.25',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 3,
        image: 'https://og-data.s3.amazonaws.com/media/exhibitions/image/10882/ei_10882.jpg',
        title: '여성의 일',
        intro: '거짓말로 이야기하는 창작',
        place: '서울대학교미술관',
        date: '2018.12.27-2019.02.24',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 4,
        image: 'https://pbs.twimg.com/media/D6_l4JFUcAEe-Ke.jpg',
        title: '거짓말',
        intro: '거짓말로 이야기하는 창작',
        place: '김달진미술자료박물관',
        date: '2019.09.27-2019.10.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 5,
        image: 'http://daljin.com/File/edtImg/1fa04f03_001.jpg',
        title: '반추상',
        intro: '거짓말로 이야기하는 창작',
        place: '국립현대미술관',
        date: '2019.06.27-2019.09.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
]


class ExhibitionScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollX: new Animated.Value(0),
            scrollX2: new Animated.Value(0),
        }
    }
    render() {
        let position = Animated.divide(this.state.scrollX, width);
        let position2 = Animated.divide(this.state.scrollX2, width);
        return(
            <View style={[styles.container]}>
                <View
                    style={[styles.row, styles.alignItemsCenter, styles.spaceBetween, styles.px15,
                    {width: width, height: 50, position: 'absolute', top: getStatusBarHeight(), zIndex: 900}
                ]}>
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/notification.png')} />
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/search.png')} />
                </View>
                <View style={[styles.widthFull]}>
                    <View>
                        <ScrollView
                            style={[{width: width, height: height*0.4, backgroundColor: 'purple'}]}
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: {
                                    contentOffset: {
                                        x: this.state.scrollX
                                    }
                                }}]
                            )}
                            scrollEventThrottle={16}
                        >
                            {data.map((data, index) => {
                                return(
                                    <ImageBackground
                                        key={index} resizeMode={'contain'} source={{uri : data.image}}
                                        style={[{width: width, height: height*0.4, flexDirection: 'column-reverse'}]}
                                    >
                                        <View style={[{marginBottom: 50, marginLeft: 30}]}>
                                            <Text style={[styles.fontMedium, styles.font14, {color: '#ffbd40'}]}>{data.intro}</Text>
                                            <Text style={[styles.fontBold, styles.font30, styles.white]}>{data.title}</Text>
                                        </View>
                                    </ImageBackground>
                                )
                            })}
                        </ScrollView>
                        <View
                            style={{ flexDirection: 'row', position: 'absolute', left: 30, bottom: 30, zIndex: 999 }}
                        >
                            {data.map((_, i) => {
                                let opacity = position.interpolate({
                                    inputRange: [i - 1, i, i + 1],
                                    outputRange: [0, 1, 0],
                                    extrapolate: 'clamp'
                                });
                                return (
                                    <View key={i} style={[styles.sliderDotWhiteEmpty, styles.center, {marginRight: 6}]}>
                                        <Animated.View
                                            style={[styles.sliderDotWhite, {opacity}]}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                    <View style={[styles.center, styles.bgWhite, styles.exMenuShadow, styles.px30, {width: width, height: 90}]}>
                        <View style={[styles.row, styles.spaceAround, styles.width80, styles.height200]}>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllExhibition')}>
                                <View style={[styles.center]}>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/images/total.png')} />
                                    <Text style={[styles.font12, styles.mt5]}>전체 전시</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('AllArtwork')}>
                                <View style={[styles.center]}>
                                    <Image style={{width: 24, height: 24}} source={require('../../assets/images/follow.png')} />
                                    <Text style={[styles.font12, styles.mt5]}>전시 감상</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <ScrollView contentContainerStyle={[styles.pt30]}>
                    <View style={{height: 350}}>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontMedium, styles.font15, {color: '#a7a7a7'}]}>당신을 위한 추천</Text>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>추천하는 전시</Text>
                        </View>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: {
                                    contentOffset: {
                                        x: this.state.scrollX2
                                    }
                                }}]
                            )}
                            scrollEventThrottle={16}
                        >
                                {data.map((da, index) => {
                                    return(
                                        <ExhibitionCard key={index} exhibition={da} />
                                    )
                                })}
                        </ScrollView>
                        <View style={[styles.alignItemsCenter, styles.mb25, {width: width}]}>
                            <View
                                style={[{flexDirection: 'row'}]}
                            >
                                {data.map((_, ind) => {
                                    let opacity2 = position2.interpolate({
                                        inputRange: [ind - 1, ind, ind + 1],
                                        outputRange: [0, 1, 0],
                                        extrapolate: 'clamp'
                                    });
                                    return (
                                        <View key={ind} style={[styles.sliderDotWhiteEmptyLg, styles.center, {margin: 4}]}>
                                            <Animated.View
                                                style={[styles.sliderDotWhiteLg, {opacity: opacity2}]}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View style={{height: 350}}>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>새로 열린 전시</Text>
                        </View>
                        <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data.map((da, index) => {
                                    return(
                                        <ExhibitionCard2 key={index} exhibition={da} />
                                    )
                                })}
                        </ScrollView>
                    </View>
                    <View style={styles.line} />
                    <View style={{height: 350}}>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontMedium, styles.font15, {color: '#a7a7a7'}]}>아틔움이 주목하는</Text>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>핫한 전시</Text>
                        </View>
                        <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data.map((da, index) => {
                                    return(
                                        <ExhibitionCard2 key={index} exhibition={da} />
                                    )
                                })}
                        </ScrollView>
                    </View>
                    <View style={{height: 350, backgroundColor: '#ebebeb'}}>
                        <View style={[styles.ml15, styles.mb10, {marginTop: 35}]}>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>최근 지나친 전시</Text>
                        </View>
                        <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {data.map((da, index) => {
                                    return(
                                        <ExhibitionCard2 key={index} exhibition={da} />
                                    )
                                })}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

ExhibitionScreen.propTypes = {

}

export default ExhibitionScreen;