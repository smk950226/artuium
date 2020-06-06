import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
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
  const {userId, getMore} = props;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
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
    getMoreReviews();
  }, [getMore]);

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
    <>
      {writtenReviews && writtenReviews.length > 0 ? (
        writtenReviews.map(review => {
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
            </>
          );
        })
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
    </>
  );
};

export default WrittenReviewList;
