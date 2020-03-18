import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
} from 'react-native';

const ArtiumHeader = ({
  leftIcon,
  leftText,
  leftOnPress,
  label,
  labelImage,
  labelOnPress,
  rightIcon,
  rightText,
  rightOnPress,
}) => {
  return (
    <View style={style.container}>
      <TouchableOpacity
        disabled={!leftOnPress}
        onPress={leftOnPress}
        style={style.headerLeft}>
        {leftIcon ? (
          <Image source={leftIcon} />
        ) : leftText ? (
          <Text>{leftText}</Text>
        ) : (
          <View />
        )}
      </TouchableOpacity>
      <TouchableWithoutFeedback onPress={labelOnPress}>
        {label ? (
          <Text style={style.label}>{label}</Text>
        ) : labelImage ? (
          <Image source={labelImage} />
        ) : (
          <View />
        )}
      </TouchableWithoutFeedback>
      <TouchableOpacity
        disabled={!rightOnPress}
        onPress={rightOnPress}
        style={style.headerRight}>
        {rightIcon ? (
          <Image source={rightIcon} />
        ) : rightText ? (
          <Text>{rightText}</Text>
        ) : (
          <View />
        )}
      </TouchableOpacity>
    </View>
  );
};

const style = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#dfdfdf',
  },
  headerLeft: {
    width: 100,
    height: '100%',
    marginLeft: 17,
    justifyContent: 'center',
  },
  headerRight: {
    width: 100,
    height: '100%',
    marginRight: 17,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  label: {
    color: '#000000',
    fontSize: 18,
    letterSpacing: -0.24,
    fontFamily: 'NotoSansKR-Medium',
  },
};

export default ArtiumHeader;
