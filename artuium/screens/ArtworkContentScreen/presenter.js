import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from '../../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ArtuiumCard3 from '../../components/ArtuiumCard3';
import ArtuiumCard5 from '../../components/ArtuiumCard5';
import ReplyCard from '../../components/ReplyCard';
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import Stars from 'react-native-stars';
import {StackActions, NavigationActions} from 'react-navigation';
import Modal from 'react-native-modal';
import {
  screenEscapeIcon,
  chatNumIconGrey,
  heartNumIconGrey,
  writeReviewIcon,
  halfStar,
  fullStar,
  emptyStar,
  backArrow,
  chatNumIconBlack,
  heartNumIconBlack,
} from '../../assets/images';
import {checkIsActiveExhibition, deviceInfo} from '../../util';

const {width, height} = Dimensions.get('window');

const filter = [
  {
    label: '신규순',
    value: 'new',
  },
  {
    label: '많은 댓글 순',
    value: 'comment',
  },
  {
    label: '많은 좋아요 순',
    value: 'like',
  },
  {
    label: '높은 별점 순',
    value: 'rate',
  },
];

const filterReply = [
  {
    label: '신규순',
    value: 'new',
  },
  {
    label: '많은 댓글 순',
    value: 'comment',
  },
];

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

class ArtworkContentScreen extends React.Component {
  static propTypes = {
    artwork: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    is_liked: PropTypes.bool.isRequired,
    like_count: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    reviews: PropTypes.array,
    isLoadingMore: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    reviewListMore: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    is_reviewed: PropTypes.bool.isRequired,
    myReviews: PropTypes.array,
    thumb: PropTypes.number,
    good: PropTypes.number,
    soso: PropTypes.number,
    sad: PropTypes.number,
    surprise: PropTypes.number,
    handleChangeMode: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    handleChangeExpression: PropTypes.func.isRequired,
    expression: PropTypes.string.isRequired,
    rating: PropTypes.number,
    handleChangeRating: PropTypes.func.isRequired,
    handleChangeContent: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
    isSubmittingReview: PropTypes.bool.isRequired,
    total_rate: PropTypes.number.isRequired,
    submit: PropTypes.func.isRequired,
    showingReview: PropTypes.object,
    replyListMore: PropTypes.func.isRequired,
    replies: PropTypes.array,
    isLoadingMoreReply: PropTypes.bool.isRequired,
    hasNextPageReply: PropTypes.bool.isRequired,
    loadingReply: PropTypes.bool.isRequired,
    refreshReply: PropTypes.func.isRequired,
    refreshingReply: PropTypes.bool.isRequired,
    handleChangeContentReply: PropTypes.func.isRequired,
    contentReply: PropTypes.string.isRequired,
    isSubmittingReply: PropTypes.bool.isRequired,
    createReview: PropTypes.func.isRequired,
    selectReply: PropTypes.func.isRequired,
    selectedReply: PropTypes.object.isRequired,
    handleUpdateMode: PropTypes.func.isRequired,
    deleteReview: PropTypes.func.isRequired,
    blockReviewList: PropTypes.array,
    blockUserList: PropTypes.array,
    blockReplyList: PropTypes.array,
    addBlockReview: PropTypes.func.isRequired,
    addBlockUser: PropTypes.func.isRequired,
    addBlockReply: PropTypes.func.isRequired,
    showFilterModal: PropTypes.bool.isRequired,
    openFilterModal: PropTypes.func.isRequired,
    closeFilterModal: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    showFilterReplyModal: PropTypes.bool.isRequired,
    openFilterReplyModal: PropTypes.func.isRequired,
    closeFilterReplyModal: PropTypes.func.isRequired,
    handleFilterReplyChange: PropTypes.func.isRequired,
    updateReply: PropTypes.func.isRequired,
    startUpdateReply: PropTypes.func.isRequired,
    selectedReplyId: PropTypes.number,
    newReply: PropTypes.object,
  };
  constructor(props) {
    super(props);
    const {initialMode} = props;
    this.state = {
      index: initialMode
        ? initialMode === 'review' ||
          initialMode === 'list' ||
          initialMode === 'create'
          ? 1
          : 0
        : 0,
      initialMode,
      keyboardHeight: 0,
      isReviewEditingEnable: false,
    };

    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      keyboardHeight: 0,
    });
  };

  renderDotLine = () => {
    const dots = [];
    for (let i = 0; i < 60; i++) {
      dots.push(
        <View style={{flex: 1, backgroundColor: i % 2 ? '#c4c4c4' : '#fff'}} />,
      );
    }
    return (
      <View
        style={{
          width: width - 25,
          flexDirection: 'row',
          height: 1,
          alignSelf: 'center',
          marginTop: 38,
        }}>
        {dots}
      </View>
    );
  };

  _goUpdate = review => {
    this.setState({
      initialMode: 'create',
      index: 1,
    });
    this.props.handleUpdateMode(review);
  };

  _startUpdateReply = (selectedReplyId, content, reReply) => {
    if (this.btmTextInput) {
      this.btmTextInput.focus();
      this.props.startUpdateReply(selectedReplyId, content, reReply);
    }
  };

  render() {
    const {
      artwork,
      is_liked,
      like_count,
      review_count,
      reviews,
      isLoadingMore,
      hasNextPage,
      refreshing,
      loading,
      is_reviewed,
      myReviews,
      thumb,
      good,
      soso,
      sad,
      surprise,
      mode,
      expression,
      rating,
      content,
      title,
      isSubmittingReview,
      total_rate,
      showingReview,
      replies,
      isLoadingMoreReply,
      hasNextPageReply,
      loadingReply,
      refreshingReply,
      contentReply,
      isSubmittingReply,
      selectedReply,
      from,
      blockReviewList,
      blockUserList,
      blockReplyList,
      to,
      showFilterModal,
      showFilterReplyModal,
      selectedReplyId,
      newReply,
    } = this.props;
    const {initialMode, keyboardHeight} = this.state;
    if (artwork) {
      return (
        <View style={[styles.container]}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                position: 'absolute',
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#C4C4C4',
                left: 13,
                top: 42,
                zIndex: 99,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={screenEscapeIcon} />
            </View>
          </TouchableWithoutFeedback>

          <ScrollView
            contentContainerStyle={
              mode === 'create' ? {flex: 1} : {alignItems: 'center'}
            }
            style={[{width: deviceInfo.size.width}]}
            bounces={false}
            showsVerticalScrollIndicator={false}
            ref={'scrollView'}>
            <ImageBackground
              resizeMode={'cover'}
              source={{uri: artwork.image ? artwork.image : ''}}
              style={[
                Platform.OS === 'ios' ? styles.paddingIOS : null,
                styles.justifyContentEnd,
                {height: height * 0.25},
              ]}
            />
            <View style={[styles.pb10, {flex: 1, width: '100%'}]}>
              <View
                style={[
                  styles.bgWhite,
                  styles.widthFull,
                  {paddingBottom: 40, minHeight: '100%', alignItems: 'center'},
                ]}>
                <View style={{marginTop: 39, alignItems: 'center'}}>
                  <Text
                    style={{
                      height: 32,
                      fontSize: 24,
                      fontFamily: 'NotoSansKR-Bold',
                      lineHeight: 32,
                      marginTop: 5,
                      maxWidth: deviceInfo.size.width - 60,
                    }}>
                    {artwork.name}
                  </Text>
                  <Text
                    style={{
                      height: 20,
                      fontSize: 14,
                      fontFamily: 'NotoSansKR-Regular',
                      marginTop: 5,
                    }}>
                    {artwork.author.name}, {`${artwork.created.slice(0, 4)}`},{' '}
                    {artwork.material}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 11,
                      alignItems: 'center',
                    }}>
                    <Image source={chatNumIconGrey} />
                    <Text
                      style={{
                        marginRight: 12,
                        fontSize: 13,
                        lineHeight: 20,
                        fontFamily: 'NotoSansKR-Regular',
                        colro: '#2e2e2e',
                        opacity: 0.6,
                      }}>
                      {' '}
                      {abbreviateNumber(review_count)}
                    </Text>
                    <Image source={heartNumIconGrey} style={{marginRight: 6}} />
                    <Text
                      style={{
                        fontSize: 13,
                        lineHeight: 20,
                        fontFamily: 'NotoSansKR-Regular',
                        colro: '#2e2e2e',
                        opacity: 0.6,
                      }}>
                      {abbreviateNumber(like_count)}
                    </Text>
                  </View>
                </View>
                {this.renderDotLine()}
                <View style={[styles.row, styles.mt15, {marginHorizontal: 18}]}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        index: 0,
                      })
                    }>
                    <View
                      style={[
                        styles.alignItemsCenter,
                        {flex: 1, height: 30, borderBottomWidth: 2},
                        this.state.index === 0
                          ? {borderBottomColor: '#2e2e2e'}
                          : {borderBottomColor: '#aaa'},
                      ]}>
                      <Text
                        style={[
                          styles.font14,
                          {
                            color: '#000000',
                            opacity: this.state.index === 0 ? 1 : 0.3,
                          },
                        ]}>
                        정보
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.setState({
                        index: 1,
                      })
                    }>
                    <View
                      style={[
                        styles.alignItemsCenter,
                        {flex: 1, height: 30, borderBottomWidth: 2},
                        this.state.index === 1
                          ? {borderBottomColor: '#2e2e2e'}
                          : {borderBottomColor: '#aaa'},
                      ]}>
                      <Text
                        style={[
                          styles.font14,
                          {
                            color: '#000000',
                            opacity: this.state.index === 1 ? 1 : 0.3,
                          },
                        ]}>
                        감상
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={[{flex: 1}]}>
                  {this.state.index === 0 ? (
                    <View style={{width: width - 80, minHeight: 300}}>
                      <View style={[{marginTop: 25}]}>
                        <HTML html={artwork.content} imagesMaxWidth={width} />
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 1}}>
                      {mode === 'list' && (
                        <>
                          <View
                            style={[
                              styles.bgWhite,
                              styles.center,
                              is_reviewed
                                ? {width: '100%', minHeight: 185}
                                : {width: '100%', height: 170},
                            ]}>
                            {is_reviewed ? (
                              loading ? (
                                <View
                                  style={[
                                    styles.container,
                                    styles.alignItemsCenter,
                                    styles.justifyContentCenter,
                                  ]}>
                                  <ActivityIndicator
                                    size={'small'}
                                    color={'#000'}
                                  />
                                </View>
                              ) : myReviews && myReviews.length > 0 ? (
                                <Fragment>
                                  <ScrollView
                                    scrollEnabled={
                                      myReviews.length > 1 ? true : false
                                    }
                                    pagingEnabled={true}
                                    horizontal={true}
                                    alwaysBounceVertical={false}
                                    showsHorizontalScrollIndicator={false}
                                    style={[{height: 160}, styles.mt15]}>
                                    {myReviews.map((review, index) => {
                                      if (
                                        blockReviewList.findIndex(
                                          id => id === review.id,
                                        ) >= 0 ||
                                        blockUserList.findIndex(
                                          id => id === review.author.id,
                                        ) >= 0
                                      ) {
                                        return null;
                                      } else {
                                        return (
                                          <ArtuiumCard3
                                            addBlockReview={
                                              this.props.addBlockReview
                                            }
                                            addBlockUser={
                                              this.props.addBlockUser
                                            }
                                            deleteReview={
                                              this.props.deleteReview
                                            }
                                            goUpdate={this._goUpdate}
                                            from={from}
                                            key={index}
                                            review={review}
                                            navigation={this.props.navigation}
                                            my={true}
                                            handleChangeMode={
                                              this.props.handleChangeMode
                                            }
                                          />
                                        );
                                      }
                                    })}
                                  </ScrollView>
                                  <View style={[styles.widthFull, styles.px15]}>
                                    <Text
                                      style={[
                                        styles.fontBlack,
                                        styles.font13,
                                        styles.mt20,
                                        {opacity: 0.16},
                                      ]}>
                                      통계
                                    </Text>
                                    <View
                                      style={[
                                        styles.row,
                                        styles.justifyContentCenter,
                                        styles.mb20,
                                        styles.alignItemsEnd,
                                      ]}>
                                      <View
                                        style={[
                                          styles.alignItemsCenter,
                                          styles.mr20,
                                        ]}>
                                        <Text
                                          style={[
                                            styles.fontBlack,
                                            {fontSize: 45},
                                          ]}>
                                          {total_rate.toFixed(1)}
                                        </Text>
                                        <StarRating
                                          disabled={true}
                                          maxStars={5}
                                          rating={total_rate}
                                          emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                          fullStar={require('../../assets/images/icon_star.png')}
                                          halfStar={require('../../assets/images/icon_star_half.png')}
                                          iconSet={'Ionicons'}
                                          fullStarColor={'#FFBD07'}
                                          starSize={18}
                                        />
                                      </View>
                                      <View
                                        style={[
                                          styles.row,
                                          styles.justifyContentCenter,
                                          styles.alignItemsCenter,
                                          styles.ml20,
                                          styles.mb10,
                                        ]}>
                                        <View
                                          style={[
                                            styles.justifyContentBetween,
                                            styles.alignItemsCenter,
                                            styles.mr20,
                                          ]}>
                                          <View
                                            style={[
                                              {height: 45, width: 5},
                                              styles.justifyContentEnd,
                                            ]}>
                                            <LinearGradient
                                              colors={['#000000', '#9b9b9b']}
                                              style={[
                                                {
                                                  height: `${thumb * 100}%`,
                                                  width: 5,
                                                },
                                              ]}
                                            />
                                          </View>
                                          <Image
                                            source={require('../../assets/images/icon_thumb.png')}
                                            style={[styles.emoji]}
                                            resizeMode={'cover'}
                                          />
                                        </View>
                                        <View
                                          style={[
                                            styles.justifyContentBetween,
                                            styles.alignItemsCenter,
                                            styles.mr20,
                                          ]}>
                                          <View
                                            style={[
                                              {height: 45, width: 5},
                                              styles.justifyContentEnd,
                                            ]}>
                                            <LinearGradient
                                              colors={['#000000', '#9b9b9b']}
                                              style={[
                                                {
                                                  height: `${sad * 100}%`,
                                                  width: 5,
                                                },
                                              ]}
                                            />
                                          </View>
                                          <Image
                                            source={require('../../assets/images/icon_sad.png')}
                                            style={[styles.emoji]}
                                            resizeMode={'cover'}
                                          />
                                        </View>
                                        <View
                                          style={[
                                            styles.justifyContentBetween,
                                            styles.alignItemsCenter,
                                            styles.mr20,
                                          ]}>
                                          <View
                                            style={[
                                              {height: 45, width: 5},
                                              styles.justifyContentEnd,
                                            ]}>
                                            <LinearGradient
                                              colors={['#000000', '#9b9b9b']}
                                              style={[
                                                {
                                                  height: `${soso * 100}%`,
                                                  width: 5,
                                                },
                                              ]}
                                            />
                                          </View>
                                          <Image
                                            source={require('../../assets/images/icon_soso.png')}
                                            style={[styles.emoji]}
                                            resizeMode={'cover'}
                                          />
                                        </View>
                                        <View
                                          style={[
                                            styles.justifyContentBetween,
                                            styles.alignItemsCenter,
                                            styles.mr20,
                                          ]}>
                                          <View
                                            style={[
                                              {height: 45, width: 5},
                                              styles.justifyContentEnd,
                                            ]}>
                                            <LinearGradient
                                              colors={['#000000', '#9b9b9b']}
                                              style={[
                                                {
                                                  height: `${surprise * 100}%`,
                                                  width: 5,
                                                },
                                              ]}
                                            />
                                          </View>
                                          <Image
                                            source={require('../../assets/images/icon_surprise.png')}
                                            style={[styles.emoji]}
                                            resizeMode={'cover'}
                                          />
                                        </View>
                                        <View
                                          style={[
                                            styles.justifyContentBetween,
                                            styles.alignItemsCenter,
                                          ]}>
                                          <View
                                            style={[
                                              {height: 45, width: 5},
                                              styles.justifyContentEnd,
                                            ]}>
                                            <LinearGradient
                                              colors={['#000000', '#9b9b9b']}
                                              style={[
                                                {
                                                  height: `${good * 100}%`,
                                                  width: 5,
                                                },
                                              ]}
                                            />
                                          </View>
                                          <Image
                                            source={require('../../assets/images/icon_good.png')}
                                            style={[styles.emoji]}
                                            resizeMode={'cover'}
                                          />
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </Fragment>
                              ) : (
                                <TouchableWithoutFeedback
                                  onPress={() =>
                                    this.props.handleChangeMode('create')
                                  }>
                                  <View
                                    style={{
                                      width: width - 36,
                                      paddingVertical: 20,
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      backgroundColor: '#f1f1f1',
                                      borderRadius: 5,
                                    }}>
                                    <Image
                                      source={writeReviewIcon}
                                      style={[
                                        {
                                          width: 32,
                                          height: 32,
                                          borderRadius: 16,
                                        },
                                        styles.mb10,
                                      ]}
                                    />
                                    <Text
                                      style={[
                                        styles.textCenter,
                                        styles.fontMedium,
                                        styles.font13,
                                        {color: '#383838', opacity: 0.5},
                                      ]}>
                                      감상을 작성하면{'\n'}작품 평점을 알 수
                                      있습니다.
                                    </Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              )
                            ) : (
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  this.props.handleChangeMode('create')
                                }>
                                <View
                                  style={{
                                    width: width - 36,
                                    paddingVertical: 20,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: 5,
                                  }}>
                                  <Image
                                    source={writeReviewIcon}
                                    style={[
                                      {width: 32, height: 32, borderRadius: 16},
                                      styles.mb10,
                                    ]}
                                  />
                                  <Text
                                    style={[
                                      styles.textCenter,
                                      styles.fontMedium,
                                      styles.font13,
                                      {color: '#383838', opacity: 0.5},
                                    ]}>
                                    감상을 작성하면{'\n'}작품 평점을 알 수
                                    있습니다.
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            )}
                          </View>
                          <View style={[styles.divView]} />
                          <View
                            style={[
                              styles.row,
                              styles.alignItemsCenter,
                              styles.justifyContentBetween,
                              styles.pt20,
                              {paddingHorizontal: 25},
                            ]}>
                            <Text
                              style={[
                                styles.font20,
                                styles.fontBold,
                                {color: '#382a2a'},
                              ]}>
                              감상
                            </Text>
                            <TouchableWithoutFeedback
                              onPress={this.props.openFilterModal}>
                              <View>
                                <Image
                                  source={require('../../assets/images/icon_sort.png')}
                                  style={[styles.icon20]}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                          {loading ? (
                            <View
                              style={[
                                styles.container,
                                styles.alignItemsCenter,
                                styles.justifyContentCenter,
                              ]}>
                              <ActivityIndicator
                                size={'small'}
                                color={'#000'}
                              />
                            </View>
                          ) : reviews && reviews.length > 0 ? (
                            <FlatList
                              data={reviews}
                              renderItem={({item}) => {
                                if (
                                  blockReviewList.findIndex(
                                    id => id === item.id,
                                  ) >= 0 ||
                                  blockUserList.findIndex(
                                    id => id === item.author.id,
                                  ) >= 0
                                ) {
                                  return null;
                                } else {
                                  return (
                                    <>
                                      <ArtuiumCard3
                                        addBlockReview={
                                          this.props.addBlockReview
                                        }
                                        addBlockUser={this.props.addBlockUser}
                                        deleteReview={this.props.deleteReview}
                                        goUpdate={this._goUpdate}
                                        from={from}
                                        review={item}
                                        navigation={this.props.navigation}
                                        handleChangeMode={
                                          this.props.handleChangeMode
                                        }
                                      />
                                      <View
                                        style={{
                                          width: deviceInfo.size.width,
                                          height: 1,
                                          backgroundColor: '#e3e3e3',
                                        }}
                                      />
                                    </>
                                  );
                                }
                              }}
                              numColumns={1}
                              keyExtractor={item => String(item.id)}
                              refreshing={refreshing}
                              onRefresh={this.props.refresh}
                              onEndReached={
                                hasNextPage ? this.props.reviewListMore : null
                              }
                              onEndReachedThreshold={0.5}
                              bounces={true}
                              ListFooterComponent={
                                isLoadingMore ? (
                                  <View
                                    style={[
                                      styles.alignItemsCenter,
                                      styles.justifyContentCenter,
                                      styles.mt5,
                                      styles.py5,
                                    ]}>
                                    <ActivityIndicator
                                      size={'small'}
                                      color={'#000000'}
                                    />
                                  </View>
                                ) : null
                              }
                            />
                          ) : (
                            <ScrollView
                              refreshControl={
                                <RefreshControl
                                  refreshing={refreshing}
                                  onRefresh={this.props.refresh}
                                  tintColor={'#000000'}
                                />
                              }>
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
                            </ScrollView>
                          )}
                        </>
                      )}
                      {mode === 'create' && (
                        <Fragment>
                          <TouchableWithoutFeedback
                            onPress={() => this.props.handleChangeRating(0)}>
                            <View>
                              <TouchableWithoutFeedback
                                onPress={() =>
                                  this.props.handleChangeMode('list')
                                }>
                                <Image
                                  source={backArrow}
                                  style={{marginTop: 22, marginLeft: 17}}
                                />
                              </TouchableWithoutFeedback>
                              <View
                                style={[
                                  styles.alignItemsCenter,
                                  styles.justifyContentCenter,
                                  styles.alignSelfCenter,
                                  styles.borderBtmGrayE8,
                                  styles.widthFull,
                                  {marginTop: 19, paddingBottom: 12},
                                ]}>
                                <Stars
                                  half={true}
                                  default={rating}
                                  update={val =>
                                    this.props.handleChangeRating(val)
                                  }
                                  spacing={0}
                                  starSize={30}
                                  count={5}
                                  emptyStar={emptyStar}
                                  fullStar={fullStar}
                                  halfStar={halfStar}
                                />
                              </View>
                            </View>
                          </TouchableWithoutFeedback>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 73,
                            }}>
                            <TextInput
                              placeholder={'제목을 입력하세요'}
                              style={{
                                width: width,
                                textAlign: 'center',
                                fontSize: 18,
                                fontFamily: 'NotoSansKR-Bold',
                                marginBottom: 4,
                              }}
                              placeholderTextColor={'#cdcdcd'}
                              onChangeText={this.props.handleChangeTitle}
                              value={title}
                              maxLength={15}
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: 'NotoSansKR-Bold',
                                color: '#cdcdcd',
                              }}>
                              {title.length}/15
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              borderTopWidth: 1,
                              borderColor: '#e8e8e8',
                              position: 'relative',
                            }}>
                            <TextInput
                              style={[
                                styles.font15,
                                styles.widthFull,
                                styles.px25,
                                styles.black,
                                {paddingTop: 16},
                              ]}
                              placeholder={'당신만의 감상을 입력하세요.'}
                              autoCapitalize={'none'}
                              autoCorrect={false}
                              value={content}
                              onChangeText={this.props.handleChangeContent}
                              returnKeyType={'done'}
                              placeholderTextColor={'#cdcdcd'}
                              multiline={true}
                              textAlignVertical={'top'}
                            />
                            <TouchableOpacity
                              disabled={!content || !title}
                              onPress={
                                initialMode === 'create'
                                  ? this.props.update
                                  : this.props.submit
                              }
                              style={[
                                isSubmittingReview ? styles.opacity07 : null,
                                {
                                  borderRadius: 5,
                                  position: 'absolute',
                                  bottom: 50,
                                  alignSelf: 'center',
                                  width: width - 80,
                                  height: 38,
                                  backgroundColor:
                                    !content || !title ? '#c4c4c4' : '#FD4C1E',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  zIndex: 1,
                                },
                              ]}>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font16,
                                  styles.white,
                                ]}>
                                {initialMode === 'create'
                                  ? `수정하기`
                                  : `감상 등록`}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </Fragment>
                      )}
                      {mode === 'review' && (
                        <View style={[styles.pb30]}>
                          <ArtuiumCard5
                            addBlockReview={this.props.addBlockReview}
                            addBlockUser={this.props.addBlockUser}
                            deleteReview={this.props.deleteReview}
                            goUpdate={this._goUpdate}
                            from={from}
                            review={showingReview}
                            navigation={this.props.navigation}
                            handleChangeMode={this.props.handleChangeMode}
                          />
                          <View style={[styles.divView, styles.mt15]} />
                          <View
                            style={[
                              styles.row,
                              styles.alignItemsCenter,
                              styles.justifyContentBetween,
                              styles.px30,
                              styles.pt20,
                              styles.mb15,
                            ]}>
                            <Text
                              style={[
                                styles.font20,
                                styles.fontBold,
                                {color: '#382a2a'},
                              ]}>
                              댓글
                            </Text>
                            <TouchableWithoutFeedback
                              onPress={this.props.openFilterReplyModal}>
                              <View>
                                <Image
                                  source={require('../../assets/images/icon_sort.png')}
                                  style={[styles.icon20]}
                                />
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                          {loadingReply ? (
                            <View
                              style={[
                                styles.container,
                                styles.alignItemsCenter,
                                styles.justifyContentCenter,
                              ]}>
                              <ActivityIndicator
                                size={'small'}
                                color={'#000'}
                              />
                            </View>
                          ) : replies && replies.length > 0 ? (
                            <FlatList
                              data={replies}
                              renderItem={({item}) => {
                                if (
                                  blockUserList.findIndex(
                                    id => id === item.author.id,
                                  ) >= 0 ||
                                  blockReplyList.findIndex(
                                    id => id === item.id,
                                  ) >= 0
                                ) {
                                  return null;
                                } else {
                                  return (
                                    <View
                                      style={[
                                        item.id === selectedReply.id
                                          ? {zIndex: 9999}
                                          : {zIndex: 10},
                                      ]}>
                                      <ReplyCard
                                        newReply={newReply}
                                        startUpdateReply={
                                          this._startUpdateReply
                                        }
                                        addBlockUser={this.props.addBlockUser}
                                        addBlockReply={this.props.addBlockReply}
                                        reply={item}
                                        navigation={this.props.navigation}
                                        handleChangeMode={
                                          this.props.handleChangeMode
                                        }
                                        selectReply={this.props.selectReply}
                                        selectedReply={selectedReply}
                                      />
                                    </View>
                                  );
                                }
                              }}
                              numColumns={1}
                              keyExtractor={item => String(item.id)}
                              refreshing={refreshingReply}
                              onRefresh={this.props.refreshReply}
                              onEndReached={
                                hasNextPageReply
                                  ? this.props.replyListMore
                                  : null
                              }
                              onEndReachedThreshold={0.5}
                              bounces={true}
                              ListFooterComponent={
                                isLoadingMoreReply ? (
                                  <View
                                    style={[
                                      styles.alignItemsCenter,
                                      styles.justifyContentCenter,
                                      styles.mt5,
                                      styles.py5,
                                    ]}>
                                    <ActivityIndicator
                                      size={'small'}
                                      color={'#000000'}
                                    />
                                  </View>
                                ) : null
                              }
                            />
                          ) : (
                            <ScrollView
                              refreshControl={
                                <RefreshControl
                                  refreshing={refreshingReply}
                                  onRefresh={this.props.refreshReply}
                                  tintColor={'#000000'}
                                />
                              }>
                              <Text
                                style={[
                                  styles.fontMedium,
                                  styles.font15,
                                  styles.mt40,
                                  styles.grayA7,
                                  styles.textCenter,
                                ]}>
                                댓글이 없습니다.
                              </Text>
                            </ScrollView>
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          {this.state.index === 1 && mode === 'review' && selectedReply.id ? (
            <TouchableWithoutFeedback
              onPress={() => this.props.selectReply({})}>
              <View
                style={[
                  styles.screenWidth,
                  styles.heightFull,
                  {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    zIndex: 900,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
          ) : null}
          {this.state.index === 1 &&
            mode === 'review' &&
            (Platform.OS === 'ios' ? (
              <KeyboardAvoidingView
                behavior={'position'}
                contentContainerStyle={[
                  styles.alignItemsCenter,
                  styles.justifyContentBetween,
                  styles.pt10,
                  styles.bgWhite,
                  styles.widthFull,
                  {position: 'absolute', bottom: 0, zIndex: 9999},
                ]}>
                {this.state.isReviewEditingEnable && (
                  <View
                    style={[
                      {
                        width: '100%',
                        backgroundColor: '#f4f4f4',
                        paddingHorizontal: 15,
                        paddingTop: 10,
                      },
                    ]}>
                    <Text>{this.props.nickname}</Text>
                    <TextInput
                      ref={el => (this.btmTextInput = el)}
                      style={[
                        styles.font13,
                        styles.black,
                        styles.widthFull,
                        styles.py5,
                        styles.widthFull,
                      ]}
                      autoCapitalize={'none'}
                      autoCorrect={false}
                      value={contentReply}
                      onChangeText={this.props.handleChangeContentReply}
                      returnKeyType={'done'}
                      placeholderTextColor={'#999999'}
                      placeholder={
                        '욕설이나 비방이 포함된 댓글은 삭제될 수 있습니다.'
                      }
                      onBlur={() =>
                        this.setState({isReviewEditingEnable: false})
                      }
                      autoFocus={true}
                      multiline={true}
                      maxLength={100}
                    />
                  </View>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    height: 74,
                    backgroundColor: '#f4f4f4',
                    width: '100%',
                    justifyContent: 'space-between',
                    paddingHorizontal: this.state.isReviewEditingEnable
                      ? 15
                      : 26,
                    paddingTop: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 24,
                      alignItems: 'center',
                    }}>
                    {this.state.isReviewEditingEnable ? (
                      <Text style={{fontSize: 12, color: '#828282'}}>
                        {contentReply.length}/100
                      </Text>
                    ) : (
                      <>
                        <Image
                          source={chatNumIconBlack}
                          style={{marginRight: 3}}
                        />
                        <Text style={{marginRight: 8, fontSize: 14}}>
                          {abbreviateNumber(review_count)}
                        </Text>
                        <Image
                          source={heartNumIconBlack}
                          style={{marginRight: 3}}
                        />
                        <Text style={{marginRight: 8, fontSize: 14}}>
                          {abbreviateNumber(like_count)}
                        </Text>
                      </>
                    )}
                  </View>
                  <Text
                    onPress={() => {
                      if (this.state.isReviewEditingEnable) {
                        selectedReplyId
                          ? this.props.updateReply()
                          : this.props.createReview();
                      } else {
                        this.setState({isReviewEditingEnable: true});
                      }
                    }}
                    style={[
                      styles.fontMedium,
                      {color: '#2e2e2e', fontSize: 15},
                    ]}>
                    {!this.state.isReviewEditingEnable
                      ? '댓글 달기'
                      : selectedReplyId
                      ? '수정'
                      : '등록'}
                  </Text>
                </View>
              </KeyboardAvoidingView>
            ) : (
              <View
                style={[
                  styles.row,
                  styles.alignItemsCenter,
                  styles.justifyContentBetween,
                  styles.px10,
                  styles.pt10,
                  styles.pb10,
                  styles.bgWhite,
                  styles.widthFull,
                  {position: 'absolute', bottom: 0, zIndex: 9999},
                ]}>
                <View
                  style={[
                    styles.mr10,
                    styles.borderRadius5,
                    styles.bgGrayf0,
                    styles.px10,
                    styles.flex8,
                  ]}>
                  <TextInput
                    ref={el => (this.btmTextInput = el)}
                    style={[
                      styles.font13,
                      styles.widthFull,
                      styles.px10,
                      styles.py5,
                      styles.widthFull,
                      styles.black,
                    ]}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    value={contentReply}
                    onChangeText={this.props.handleChangeContentReply}
                    returnKeyType={'done'}
                    placeholderTextColor={'#000000'}
                  />
                </View>
                <TouchableWithoutFeedback
                  onPress={
                    selectedReplyId
                      ? this.props.updateReply
                      : this.props.createReview
                  }>
                  <View
                    style={[
                      styles.flex2,
                      styles.bgGray33,
                      styles.row,
                      styles.alignItemsCenter,
                      styles.justifyContentCenter,
                      styles.py5,
                      styles.borderRadius5,
                      isSubmittingReply ? {opacity: 0.4} : null,
                    ]}>
                    <Text
                      style={[styles.fontMedium, styles.font16, styles.white]}>
                      {selectedReplyId ? '수정' : '등록'}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))}
          <Modal
            isVisible={showFilterModal}
            backdropOpacity={0.26}
            onBackButtonPress={this.props.closeFilterModal}
            onBackdropPress={this.props.closeFilterModal}
            style={[styles.justifyContentEnd, {margin: 0}]}>
            <TouchableWithoutFeedback onPress={this.props.closeFilterModal}>
              <View
                style={[
                  styles.container,
                  styles.px0,
                  styles.justifyContentEnd,
                ]}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.bgWhite,
                      styles.borderTopRadius10,
                      {paddingBottom: 150},
                    ]}>
                    <View style={[styles.borderBtmGray70, styles.py10]}>
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font17,
                          styles.textCenter,
                        ]}>
                        정렬
                      </Text>
                    </View>
                    {filter.map((fil, index) => (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() =>
                          this.props.handleFilterChange(fil.value)
                        }>
                        <View
                          style={[
                            styles.borderBtmGray70,
                            styles.py10,
                            styles.px25,
                          ]}>
                          <Text style={[styles.fontRegular, styles.font15]}>
                            {fil.label}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          <Modal
            isVisible={showFilterReplyModal}
            backdropOpacity={0.26}
            onBackButtonPress={this.props.closeFilterReplyModal}
            onBackdropPress={this.props.closeFilterReplyModal}
            style={[styles.justifyContentEnd, {margin: 0}]}>
            <TouchableWithoutFeedback
              onPress={this.props.closeFilterReplyModal}>
              <View
                style={[
                  styles.container,
                  styles.px0,
                  styles.justifyContentEnd,
                ]}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      styles.bgWhite,
                      styles.borderTopRadius10,
                      {paddingBottom: 150},
                    ]}>
                    <View style={[styles.borderBtmGray70, styles.py10]}>
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font17,
                          styles.textCenter,
                        ]}>
                        정렬
                      </Text>
                    </View>
                    {filterReply.map((fil, index) => (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() =>
                          this.props.handleFilterReplyChange(fil.value)
                        }>
                        <View
                          style={[
                            styles.borderBtmGray70,
                            styles.py10,
                            styles.px25,
                          ]}>
                          <Text style={[styles.fontRegular, styles.font15]}>
                            {fil.label}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    ))}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      );
    } else {
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={[styles.fontMedium, styles.font16]}>
            잘못된 요청입니다.
          </Text>
        </View>
      );
    }
  }
}

export default ArtworkContentScreen;
