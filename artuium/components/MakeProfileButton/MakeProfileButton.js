import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const MakeProfileButton = ({onPress, buttonText, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        width: 290,
        height: 38,
        backgroundColor: '#fd4c1e',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: '500',
          fontSize: 16,
          textAlign: 'center',
          color: '#ffffff',
        }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default MakeProfileButton;
