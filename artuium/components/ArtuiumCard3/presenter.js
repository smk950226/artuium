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
import {
  chatNumIconGrey,
  heartNumIconGrey,
  fullStar,
  halfStar,
  emptyStar,
} from '../../assets/images';
import {deviceInfo} from '../../util';
import moment from 'moment';
import 'moment/locale/ko';

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
        <TouchableOpacity
          onPress={() => this.props.handleChangeMode('review', review)}
          style={{
            marginTop: my ? 15 : 0,
            paddingTop: 18,
            paddingBottom: my ? 15 : 24,
            paddingHorizontal: my ? 15 : 7,
            width: deviceInfo.size.width - 36,
            alignSelf: 'center',
            backgroundColor: my ? '#f1f1f1' : '#fff',
            borderRadius: my ? 5 : 0,
            overflow: 'hidden',
          }}>
          {review.title && (
            <Text style={{fontSize: my ? 15 : 18, marginBottom: 25}}>
              {review.title}
            </Text>
          )}

          <View style={[styles.row, styles.justifyContentBetween]}>
            <TouchableWithoutFeedback onPress={this._handleGoOthersProfile}>
              <View style={[styles.row]}>
                {review.author.profile_image ? (
                  <Image
                    source={{uri: review.author.profile_image}}
                    style={{width: 36, height: 36, borderRadius: 18}}
                    resizeMode={'cover'}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/empty_profile.png')}
                    style={{width: 36, height: 36, borderRadius: 18}}
                  />
                )}
                <View style={{marginLeft: 5}}>
                  <View style={[styles.row]}>
                    <Text style={[styles.fontRegular, {fontSize: 13}]}>
                      {review.author.nickname}
                    </Text>
                  </View>
                  <View style={[styles.row]}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={review.rate}
                      emptyStar={emptyStar}
                      fullStar={fullStar}
                      halfStar={halfStar}
                      iconSet={'Ionicons'}
                      fullStarColor={'#FFBD07'}
                      starSize={15}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{marginTop: 14}}>
            <Text
              style={[
                styles.fontRegular,
                styles.font13,
                styles.lineHeight20,
                {color: '#5f5f5f'},
              ]}
              numberOfLines={4}
              ellipsizeMode={'tail'}>
              {stripHtml(review.content)}
            </Text>
          </View>

          <View
            style={[
              styles.row,
              styles.alignItemsCenter,
              {
                justifyContent: 'space-between',
                marginTop: 17,
              },
            ]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={chatNumIconGrey} style={{width: 18, height: 18}} />
              <Text
                style={[
                  styles.fontMedium,
                  styles.grayD1,
                  {fontSize: 13, marginLeft: 3},
                ]}>
                {abbreviateNumber(reply_count)}
              </Text>
              <TouchableWithoutFeedback
                onPress={is_liked ? this.props.unlike : this.props.like}>
                <View style={[styles.row, styles.alignItemsCenter]}>
                  <Image
                    source={
                      is_liked
                        ? require('../../assets/images/icon_like_active.png')
                        : heartNumIconGrey
                    }
                    style={[styles.ml10, {width: 18, height: 18}]}
                  />
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.grayD1,
                      {fontSize: 13, marginLeft: 3},
                    ]}>
                    {abbreviateNumber(like_count)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Text
              style={[
                styles.fontMedium,
                styles.font14,
                styles.grayD1,
                styles.ml5,
              ]}>
              {moment(review.time).fromNow()}
            </Text>

            {/* <ModalDropdown
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
            </ModalDropdown> */}
          </View>
        </TouchableOpacity>
      );
    }
  }
}

export default ArtuiumCard3;
