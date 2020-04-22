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
import {actionCreators as artworkActions} from '../../redux/modules/artwork';
import MasonryList from 'react-native-masonry-list';
import styles from '../../styles';

const {width, height} = Dimensions.get('window');

const LikedArtworkList = props => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const profile = useSelector(store => store.user.profile);

  const dispatch = useDispatch();
  const getState = useStore().getState;

  const getArtworkLikeList = userId => {
    return artworkActions.getArtworkLikeList(userId)(dispatch, getState);
  };
  const getArtworkLikeListMore = (userId, page) => {
    return artworkActions.getArtworkLikeListMore(userId, page)(
      dispatch,
      getState,
    );
  };

  useEffect(() => {
    getArtworks();
  }, []);

  const getArtworks = async () => {
    const result = await getArtworkLikeList(profile.id);
    let resultWithImage = result.map(item => {
      return {...item, URL: item.artwork.image};
    });
    setArtworks(resultWithImage);
    setIsLoading(false);
  };

  const getMoreArtworks = async () => {
    if (hasNextPage) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        const result = await getArtworkLikeListMore(profile.id, pageNum + 1);
        console.log(result);
        if (result) {
          let resultWithImage = [];
          result.map(item => {
            if (item.artwork && item.arwork.image) {
              resultWithImage.push({
                ...item,
                URL: item.artwork.image,
              });
            }
          });
          setArtworks([...artworks, ...resultWithImage]);
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
    const result = await getArtworkLikeList(profile.id);
    let resultWithImage = result.map(item => {
      return {...item, URL: item.artwork.image};
    });
    setArtworks(resultWithImage);
    setIsRefreshing(false);
  };

  const onPressImage = item => {
    props.navigation.navigate('ArtworkDetail', {
      artwork: item.artwork,
    });
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
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
  ) : artworks && artworks.length > 0 ? (
    <ScrollView
      style={{paddingHorizontal: 14, paddingTop: 15}}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          if (hasNextPage) {
            getMoreArtworks();
          }
        }
      }}
      scrollEventThrottle={400}>
      <MasonryList
        images={artworks}
        initialNumInColsToRender={12}
        imageContainerStyle={{
          borderWidth: 1,
          borderColor: '#dfdfdf',
          marginHorizontal: 5,
          marginBottom: 10,
          marginTop: 0,
          borderRadius: 5,
          width: (width - 48) / 2,
        }}
        onPressImage={onPressImage}
        masonryFlatListColProps={{
          onEndReachedThreshold: 0,
          bounces: true,
        }}
      />
      {isLoadingMore && (
        <View
          style={[
            styles.alignItemsCenter,
            styles.justifyContentCenter,
            styles.mt5,
            styles.py5,
          ]}>
          <ActivityIndicator size={'small'} color={'#000000'} />
        </View>
      )}
    </ScrollView>
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
        작품이 없습니다.
      </Text>
    </ScrollView>
  );
};

export default LikedArtworkList;
