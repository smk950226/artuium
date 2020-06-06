import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import stripHtml from 'string-strip-html';
import ModalDropdown from '../ModalDropdown';
import {backArrow, emptyStar, fullStar, halfStar} from '../../assets/images';

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

class ArtuiumCard5 extends Component {
  static propTypes = {
    review: PropTypes.object.isRequired,
    is_liked: PropTypes.bool.isRequired,
    like_count: PropTypes.number.isRequired,
    reply_count: PropTypes.number.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    is_me: PropTypes.bool.isRequired,
    my: PropTypes.bool,
    handleChangeMode: PropTypes.func,
    handleOption: PropTypes.func.isRequired,
    reportUser: PropTypes.func.isRequired,
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

  _handleGoOthersProfile = () => {
    if (this.props.is_me) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.navigation.navigate('OthersProfile', {
        others: this.props.review.author,
      });
    }
  };

  render() {
    const {review, is_liked, like_count, reply_count, is_me, my} = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.handleChangeMode('list')}
          style={{marginTop: 22, marginLeft: 17, marginBottom: 22}}>
          <Image style={[{width: 24, height: 24}]} source={backArrow} />
        </TouchableOpacity>
        {review.title && (
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              fontFamily: 'Noto Sans KR',
            }}>
            {review.title}
          </Text>
        )}
        <TouchableOpacity
          onPress={this._handleGoOthersProfile}
          style={[styles.alignItemsCenter, {marginTop: 30}]}>
          <Image
            source={
              review.author.profile_image
                ? {uri: review.author.profile_image}
                : require('../../assets/images/empty_profile.png')
            }
            style={[styles.profileImage40]}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={this._handleGoOthersProfile}>
          <View>
            <Text
              style={[
                styles.fontBold,
                styles.font20,
                styles.mt5,
                styles.textCenter,
              ]}>
              {review.author.nickname}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.row,
            styles.justifyContentCenter,
            styles.widthFull,
            styles.mt5,
          ]}>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={review.rate}
            emptyStar={emptyStar}
            fullStar={fullStar}
            halfStar={halfStar}
            iconSet={'Ionicons'}
            fullStarColor={'##FA4D2C'}
            starSize={15}
          />
        </View>
        <Text
          style={[
            styles.fontRegular,
            styles.mt20,
            styles.px25,
            {fontSize: 14},
          ]}>
          {stripHtml(review.content)}
        </Text>
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            styles.justifyContentEnd,
            styles.mt15,
            styles.px25,
          ]}>
          {/* <Image
            style={{width: 15, height: 15}}
            source={require('../../assets/images/icon_comment.png')}
          />
          <Text
            style={[
              styles.fontRegular,
              styles.font8,
              {color: '#d1d1d1', marginLeft: 4},
            ]}>
            {abbreviateNumber(reply_count)}
          </Text>
          <TouchableWithoutFeedback
            onPress={is_liked ? this.props.unlike : this.props.like}>
            <View style={[styles.row, styles.alignItemsCenter]}>
              {is_liked ? (
                <Image
                  style={[styles.ml15, {width: 13, height: 12}]}
                  source={require('../../assets/images/icon_like_active.png')}
                />
              ) : (
                <Image
                  style={[styles.ml15, {width: 13, height: 12}]}
                  source={require('../../assets/images/icon_like.png')}
                />
              )}
              <Text
                style={[
                  styles.fontRegular,
                  styles.font8,
                  {color: '#d1d1d1', marginLeft: 4},
                ]}>
                {abbreviateNumber(like_count)}
              </Text>
            </View>
          </TouchableWithoutFeedback> */}
          {/* <ModalDropdown
            ref={el => (this.dropdown = el)}
            options={is_me ? ['수정하기', '삭제하기'] : ['신고하기', '숨기기']}
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
          </ModalDropdown> */}
        </View>
      </View>
    );
  }
}

export default ArtuiumCard5;
