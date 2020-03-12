import React from 'react';
import {View, Image, Text} from 'react-native';
import {emptyFollowerIllust} from '../../assets/images';
import {deviceInfo} from '../../util';

export const NoFollowerIndicator = () => {
  return (
    <View style={style.container}>
      <Image source={emptyFollowerIllust} style={style.illust} />
      <Text style={style.mainDescription}>
        아직 팔로우하는 친구가 없습니다.
      </Text>
      <Text style={style.subDescription}>
        친구를 팔로우하고 감상을 나눠보세요.
      </Text>
    </View>
  );
};

const style = {
  container: {
    width: deviceInfo.size.width - 36,
    height: 371,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#d7d7d7',
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 18,
    marginBottom: 20,
  },
  illust: {
    width: 192,
    height: 185,
    marginTop: 58,
  },
  mainDescription: {
    marginTop: 11,
    fontSize: 14,
    lineHeight: 20,
    color: '#fd4a1d',
    fontFamily: 'NotoSansKR-Medium',
  },
  subDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    color: '#FF8F72',
    fontFamily: 'NotoSansKR-Medium',
  },
};
