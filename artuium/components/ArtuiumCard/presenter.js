import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
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

class ArtuiumCard extends Component {
  static propTypes = {
    review: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired,
    is_me: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    is_liked: PropTypes.bool.isRequired,
    like_count: PropTypes.number.isRequired,
    reply_count: PropTypes.number.isRequired,
    from: PropTypes.string,
    handleOption: PropTypes.func.isRequired,
    deleted: PropTypes.bool.isRequired,
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
    const {
      review,
      size,
      is_me,
      is_liked,
      like_count,
      reply_count,
      from,
      deleted,
    } = this.props;
    if (deleted) {
      return null;
    } else {
      return (
        <View
          style={[
            size === 'xsmall' ? {width: width / 2 - 30} : null,
            size === 'small' ? {width: width / 2 - 20} : null,
            size === 'large' ? {width: width - 30} : null,
            size === 'xlarge' ? {width: width} : null,
            styles.mb10,
            size === 'xlarge' ? null : styles.artworkBorder,
            styles.overflowHidden,
          ]}>
          <TouchableWithoutFeedback
            onPress={
              size === 'small'
                ? review.artwork
                  ? () =>
                      this.props.navigation.navigate('ArtworkContent', {
                        artwork: review.artwork,
                        mode: 'review',
                        review: review,
                        from,
                      })
                  : () =>
                      this.props.navigation.navigate('ExhibitionContent', {
                        exhibition: review.exhibition,
                        mode: 'review',
                        review: review,
                        from,
                      })
                : review.artwork
                ? () =>
                    this.props.navigation.navigate('ArtworkDetail', {
                      artwork: review.artwork,
                      mode: 'review',
                      review: review,
                      from,
                    })
                : () =>
                    this.props.navigation.navigate('ExhibitionDetail', {
                      exhibition: review.exhibition,
                      mode: 'review',
                      review: review,
                      from,
                    })
            }>
            <View>
              <ImageBackground
                source={{
                  uri: review.artwork
                    ? review.artwork.image
                    : review.exhibition
                    ? review.exhibition.images &&
                      review.exhibition.images.length > 0
                      ? review.exhibition.images[0].image
                      : ''
                    : '',
                }}
                style={[
                  size === 'small' || size === 'xsmall'
                    ? styles.artworkImage
                    : styles.artworkImageLg,
                  styles.justifyContentEnd,
                ]}
                resizeMode={'cover'}>
                <LinearGradient
                  colors={['#00000000', '#000000']}
                  style={[
                    size === 'small' || size === 'xsmall'
                      ? styles.py5
                      : styles.py20,
                    size === 'small' || size === 'xsmall'
                      ? styles.px10
                      : styles.px15,
                  ]}>
                  {review.artwork ? (
                    <Fragment>
                      <Text
                        style={[
                          styles.fontBold,
                          size === 'small' || size === 'xsmall'
                            ? styles.font15
                            : styles.font20,
                          styles.white,
                        ]}>
                        {review.artwork.name}
                      </Text>
                      <Text
                        style={[
                          styles.fontMedium,
                          size === 'small' || size === 'xsmall'
                            ? styles.font8
                            : styles.font11,
                          styles.white,
                        ]}>
                        {review.artwork.author.name}
                      </Text>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <Text
                        style={[
                          styles.fontBold,
                          size === 'small' || size === 'xsmall'
                            ? styles.font15
                            : styles.font20,
                          styles.white,
                        ]}>
                        <Text style={[styles.yellow]}>{'전시  '}</Text>
                        {review.exhibition ? review.exhibition.name : ''}
                      </Text>
                      <Text
                        style={[
                          styles.fontMedium,
                          size === 'small' || size === 'xsmall'
                            ? styles.font8
                            : styles.font11,
                          styles.white,
                        ]}>
                        {review.exhibition
                          ? `${review.exhibition.open_date.slice(
                              0,
                              4,
                            )}.${review.exhibition.open_date.slice(
                              5,
                              7,
                            )}.${review.exhibition.open_date.slice(
                              8,
                              10,
                            )}-${review.exhibition.close_date.slice(
                              0,
                              4,
                            )}.${review.exhibition.close_date.slice(
                              5,
                              7,
                            )}.${review.exhibition.close_date.slice(8, 10)} ${
                              review.exhibition.gallery.name
                            }`
                          : ''}
                      </Text>
                    </Fragment>
                  )}
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              size === 'xlarge' ? styles.py20 : styles.py10,
              size === 'xlarge' ? styles.px30 : styles.px10,
            ]}>
            {size === 'small' || size === 'xsmall' ? (
              <Fragment>
                <View style={[styles.justifyContentBetween, {height: 180}]}>
                  <View>
                    <TouchableWithoutFeedback
                      onPress={this._handleGoOthersProfile}>
                      <View style={[styles.row, styles.justifyContentBetween]}>
                        <View style={[styles.row]}>
                          <View>
                            {review.author.profile_image ? (
                              <Image
                                source={{uri: review.author.profile_image}}
                                style={[styles.profileImage30]}
                                resizeMode={'cover'}
                              />
                            ) : (
                              <Image
                                source={require('../../assets/images/empty_profile.png')}
                                style={[styles.profileImage30]}
                              />
                            )}
                            {review.expression === 'good' && (
                              <Image
                                source={require('../../assets/images/icon_good.png')}
                                style={[
                                  styles.emoji,
                                  {position: 'absolute', top: 16, left: 16},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'soso' && (
                              <Image
                                source={require('../../assets/images/icon_soso.png')}
                                style={[
                                  styles.emoji,
                                  {position: 'absolute', top: 16, left: 16},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'sad' && (
                              <Image
                                source={require('../../assets/images/icon_sad.png')}
                                style={[
                                  styles.emoji,
                                  {position: 'absolute', top: 16, left: 16},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'surprise' && (
                              <Image
                                source={require('../../assets/images/icon_surprise.png')}
                                style={[
                                  styles.emoji,
                                  {position: 'absolute', top: 16, left: 16},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'thumb' && (
                              <Image
                                source={require('../../assets/images/icon_thumb.png')}
                                style={[
                                  styles.emoji,
                                  {position: 'absolute', top: 16, left: 16},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                          </View>
                          <View style={[styles.ml5]}>
                            <View
                              style={[styles.row, styles.justifyContentStart]}>
                              <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={review.rate}
                                emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                fullStar={require('../../assets/images/icon_star.png')}
                                halfStar={require('../../assets/images/icon_star_half.png')}
                                iconSet={'Ionicons'}
                                fullStarColor={'#FFBD07'}
                                starSize={10}
                              />
                            </View>
                            <View style={[styles.row]}>
                              <Text style={[styles.fontBold, styles.font10]}>
                                {review.author.nickname}
                              </Text>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font10,
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
                        <View>
                          <ModalDropdown
                            ref={el => (this.dropdown = el)}
                            options={
                              is_me
                                ? ['수정하기', '삭제하기']
                                : ['신고하기', '숨기기']
                            }
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={{
                              height: Platform.OS === 'ios' ? 70 : 90,
                            }}
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
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={
                        review.artwork
                          ? () =>
                              this.props.navigation.navigate('ArtworkContent', {
                                artwork: review.artwork,
                                mode: 'review',
                                review: review,
                                from,
                              })
                          : () =>
                              this.props.navigation.navigate(
                                'ExhibitionContent',
                                {
                                  exhibition: review.exhibition,
                                  mode: 'review',
                                  review: review,
                                  from,
                                },
                              )
                      }>
                      <View style={[styles.mt10, {height: 110}]}>
                        <Text
                          style={[
                            styles.fontRegular,
                            styles.font13,
                            styles.lineHeight20,
                          ]}
                          numberOfLines={5}>
                          {stripHtml(review.content)}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={
                      review.artwork
                        ? () =>
                            this.props.navigation.navigate('ArtworkContent', {
                              artwork: review.artwork,
                              mode: 'review',
                              review: review,
                              from,
                            })
                        : () =>
                            this.props.navigation.navigate(
                              'ExhibitionContent',
                              {
                                exhibition: review.exhibition,
                                mode: 'review',
                                review: review,
                                from,
                              },
                            )
                    }>
                    <View
                      style={[
                        styles.row,
                        styles.alignItemsCenter,
                        styles.justifyContentCenter,
                        styles.mt10,
                      ]}>
                      <Image
                        source={require('../../assets/images/icon_comment.png')}
                        style={[styles.icon20]}
                      />
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font14,
                          styles.grayD1,
                          styles.ml5,
                        ]}>
                        {abbreviateNumber(reply_count)}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={
                          is_liked ? this.props.unlike : this.props.like
                        }>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                          {is_liked ? (
                            <Image
                              source={require('../../assets/images/icon_like_active.png')}
                              style={[styles.icon20, styles.ml10]}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/images/icon_like.png')}
                              style={[styles.icon20, styles.ml10]}
                            />
                          )}
                          <Text
                            style={[
                              styles.fontMedium,
                              styles.font14,
                              styles.grayD1,
                              styles.ml5,
                            ]}>
                            {abbreviateNumber(like_count)}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Fragment>
            ) : (
              <Fragment>
                <View style={[styles.justifyContentBetween, {height: 180}]}>
                  <View>
                    <TouchableWithoutFeedback
                      onPress={this._handleGoOthersProfile}>
                      <View style={[styles.row, styles.justifyContentBetween]}>
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
                                  styles.emojiLg,
                                  {position: 'absolute', top: 23, left: 23},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'soso' && (
                              <Image
                                source={require('../../assets/images/icon_soso.png')}
                                style={[
                                  styles.emojiLg,
                                  {position: 'absolute', top: 23, left: 23},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'sad' && (
                              <Image
                                source={require('../../assets/images/icon_sad.png')}
                                style={[
                                  styles.emojiLg,
                                  {position: 'absolute', top: 23, left: 23},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'surprise' && (
                              <Image
                                source={require('../../assets/images/icon_surprise.png')}
                                style={[
                                  styles.emojiLg,
                                  {position: 'absolute', top: 23, left: 23},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                            {review.expression === 'thumb' && (
                              <Image
                                source={require('../../assets/images/icon_thumb.png')}
                                style={[
                                  styles.emojiLg,
                                  {position: 'absolute', top: 23, left: 23},
                                ]}
                                resizeMode={'cover'}
                              />
                            )}
                          </View>
                          <View style={[styles.ml10]}>
                            <View
                              style={[styles.row, styles.justifyContentStart]}>
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
                        <View>
                          <ModalDropdown
                            ref={el => (this.dropdown = el)}
                            options={
                              is_me
                                ? ['수정하기', '삭제하기']
                                : ['신고하기', '숨기기']
                            }
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={{
                              height: Platform.OS === 'ios' ? 70 : 90,
                            }}
                            dropdownTextStyle={{
                              fontSize: 15,
                              height: Platform.OS === 'ios' ? 35 : 45,
                            }}
                            onSelect={this.props.handleOption}>
                            <Image
                              source={require('../../assets/images/icon_dotted.png')}
                              style={[styles.icon30]}
                            />
                          </ModalDropdown>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={
                        review.artwork
                          ? () =>
                              this.props.navigation.navigate('ArtworkContent', {
                                artwork: review.artwork,
                                mode: 'review',
                                review: review,
                                from,
                              })
                          : () =>
                              this.props.navigation.navigate(
                                'ExhibitionContent',
                                {
                                  exhibition: review.exhibition,
                                  mode: 'review',
                                  review: review,
                                  from,
                                },
                              )
                      }>
                      <View style={[styles.mt10]}>
                        <Text
                          style={[
                            styles.fontRegular,
                            styles.font13,
                            styles.lineHeight20,
                          ]}
                          numberOfLines={4}>
                          {stripHtml(review.content)}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={
                      review.artwork
                        ? () =>
                            this.props.navigation.navigate('ArtworkContent', {
                              artwork: review.artwork,
                              mode: 'review',
                              review: review,
                              from,
                            })
                        : () =>
                            this.props.navigation.navigate(
                              'ExhibitionContent',
                              {
                                exhibition: review.exhibition,
                                mode: 'review',
                                review: review,
                                from,
                              },
                            )
                    }>
                    <View
                      style={[
                        styles.row,
                        styles.alignItemsCenter,
                        styles.justifyContentCenter,
                        styles.mt10,
                      ]}>
                      <Image
                        source={require('../../assets/images/icon_comment.png')}
                        style={[styles.icon30]}
                      />
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font15,
                          styles.grayD1,
                          styles.ml5,
                        ]}>
                        {abbreviateNumber(reply_count)}
                      </Text>
                      <TouchableWithoutFeedback
                        onPress={
                          is_liked ? this.props.unlike : this.props.like
                        }>
                        <View style={[styles.row, styles.alignItemsCenter]}>
                          {is_liked ? (
                            <Image
                              source={require('../../assets/images/icon_like_active.png')}
                              style={[styles.icon30, styles.ml20]}
                            />
                          ) : (
                            <Image
                              source={require('../../assets/images/icon_like.png')}
                              style={[styles.icon30, styles.ml20]}
                            />
                          )}
                          <Text
                            style={[
                              styles.fontMedium,
                              styles.font15,
                              styles.grayD1,
                              styles.ml5,
                            ]}>
                            {abbreviateNumber(like_count)}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </Fragment>
            )}
          </View>
        </View>
      );
    }
  }
}

export default ArtuiumCard;
