import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const OthersProfileFollowButton = props => {
  const {onPress, isFollowing, styles} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles,
        width: 68,
        height: 22,
        borderWidth: isFollowing ? 0 : 1,
        backgroundColor: isFollowing ? '#fa4d2c' : undefined,
        borderColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: '500',
          fontSize: 14,
          fontHeight: 20,
          letterSpacing: -0.24,
          color: '#ffffff',
        }}>
        {isFollowing ? '팔로우 중' : '팔로우'}
      </Text>
    </TouchableOpacity>
  );
};

export default OthersProfileFollowButton;
