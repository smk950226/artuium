import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import FollowerList from '../FollowerList';
import FollowingList from '../FollowingList';
import stripHtml from "string-strip-html";
import ModalDropdown from 'react-native-modal-dropdown';

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

class ArtuiumCard5 extends Component{
    static propTypes = {
        review: PropTypes.object.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like_count: PropTypes.number.isRequired,
        reply_count: PropTypes.number.isRequired,
        openProfileModal: PropTypes.func.isRequired,
        closeProfileModal: PropTypes.func.isRequired,
        showProfileModal: PropTypes.bool.isRequired,
        openFollowModal: PropTypes.func.isRequired,
        closeFollowModal: PropTypes.func.isRequired,
        showFollowModal: PropTypes.bool.isRequired,
        follow: PropTypes.func.isRequired,
        unfollow: PropTypes.func.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
        is_me: PropTypes.bool.isRequired,
        is_following: PropTypes.bool.isRequired,
        follower_count: PropTypes.number.isRequired,
        following_count: PropTypes.number.isRequired,
        my: PropTypes.bool,
        handleChangeMode: PropTypes.func,
        handleOption: PropTypes.func.isRequired
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

    _handleGoOthersProfile = () => {
        this.props.closeProfileModal()
        if(this.props.is_me){
            this.props.navigation.navigate('Profile')
        }
        else{
            this.props.navigation.navigate('OthersProfile', {others: this.props.review.author})
        }
    }

    render(){
        const { review, is_liked, like_count, reply_count, showProfileModal, showFollowModal, is_me, is_following, follower_count, following_count, my } = this.props;
        return(
            <Fragment>
                <Fragment>
                    <View style={[styles.row, styles.justifyContentBetween]}>
                        <TouchableWithoutFeedback onPress={() => this.props.handleChangeMode('list')}>
                            <View style={[styles.ml25]}>
                                <Image style={[{width: 14, height: 26}]} source={require('../../assets/images/icon_back.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.alignItemsCenter, styles.mt15]}>
                            {review.author.profile_image ? (
                                <Image source={{uri: review.author.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                            ) : (
                                <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage40]} />
                            )}
                            {review.expression === 'good' && (
                                <Image source={require('../../assets/images/icon_good.png')} style={[styles.emojiXl, { position: 'absolute', top: 20, left: 24 }]} resizeMode={'cover'} />
                            )}
                            {review.expression === 'soso' && (
                                <Image source={require('../../assets/images/icon_soso.png')} style={[styles.emojiXl, { position: 'absolute', top: 20, left: 24 }]} resizeMode={'cover'} />
                            )}
                            {review.expression === 'sad' && (
                                <Image source={require('../../assets/images/icon_sad.png')} style={[styles.emojiXl, { position: 'absolute', top: 20, left: 24 }]} resizeMode={'cover'} />
                            )}
                            {review.expression === 'surprise' && (
                                <Image source={require('../../assets/images/icon_surprise.png')} style={[styles.emojiXl, { position: 'absolute', top: 20, left: 24 }]} resizeMode={'cover'} />
                            )}
                            {review.expression === 'thumb' && (
                                <Image source={require('../../assets/images/icon_thumb.png')} style={[styles.emojiXl, { position: 'absolute', top: 20, left: 24 }]} resizeMode={'cover'} />
                            )}
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={[styles.mr25, styles.hidden]}>
                                <Image style={[{width: 14, height: 26}]} source={require('../../assets/images/icon_back.png')} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={[styles.fontBold, styles.font20, styles.mt5, styles.textCenter]}>{review.author.nickname}님의 감상</Text>
                    <View style={[styles.row, styles.justifyContentCenter, styles.widthFull, styles.mt5]}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={review.rate}
                            emptyStar={require('../../assets/images/icon_star_disabled.png')}
                            fullStar={require('../../assets/images/icon_star.png')}
                            halfStar={require('../../assets/images/icon_star_half.png')}
                            iconSet={'Ionicons'}
                            fullStarColor={'#FFBD07'}
                            starSize={25}
                        />
                    </View>
                    <Text style={[styles.fontRegular, styles.font13, styles.mt20, styles.px25]}>
                        {stripHtml(review.content)}
                    </Text>
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentEnd, styles.mt15, styles.px25]}>
                        <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                        <Text style={[styles.fontRegular, styles.font8, {color: '#d1d1d1', marginLeft: 4}]}>{abbreviateNumber(reply_count)}</Text>
                        <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                {is_liked ? (
                                    <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_active.png')} />
                                ) : (
                                    <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />

                                )}
                                <Text style={[styles.fontRegular, styles.font8, {color: '#d1d1d1', marginLeft: 4}]}>{abbreviateNumber(like_count)}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <ModalDropdown options={is_me ? ['수정하기', '삭제하기'] : ['신고하기']}
                        showsVerticalScrollIndicator={false}
                        dropdownStyle={is_me ? {height: 80} : {height: 40}}
                        dropdownTextStyle={{fontSize: 13}}
                        onSelect={this.props.handleOption}
                        >
                            <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon15, styles.ml10]} />
                        </ModalDropdown>
                    </View>
                </Fragment>
                <Modal
                visible={showProfileModal}
                onRequestClose={this.props.closeProfileModal}
                animationType={'fade'}
                transparent={true}
                >
                    <TouchableWithoutFeedback onPress={this.props.closeProfileModal}>
                        <View style={[styles.widthFull, styles.heightFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <View style={[styles.borderRadius10, styles.exMenuShadow, styles.overflowHidden, styles.bgWhite]}>
                                <TouchableOpacity onPress={()=>this._handleGoOthersProfile()}>
                                    {review.author.background_image ? (
                                        <Image source={{uri: review.author.background_image}} resizeMode={'cover'} style={[{height: 140, width: width - 40}, styles.borderTopRadius10, styles.overflowHidden]} />
                                    ) : (
                                        <View style={[{height: 140, width: width - 40}, styles.bgGrayD1, styles.borderTopRadius10]} />
                                    )}
                                </TouchableOpacity>
                                <View style={[styles.bgWhite, styles.px20, styles.py15, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.borderBtmRadius10]}>
                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                        <TouchableOpacity onPress={()=>this._handleGoOthersProfile()}>
                                            {review.author.profile_image ? (
                                                <Image source={{uri: review.author.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                                            ) : (
                                                <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage40]} />
                                            )}
                                        </TouchableOpacity>
                                        <View style={[styles.ml10]}>
                                            <TouchableOpacity onPress={()=>this._handleGoOthersProfile()}>
                                                <Text style={[styles.fontMedium, styles.font16]}>{review.author.nickname}</Text>
                                            </TouchableOpacity>
                                            <View style={[styles.row, styles.alignItemsCenter]}>
                                                <TouchableWithoutFeedback onPress={() => this._openFollowModal('follower')}>
                                                    <View style={[styles.mr5]}>
                                                        <Text style={[styles.fontMedium, styles.font13, styles.grayA7]}>{`팔로워 : ${follower_count}`}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                                <TouchableWithoutFeedback onPress={() => this._openFollowModal('following')}>
                                                    <View style={[styles.ml5]}>
                                                        <Text style={[styles.fontMedium, styles.font13, styles.grayA7]}>{`팔로잉 : ${following_count}`}</Text>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                        {is_me ? null : 
                                            is_following ? (
                                                <View style={[styles.borderRadius5, styles.bgGrayD1, styles.alignItemsCenter, styles.justifyContentCenter, styles.px25, styles.py5]}>
                                                    <TouchableWithoutFeedback onPress={this.props.unfollow}>
                                                        <View>
                                                            <Text style={[styles.fontMedium, styles.font13, styles.white]}>언팔로우</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            ) : (
                                                <View style={[styles.borderRadius5, styles.bgBlue, styles.alignItemsCenter, styles.justifyContentCenter, styles.px25, styles.py5]}>
                                                    <TouchableWithoutFeedback onPress={this.props.follow}>
                                                        <View>
                                                            <Text style={[styles.fontMedium, styles.font13, styles.white]}>팔로우</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            )
                                        }
                                        <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon20]} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                visible={showFollowModal}
                onRequestClose={this.props.closeFollowModal}
                animationType={'fade'}
                transparent={true}
                >
                    <TouchableWithoutFeedback onPress={this.props.closeFollowModal}>
                        <View style={[styles.widthFull, styles.heightFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <View style={[styles.borderRadius10, styles.exMenuShadow, styles.height80, styles.bgWhite, { width: width - 40 }]}>
                                <TabView
                                navigationState={this.state}
                                onIndexChange={index => this.setState({ index })}
                                swipeEnabled={false}
                                renderScene={SceneMap({
                                    first: this._renderFollowerList,
                                    second: this._renderFollowingList
                                })}
                                style={[styles.borderBtmRadius10]}
                                renderTabBar={props =>
                                    <TabBar
                                        {...props}
                                        activeColor = {'#1162d0'}
                                        inactiveColor = {'#000000'}
                                        labelStyle = {[styles.font15, styles.fontMedium]}
                                        bounces={false}
                                        indicatorStyle={{ backgroundColor: '#1162d0', height: 1 }}
                                        style={[styles.bgWhite, styles.borderTopRadius10]}
                                    />
                                }
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </Fragment>
        )
    }
}

export default ArtuiumCard5;