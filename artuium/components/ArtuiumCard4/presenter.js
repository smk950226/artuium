import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FollowerList from '../FollowerList';
import FollowingList from '../FollowingList';

const { width, height } = Dimensions.get('window')

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

class ArtuiumCard4 extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired,
    }

    constructor(props){
        super(props)
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '팔로워' },
                { key: 'second', title: '팔로잉' },
            ],
        }
    }

    _renderFollowerList = () => {
        return(
            <FollowerList user={this.props.review.author} />
        )
    }

    _renderFollowingList = () => {
        return(
            <FollowingList user={this.props.review.author} />
        )
    }

    _openFollowModal = (mode) => {
        if(mode === 'follower'){
            this.setState({
                index: 0
            })
        }
        else{
            this.setState({
                index: 1
            })
        }
        this.props.openFollowModal(mode)
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
        const { artwork, is_liked, like_count, review_count, from } = this.props;
        return(
            <TouchableWithoutFeedback onPress={this._handleDoubleTap}>
            <View style={[styles.center, styles.heightFull, styles.screenWidth]}>
                <View>
                    <View style={[styles.center, {width, height: (width > 364) ? 355 : 355*width*0.9/235}]}>
                        {artwork.size === 'horizontal' && (
                            <Fragment>
                                <Image source={{uri: artwork.image}} style={{width: (width > 364) ? 364 : width*0.9, height: (width > 364) ? 246 : 246*width*0.9/364}} resizeMode={'cover'} />
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
                            <Image source={{uri: artwork.image}} style={{width: (width > 240) ? 240 : width*0.9, height: (width > 240) ? 240 : 240*width*0.9/240}} resizeMode={'cover'} />
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
                            <Image source={{uri: artwork.image}} style={{width: (width > 235) ? 235 : width*0.9, height: (width > 235) ? 355 : 355*width*0.9/235}} resizeMode={'cover'} />
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
                        <Text style={[styles.fontMedium, styles.font14, { marginBottom: 150 }]}>{artwork.author ? artwork.author.name : ""}, {`${artwork.created.slice(0,4)}.${artwork.created.slice(5,7)}.${artwork.created.slice(8,10)}`}, {artwork.material}</Text>
                    </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default ArtuiumCard4;