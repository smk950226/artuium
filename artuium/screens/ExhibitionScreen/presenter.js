import React from 'react';
import { View, Text, ScrollView, Image, Animated, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ExhibitionCard from '../../components/ExhibitionCard'
import ExhibitionCard2 from '../../components/ExhibitionCard2'
import PropTypes from 'prop-types';
import styles from '../../styles';
import NoticeScreen from '../../screens/NoticeScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const iosStatusBarHeight = getStatusBarHeight()

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

const dummyList = [
    {
        id: -1
    }
]


class ExhibitionScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollX: new Animated.Value(0),
            scrollX2: new Animated.Value(0),
            index: 0,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
        }
    }

    static propTypes = {
        noticeNew: PropTypes.bool.isRequired,
        newExhibitions: PropTypes.array,
        recommendedExhibitions: PropTypes.array,
        hotExhibitions: PropTypes.array,
        pastExhibitions: PropTypes.array,
        showNoticeModal: PropTypes.bool.isRequired,
        openNoticeModal: PropTypes.func.isRequired,
        closeNoticeModal: PropTypes.func.isRequired,
        handleNoticeNewChange: PropTypes.func.isRequired
    }

    _renderNoticeRouter = () => {
        return (
            <NoticeScreen handleNoticeNewChange={this.props.handleNoticeNewChange} />
        )
    }

    render() {
        let position = Animated.divide(this.state.scrollX, width);
        let position2 = Animated.divide(this.state.scrollX2, width);
        const { noticeNew, newExhibitions, recommendedExhibitions, hotExhibitions, pastExhibitions, showNoticeModal } = this.props;
        return(
            <View style={[styles.container]}>
                <View
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
                    <Image style={{width: 24, height: 24, zIndex: 999}} source={require('../../assets/images/search.png')} />
                </View>
                <ScrollView>
                <View style={[styles.widthFull]}>
                    <View>
                        <View
                            style={[{width: width, height: 400}]}
                        >
                            {recommendedExhibitions && recommendedExhibitions.length > 0 ? (
                                <ScrollView
                                    style={[{width: width, height: 400}]}
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
                                {recommendedExhibitions.map((exhibition, index) => {
                                    return(
                                        <ImageBackground
                                            key={index} resizeMode={'cover'} source={{uri : exhibition ? (exhibition.images && (exhibition.images.length > 0)) ? exhibition.images[0].image : null : null}}
                                            style={[{width: width, height: 400}, styles.justifyContentEnd]}
                                            blurRadius={20}
                                        >
                                            <Image source={{uri: exhibition ? (exhibition.images && (exhibition.images.length > 0)) ? exhibition.images[0].image : null : null}} resizeMode={'contain'} style={[styles.heightFull]} />
                                            <View style={[{position: 'absolute', bottom: 50, left: 30}]}>
                                                <Text style={[styles.fontMedium, styles.font14, styles.yellow]}>{exhibition.name}</Text>
                                                <Text style={[styles.fontBold, styles.font30, styles.white]}>{exhibition.name}</Text>
                                            </View>
                                        </ImageBackground>
                                    )
                                })}
                                </ScrollView>
                            ) : (
                                <View style={[{width, height: 400}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                                </View>
                            )}
                        </View>
                        <View
                            style={{ flexDirection: 'row', position: 'absolute', left: 30, bottom: 30, zIndex: 999 }}
                        >
                            {recommendedExhibitions && recommendedExhibitions.length > 0 ? (
                                recommendedExhibitions.map((_, i) => {
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
                                })
                            ) : (
                                dummyList.map((_, i) => {
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
                                })
                            )}
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
                <View style={[styles.pt30]}>
                    <View>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontMedium, styles.font15, {color: '#a7a7a7'}]}>당신을 위한 추천</Text>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>추천하는 전시</Text>
                        </View>
                        <View style={[{height: 240}]}>
                            {recommendedExhibitions && recommendedExhibitions.length > 0 ? (
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
                                {recommendedExhibitions.map((exhibition, index) => {
                                    return(
                                        <ExhibitionCard key={index} exhibition={exhibition} />
                                    )
                                })}
                            </ScrollView>
                            ) : (
                                <View style={[{width, height: '100%'}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                                </View>
                            )}
                        </View>
                        <View style={[styles.alignItemsCenter, styles.mb25, {width: width}]}>
                            <View
                                style={[{flexDirection: 'row'}]}
                            >
                                {recommendedExhibitions && recommendedExhibitions.length > 0 ? (
                                    recommendedExhibitions.map((_, ind) => {
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
                                    })
                                ) : (
                                    dummyList.map((_, i) => {
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
                                    })
                                )}
                            </View>
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>새로 열린 전시</Text>
                        </View>
                        <View style={{height: 280}}>
                            {newExhibitions && newExhibitions.length > 0 ? (
                                <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                {newExhibitions.map((exhibition, index) => {
                                    return(
                                        <ExhibitionCard2 key={index} exhibition={exhibition} />
                                    )
                                })}
                                </ScrollView>
                            ) : (
                                <View style={[{width, height: '100%'}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.line} />
                    <View>
                        <View style={[styles.ml15, styles.mb10]}>
                            <Text style={[styles.fontMedium, styles.font15, {color: '#a7a7a7'}]}>아틔움이 주목하는</Text>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>핫한 전시</Text>
                        </View>
                        <View style={{height: 280}}>
                                {hotExhibitions && hotExhibitions.length > 0 ? (
                                    <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {hotExhibitions.map((exhibition, index) => {
                                        return(
                                            <ExhibitionCard2 key={index} exhibition={exhibition} />
                                        )
                                    })}
                                    </ScrollView>
                                ) : (
                                    <View style={[{width, height: '100%'}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                                    </View>
                                )}
                        </View>
                    </View>
                    <View style={[styles.bgGrayEb]}>
                        <View style={[styles.ml15, styles.mb10, {marginTop: 35}]}>
                            <Text style={[styles.fontBold, styles.font20, {color: '#222222'}]}>최근 지나친 전시</Text>
                        </View>
                        <View style={{height: 280}}>
                                {pastExhibitions && pastExhibitions.length > 0 ? (
                                    <ScrollView contentContainerStyle={[styles.pl15]} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {pastExhibitions.map((exhibition, index) => {
                                        return(
                                            <ExhibitionCard2 key={index} exhibition={exhibition} />
                                        )
                                    })}
                                    </ScrollView>
                                ) : (
                                    <View style={[{width, height: '100%'}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시가 없습니다.</Text>
                                    </View>
                                )}
                        </View>
                    </View>
                </View>
                </ScrollView>
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
        )
    }
}

export default ExhibitionScreen;