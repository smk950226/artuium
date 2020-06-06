import React, {useState, useEffect, useImperativeHandle} from 'react';
import {Dimensions, Image, TouchableOpacity, Text, View} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import WrittenReviewList from '../../components/WrittenReviewList/WrittenReviewList';
import LikedExhibitionList from '../../components/LikedExhibitionList/LikedExhibitionList';
import LikedArtworkList from '../../components/LikedArtworkList/LikedArtworkList';
import LikedReviewList from '../../components/LikedReviewList/LikedReviewList';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import TabBarLabel from '../../components/TabBarLabel/TabBarLabel';
import {settingIcon} from '../../assets/images';
import {
  WrittenReviewIcon,
  LikedExhibitionIcon,
  LikedArtworkIcon,
  LikedReviewIcon,
} from '../../assets/images/svgs';

const {width, height} = Dimensions.get('window');

const getTabBarIcons = props => {
  const {route} = props;
  if (route.key === 'myReview') {
    return <WrittenReviewIcon color={props.color} />;
  } else if (route.key === 'exhibition') {
    return <LikedExhibitionIcon color={props.color} />;
  } else if (route.key === 'artwork') {
    return <LikedArtworkIcon color={props.color} />;
  } else {
    return <LikedReviewIcon color={props.color} />;
  }
};

const MyProfileScreen = props => {
  const [index, setIndex] = useState(0);
  const [myReviewsNum, setMyReviewsNum] = useState(0);

  const profile = useSelector(store => store.user.profile);

  const dispatch = useDispatch();
  const getState = useStore().getState;

  const getReviewList = id => {
    return userActions.getReviewList(id)(dispatch, getState);
  };

  const getProfile = userId => {
    return userActions.getProfile(userId)(dispatch, getState);
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
    } else if (route.key === 'review') {
      return (
        <TabBarLabel
          title={'감상'}
          number={profile.like_review_count}
          color={props.color}
        />
      );
    }
  };

  const _renderMyReviewRoute = () => {
    return (
      <WrittenReviewList userId={profile.id} navigation={props.navigation} />
    );
  };

  const _renderExhibitionRoute = () => {
    return (
      <LikedExhibitionList userId={profile.id} navigation={props.navigation} />
    );
  };

  const _renderArtworkRoute = () => {
    return (
      <LikedArtworkList userId={profile.id} navigation={props.navigation} />
    );
  };

  const _renderReviewRoute = () => {
    return (
      <LikedReviewList userId={profile.id} navigation={props.navigation} />
    );
  };

  useEffect(() => {
    getProfile();
    getReviewList(profile.id).then(res => {
      setMyReviewsNum(res.length);
    });
  }, []);

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
        <Image source={settingIcon} style={{width: 24}} />
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

export default MyProfileScreen;
