import React, {useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';

const {width, height} = Dimensions.get('window');

const EditNicknameDimmer = props => {
  const {closeDimmer, defaultValue, setValue, defaultNickname} = props;
  const dispatch = useDispatch();
  const checkNickname = nickname => {
    return userActions.checkNickname(nickname)(dispatch);
  };

  const [nickname, setNickname] = useState(defaultValue);
  const [isValidNickname, setIsValidNickname] = useState(true);
  const [nicknameInvalidText, setNicknameInvalidText] = useState('');

  const onPressCompleteButton = async () => {
    if (defaultValue !== nickname && defaultNickname !== nickname) {
      const duplicated = await checkNickname(nickname);
      if (duplicated.status !== 'ok') {
        setNicknameInvalidText('이미 사용중인 닉네임입니다.');
        setIsValidNickname(false);
      } else {
        setValue(nickname);
        closeDimmer();
      }
    } else if (defaultNickname === nickname) {
      setValue(null);
      closeDimmer();
    } else {
      closeDimmer();
    }
  };

  const onPressCancelButton = () => {
    closeDimmer();
  };

  const handleCheckNickname = checkingNickname => {
    let reg = /^[가-힣a-zA-Z0-9]{2,10}$/;
    let invalidChar = /[~!@#$%^&*()_+|<>?:{} ]/gi;
    setIsValidNickname(reg.test(checkingNickname));
    if (!reg.test(checkingNickname)) {
      if (invalidChar.test(checkingNickname)) {
        setNicknameInvalidText('한글, 영문, 숫자만 사용할 수 있습니다.');
      } else if (checkingNickname.length < 2) {
        setNicknameInvalidText('2자 이상의 닉네임만 사용할 수 있습니다.');
      } else {
        setNicknameInvalidText('');
      }
    } else {
      setNicknameInvalidText('');
    }
  };

  const handleChangeNickname = text => {
    setNickname(text);
    handleCheckNickname(text);
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
          value={nickname}
          maxLength={10}
          onChangeText={handleChangeNickname}
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
          <Text
            style={{
              ...editDimmerStyles.invalidText,
              marginTop: 8,
              marginLeft: 10,
            }}>
            {isValidNickname ? '' : nicknameInvalidText}
          </Text>
          <Text
            style={{
              marginTop: 6,
              marginRight: 6,
              ...editDimmerStyles.lengthLimitText,
            }}>
            {/* {nickname.length}/10 */}
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
        <Text style={{...editDimmerStyles.titleText}}>닉네임</Text>
        <Text
          style={{
            ...editDimmerStyles.textButton,
            marginRight: 20,
            opacity: isValidNickname ? 1 : 0.5,
          }}
          onPress={isValidNickname ? onPressCompleteButton : () => {}}>
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

export default EditNicknameDimmer;
