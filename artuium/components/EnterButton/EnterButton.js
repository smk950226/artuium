import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

const enterButtonStyles = {
  container: {
    height: 38,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
};

const EnterButton = props => {
  const {onPress, disabled, isLoading, styles} = props;
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      style={{
        ...enterButtonStyles.container,
        ...styles,
        backgroundColor: disabled || isLoading ? '#a7a7a7' : '#fd4c1e',
      }}>
      {!isLoading ? (
        <Text style={{...enterButtonStyles.text}}>입장하기</Text>
      ) : (
        <ActivityIndicator size="small" color="#000000" />
      )}
    </TouchableOpacity>
  );
};

export default EnterButton;
