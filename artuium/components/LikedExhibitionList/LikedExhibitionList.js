import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {actionCreators as exhibitionActions} from '../../redux/modules/exhibition';
import styles from '../../styles';

const {width, height} = Dimensions.get('window');

const LikedExhibitionList = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [exhibitions, setExhibitions] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const profile = useSelector(store => store.user.profile);
  const dispatch = useDispatch();
  const getState = useStore().getState;

  const getExhibitionLikeList = userId => {
    return exhibitionActions.getExhibitionLikeList(userId)(dispatch, getState);
  };
  const getExhibitionLikeListMore = (userId, page) => {
    return exhibitionActions.getExhibitionLikeListMore(userId, page)(
      dispatch,
      getState,
    );
  };

  const getExhibitions = async () => {
    const result = await getExhibitionLikeList(profile.id);
    setExhibitions(result);
    setIsLoading(false);
  };

  const getMoreExhibitions = async () => {
    if (hasNextPage) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        const result = await getExhibitionLikeListMore(profile.id, pageNum + 1);
        if (result) {
          setExhibitions([...exhibitions, ...result]);
          setPageNum(pageNum + 1);
          setIsLoadingMore(false);
        } else {
          setHasNextPage(false);
          setIsLoadingMore(false);
        }
      }
    }
  };

  useEffect(() => {
    getExhibitions();
  }, []);

  const refresh = async () => {
    setIsLoadingMore(false);
    setHasNextPage(true);
    setIsRefreshing(true);
    setPageNum(1);
    const result = await getExhibitionLikeList(profile.id);
    setExhibitions(result);
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
  ) : exhibitions && exhibitions.length > 0 ? (
    <FlatList
      style={{paddingTop: 15, marginHorizontal: 15}}
      data={exhibitions}
      renderItem={({item}) => (
        <TouchableWithoutFeedback
          onPress={() =>
            props.navigation.navigate('ExhibitionDetail', {
              exhibition: item.exhibition,
            })
          }>
          <ImageBackground
            source={{
              uri: item.exhibition.images
                ? item.exhibition.images.length > 0
                  ? item.exhibition.images[0].image
                  : ''
                : '',
            }}
            resizeMode={'cover'}
            style={{
              height: 161,
              width: (width - 60) / 3,
              marginHorizontal: 5,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#dfdfdf',
              borderRadius: 5,
              overflow: 'hidden',
            }}
          />
        </TouchableWithoutFeedback>
      )}
      numColumns={3}
      keyExtractor={item => String(item.exhibition.id)}
      refreshing={isRefreshing}
      onRefresh={refresh}
      onEndReached={hasNextPage ? getMoreExhibitions : null}
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
        전시가 없습니다.
      </Text>
    </ScrollView>
  );
};

export default LikedExhibitionList;