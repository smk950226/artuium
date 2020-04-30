import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  View,
  ImageBackground,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import StatusMessage from '../StatusMessage/StatusMessage';

const {width} = Dimensions.get('window');

const ProfileInfo = ({
  profileImage,
  backgroundImage,
  nickname,
  statusMessage,
  followerCount,
  followingCount,
  others,
}) => {
  const [showMore, setShowMore] = useState(null);
  const [statusMessageLineNum, setStatusMessageLineNum] = useState(-1);
  const containerHeightAnimation = useRef(
    new Animated.Value(275 + (others ? 30 : 0)),
  ).current;

  useEffect(() => {
    if (showMore === null) return;
    else if (showMore) {
      Animated.timing(containerHeightAnimation, {
        toValue: 235 + (others ? 30 : 0) + 20 * statusMessageLineNum,
        duration: 200,
      }).start();
    } else {
      Animated.timing(containerHeightAnimation, {
        toValue: 275 + (others ? 30 : 0),
        duration: 200,
      }).start();
    }
  }, [showMore]);
  return (
    <Animated.View
      style={{
        ...profileInfoStyles.backgroundImage,
        height: containerHeightAnimation,
      }}>
      <ImageBackground
        source={
          backgroundImage
            ? {uri: backgroundImage}
            : require('../../assets/images/defaultProfileBackground.png')
        }
        style={{
          position: 'absolute',
          height: showMore
            ? 235 + (others ? 30 : 0) + 20 * statusMessageLineNum
            : 275 + (others ? 30 : 0),
          width,
        }}
        resizeMode={'cover'}
      />
      <View style={{...profileInfoStyles.blackTransparentCover}} />
      <Image
        source={
          profileImage
            ? {uri: profileImage}
            : require('../../assets/images/empty_profile.png')
        }
        style={{
          ...profileInfoStyles.profileImage,
          marginTop:
            statusMessageLineNum == -1
              ? 148 + (others ? 30 : 0)
              : statusMessageLineNum == 1
              ? 99 + (others ? 30 : 0)
              : 74 + (others ? 30 : 0),
        }}
      />
      <Text style={{...profileInfoStyles.nickname, marginTop: 12}}>
        {nickname}
      </Text>
      {statusMessage && (
        <StatusMessage
          message={statusMessage}
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
        <Text style={{...profileInfoStyles.followText, marginRight: 5}}>
          팔로워
        </Text>
        <Text style={{...profileInfoStyles.followText, marginRight: 15}}>
          {followerCount}
        </Text>
        <Text style={{...profileInfoStyles.followText, marginRight: 5}}>
          팔로잉
        </Text>
        <Text style={{...profileInfoStyles.followText}}>{followingCount}</Text>
      </View>
    </Animated.View>
  );
};

const profileInfoStyles = {
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

export default ProfileInfo;
