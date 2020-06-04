import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import WrittenReviewList from '../../components/WrittenReviewList/WrittenReviewList';
import LikedExhibitionList from '../../components/LikedExhibitionList/LikedExhibitionList';
import LikedArtworkList from '../../components/LikedArtworkList/LikedArtworkList';
import LikedReviewList from '../../components/LikedReviewList/LikedReviewList';
import OthersProfileFollowButton from '../../components/OthersProfileFollowButton/OthersProfileFollowButton';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import ProfileTabBar from '../../components/ProfileTabBar/ProfileTabBar';
import {backArrowWhite, backArrow} from '../../assets/images';
import {ScrollView} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const OthersProfileScreen = props => {
  const others = props.navigation.getParam('others', null);
  const dispatch = useDispatch();
  const getState = useStore().getState;

  const [index, setIndex] = useState(0);
  const [profileInfoHeight, setProfileInfoHeight] = useState(275);
  const [tabBarAtTop, setTabBarAtTop] = useState(false);
  const [writtenReviewsNum, setWrittenReviewsNum] = useState(0);
  const [isFollowing, setIsFollowing] = useState(others.is_following);
  const [getMore, setGetMore] = useState(0);
  const tabBarAnimation = useRef(new Animated.Value(0)).current;

  const getReviewList = userId => {
    return userActions.getReviewList(userId)(dispatch, getState);
  };

  const getProfile = userId => {
    return userActions.getProfile(userId)(dispatch, getState);
  };

  const followUser = userId => {
    return userActions.followUser(userId)(dispatch, getState);
  };
  const unfollowUser = userId => {
    return userActions.unfollowUser(userId)(dispatch, getState);
  };

  const onPressBackButton = () => props.navigation.pop();

  const onPressFollowButton = () => {
    setIsFollowing(!isFollowing);
    if (isFollowing) {
      followUser(others.id);
    } else {
      unfollowUser(others.id);
    }
  };

  useEffect(() => {
    getProfile();
    getReviewList(others.id).then(res => {
      setWrittenReviewsNum(res.length);
    });
  }, []);

  const onScroll = ({nativeEvent}) => {
    if (tabBarAtTop && nativeEvent.contentOffset.y <= profileInfoHeight) {
      Animated.timing(tabBarAnimation, {
        toValue: 0,
        duration: 200,
      }).start();
      setTabBarAtTop(false);
    } else if (
      !tabBarAtTop &&
      nativeEvent.contentOffset.y > profileInfoHeight
    ) {
      Animated.timing(tabBarAnimation, {
        toValue: 85,
        duration: 200,
      }).start();
      setTabBarAtTop(true);
    }
    if (
      nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y ==
      nativeEvent.contentSize.height
    ) {
      setGetMore(getMore + 1);
    }
  };

  return (
    <>
      <ScrollView stickyHeaderIndices={[1]} onScroll={onScroll}>
        <ProfileInfo
          setHeight={setProfileInfoHeight}
          profileImage={others.profile_image}
          backgroundImage={others.background_image}
          nickname={others.nickname}
          statusMessage={others.status_message}
          followerCount={
            others.follower_count - others.is_following
              ? 1
              : 0 + isFollowing
              ? 1
              : 0
          }
          followingCount={others.following_count}
          others={true}
        />
        <ProfileTabBar
          hasLine={tabBarAtTop}
          tabBarAnimation={tabBarAnimation}
          selected={index}
          setSelected={setIndex}
          tabContents={[
            {title: '작성한 감상', number: writtenReviewsNum},
            {title: '전시', number: others.like_exhibition_count},
            {title: '작품', number: others.like_artwork_count},
            {title: '감상', number: others.like_review_count},
          ]}
        />
        <View style={{display: index === 0 ? 'flex' : 'none'}}>
          <WrittenReviewList
            getMore={Math.floor(getMore / 2)}
            userId={others.id}
            navigation={props.navigation}
          />
        </View>
        <View style={{display: index === 1 ? 'flex' : 'none'}}>
          <LikedExhibitionList
            getMore={Math.floor(getMore / 2)}
            userId={others.id}
            navigation={props.navigation}
          />
        </View>
        <View style={{display: index === 2 ? 'flex' : 'none'}}>
          <LikedArtworkList
            getMore={Math.floor(getMore / 2)}
            userId={others.id}
            navigation={props.navigation}
          />
        </View>
        <View style={{display: index === 3 ? 'flex' : 'none'}}>
          <LikedReviewList
            getMore={Math.floor(getMore / 2)}
            userId={others.id}
            navigation={props.navigation}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{position: 'absolute', top: 48, left: 17}}
        onPress={onPressBackButton}>
        <Image
          source={tabBarAtTop ? backArrow : backArrowWhite}
          style={{width: 24}}
        />
      </TouchableOpacity>
      <OthersProfileFollowButton
        isTabBarAtTop={tabBarAtTop}
        styles={{position: 'absolute', top: 50, right: 19}}
        isFollowing={isFollowing}
        onPress={onPressFollowButton}
      />
    </>
  );
};

export default OthersProfileScreen;
