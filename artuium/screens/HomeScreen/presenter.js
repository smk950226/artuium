import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import {RecommendedReviewCard} from '../../components/RecommendedReviewCard/RecommendedReviewCard';
import {
  getImageUriFromReview,
  abbreviateNumber,
  getCardLabelFromReview,
  getCardSubLabelFromReview,
} from '../../util';
import stripHtml from 'string-strip-html';
import {AllReviewCard} from '../../components/AllReviewCard/AllReviewCard';
import {FollowerReviewCard} from '../../components/FollowerReviewCard/FollowerReviewCard';
import {NoFollowerIndicator} from '../../components/NoFollowerIndicator/NoFollowerIndicator';

import moment from 'moment';
import 'moment/locale/ko';

const iosStatusBarHeight = getStatusBarHeight();

const {width, height} = Dimensions.get('window');

class HomeScreen extends Component {
  static propTypes = {
    banners: PropTypes.array,
    newReviews: PropTypes.array,
    recommendedReviews: PropTypes.array,
    followingReviews: PropTypes.array,
    noticeNew: PropTypes.bool.isRequired,
    notificationNew: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      scrollX2: new Animated.Value(0),
    };
  }

  render() {
    const {
      banners,
      newReviews,
      recommendedReviews,
      followingReviews,
      noticeNew,
      notificationNew,
    } = this.props;
    let position = Animated.divide(this.state.scrollX, width);
    let position2 = Animated.divide(this.state.scrollX2, width);

    return (
      <View style={[styles.container, styles.paddingIOS]}>
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            styles.spaceBetween,
            styles.px15,
            {width: width, height: 50, zIndex: 998},
          ]}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Alert', {
                notificationNew,
                noticeNew,
                handleNoticeNewChange: this.props.handleNoticeNewChange,
                handleNotificationNewChange: this.props
                  .handleNotificationNewChange,
              })
            }>
            <Image
              style={{width: 32, height: 32, zIndex: 999}}
              source={
                noticeNew || notificationNew
                  ? require('../../assets/images/notification_alert.png')
                  : require('../../assets/images/notification.png')
              }
            />
          </TouchableWithoutFeedback>
          <Animated.Image
            style={{opacity: this.headerOpacity, height: 40}}
            resizeMode={'contain'}
            source={require('../../assets/images/icon_horizontal.png')}
          />

          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Search')}>
            <Image
              style={{width: 32, height: 32}}
              source={require('../../assets/images/search.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.container]}>
          <ScrollView>
            {banners && banners.length > 0 ? (
              <ScrollView
                alwaysBounceVertical={false}
                alwaysBounceVertical={false}
                horizontal={true}
                pagingEnabled={true}
                style={[styles.bgWhite, {width, height: 280, zIndex: 10}]}>
                {banners.map((ban, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() =>
                      this.props.navigation.navigate('Alert', {
                        notificationNew,
                        noticeNew,
                        handleNoticeNewChange: this.props.handleNoticeNewChange,
                        handleNotificationNewChange: this.props
                          .handleNotificationNewChange,
                        index: 1,
                      })
                    }>
                    <View>
                      <Image
                        source={{uri: ban.image ? ban.image : ''}}
                        resizeMode={'stretch'}
                        style={[{height: '100%', width}]}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            ) : (
              <ScrollView
                alwaysBounceVertical={false}
                scrollEventThrottle={16}
                alwaysBounceVertical={false}
                horizontal={true}
                pagingEnabled={true}
                style={[styles.bgWhite, {width, height: 280, zIndex: 10}]}>
                <Image
                  resizeMode={'cover'}
                  source={require('../../assets/images/mona.jpeg')}
                  resizeMode={'cover'}
                  style={[{height: '100%', width}]}
                />
                <Image
                  resizeMode={'cover'}
                  source={require('../../assets/images/monc.jpg')}
                  resizeMode={'cover'}
                  style={[{height: '100%', width}]}
                />
                <Image
                  resizeMode={'cover'}
                  source={require('../../assets/images/goh.jpeg')}
                  resizeMode={'cover'}
                  style={[{height: '100%', width}]}
                />
              </ScrollView>
            )}
            <View
              style={{
                marginTop: 26,
                marginHorizontal: 18,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
                alignItems: 'flex-end',
              }}>
              <Text
                style={[
                  {
                    fontSize: 18,
                    lineHeight: 30,
                    letterSpacing: -0.24,
                    fontFamily: 'NotoSansKR-Bold',
                  },
                ]}>
                추천 감상
              </Text>
              <Text
                style={[
                  styles.fontMedium,
                  {
                    color: '#767676',
                    letterSpacing: -0.24,
                    fontSize: 14,
                    textDecorationLine: 'underline',
                  },
                ]}
                onPress={() =>
                  this.props.navigation.navigate('RecommendArtwork')
                }>
                전체보기
              </Text>
            </View>
            {recommendedReviews && recommendedReviews.length > 0 ? (
              <ScrollView
                horizontal={true}
                style={{marginBottom: 28}}
                showsHorizontalScrollIndicator={false}>
                {recommendedReviews.map((review, index) => (
                  <RecommendedReviewCard
                    index={index}
                    cardLabel={getCardLabelFromReview(review)}
                    cardSubLabel={getCardSubLabelFromReview(review)}
                    cardImageUri={getImageUriFromReview(review)}
                    chatNum={abbreviateNumber(review.reply_count)}
                    likeNum={abbreviateNumber(review.like_count)}
                    content={stripHtml(review.content)}
                    authorProfile={review.author.profile_image}
                    interactionIcon={review.expression}
                    starRateNum={review.rate}
                    authorName={review.author.nickname}
                    createdAt={moment(review.time).fromNow()}
                    onPress={
                      review.artwork
                        ? () => {
                            this.props.navigation.navigate('ArtworkContent', {
                              artwork: review.artwork,
                              mode: 'review',
                              review: review,
                              from: 'Home',
                            });
                          }
                        : () =>
                            this.props.navigation.navigate(
                              'ExhibitionContent',
                              {
                                exhibition: review.exhibition,
                                mode: 'review',
                                review: review,
                                from: 'Home',
                              },
                            )
                    }
                    type={review.artwork ? 'artwork' : 'exhibition'}
                    reviewTitle={review.title}
                  />
                ))}
              </ScrollView>
            ) : (
              <Text
                style={[
                  styles.fontMedium,
                  styles.font15,
                  styles.mt40,
                  styles.grayA7,
                  styles.textCenter,
                ]}>
                감상이 없습니다.
              </Text>
            )}
            <View style={[styles.widthFull]}>
              <View
                style={[
                  styles.row,
                  styles.alignItemsEnd,
                  styles.justifyContentBetween,
                  styles.mb10,
                  {paddingHorizontal: 18},
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 30,
                    letterSpacing: -0.24,
                    fontFamily: 'NotoSansKR-Bold',
                  }}>
                  새로운 감상
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate('AllArtwork')}>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font14,
                      {
                        color: 'rgb(126,126,126)',
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    전체보기
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <ScrollView
                horizontal={newReviews && newReviews.length > 0 ? true : false}
                alwaysBounceVertical={false}
                pagingEnabled={
                  newReviews && newReviews.length > 0 ? true : false
                }
                scrollEnabled={
                  newReviews && newReviews.length > 0 ? true : false
                }
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.state.scrollX,
                      },
                    },
                  },
                ])}
                scrollEventThrottle={16}>
                {newReviews && newReviews.length > 0 ? (
                  newReviews.map(
                    (review, index) => (
                      console.log(review, 'review'),
                      (
                        <>
                          <AllReviewCard
                            cardLabel={getCardLabelFromReview(review)}
                            cardSubLabel={getCardSubLabelFromReview(review)}
                            cardImageUri={getImageUriFromReview(review)}
                            chatNum={abbreviateNumber(review.reply_count)}
                            likeNum={abbreviateNumber(review.like_count)}
                            content={stripHtml(review.content)}
                            authorProfile={review.author.profile_image}
                            interactionIcon={review.expression}
                            starRateNum={review.rate}
                            authorName={review.author.nickname}
                            createdAt={moment(review.time).fromNow()}
                            onPress={
                              review.artwork
                                ? () =>
                                    this.props.navigation.navigate(
                                      'ArtworkDetail',
                                      {
                                        artwork: review.artwork,
                                        mode: 'review',
                                        review: review,
                                        from: 'Home',
                                      },
                                    )
                                : () =>
                                    this.props.navigation.navigate(
                                      'ExhibitionDetail',
                                      {
                                        exhibition: review.exhibition,
                                        mode: 'review',
                                        review: review,
                                        from: 'Home',
                                      },
                                    )
                            }
                            type={review.artwork ? 'artwork' : 'exhibition'}
                            reviewTitle={review.title}
                          />
                        </>
                      )
                    ),
                  )
                ) : (
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font15,
                      styles.mt40,
                      styles.grayA7,
                      styles.textCenter,
                    ]}>
                    감상이 없습니다.
                  </Text>
                )}
              </ScrollView>
              <View style={[styles.center, styles.mt10, {marginBottom: 38}]}>
                <View style={{flexDirection: 'row'}}>
                  {newReviews &&
                    newReviews.length > 0 &&
                    newReviews.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      });
                      return (
                        <View
                          key={i}
                          style={[
                            styles.sliderDotGrayEmpty,
                            styles.center,
                            {marginRight: 6},
                          ]}>
                          <Animated.View
                            style={[styles.sliderDotGray, {opacity}]}
                          />
                        </View>
                      );
                    })}
                </View>
              </View>
              <View
                style={[
                  styles.row,
                  styles.alignItemsEnd,
                  styles.justifyContentBetween,
                  styles.mb10,
                  {paddingHorizontal: 18},
                ]}>
                <Text
                  style={{
                    fontSize: 18,
                    lineHeight: 30,
                    letterSpacing: -0.24,
                    fontFamily: 'NotoSansKR-Bold',
                  }}>
                  친구들의 감상
                </Text>
                <TouchableWithoutFeedback
                  onPress={() =>
                    this.props.navigation.navigate('FollowArtwork')
                  }>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font14,
                      {
                        color: 'rgb(126,126,126)',
                        textDecorationLine: 'underline',
                      },
                    ]}>
                    전체보기
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <ScrollView
                horizontal={
                  followingReviews && followingReviews.length > 0 ? true : false
                }
                pagingEnabled={
                  followingReviews && followingReviews.length > 0 ? true : false
                }
                scrollEnabled={
                  followingReviews && followingReviews.length > 0 ? true : false
                }
                alwaysBounceVertical={false}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.state.scrollX2,
                      },
                    },
                  },
                ])}
                scrollEventThrottle={16}>
                {followingReviews && followingReviews.length > 0 ? (
                  followingReviews.map((review, index) => (
                    <FollowerReviewCard
                      cardLabel={getCardLabelFromReview(review)}
                      cardSubLabel={getCardSubLabelFromReview(review)}
                      cardImageUri={getImageUriFromReview(review)}
                      chatNum={abbreviateNumber(review.reply_count)}
                      likeNum={abbreviateNumber(review.like_count)}
                      content={stripHtml(review.content)}
                      authorProfile={review.author.profile_image}
                      interactionIcon={review.expression}
                      starRateNum={review.rate}
                      authorName={review.author.nickname}
                      createdAt={moment(review.time).fromNow()}
                      onPress={
                        review.artwork
                          ? () =>
                              this.props.navigation.navigate('ArtworkDetail', {
                                artwork: review.artwork,
                                mode: 'review',
                                review: review,
                                from: 'Home',
                              })
                          : () =>
                              this.props.navigation.navigate(
                                'ExhibitionDetail',
                                {
                                  exhibition: review.exhibition,
                                  mode: 'review',
                                  review: review,
                                  from: 'Home',
                                },
                              )
                      }
                      type={review.artwork ? 'artwork' : 'exhibition'}
                      reviewTitle={review.title}
                    />
                  ))
                ) : (
                  <NoFollowerIndicator />
                )}
              </ScrollView>
              <View style={[styles.center, styles.mt10, {marginBottom: 20}]}>
                <View style={{flexDirection: 'row'}}>
                  {followingReviews &&
                    followingReviews.length > 0 &&
                    followingReviews.map((_, i) => {
                      let opacity = position2.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      });
                      return (
                        <View
                          key={i}
                          style={[
                            styles.sliderDotGrayEmpty,
                            styles.center,
                            {marginRight: 6},
                          ]}>
                          <Animated.View
                            style={[styles.sliderDotGray, {opacity}]}
                          />
                        </View>
                      );
                    })}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
