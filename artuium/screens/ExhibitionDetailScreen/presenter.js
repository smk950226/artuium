import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Platform, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
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

class ExhibitionDetailScreen extends Component{
    static propTypes = {
        exhibition: PropTypes.object,
        artwork: PropTypes.object,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
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
        const { exhibition, like_count, review_count, is_liked } = this.props;
        return(
            <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]} source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'}>
                <TouchableWithoutFeedback onPress={this._handleDoubleTap}>
                    <SafeAreaView style={[styles.container]}>
                        {exhibition ? (
                            <Fragment>
                                <TouchableWithoutFeedback onPress={()=> this.props.navigation.goBack(null)}>
                                    <View style={[styles.alignItemsCenter, styles.px15, {height: 40, flexDirection: 'row-reverse', position: 'absolute', top: iosStatusBarHeight + 15, right: 0, zIndex: 99}]}>
                                        <View style={[styles.exitBtn]}>
                                            <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]} source={require('../../assets/images/bg_exhibition.png')}>
                                    <View>
                                        <View style={[styles.center]}>
                                            <Image source={{uri: exhibition.images ? exhibition.images.length > 0 ? exhibition.images[0].image : null : null}} style={{width: 360, height: 240}} resizeMode={'cover'} />
                                        </View>
                                        <View style={[styles.alignItemsCenter, {marginTop: 60}]}>
                                            <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                                                <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment_white.png')} />
                                                <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{abbreviateNumber(review_count)}</Text>
                                                <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                                        {is_liked ? (
                                                            <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_active.png')} />
                                                        ) : (
                                                            <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_white.png')} />
                                                        )}
                                                        <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{abbreviateNumber(like_count)}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.flexWrap, {width: 200}]}>
                                                <Text style={[styles.fontBold, styles.font30, styles.textCenter]}>{exhibition.name}</Text>
                                            </View>
                                            <Text style={[styles.fontMedium, styles.font14]}>{exhibition.gallery.name}, {`${exhibition.open_date.slice(0,4)}.${exhibition.open_date.slice(5,7)}.${exhibition.open_date.slice(8,10)} ~ ${exhibition.close_date.slice(0,4)}.${exhibition.close_date.slice(5,7)}.${exhibition.close_date.slice(8,10)}`}</Text>
                                            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('ExhibitionArtwork', { exhibition })}>
                                                <View style={[styles.relatedBtn, styles.mt30]}>
                                                    <Text style={[styles.fontMedium, styles.font18, styles.white]}>전시 입장</Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('ExhibitionContent', { exhibition })}>
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
        )
    }
}

export default ExhibitionDetailScreen;