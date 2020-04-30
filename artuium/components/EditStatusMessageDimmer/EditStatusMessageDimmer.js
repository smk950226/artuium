import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const EditStatusMessageDimmer = props => {
  const {closeDimmer, defaultValue, setValue, defaultStatusMessage} = props;
  const [statusMessage, setStatusMessage] = useState(defaultValue);

  const onPressCompleteButton = async () => {
    if (
      defaultValue !== statusMessage &&
      defaultStatusMessage !== statusMessage
    ) {
      setValue(statusMessage);
      closeDimmer();
    } else if (defaultStatusMessage === statusMessage) {
      setValue(null);
      closeDimmer();
    } else {
      closeDimmer();
    }
  };

  const onPressCancelButton = () => {
    closeDimmer();
  };

  const handleChangeStatusMessage = text => {
    setStatusMessage(text);
  };

  return (
    <View style={{...editDimmerStyles.dimmerContainer}}>
      <KeyboardAvoidingView
        behavior={'height'}
        style={{
          width,
          height: '100%',
          justifyContent: 'center',
        }}>
        <TextInput
          value={statusMessage}
          maxLength={50}
          multiline={true}
          onChangeText={handleChangeStatusMessage}
          style={{
            ...editDimmerStyles.textInput,
          }}
          textAlignVertical={'bottom'}
        />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 43,
            justifyContent: 'space-between',
          }}>
          <View />
          <Text
            style={{
              marginTop: 6,
              marginRight: 6,
              ...editDimmerStyles.lengthLimitText,
            }}>
            {statusMessage ? statusMessage.length : 0}/50
          </Text>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          marginTop: 49,
          ...editDimmerStyles.textButtonsContainer,
        }}>
        <Text
          style={{
            ...editDimmerStyles.textButton,
            marginLeft: 21,
          }}
          onPress={onPressCancelButton}>
          취소
        </Text>
        <Text style={{...editDimmerStyles.titleText}}>소개</Text>
        <Text
          style={{
            ...editDimmerStyles.textButton,
            marginRight: 20,
          }}
          onPress={onPressCompleteButton}>
          완료
        </Text>
      </View>
    </View>
  );
};
const editDimmerStyles = {
  dimmerContainer: {
    position: 'absolute',
    backgroundColor: '#00000070',
    width,
    height,
  },
  textButtonsContainer: {
    height: 127,
    width,
    position: 'absolute',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textButton: {
    fontFamily: 'Noto Sans KR',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#ffffff',
  },
  titleText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  textInput: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0.24,
    color: '#FFFFFF',
    marginHorizontal: 43,
    paddingBottom: 14,
    borderBottomWidth: 2,
    borderBottomColor: '#ffffff',
  },
  invalidText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FF9191',
  },
  lengthLimitText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
    opacity: 0.6,
  },
};

export default EditStatusMessageDimmer;
