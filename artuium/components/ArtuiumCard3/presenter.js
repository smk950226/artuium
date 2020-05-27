import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
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
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    is_me: PropTypes.bool.isRequired,
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
    const {
      review,
      is_liked,
      like_count,
      reply_count,
      is_me,
      my,
      deleted,
    } = this.props;
    if (deleted) {
      return null;
    } else {
      return (
        <TouchableWithoutFeedback
          onPress={() => this.props.handleChangeMode('review', review)}>
          <View
            style={
              my
                ? [{width: width - 20, height: 160}, styles.px15, styles.center]
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
                    onPress={this._handleGoOthersProfile}>
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
                            ]}>{`${review.time.slice(0, 4)}.${review.time.slice(
                            5,
                            7,
                          )}.${review.time.slice(8, 10)}`}</Text>
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
      );
    }
  }
}

export default ArtuiumCard3;
