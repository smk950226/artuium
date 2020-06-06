import React, {useState, useEffect} from 'react';
import {Dimensions, View, Text, Image, TouchableOpacity} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import WrittenReviewList from '../../components/WrittenReviewList/WrittenReviewList';
import LikedExhibitionList from '../../components/LikedExhibitionList/LikedExhibitionList';
import LikedArtworkList from '../../components/LikedArtworkList/LikedArtworkList';
import LikedReviewList from '../../components/LikedReviewList/LikedReviewList';
import TabBarLabel from '../../components/TabBarLabel/TabBarLabel';
import OthersProfileFollowButton from '../../components/OthersProfileFollowButton/OthersProfileFollowButton';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import {
  WrittenReviewIcon,
  LikedExhibitionIcon,
  LikedArtworkIcon,
  LikedReviewIcon,
} from '../../assets/images/svgs';
import {backArrowWhite} from '../../assets/images';

const {width, height} = Dimensions.get('window');

const getTabBarIcons = props => {
  const {route} = props;
  if (route.key === 'writtenReview') {
    return <WrittenReviewIcon color={props.color} />;
  } else if (route.key === 'exhibition') {
    return <LikedExhibitionIcon color={props.color} />;
  } else if (route.key === 'artwork') {
    return <LikedArtworkIcon color={props.color} />;
  } else {
    return <LikedReviewIcon color={props.color} />;
  }
};

const OthersProfileScreen = props => {
  const others = props.navigation.getParam('others', null);
  const dispatch = useDispatch();
  const getState = useStore().getState;

  const [index, setIndex] = useState(0);
  const [writtenReviewsNum, setWrittenReviewsNum] = useState(0);
  const [isFollowing, setIsFollowing] = useState(others.is_following);
  const isFollowingNow = others.is_following;

  const getReviewList = userId => {
    return userActions.getReviewList(userId)(dispatch, getState);
  };

  const getTabBarLabels = props => {
    const {route} = props;
    if (route.key === 'writtenReview') {
      return (
        <TabBarLabel
          title={'작성한 감상'}
          number={writtenReviewsNum}
          color={props.color}
        />
      );
    } else if (route.key === 'exhibition') {
      return (
        <TabBarLabel
          title={'전시'}
          number={others.like_exhibition_count}
          color={props.color}
        />
      );
    } else if (route.key === 'artwork') {
      return (
        <TabBarLabel
          title={'작품'}
          number={others.like_artwork_count}
          color={props.color}
        />
      );
    } else if (route.key === 'review') {
      return (
        <TabBarLabel
          title={'감상'}
          number={others.like_review_count}
          color={props.color}
        />
      );
    }
  };

  const followUser = userId => {
    return userActions.followUser(userId)(dispatch, getState);
  };
  const unfollowUser = userId => {
    return userActions.unfollowUser(userId)(dispatch, getState);
  };

  const renderWrittenReview = () => {
    return (
      <WrittenReviewList userId={others.id} navigation={props.navigation} />
    );
  };
  const renderExhibition = () => {
    return (
      <LikedExhibitionList userId={others.id} navigation={props.navigation} />
    );
  };
  const renderArtwork = () => {
    return (
      <LikedArtworkList userId={others.id} navigation={props.navigation} />
    );
  };
  const renderReview = () => {
    return <LikedReviewList userId={others.id} navigation={props.navigation} />;
  };

  const getOthersProfileRoute = () => [
    {key: 'writtenReview', title: '작성한 감상'},
    {key: 'exhibition', title: '전시'},
    {key: 'artwork', title: '작품'},
    {key: 'review', title: '감상'},
  ];

  const onPressBackButton = () => props.navigation.pop();

  const onPressFollowButton = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      followUser(others.id);
    } else {
      unfollowUser(others.id);
    }
    getProfile();
  };

  useEffect(() => {
    getReviewList(others.id).then(res => {
      setWrittenReviewsNum(res.length);
    });
  }, []);

  return (
    <>
      <ProfileInfo
        profileImage={others.profile_image}
        backgroundImage={
          others.background_image ? others.backgound_image : undefined
        }
        nickname={others.nickname}
        statusMessage={
          others.status_message ? others.status_message : undefined
        }
        followerCount={
          others.follower_count - isFollowingNow ? 1 : 0 + isFollowing ? 1 : 0
        }
        followingCount={others.following_count}
        others={true}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 48, left: 17}}
        onPress={onPressBackButton}>
        <Image source={backArrowWhite} style={{width: 24}} />
      </TouchableOpacity>
      <OthersProfileFollowButton
        styles={{position: 'absolute', top: 50, right: 19}}
        isFollowing={isFollowing}
        onPress={onPressFollowButton}
      />
      <TabView
        navigationState={{
          index,
          routes: getOthersProfileRoute(),
        }}
        style={{backgroundColor: 'white'}}
        onIndexChange={setIndex}
        renderScene={SceneMap({
          writtenReview: renderWrittenReview,
          exhibition: renderExhibition,
          artwork: renderArtwork,
          review: renderReview,
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

export default OthersProfileScreen;
