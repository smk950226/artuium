import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import FollowerList from '../FollowerList';
import FollowingList from '../FollowingList';
import stripHtml from 'string-strip-html';
import ModalDropdown from '../ModalDropdown';

const {width, height} = Dimensions.get('window');

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}

class ArtuiumCard3 extends Component {
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
    handleOption: PropTypes.func.isRequired,
    reportUser: PropTypes.func.isRequired,
    deleted: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: '팔로워'},
        {key: 'second', title: '팔로잉'},
      ],
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!prevProps.hideDropdown && this.props.hideDropdown) {
      if (this.dropdown) {
        this.dropdown.hide();
      }
      if (this.dropdownuser) {
        this.dropdownuser.hide();
      }
    }
  };

  _renderFollowerList = () => {
    return <FollowerList user={this.props.review.author} />;
  };

  _renderFollowingList = () => {
    return <FollowingList user={this.props.review.author} />;
  };

  _openFollowModal = mode => {
    if (mode === 'follower') {
      this.setState({
        index: 0,
      });
    } else {
      this.setState({
        index: 1,
      });
    }
    this.props.openFollowModal(mode);
  };

  _handleGoOthersProfile = () => {
    this.props.closeProfileModal();
    if (this.props.is_me) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('OthersProfile', {
        others: this.props.review.author,
      });
    }
  };

  render() {
    const {
      review,
      is_liked,
      like_count,
      reply_count,
      showProfileModal,
      showFollowModal,
      is_me,
      is_following,
      follower_count,
      following_count,
      my,
      deleted,
    } = this.props;
    if (deleted) {
      return null;
    } else {
      return (
        <Fragment>
          <TouchableWithoutFeedback
            onPress={() => this.props.handleChangeMode('review', review)}>
            <View
              style={
                my
                  ? [
                      {width: width - 20, height: 160},
                      styles.px15,
                      styles.center,
                    ]
                  : null
              }>
              <View
                style={[
                  styles.py20,
                  styles.px20,
                  styles.mx10,
                  styles.justifyContentBetween,
                  my
                    ? [
                        {
                          borderRadius: 5,
                          backgroundColor: '#f2f2f2',
                          height: '100%',
                        },
                        styles.exMenuShadow,
                        styles.widthFull,
                      ]
                    : {borderBottomColor: '#e6e6e6', borderBottomWidth: 1},
                ]}>
                <View>
                  <View style={[styles.row, styles.justifyContentBetween]}>
                    <TouchableWithoutFeedback
                      onPress={this.props.openProfileModal}>
                      <View style={[styles.row]}>
                        <View>
                          {review.author.profile_image ? (
                            <Image
                              source={{uri: review.author.profile_image}}
                              style={[styles.profileImage40]}
                              resizeMode={'cover'}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/images/empty_profile.png')}
                              style={[styles.profileImage40]}
                            />
                          )}
                          {review.expression === 'good' && (
                            <Image
                              source={require('../../assets/images/icon_good.png')}
                              style={[
                                styles.emoji,
                                {position: 'absolute', top: 26, left: 24},
                              ]}
                              resizeMode={'cover'}
                            />
                          )}
                          {review.expression === 'soso' && (
                            <Image
                              source={require('../../assets/images/icon_soso.png')}
                              style={[
                                styles.emoji,
                                {position: 'absolute', top: 26, left: 24},
                              ]}
                              resizeMode={'cover'}
                            />
                          )}
                          {review.expression === 'sad' && (
                            <Image
                              source={require('../../assets/images/icon_sad.png')}
                              style={[
                                styles.emoji,
                                {position: 'absolute', top: 26, left: 24},
                              ]}
                              resizeMode={'cover'}
                            />
                          )}
                          {review.expression === 'surprise' && (
                            <Image
                              source={require('../../assets/images/icon_surprise.png')}
                              style={[
                                styles.emoji,
                                {position: 'absolute', top: 26, left: 24},
                              ]}
                              resizeMode={'cover'}
                            />
                          )}
                          {review.expression === 'thumb' && (
                            <Image
                              source={require('../../assets/images/icon_thumb.png')}
                              style={[
                                styles.emoji,
                                {position: 'absolute', top: 26, left: 24},
                              ]}
                              resizeMode={'cover'}
                            />
                          )}
                        </View>
                        <View style={[styles.ml10]}>
                          <View style={[styles.row]}>
                            <StarRating
                              disabled={true}
                              maxStars={5}
                              rating={review.rate}
                              emptyStar={require('../../assets/images/icon_star_disabled.png')}
                              fullStar={require('../../assets/images/icon_star.png')}
                              halfStar={require('../../assets/images/icon_star_half.png')}
                              iconSet={'Ionicons'}
                              fullStarColor={'#FFBD07'}
                              starSize={14}
                            />
                          </View>
                          <View style={[styles.row]}>
                            <Text style={[styles.fontBold, styles.font14]}>
                              {review.author.nickname}
                            </Text>
                            <Text
                              style={[
                                styles.fontMedium,
                                styles.font14,
                                styles.grayD1,
                                styles.ml5,
                              ]}>{`${review.time.slice(
                              0,
                              4,
                            )}.${review.time.slice(5, 7)}.${review.time.slice(
                              8,
                              10,
                            )}`}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={[styles.mt10]}>
                    <Text
                      style={[
                        styles.fontRegular,
                        styles.font13,
                        styles.lineHeight20,
                      ]}
                      numberOfLines={4}
                      ellipsizeMode={'tail'}>
                      {stripHtml(review.content)}
                    </Text>
                  </View>
                </View>
                <View
                  style={[
                    styles.row,
                    styles.alignItemsCenter,
                    styles.justifyContentEnd,
                  ]}>
                  <Image
                    source={require('../../assets/images/icon_comment.png')}
                    style={[styles.icon15]}
                  />
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font9,
                      styles.grayD1,
                      styles.ml5,
                    ]}>
                    {abbreviateNumber(reply_count)}
                  </Text>
                  <TouchableWithoutFeedback
                    onPress={is_liked ? this.props.unlike : this.props.like}>
                    <View style={[styles.row, styles.alignItemsCenter]}>
                      {is_liked ? (
                        <Image
                          source={require('../../assets/images/icon_like_active.png')}
                          style={[styles.icon15, styles.ml10]}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/images/icon_like.png')}
                          style={[styles.icon15, styles.ml10]}
                        />
                      )}
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font9,
                          styles.grayD1,
                          styles.ml5,
                        ]}>
                        {abbreviateNumber(like_count)}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <ModalDropdown
                    ref={el => (this.dropdown = el)}
                    options={
                      is_me ? ['수정하기', '삭제하기'] : ['신고하기', '숨기기']
                    }
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{height: Platform.OS === 'ios' ? 70 : 90}}
                    dropdownTextStyle={{
                      fontSize: 15,
                      height: Platform.OS === 'ios' ? 35 : 45,
                    }}
                    onSelect={this.props.handleOption}>
                    <Image
                      source={require('../../assets/images/icon_dotted.png')}
                      style={[styles.icon15, styles.ml10]}
                    />
                  </ModalDropdown>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Modal
            visible={showProfileModal}
            onRequestClose={this.props.closeProfileModal}
            animationType={'fade'}
            transparent={true}>
            <TouchableWithoutFeedback onPress={this.props.closeProfileModal}>
              <View
                style={[
                  styles.widthFull,
                  styles.heightFull,
                  styles.alignItemsCenter,
                  styles.justifyContentCenter,
                ]}>
                <View
                  style={[
                    styles.borderRadius10,
                    styles.exMenuShadow,
                    styles.overflowHidden,
                    styles.bgWhite,
                  ]}>
                  <TouchableOpacity
                    onPress={() => this._handleGoOthersProfile()}>
                    {review.author.background_image ? (
                      <Image
                        source={{uri: review.author.background_image}}
                        resizeMode={'cover'}
                        style={[
                          {height: 140, width: width - 40},
                          styles.borderTopRadius10,
                          styles.overflowHidden,
                        ]}
                      />
                    ) : (
                      <View
                        style={[
                          {height: 140, width: width - 40},
                          styles.bgGrayD1,
                          styles.borderTopRadius10,
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.bgWhite,
                      styles.px20,
                      styles.py15,
                      styles.row,
                      styles.alignItemsCenter,
                      styles.justifyContentBetween,
                      styles.borderBtmRadius10,
                    ]}>
                    <View style={[styles.row, styles.alignItemsCenter]}>
                      <TouchableOpacity
                        onPress={() => this._handleGoOthersProfile()}>
                        {review.author.profile_image ? (
                          <Image
                            source={{uri: review.author.profile_image}}
                            style={[styles.profileImage40]}
                            resizeMode={'cover'}
                          />
                        ) : (
                          <Image
                            source={require('../../assets/images/empty_profile.png')}
                            style={[styles.profileImage40]}
                          />
                        )}
                      </TouchableOpacity>
                      <View style={[styles.ml10]}>
                        <TouchableOpacity
                          onPress={() => this._handleGoOthersProfile()}>
                          <Text style={[styles.fontMedium, styles.font16]}>
                            {review.author.nickname}
                          </Text>
                        </TouchableOpacity>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                          <TouchableWithoutFeedback
                            onPress={() => this._openFollowModal('follower')}>
                            <View style={[styles.mr5]}>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font13,
                                  styles.grayA7,
                                ]}>{`팔로워 : ${follower_count}`}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback
                            onPress={() => this._openFollowModal('following')}>
                            <View style={[styles.ml5]}>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font13,
                                  styles.grayA7,
                                ]}>{`팔로잉 : ${following_count}`}</Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.row, styles.alignItemsCenter]}>
                      {is_me ? null : is_following ? (
                        <View
                          style={[
                            styles.borderRadius5,
                            styles.bgGrayD1,
                            styles.alignItemsCenter,
                            styles.justifyContentCenter,
                            styles.px25,
                            styles.py5,
                          ]}>
                          <TouchableWithoutFeedback
                            onPress={this.props.unfollow}>
                            <View>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font13,
                                  styles.white,
                                ]}>
                                언팔로우
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.borderRadius5,
                            styles.bgBlue,
                            styles.alignItemsCenter,
                            styles.justifyContentCenter,
                            styles.px25,
                            styles.py5,
                          ]}>
                          <TouchableWithoutFeedback onPress={this.props.follow}>
                            <View>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font13,
                                  styles.white,
                                ]}>
                                팔로우
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                      )}
                      {is_me ? (
                        <Image
                          source={require('../../assets/images/icon_dotted.png')}
                          style={[styles.icon20]}
                        />
                      ) : (
                        <ModalDropdown
                          ref={el => (this.dropdownuser = el)}
                          options={['신고하기', '숨기기']}
                          showsVerticalScrollIndicator={false}
                          dropdownStyle={{
                            height: Platform.OS === 'ios' ? 70 : 90,
                          }}
                          dropdownTextStyle={{
                            fontSize: 15,
                            height: Platform.OS === 'ios' ? 35 : 45,
                          }}
                          onSelect={this.props.reportUser}>
                          <Image
                            source={require('../../assets/images/icon_dotted.png')}
                            style={[styles.icon20]}
                          />
                        </ModalDropdown>
                      )}
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
            transparent={true}>
            <TouchableWithoutFeedback onPress={this.props.closeFollowModal}>
              <View
                style={[
                  styles.widthFull,
                  styles.heightFull,
                  styles.alignItemsCenter,
                  styles.justifyContentCenter,
                ]}>
                <View
                  style={[
                    styles.borderRadius10,
                    styles.exMenuShadow,
                    styles.height80,
                    styles.bgWhite,
                    {width: width - 40},
                  ]}>
                  <TabView
                    navigationState={this.state}
                    onIndexChange={index => this.setState({index})}
                    swipeEnabled={false}
                    renderScene={SceneMap({
                      first: this._renderFollowerList,
                      second: this._renderFollowingList,
                    })}
                    style={[styles.borderBtmRadius10]}
                    renderTabBar={props => (
                      <TabBar
                        {...props}
                        activeColor={'#1162d0'}
                        inactiveColor={'#000000'}
                        labelStyle={[styles.font15, styles.fontMedium]}
                        bounces={false}
                        indicatorStyle={{backgroundColor: '#1162d0', height: 1}}
                        style={[styles.bgWhite, styles.borderTopRadius10]}
                      />
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </Fragment>
      );
    }
  }
}

export default ArtuiumCard3;
