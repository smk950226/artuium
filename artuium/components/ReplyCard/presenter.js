import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
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

class ReplyCard extends Component{
    static propTypes = {
        reply: PropTypes.object.isRequired,
        replyListMore: PropTypes.func.isRequired,
        isLoadingMore: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        selectReply: PropTypes.func.isRequired,
        selectedReply: PropTypes.object,
        showFollowModal: PropTypes.bool.isRequired,
        showProfileModal: PropTypes.bool.isRequired,
        openProfileModal: PropTypes.func.isRequired,
        closeProfileModal: PropTypes.func.isRequired,
        openFollowModal: PropTypes.func.isRequired,
        closeFollowModal: PropTypes.func.isRequired,
        follow: PropTypes.func.isRequired,
        unfollow: PropTypes.func.isRequired,
        is_me: PropTypes.bool.isRequired,
        is_following: PropTypes.bool.isRequired,
        following_count: PropTypes.number.isRequired,
        follower_count: PropTypes.number.isRequired,
        mode: PropTypes.string.isRequired
    }

    state = {
        index: 0,
        routes: [
            { key: 'first', title: '팔로워' },
            { key: 'second', title: '팔로잉' },
        ],
    }

    _renderFollowerList = () => {
        return(
            <FollowerList user={this.props.reply.author} />
        )
    }

    _renderFollowingList = () => {
        return(
            <FollowingList user={this.props.reply.author} />
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
            this.props.navigation.navigate('OthersProfile', {others: this.props.reply.author})
        }
    }

    render(){
        const { reply, isLoadingMore, hasNextPage, selectedReply, showFollowModal, showProfileModal, is_me, is_following, following_count, follower_count, mode } = this.props;
        return(
            <Fragment>
                <TouchableWithoutFeedback>
                    <Fragment>
                    <View style={[styles.row, styles.justifyContentCenter, styles.borderRadius5, styles.borderGrayF0, styles.mx25, styles.mb20, styles.py15, styles.px20, styles.bgWhite, selectedReply.id === reply.id ? { zIndex: 9999 } : null]}>
                        <TouchableWithoutFeedback onPress={this.props.openProfileModal}>
                            <View style={[{width: 40}, styles.alignItemsCenter, styles.mr15]}>
                                {reply.author.profile_image ? (
                                    <Image source={{uri: reply.author.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                                ) : (
                                    <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage40]} />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.flex1]}>
                            <TouchableWithoutFeedback onPress={this.props.openProfileModal}>
                                <View style={[styles.row, styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font14]}>{reply.author.nickname}</Text>
                                    <Text style={[styles.fontMedium, styles.font14, styles.grayBa, styles.ml5]}>{`${reply.time.slice(0,4)}.${reply.time.slice(5,7)}.${reply.time.slice(8,10)}`}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={[styles.fontRegular, styles.font13, styles.mt5]}>
                                {reply.content}
                            </Text>
                            <TouchableWithoutFeedback onPress={() => this.props.selectReply(reply)}>
                                <View>
                                    <Text style={[styles.fontMedium, styles.font13, styles.grayD1, styles.mt1, styles.textUnderline, styles.textRight]}>
                                        {`대댓글 달기(${abbreviateNumber(reply.reply_count)})`}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    {reply.reply_count > 0 && reply.initial_replies && reply.initial_replies.length > 0 && (
                        <View style={[styles.alignItemsEnd, styles.mx25, {marginTop: -10}]}>
                            {reply.initial_replies.map((reply,index) => (
                                <View key={index} style={[styles.borderGrayF0, styles.bgGrayFc, styles.borderRadius5, styles.width80, styles.px10, styles.py10, styles.mb10]}>
                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                        <Text style={[styles.fontBold, styles.font14]}>
                                            {typeof(reply.author) === typeof('str') ? reply.author : reply.author.nickname}
                                        </Text>
                                        <Text style={[styles.fontMedium, styles.font14, styles.grayBa, styles.ml5]}>{`${reply.time.slice(0,4)}.${reply.time.slice(5,7)}.${reply.time.slice(8,10)}`}</Text>
                                    </View>
                                    <Text style={[styles.fontRegular, styles.font13, styles.mt5]}>
                                        {reply.content}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}
                    {reply.reply_count > 3 && hasNextPage && (
                            <TouchableWithoutFeedback onPress={this.props.replyListMore}>
                                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentEnd, styles.mx25, styles.mb10]}>
                                    <Image source={require('../../assets/images/icon_triangle_reverse.png')} style={[styles.icon12]} />
                                    <Text style={[styles.fontMedium, styles.font13, styles.grayD1, styles.mt1, styles.textRight, styles.ml5, isLoadingMore ? {opacity: .4} : null]}>
                                        {`대댓글 더보기`}
                                    </Text>
                                </View>
                        </TouchableWithoutFeedback>

                    )}
                    </Fragment>
                </TouchableWithoutFeedback>
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
                                    {reply.author.background_image ? (
                                        <Image source={{uri: reply.author.background_image}} resizeMode={'cover'} style={[{height: 140, width: width - 40}, styles.borderTopRadius10, styles.overflowHidden]} />
                                    ) : (
                                        <View style={[{height: 140, width: width - 40}, styles.bgGrayD1, styles.borderTopRadius10]} />
                                    )}
                                </TouchableOpacity>
                                <View style={[styles.bgWhite, styles.px20, styles.py15, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.borderBtmRadius10]}>
                                    <View style={[styles.row, styles.alignItemsCenter]}>
                                        <TouchableOpacity onPress={()=>this._handleGoOthersProfile()}>
                                            {reply.author.profile_image ? (
                                                <Image source={{uri: reply.author.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                                            ) : (
                                                <Image source={require('../../assets/images/empty_profile.png')} style={[styles.profileImage40]} />
                                            )}
                                        </TouchableOpacity>
                                        <View style={[styles.ml10]}>
                                            <TouchableOpacity onPress={()=>this._handleGoOthersProfile()}>
                                                <Text style={[styles.fontMedium, styles.font16]}>{reply.author.nickname}</Text>
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

export default ReplyCard;