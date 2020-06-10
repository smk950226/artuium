import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  View,
} from 'react-native';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import WrittenReviewList from '../../components/WrittenReviewList/WrittenReviewList';
import LikedExhibitionList from '../../components/LikedExhibitionList/LikedExhibitionList';
import LikedArtworkList from '../../components/LikedArtworkList/LikedArtworkList';
import LikedReviewList from '../../components/LikedReviewList/LikedReviewList';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import ProfileTabBar from '../../components/ProfileTabBar/ProfileTabBar';
import {settingIcon} from '../../assets/images';

const {width, height} = Dimensions.get('window');

const MyProfileScreen = props => {
  const [index, setIndex] = useState(0);
  const [profileInfoHeight, setProfileInfoHeight] = useState(275);
  const [tabBarAtTop, setTabBarAtTop] = useState(false);
  const [myReviewsNum, setMyReviewsNum] = useState(0);
  const [getMore, setGetMore] = useState(0);
  const profile = useSelector(store => store.user.profile);
  const tabBarAnimation = useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const getState = useStore().getState;
  const getReviewList = id => {
    return userActions.getReviewList(id)(dispatch, getState);
  };

  const getProfile = userId => {
    return userActions.getProfile(userId)(dispatch, getState);
  };

  useEffect(() => {
    getProfile();
    getReviewList(profile.id).then(res => {
      setMyReviewsNum(res.length);
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
        toValue: 39,
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
    <ScrollView stickyHeaderIndices={[2]} onScroll={onScroll}>
      <ProfileInfo
        setHeight={setProfileInfoHeight}
        profileImage={profile.profile_image}
        backgroundImage={profile.background_image}
        nickname={profile.nickname}
        statusMessage={profile.status_message}
        followerCount={profile.follower_count}
        followingCount={profile.following_count}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 51, right: 15.91}}
        onPress={() => {
          props.navigation.navigate('Setting', {});
        }}>
        <Image source={settingIcon} style={{width: 24}} />
      </TouchableOpacity>
      <ProfileTabBar
        tabBarAnimation={tabBarAnimation}
        selected={index}
        setSelected={setIndex}
        tabContents={[
          {title: '나의 감상', number: myReviewsNum},
          {title: '전시', number: profile.like_exhibition_count},
          {title: '작품', number: profile.like_artwork_count},
          {title: '감상', number: profile.like_review_count},
        ]}
      />
      <View style={{display: index === 0 ? 'flex' : 'none'}}>
        <WrittenReviewList
          getMore={Math.floor(getMore / 2)}
          userId={profile.id}
          navigation={props.navigation}
        />
      </View>
      <View style={{display: index === 1 ? 'flex' : 'none'}}>
        <LikedExhibitionList
          getMore={Math.floor(getMore / 2)}
          userId={profile.id}
          navigation={props.navigation}
        />
      </View>
      <View style={{display: index === 2 ? 'flex' : 'none'}}>
        <LikedArtworkList
          getMore={Math.floor(getMore / 2)}
          userId={profile.id}
          navigation={props.navigation}
        />
      </View>
      <View style={{display: index === 3 ? 'flex' : 'none'}}>
        <LikedReviewList
          getMore={Math.floor(getMore / 2)}
          userId={profile.id}
          navigation={props.navigation}
        />
      </View>
    </ScrollView>
  );
};

export default MyProfileScreen;
