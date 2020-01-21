import React, { Component, Fragment } from 'react';
import { View, Text, PanResponder, Animated, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ArtuiumCard4 from '../../components/ArtuiumCard4'
const { width, height } = Dimensions.get('window')

const iosStatusBarHeight = getStatusBarHeight();

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}

class ArtworkDetailScreen extends Component{
    static propTypes = {
        artwork: PropTypes.object,
        exhibition: PropTypes.object,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props)
        const { artwork, from } = props;
        this.cardsPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                if(gestureState.dy < 0){
                    if(gestureState.dy < -30){
                        return true
                    }
                    else{
                        return false
                    }
                }
                else{
                    return false
                }
            },
            onPanResponderMove: ( event, gestureState ) => {
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy < 0){
                    if(gestureState.dy < -50){
                        this.props.navigation.navigate('ArtworkContent', { artwork, from })
                    }
                }
            }
        })
    }

    lastTap = null

    _handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
            if(this.props.is_liked){
                this.props.unlike()
            }
            else{
                this.props.like()
            }
        } else {
            this.lastTap = now;
        }
    }

    render(){
        const { artwork, exhibition, like_count, review_count, is_liked, from } = this.props;
        return(
            <Animated.View { ...this.cardsPanResponder.panHandlers }>
            <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]} source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'}>
                <TouchableWithoutFeedback onPress={this._handleDoubleTap}>
                    <SafeAreaView style={[styles.container]}>
                        {artwork ? (
                            <Fragment>
                                <TouchableWithoutFeedback onPress={from ? () => this.props.navigation.navigate(from) : ()=>this.props.navigation.goBack()}>
                                    <View style={[styles.alignItemsCenter, styles.px15, {height: 40, flexDirection: 'row-reverse', position: 'absolute', top: iosStatusBarHeight + 15, right: 0, zIndex: 99}]}>
                                        <View style={[styles.exitBtn]}>
                                            <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]}>
                                    <View>
                                        <View style={[styles.center, {width, height: (width > 364) ? 355 : 355*width*0.9/235}]}>
                                            {artwork.size === 'horizontal' && (
                                                <Fragment>
                                                    <Image source={{uri: artwork.image ? artwork.image : ''}} style={{width: (width > 364) ? 364 : width*0.9, height: (width > 364) ? 246 : 246*width*0.9/364}} resizeMode={'cover'} />
                                                    <View style={[{width: (width > 364) ? 364 : width*0.9, height: (width > 364) ? 246 : 246*width*0.9/364, position: 'absolute'}, styles.center]}>
                                                        {is_liked ? (
                                                            <Image source={require('../../assets/images/frame_horizontal_active.png')}  style={{width: (width > 364) ? 364 : width*0.9, height: (width > 364) ? 246 : 246*width*0.9/364}} />
                                                        ) : (
                                                            <Image source={require('../../assets/images/frame_horizontal_inactive.png')}  style={{width: (width > 364) ? 364 : width*0.9, height: (width > 364) ? 246 : 246*width*0.9/364}} />
                                                        )}
                                                    </View>
                                                </Fragment>
                                            )}
                                            {artwork.size === 'square' && (
                                                <Fragment>
                                                <Image source={{uri: artwork.image ? artwork.image : ''}} style={{width: (width > 240) ? 240 : width*0.9, height: (width > 240) ? 240 : 240*width*0.9/240}} resizeMode={'cover'} />
                                                <View style={[{width: (width > 240) ? 240 : width*0.9, height: (width > 240) ? 240 : 240*width*0.9/240, position: 'absolute'}, styles.center]}>
                                                    {is_liked ? (
                                                        <Image source={require('../../assets/images/frame_square_active.png')}  style={{width: (width > 240) ? 240 : width*0.9, height: (width > 240) ? 240 : 240*width*0.9/240}} />
                                                    ) : (
                                                        <Image source={require('../../assets/images/frame_square_inactive.png')}  style={{width: (width > 240) ? 240 : width*0.9, height: (width > 240) ? 240 : 240*width*0.9/240}} />
                                                    )}
                                                </View>
                                                </Fragment>
                                            )}
                                            {artwork.size === 'vertical' && (
                                                <Fragment>
                                                <Image source={{uri: artwork.image ? artwork.image : ''}} style={{width: (width > 235) ? 235 : width*0.9, height: (width > 235) ? 355 : 355*width*0.9/235}} resizeMode={'cover'} />
                                                <View style={[{width: (width > 235) ? 235 : width*0.9, height: (width > 235) ? 355 : 355*width*0.9/235, position: 'absolute'}, styles.center]}>
                                                    {is_liked ? (
                                                        <Image source={require('../../assets/images/frame_vertical_active.png')}  style={{width: (width > 235) ? 235 : width*0.9, height: (width > 235) ? 355 : 355*width*0.9/235}} />
                                                    ) : (
                                                        <Image source={require('../../assets/images/frame_vertical_inactive.png')}  style={{width: (width > 235) ? 235 : width*0.9, height: (width > 235) ? 355 : 355*width*0.9/235}} />
                                                    )}
                                                </View>
                                                </Fragment>
                                            )}
                                        </View>
                                        <View style={[styles.alignItemsCenter, {marginTop: 60}]}>
                                            <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                                                <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                                                <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{abbreviateNumber(review_count)}</Text>
                                                <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                                        {is_liked ? (
                                                            <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_active.png')} />
                                                        ) : (
                                                            <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />
                                                        )}
                                                        <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{abbreviateNumber(like_count)}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.flexWrap, {width: 200}]}>
                                                <Text style={[styles.fontBold, styles.font30, styles.textCenter]}>{artwork.name}</Text>
                                            </View>
                                            <Text style={[styles.fontMedium, styles.font14]}>{artwork.author.name}, {`${artwork.created.slice(0,4)}.${artwork.created.slice(5,7)}.${artwork.created.slice(8,10)}`}, {artwork.material}</Text>
                                            <TouchableWithoutFeedback onPress={exhibition ? () => this.props.navigation.navigate('ExhibitionDetail', { exhibition, from }) : null}>
                                                <View style={[styles.relatedBtn2, styles.mt30, exhibition ? null : styles.hidden]}>
                                                    <Text style={[styles.fontMedium, styles.font18, styles.gray8B]}>관련 전시</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('ArtworkContent', { artwork, from })}>
                                                <View style={[{marginTop: 40}]}>
                                                    <Image source={require('../../assets/images/arrow_up_exhibition.png')} style={[styles.upBtn]}/>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                </ImageBackground>
                            </Fragment>
                        ) : (
                            <View style={[styles.container, styles.center]}>
                                <Text style={[styles.fontMedium, styles.font16]}>
                                    잘못된 요청입니다.
                                </Text>
                            </View>
                        )}
                        
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </ImageBackground>
            </Animated.View>
        )
    }
}

export default ArtworkDetailScreen;