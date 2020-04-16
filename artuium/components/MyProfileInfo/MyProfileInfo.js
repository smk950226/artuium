import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  ImageBackground,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import StatusMessage from '../StatusMessage/StatusMessage';

const {width} = Dimensions.get('window');

const MyProfileInfo = () => {
  const profile = useSelector(store => store.user.profile);
  const [showMore, setShowMore] = useState(null);
  const [statusMessageLineNum, setStatusMessageLineNum] = useState(-1);
  const containerHeightAnimation = useRef(new Animated.Value(275)).current;

  useEffect(() => {
    if (showMore === null) return;
    else if (showMore) {
      Animated.timing(containerHeightAnimation, {
        toValue: 235 + 20 * statusMessageLineNum,
        duration: 200,
      }).start();
    } else {
      Animated.timing(containerHeightAnimation, {
        toValue: 275,
        duration: 200,
      }).start();
    }
  }, [showMore]);
  return (
    <Animated.View
      style={{
        ...myProfileInfoStyles.backgroundImage,
        height: containerHeightAnimation,
      }}>
      <ImageBackground
        source={
          profile.background_image
            ? {uri: profile.background_image}
            : require('../../assets/images/defaultProfileBackground.png')
        }
        style={{
          position: 'absolute',
          height: showMore ? 235 + 20 * statusMessageLineNum : 275,
          width,
        }}
        resizeMode={'cover'}
      />
      <View style={{...myProfileInfoStyles.blackTransparentCover}} />
      <Image
        source={
          profile.profile_image
            ? {uri: profile.profile_image}
            : require('../../assets/images/empty_profile.png')
        }
        style={{
          ...myProfileInfoStyles.profileImage,
          marginTop:
            statusMessageLineNum == -1
              ? 148
              : statusMessageLineNum == 1
              ? 99
              : 74,
        }}
      />
      <Text style={{...myProfileInfoStyles.nickname, marginTop: 12}}>
        {profile.nickname}
      </Text>
      {profile.status_message && (
        <StatusMessage
          message={profile.status_message}
          showMore={showMore}
          setShowMore={setShowMore}
          setLineNum={setStatusMessageLineNum}
        />
      )}
      <View
        style={{
          marginTop: 10,
          marginBottom: 20,
          flexDirection: 'row',
        }}>
        <Text style={{...myProfileInfoStyles.followText, marginRight: 5}}>
          팔로워
        </Text>
        <Text style={{...myProfileInfoStyles.followText, marginRight: 15}}>
          {profile.follower_count}
        </Text>
        <Text style={{...myProfileInfoStyles.followText, marginRight: 5}}>
          팔로잉
        </Text>
        <Text style={{...myProfileInfoStyles.followText}}>
          {profile.following_count}
        </Text>
      </View>
    </Animated.View>
  );
};

const myProfileInfoStyles = {
  backgroundImage: {
    width,
    paddingHorizontal: 25,
  },
  blackTransparentCover: {
    position: 'absolute',
    width,
    height: '100%',
    backgroundColor: '#00000060',
  },
  followText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  nickname: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
};

export default MyProfileInfo;
