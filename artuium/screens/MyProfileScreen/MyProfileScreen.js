import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import ExhibitionLikeScreen from '../ExhibitionLikeScreen';
import ArtworkLikeScreen from '../ArtworkLikeScreen';
import ReviewLikeScreen from '../ReviewLikeScreen';
import MyReviewScreen from '../MyReviewScreen/MyReviewScreen';
import MyProfileInfo from '../../components/MyProfileInfo/MyProfileInfo';
import {settingIcon} from '../../assets/images';
import {
  MyReviewIcon,
  LikedExhibitionIcon,
  LikedArtworkIcon,
  LikedReviewIcon,
} from '../../assets/images/svgs';

const MyProfileScreen = props => {
  // const navigationParams = props.navigation.state.params;

  const [index, setIndex] = useState(0);
  const [myReviewsNum, setMyReviewsNum] = useState(0);
  const {
    like_exhibition_count,
    like_artwork_count,
    like_review_count,
    id,
  } = useSelector(store => store.user.profile);

  const dispatch = useDispatch();

  const getReviewList = userId => {
    return dispatch(userActions.getReviewList(userId));
  };
  useEffect(() => {
    getReviewList(id).then(res => {
      console.log(res);
      setMyReviewsNum(res.length);
    });
  }, []);
  const _renderMyReviewRoute = () => {
    return <MyReviewScreen navigation={props.navigation} />;
  };

  const _renderExhibitionRoute = () => {
    return <ExhibitionLikeScreen navigation={props.navigation} />;
  };

  const _renderArtworkRoute = () => {
    return <ArtworkLikeScreen navigation={props.navigation} />;
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
            marginTop: -8,
          }}>
          {title}
        </Text>
        <Text
          style={{
            color,
            ...myProfileScreenStyles.tabBarNumber,
            marginTop: -8,
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
          number={like_exhibition_count}
          color={props.color}
        />
      );
    } else if (route.key === 'artwork') {
      return (
        <TabBarLabel
          title={'작품'}
          number={like_artwork_count}
          color={props.color}
        />
      );
    } else {
      return (
        <TabBarLabel
          title={'감상'}
          number={like_review_count}
          color={props.color}
        />
      );
    }
  };

  return (
    <>
      <MyProfileInfo />
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
        onIndexChange={setIndex}
        renderScene={SceneMap({
          myReview: _renderMyReviewRoute,
          exhibition: _renderExhibitionRoute,
          artwork: _renderArtworkRoute,
          review: _renderReviewRoute,
        })}
        renderTabBar={props => (
          <>
            <TabBar
              {...props}
              activeColor={'#fa4d2c'}
              inactiveColor={'#c4c4c4'}
              bounces={false}
              indicatorStyle={{backgroundColor: '#fa4d2c', height: 1}}
              style={{backgroundColor: 'white', marginHorizontal: 20}}
              renderIcon={props => getTabBarIcons(props)}
              renderLabel={props => getTabBarLabels(props)}
            />
          </>
        )}
      />
    </>
  );
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
