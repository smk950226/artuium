import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import stripHtml from 'string-strip-html';
import {AllReviewCard} from '../../components/AllReviewCard/AllReviewCard';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
} from '../../util';
import moment from 'moment';
import 'moment/locale/ko';

class ReviewLikeScreen extends React.Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    getReviewLikeList: PropTypes.func.isRequired,
    getReviewLikeListMore: PropTypes.func.isRequired,
    reviewMore: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    likes: PropTypes.array,
    hasNextPage: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    refreshing: PropTypes.bool.isRequired,
  };

  render() {
    const {profile, likes, refreshing, hasNextPage, isLoadingMore} = this.props;
    return (
      <View style={([styles.container], {marginTop: -2})}>
        {likes && likes.length > 0 ? (
          <FlatList
            data={likes}
            renderItem={({item}) => {
              const review = item.review;
              return (
                <>
                  <View style={{height: 16}} />
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
                              from: 'AllArtwork',
                            })
                        : () =>
                            props.navigation.navigate('ExhibitionContent', {
                              exhibition: review.exhibition,
                              mode: 'review',
                              review: review,
                              from: 'AllArtwork',
                            })
                    }
                    type={review.artwork ? 'artwork' : 'exhibition'}
                    reviewTitle={review.title}
                  />
                </>
              );
            }}
            numColumns={1}
            keyExtractor={item => String(item.id)}
            refreshing={refreshing}
            onRefresh={this.props.refresh}
            onEndReached={hasNextPage ? this.props.reviewMore : null}
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
                  <ActivityIndicator size={'small'} color={'#000000'} />
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
              전시가 없습니다.
            </Text>
          </ScrollView>
        )}
      </View>
    );
  }
}

export default ReviewLikeScreen;
