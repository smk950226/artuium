import React, {useState} from 'react';
import {View, ImageBackground, Dimensions, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import StatusMessage from '../StatusMessage/StatusMessage';

const {width} = Dimensions.get('window');

const MyProfileInfo = () => {
  const profile = useSelector(store => store.user.profile);
  const [showMore, setShowMore] = useState(null);
  return (
    <ImageBackground
      source={
        profile.background_image
          ? {uri: profile.background_image}
          : require('../../assets/images/defaultProfileBackground.png')
      }
      style={{
        ...myProfileInfoStyles.backgroundImage,
        height: showMore ? 'auto' : 275,
      }}
      resizeMode={'cover'}>
      <View style={{...myProfileInfoStyles.blackTransparentCover}} />
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
      {profile.status_message && (
        <StatusMessage
          message={profile.status_message}
          showMore={showMore}
          setShowMore={setShowMore}
        />
      )}
      <Text style={{...myProfileInfoStyles.nickname, marginTop: 12}}>
        {profile.nickname}
      </Text>
      <Image
        source={
          profile.profile_image
            ? {uri: profile.profile_image}
            : require('../../assets/images/empty_profile.png')
        }
        style={{
          ...myProfileInfoStyles.profileImage,
          marginTop: showMore ? 74 : null,
        }}
      />
    </ImageBackground>
  );
};

const myProfileInfoStyles = {
  backgroundImage: {
    width,
    paddingHorizontal: 25,
    flexDirection: 'column-reverse',
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
