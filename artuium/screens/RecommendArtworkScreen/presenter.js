import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, ImageBackground, Dimensions, ActivityIndicator, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import UserComp from '../../components/UserComp';
import { getStatusBarHeight } from "react-native-status-bar-height";
import Modal from "react-native-modal";

const statusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window');

const dummyList = [
    {
        id: -1
    }
]

class RecommendArtworkScreen extends Component{
    static propTypes = {
        loading: PropTypes.bool.isRequired,
        users: PropTypes.array,
        artworks: PropTypes.array,
        exhibitions: PropTypes.array
    }

    constructor(props){
        super(props);
        this.state = {
            scrollX: new Animated.Value(0),
        }
    }

    render(){
        const { loading, users, artworks, exhibitions  } = this.props;
        let position = Animated.divide(this.state.scrollX, width);
        return(
            <Fragment>
                <View style={[styles.container]}>
                    <View style={[{height:50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentEnd, styles.px25, styles.borderBtmGrayDb]}>
                        <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                            <View>
                                <Text style={[styles.fontMedium, styles.font16, styles.gray93]}>
                                    닫기
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    {loading ? (
                        <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <ActivityIndicator size={'small'} color={'#000'} />
                        </View>
                    ) : (
                        <ScrollView>
                            <ImageBackground source={require('../../assets/images/gradient.png')} style={[styles.widthFull, {paddingBottom: 50}]}>
                            <Text style={[styles.fontBold, styles.font25, styles.mt20, styles.px20]}>추천하는 멤버</Text>
                            <View style={[{width, height: 105},]}>
                                {users && users.length > 0 ? (
                                    <ScrollView
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
                                        {users.map((user, index) => {
                                            return(
                                                <View key={index} style={[styles.borderRadius10, styles.bgWhite, {width: width - 40}, styles.mx20, styles.alignSelfCenter, styles.exMenuShadow]}>
                                                    <UserComp user={user} size={'large'} navigation={this.props.navigation} />
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                ) : (
                                    <View style={[{width, height: '100%'}, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>추천하는 멤버가 없습니다.</Text>
                                    </View>
                                )}
                            </View>
                            <View style={[{ zIndex: 999 }, styles.row, styles.justifyContentCenter]}>
                                {users && users.length > 0 ? (
                                    users.map((_, i) => {
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
                            </ImageBackground>
                            <Text style={[styles.fontBold, styles.font25, styles.mt5, styles.px20]}>추천하는 작품 감상</Text>
                            <View style={[styles.mt15, styles.px20, styles.row, styles.flexWrap, styles.justifyContentBetween]}>
                                {artworks && artworks.length > 0 ? (
                                    artworks.map((review, index) => {
                                        return(
                                            <ArtuiumCard from={'RecommendArtwork'} key={index} review={review} size={'xsmall'} navigation={this.props.navigation} />
                                        )
                                    })
                                ) : (
                                    <View style={[{height: 300}, styles.widthFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>작품 감상이 없습니다.</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={[styles.fontBold, styles.font25, styles.mt50, styles.px20]}>추천하는 전시 감상</Text>
                            <View style={[styles.mt15, styles.px20, styles.row, styles.flexWrap, styles.justifyContentBetween]}>
                                {exhibitions && exhibitions.length > 0 ? (
                                    exhibitions.map((review, index) => {
                                        return(
                                            <ArtuiumCard from={'RecommendArtwork'} key={index} review={review} size={'xsmall'} navigation={this.props.navigation} />
                                        )
                                    })
                                ) : (
                                    <View style={[{height: 300}, styles.widthFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>전시 감상이 없습니다.</Text>
                                    </View>
                                )}
                            </View>
                        </ScrollView>
                    )}
                </View>
            </Fragment>
        )
    }
}

export default RecommendArtworkScreen;