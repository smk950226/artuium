import React, {useState, useEffect} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import ReviewLikeScreen from '../ReviewLikeScreen';
import MyReviewList from '../../components/MyReviewList/MyReviewList';
import LikedExhibitionList from '../../components/LikedExhibitionList/LikedExhibitionList';
import LikedArtworkList from '../../components/LikedArtworkList/LikedArtworkList';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import {settingIcon} from '../../assets/images';
import {
  MyReviewIcon,
  LikedExhibitionIcon,
  LikedArtworkIcon,
  LikedReviewIcon,
} from '../../assets/images/svgs';

const {width, height} = Dimensions.get('window');

const MyProfileScreen = props => {
  const [index, setIndex] = useState(0);
  const [myReviewsNum, setMyReviewsNum] = useState(0);

  const profile = useSelector(store => store.user.profile);
  const userId = profile.id;

  const dispatch = useDispatch();
  const getState = useStore().getState;

  const getReviewList = userId => {
    return userActions.getReviewList(userId)(dispatch, getState);
  };

  useEffect(() => {
    getReviewList(userId).then(res => {
      setMyReviewsNum(res.length);
    });
  }, []);

  const _renderMyReviewRoute = () => {
    return <MyReviewList navigation={props.navigation} />;
  };

  const _renderExhibitionRoute = () => {
    return <LikedExhibitionList navigation={props.navigation} />;
  };

  const _renderArtworkRoute = () => {
    return <LikedArtworkList navigation={props.navigation} />;
  };

  const _renderReviewRoute = () => {
    return <ReviewLikeScreen navigation={props.navigation} />;
  };

  const getTabBarIcons = props => {
    const {route} = props;
    if (route.key === 'myReview') {
      return <MyReviewIcon color={props.color} />;
    } else if (route.key === 'exhibition') {
      return <LikedExhibitionIcon color={props.color} />;
    } else if (route.key === 'artwork') {
      return <LikedArtworkIcon color={props.color} />;
    } else {
      return <LikedReviewIcon color={props.color} />;
    }
  };

  const TabBarLabel = ({color, title, number}) => {
    return (
      <>
        <Text
          style={{
            color,
            ...myProfileScreenStyles.tabBarLabel,
            marginTop: -7,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color,
            ...myProfileScreenStyles.tabBarNumber,
            marginTop: -7,
          }}>
          {number}
        </Text>
      </>
    );
  };

  const getTabBarLabels = props => {
    const {route} = props;
    if (route.key === 'myReview') {
      return (
        <TabBarLabel
          title={'나의 감상'}
          number={myReviewsNum}
          color={props.color}
        />
      );
    } else if (route.key === 'exhibition') {
      return (
        <TabBarLabel
          title={'전시'}
          number={profile.like_exhibition_count}
          color={props.color}
        />
      );
    } else if (route.key === 'artwork') {
      return (
        <TabBarLabel
          title={'작품'}
          number={profile.like_artwork_count}
          color={props.color}
        />
      );
    } else {
      return (
        <TabBarLabel
          title={'감상'}
          number={profile.like_review_count}
          color={props.color}
        />
      );
    }
  };

  return (
    <>
      <ProfileInfo
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
        <Image source={settingIcon} />
      </TouchableOpacity>
      <TabView
        navigationState={{
          index,
          routes: [
            {key: 'myReview', title: '나의 감상'},
            {key: 'exhibition', title: '전시'},
            {key: 'artwork', title: '작품'},
            {key: 'review', title: '감상'},
          ],
        }}
        style={{backgroundColor: 'white'}}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          myReview: _renderMyReviewRoute,
          exhibition: _renderExhibitionRoute,
          artwork: _renderArtworkRoute,
          review: _renderReviewRoute,
        })}
        renderTabBar={props => (
          <View
            style={{
              width: width - 40,
              marginHorizontal: 20,
            }}>
            <TabBar
              {...props}
              {...tabBarProps}
              renderIcon={props => getTabBarIcons(props)}
              renderLabel={props => getTabBarLabels(props)}
            />
          </View>
        )}
      />
    </>
  );
};

const tabBarProps = {
  activeColor: '#fa4d2c',
  inactiveColor: '#c4c4c4',
  bounces: false,
  indicatorStyle: {
    backgroundColor: '#fa4d2c',
    borderColor: '#fa4d2c',
    height: 1,
  },
  style: {
    backgroundColor: 'white',
    shadowOffset: {height: 0, width: 0},
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomColor: '#c4c4c4',
    borderBottomWidth: 1,
  },
};

const myProfileScreenStyles = {
  tabBarLabel: {
    fontFamily: 'Noto Sans KR',
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  tabBarNumber: {
    fontFamily: 'Noto Sans KR',
    fontSize: 8,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
};
export default MyProfileScreen;
