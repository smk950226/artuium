import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';

const LoginButton = ({
  onPress,
  buttonColor,
  buttonImgSrc,
  buttonDescription,
  buttonDescriptionColor = '#000000',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...loginButtonStyles.button,
        backgroundColor: buttonColor,
        marginTop: 15,
      }}>
      <View style={{...loginButtonStyles.buttonIconContainer}}>
        <Image source={buttonImgSrc} />
      </View>
      <View style={{...loginButtonStyles.buttonTextContainer}}>
        <Text
          style={{
            ...loginButtonStyles.buttonText,
            color: buttonDescriptionColor,
          }}>
          {buttonDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const loginButtonStyles = {
  button: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 3,
  },
  buttonIconContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextContainer: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    lineHeight: 22,
    fontSize: 14,
    fontFamily: 'NotoSansKR-Medium',
  },
};

export default LoginButton;
