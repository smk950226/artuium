import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
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

class ReplyCard extends Component {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    replyListMore: PropTypes.func.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    selectReply: PropTypes.func.isRequired,
    selectedReply: PropTypes.object,
    mode: PropTypes.string.isRequired,
    reportUser: PropTypes.func.isRequired,
    handleOption: PropTypes.func.isRequired,
    blockUserList: PropTypes.array,
    blockReplyList: PropTypes.array,
    reply_count: PropTypes.number,
    startUpdateReply: PropTypes.func.isRequired,
    deleted: PropTypes.bool,
  };

  state = {
    index: 0,
    routes: [{key: 'first', title: '팔로워'}, {key: 'second', title: '팔로잉'}],
  };

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

  _handleGoOthersProfile = () => {
    if (this.props.is_me) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('OthersProfile', {
        others: this.props.reply.author,
      });
    }
  };

  render() {
    const {
      reply,
      isLoadingMore,
      hasNextPage,
      selectedReply,
      is_me,
      mode,
      blockUserList,
      blockReplyList,
      reply_count,
      deleted,
    } = this.props;
    return deleted ? null : (
      <TouchableWithoutFeedback>
        <Fragment>
          <View
            style={[
              styles.row,
              styles.justifyContentCenter,
              styles.borderRadius5,
              styles.borderGrayF0,
              styles.mx25,
              styles.mb20,
              styles.py15,
              styles.px20,
              styles.bgWhite,
              selectedReply.id === reply.id ? {zIndex: 9999} : null,
            ]}>
            <TouchableWithoutFeedback onPress={this._handleGoOthersProfile}>
              <View style={[{width: 40}, styles.alignItemsCenter, styles.mr15]}>
                {reply.author.profile_image ? (
                  <Image
                    source={{uri: reply.author.profile_image}}
                    style={[styles.profileImage40]}
                    resizeMode={'cover'}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/empty_profile.png')}
                    style={[styles.profileImage40]}
                  />
                )}
              </View>
            </TouchableWithoutFeedback>
            <View style={[styles.flex1]}>
              <TouchableWithoutFeedback onPress={this._handleGoOthersProfile}>
                <View style={[styles.row, styles.alignItemsCenter]}>
                  <Text style={[styles.fontBold, styles.font14]}>
                    {reply.author.nickname}
                  </Text>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font14,
                      styles.grayBa,
                      styles.ml5,
                    ]}>{`${reply.time.slice(0, 4)}.${reply.time.slice(
                    5,
                    7,
                  )}.${reply.time.slice(8, 10)}`}</Text>
                </View>
              </TouchableWithoutFeedback>
              <Text style={[styles.fontRegular, styles.font13, styles.mt5]}>
                {reply.content}
              </Text>
              <View
                style={[
                  styles.row,
                  styles.alignItemsCenter,
                  styles.justifyContentEnd,
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => this.props.selectReply(reply)}>
                  <View>
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.font13,
                        styles.grayD1,
                        styles.mt1,
                        styles.textUnderline,
                        styles.textRight,
                      ]}>
                      {`대댓글 달기(${abbreviateNumber(reply_count)})`}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                {is_me ? (
                  <ModalDropdown
                    ref={el => (this.dropdown = el)}
                    options={['수정하기', '삭제하기']}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{height: Platform.OS === 'ios' ? 70 : 90}}
                    dropdownTextStyle={{
                      fontSize: 15,
                      height: Platform.OS === 'ios' ? 35 : 45,
                    }}
                    onSelect={this.props.handleOption}>
                    <Image
                      source={require('../../assets/images/icon_dotted.png')}
                      style={[styles.icon20]}
                    />
                  </ModalDropdown>
                ) : (
                  <ModalDropdown
                    ref={el => (this.dropdown = el)}
                    options={['신고하기', '숨기기']}
                    showsVerticalScrollIndicator={false}
                    dropdownStyle={{height: Platform.OS === 'ios' ? 70 : 90}}
                    dropdownTextStyle={{
                      fontSize: 15,
                      height: Platform.OS === 'ios' ? 35 : 45,
                    }}
                    onSelect={this.props.handleOption}>
                    <Image
                      source={require('../../assets/images/icon_dotted.png')}
                      style={[styles.icon20]}
                    />
                  </ModalDropdown>
                )}
              </View>
            </View>
          </View>
          {reply.reply_count > 0 &&
            reply.initial_replies &&
            reply.initial_replies.length > 0 && (
              <View
                style={[styles.alignItemsEnd, styles.mx25, {marginTop: -10}]}>
                {reply.initial_replies.map((reply, idx) => {
                  if (
                    blockUserList.findIndex(id => id === reply.author.id) >=
                      0 ||
                    blockReplyList.findIndex(id => id === reply.id) >= 0
                  ) {
                    return null;
                  } else {
                    return (
                      <View
                        key={idx}
                        style={[
                          styles.borderGrayF0,
                          styles.bgGrayFc,
                          styles.borderRadius5,
                          styles.width80,
                          styles.px10,
                          styles.py10,
                          styles.mb10,
                        ]}>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                          <Text style={[styles.fontBold, styles.font14]}>
                            {typeof reply.author === typeof 'str'
                              ? reply.author
                              : reply.author.nickname}
                          </Text>
                          <Text
                            style={[
                              styles.fontMedium,
                              styles.font14,
                              styles.grayBa,
                              styles.ml5,
                            ]}>{`${reply.time.slice(0, 4)}.${reply.time.slice(
                            5,
                            7,
                          )}.${reply.time.slice(8, 10)}`}</Text>
                          {reply.author.is_me ? (
                            <ModalDropdown
                              ref={el => (this.dropdown = el)}
                              options={['수정하기', '삭제하기']}
                              showsVerticalScrollIndicator={false}
                              dropdownStyle={{
                                height: Platform.OS === 'ios' ? 70 : 90,
                              }}
                              dropdownTextStyle={{
                                fontSize: 15,
                                height: Platform.OS === 'ios' ? 35 : 45,
                              }}
                              onSelect={(index, value) =>
                                this.props.handleOption(
                                  index,
                                  value,
                                  reply.id,
                                  reply.content,
                                )
                              }>
                              <Image
                                source={require('../../assets/images/icon_dotted.png')}
                                style={[styles.icon20]}
                              />
                            </ModalDropdown>
                          ) : (
                            <ModalDropdown
                              ref={el => (this.dropdown = el)}
                              options={['신고하기', '숨기기']}
                              showsVerticalScrollIndicator={false}
                              dropdownStyle={{
                                height: Platform.OS === 'ios' ? 70 : 90,
                              }}
                              dropdownTextStyle={{
                                fontSize: 15,
                                height: Platform.OS === 'ios' ? 35 : 45,
                              }}
                              onSelect={(index, value) =>
                                this.props.handleOption(index, value, reply.id)
                              }>
                              <Image
                                source={require('../../assets/images/icon_dotted.png')}
                                style={[styles.icon20]}
                              />
                            </ModalDropdown>
                          )}
                        </View>
                        <Text
                          style={[
                            styles.fontRegular,
                            styles.font13,
                            styles.mt5,
                          ]}>
                          {reply.content}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            )}
          {reply.reply_count > 3 && hasNextPage && (
            <TouchableWithoutFeedback onPress={this.props.replyListMore}>
              <View
                style={[
                  styles.row,
                  styles.alignItemsCenter,
                  styles.justifyContentEnd,
                  styles.mx25,
                  styles.mb10,
                ]}>
                <Image
                  source={require('../../assets/images/icon_triangle_reverse.png')}
                  style={[styles.icon12]}
                />
                <Text
                  style={[
                    styles.fontMedium,
                    styles.font13,
                    styles.grayD1,
                    styles.mt1,
                    styles.textRight,
                    styles.ml5,
                    isLoadingMore ? {opacity: 0.4} : null,
                  ]}>
                  {`대댓글 더보기`}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Fragment>
      </TouchableWithoutFeedback>
    );
  }
}

export default ReplyCard;
