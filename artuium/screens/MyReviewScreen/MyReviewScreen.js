import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as reviewActions} from '../../redux/modules/review';
import styles from '../../styles';
import ArtuiumCard from '../../components/ArtuiumCard';

const MyReviewScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [myReviews, setMyReviews] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const profile = useSelector(store => store.user.profile);
  const dispatch = useDispatch();

  const getReviewLikeList = userId => {
    return dispatch(reviewActions.getReviewLikeList(userId));
  };
  const getReviewLikeListMore = (userId, page) => {
    return dispatch(reviewActions.getReviewLikeListMore(userId, page));
  };

  const getReviews = async () => {
    const reviews = await getReviewLikeList(profile.id);
    setIsLoading(false);
    setMyReviews(reviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  const getMoreReviews = async () => {
    if (hasNextPage) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        const result = await getReviewLikeListMore(profile.id, pageNum + 1);
        if (result) {
          setMyReviews([...myReviews, ...result]);
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
    const reviews = await getReviewLikeList(profile.id);
    setMyReviews(reviews);
    setIsRefreshing(false);
  };

  const {navigation} = props;
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
    <View style={[styles.container]}>
      {myReviews && myReviews.length > 0 ? (
        <FlatList
          data={myReviews}
          renderItem={({item}) => (
            <ArtuiumCard
              from={'ReviewLike'}
              review={item.review}
              size={'xlarge'}
              navigation={navigation}
            />
          )}
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
    </View>
  );
};

export default MyReviewScreen;
