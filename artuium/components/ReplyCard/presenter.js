import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
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
      <View
        style={[
          styles.justifyContentCenter,
          styles.borderRadius5,
          styles.borderGrayF0,
          styles.bgWhite,
          selectedReply.id === reply.id ? {zIndex: 9999} : null,
          {
            paddingTop: 18,
            paddingBottom: 14,
            marginHorizontal: 12,
            paddingHorizontal: 13,
            marginBottom: 15,
          },
        ]}>
        <TouchableOpacity
          onPress={this._handleGoOthersProfile}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          {reply.author.profile_image ? (
            <Image
              source={{uri: reply.author.profile_image}}
              style={{width: 32, height: 32, borderRadius: 16}}
              resizeMode={'cover'}
            />
          ) : (
            <Image
              source={require('../../assets/images/empty_profile.png')}
              style={{width: 32, height: 32, borderRadius: 16}}
            />
          )}
          <View style={{flexDirection: 'column', marginLeft: 5}}>
            <Text style={[styles.fontRegular, {fontSize: 13}]}>
              {reply.author.nickname}
            </Text>
            <Text
              style={[
                styles.fontMedium,
                styles.font14,
                styles.grayBa,
              ]}>{`${reply.time.slice(0, 4)}.${reply.time.slice(
              5,
              7,
            )}.${reply.time.slice(8, 10)}`}</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.fontRegular, styles.font12, {marginTop: 10}]}>
          {reply.content}
        </Text>
      </View>
    );
  }
}

export default ReplyCard;
