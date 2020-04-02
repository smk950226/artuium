import React, {Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import ArtuiumHeader from '../../components/ArtuiumHeader/ArtuiumHeader';
import {backArrow, filterIcon} from '../../assets/images';
import {AllReviewCard} from '../../components/AllReviewCard/AllReviewCard';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
  deviceInfo,
} from '../../util';
import stripHtml from 'string-strip-html';

import moment from 'moment';
import 'moment/locale/ko';

const statusBarHeight = getStatusBarHeight();

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

const FollowArtworkScreen = props => (
  <Fragment>
    <View
      style={[
        styles.container,
        {marginTop: deviceInfo.OS === 'ios' ? statusBarHeight : 0},
      ]}>
      <ArtuiumHeader
        label={'친구들의 감상'}
        leftOnPress={() => props.navigation.pop()}
        leftIcon={backArrow}
        rightIcon={filterIcon}
        rightOnPress={props.openFilterModal}
      />
      {props.loading ? (
        <View
          style={[
            styles.container,
            styles.alignItemsCenter,
            styles.justifyContentCenter,
          ]}>
          <ActivityIndicator size={'small'} color={'#000'} />
        </View>
      ) : props.reviews && props.reviews.length > 0 ? (
        <ScrollView
          onTouchEnd={props.hasNextPage ? props.reviewMore : null}
          style={{paddingTop: 18}}>
          {props.reviews.map(review => {
            return (
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
                          props.navigation.navigate('ArtworkContent', {
                            artwork: review.artwork,
                            mode: 'review',
                            review: review,
                            from: 'FollowArtwork',
                          })
                      : () =>
                          props.navigation.navigate('ExhibitionContent', {
                            exhibition: review.exhibition,
                            mode: 'review',
                            review: review,
                            from: 'FollowArtwork',
                          })
                  }
                  type={review.artwork ? 'artwork' : 'exhibition'}
                  reviewTitle={review.title}
                />
                <View style={{height: 20}} />
              </>
            );
          })}
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={props.refreshing}
              onRefresh={props.refresh}
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
    </View>
    <Modal
      isVisible={props.showFilterModal}
      backdropOpacity={0.26}
      onBackButtonPress={props.closeFilterModal}
      onBackdropPress={props.closeFilterModal}
      style={[styles.justifyContentEnd, {margin: 0}]}>
      <TouchableWithoutFeedback onPress={props.closeFilterModal}>
        <View style={[styles.container, styles.px0, styles.justifyContentEnd]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.bgWhite,
                styles.borderTopRadius10,
                {paddingBottom: 150},
              ]}>
              <View style={[styles.borderBtmGray70, styles.py10]}>
                <Text
                  style={[styles.fontMedium, styles.font17, styles.textCenter]}>
                  정렬
                </Text>
              </View>
              {filter.map((fil, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => props.handleFilterChange(fil.value)}>
                  <View
                    style={[styles.borderBtmGray70, styles.py10, styles.px25]}>
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
  </Fragment>
);

FollowArtworkScreen.propTypes = {
  openFilterModal: PropTypes.func.isRequired,
  closeFilterModal: PropTypes.func.isRequired,
  showFilterModal: PropTypes.bool.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  reviews: PropTypes.array,
  reviewMore: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
};

export default FollowArtworkScreen;
