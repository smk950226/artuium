import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import styles from '../../styles';
import {AllReviewCard} from '../AllReviewCard/AllReviewCard';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
} from '../../util';
import stripHtml from 'string-strip-html';
import moment from 'moment';
import 'moment/locale/ko';

const WrittenReviewList = props => {
  const {userId} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const dispatch = useDispatch();
  const getState = useStore().getState;

  const getReviewList = userId => {
    return userActions.getReviewList(userId)(dispatch, getState);
  };
  const getReviewListMore = (userId, page) => {
    return userActions.getReviewListMore(userId, page)(dispatch, getState);
  };

  const getReviews = async () => {
    const reviews = await getReviewList(userId);
    setWrittenReviews(reviews);
    setIsLoading(false);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const getMoreReviews = async () => {
    if (hasNextPage) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        const result = await getReviewListMore(userId, pageNum + 1);
        if (result) {
          setWrittenReviews([...writtenReviews, ...result]);
          setPageNum(pageNum + 1);
          setIsLoadingMore(false);
        } else {
          setHasNextPage(false);
          setIsLoadingMore(false);
        }
      }
    }
  };

  const refresh = async () => {
    setIsLoadingMore(false);
    setHasNextPage(true);
    setIsRefreshing(true);
    setPageNum(1);
    const reviews = await getReviewList(userId);
    setWrittenReviews(reviews);
    setIsRefreshing(false);
  };

  return isLoading ? (
    <View
      style={[
        styles.container,
        styles.alignItemsCenter,
        styles.justifyContentCenter,
      ]}>
      <ActivityIndicator size={'small'} color={'#000'} />
    </View>
  ) : (
    <ScrollView style={[styles.container]}>
      {writtenReviews && writtenReviews.length > 0 ? (
        <FlatList
          style={{marginTop: 14}}
          data={writtenReviews}
          renderItem={({item}) => {
            const review = item;
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
                          })
                      : () =>
                          props.navigation.navigate('ExhibitionContent', {
                            exhibition: review.exhibition,
                            mode: 'review',
                            review: review,
                          })
                  }
                  type={review.artwork ? 'artwork' : 'exhibition'}
                  reviewTitle={review.title}
                />
                <View style={{height: 16}} />
              </>
            );
          }}
          numColumns={1}
          keyExtractor={item => String(item.id)}
          refreshing={isRefreshing}
          onRefresh={refresh}
          onEndReached={hasNextPage ? getMoreReviews : null}
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
              refreshing={isRefreshing}
              onRefresh={refresh}
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
    </ScrollView>
  );
};

export default WrittenReviewList;
