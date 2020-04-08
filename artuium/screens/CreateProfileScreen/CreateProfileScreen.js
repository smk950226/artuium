import React, {useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import DashLine from '../../components/DashLine/DashLine';
import Checkbox from '../../components/Checkbox/Checkbox';
import TermModal from '../../components/TermModal/TermModal';
import EnterButton from '../../components/EnterButton/EnterButton';
import TutorialScreen from '../TutorialScreen/TutorialScreen';
import {PRIVACY_POLICY, SERVICE_TERM} from '../../constants';
const {width, height} = Dimensions.get('window');

const CreateProfileScreen = props => {
  const {token} = props.navigation.state.params;

  const dispatch = useDispatch();
  const addInfo = (token, nickname, profileImg) => {
    userActions.addInfo(token, nickname, profileImg)(dispatch);
  };
  const checkNickname = nickname => {
    return userActions.checkNickname(nickname)(dispatch);
  };
  const getSaveToken = token => {
    return userActions.getSaveToken(token)(dispatch);
  };
  const getProfileByToken = token => {
    userActions.getProfileByToken(token)(dispatch);
  };

  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [service, setService] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [privacyPolicyModalVisible, setPrivacyPolicyModalVisible] = useState(
    false,
  );
  const [isValidNickname, setIsValidNickname] = useState(null);
  const [nicknameInvalidText, setNicknameInvalidText] = useState('');
  const [profileImg, setProfileImg] = useState(undefined);
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [isShowingTutorial, setIsShowingTutorial] = useState(true);

  const scrollView = useRef();

  const handleCheckNickname = checkingNickname => {
    let reg = /^[가-힣a-zA-Z0-9]{2,10}$/;
    let invalidChar = /[~!@#$%^&*()_+|<>?:{}]/gi;
    setIsValidNickname(reg.test(checkingNickname));
    if (!reg.test(checkingNickname)) {
      if (invalidChar.test(checkingNickname)) {
        setNicknameInvalidText(
          '한글, 영문, 숫자 이외의 문자는 사용할 수 없습니다.',
        );
      } else if (checkingNickname.length < 2) {
        setNicknameInvalidText('2자 이상의 닉네임만 사용할 수 있습니다.');
      } else if (checkingNickname.length > 10)
        setNicknameInvalidText('10자 이하의 닉네임만 사용할 수 있습니다.');
    }
  };

  const onPressPrivacyPolicyCheckbox = () => {
    setPrivacyPolicy(!privacyPolicy);
  };

  const onPressServiceCheckbox = () => {
    setService(!service);
  };

  const onPressAllAgreeCheckbox = () => {
    if (privacyPolicy && service) {
      setService(false);
      setPrivacyPolicy(false);
    } else {
      setService(true);
      setPrivacyPolicy(true);
    }
  };

  const handleChangeProfileImg = async () => {
    const options = {
      mediaTypes: 'Images',
    };
    // await this._askPermissionsAsync();
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = {uri: response.uri, type: response.type};
        setProfileImg(source);
      }
    });
  };

  const handleChangeNickname = nickname => {
    setNickname(nickname);
    handleCheckNickname(nickname);
  };

  const handleKeyboardShow = e => {
    scrollView.current.scrollTo({x: 200});
    setKeyboardShowing(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardShowing(false);
  };

  const onPressEnterButton = async () => {
    setIsLoading(true);
    const duplicated = await checkNickname(nickname);
    if (duplicated.status !== 'ok') {
      setNicknameInvalidText('이미 사용중인 닉네임입니다.');
      setIsValidNickname(false);
      setIsLoading(false);
    } else {
      addInfo(token, nickname, profileImg);
      getProfileByToken(token);
      getSaveToken(token);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return isShowingTutorial ? (
    <TutorialScreen closeTutorial={() => setIsShowingTutorial(false)} />
  ) : (
    <ScrollView ref={scrollView} scrollEnabled={keyboardShowing}>
      <TermModal
        visible={serviceModalVisible}
        setModalVisible={setServiceModalVisible}
        modalTitle={'아틔움 서비스이용약관'}
        modalContent={SERVICE_TERM}
      />
      <TermModal
        visible={privacyPolicyModalVisible}
        setModalVisible={setPrivacyPolicyModalVisible}
        modalTitle={'아틔움 개인정보처리방침'}
        modalContent={PRIVACY_POLICY}
      />
      <LinearGradient
        style={{
          width,
          height,
          justifyContent: 'flex-end',
        }}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={['#ffffff', '#d8d8d8']}>
        <View
          style={{
            ...createProfileScreenStyles.createProfileContainer,
            height: height - 96.3,
            marginHorizontal: 44,
          }}>
          <Image
            style={{
              marginTop: 27,
              marginLeft: 27.7,
              marginBottom: 24.2,
              height: 30.3,
            }}
            source={require('../../assets/images/artuiumLogoGray.png')}
          />
          <DashLine />
          <TouchableOpacity
            style={{
              marginTop: 28.1,
              marginBottom: 24.4,
              alignSelf: 'center',
            }}
            onPress={handleChangeProfileImg}>
            {profileImg?.uri ? (
              <Image
                style={{width: 125, height: 125, borderRadius: 72.5}}
                source={{uri: profileImg.uri}}
              />
            ) : (
              <Image
                style={{width: 125, height: 125}}
                source={require('../../assets/images/empty_profile.png')}
              />
            )}
          </TouchableOpacity>
          <DashLine />
          <Text
            style={{
              ...createProfileScreenStyles.nicknameInputLabel,
              marginTop: 20.6,
              marginLeft: 23.7,
            }}>
            닉네임
          </Text>
          <View style={{marginTop: 12, marginHorizontal: 25, height: 55}}>
            <TextInput
              style={{
                fontSize: 17,
                paddingVertical: 0,
                paddingBottom: 7.5,
                borderBottomWidth: 1,
                borderBottomColor:
                  isValidNickname !== null && isValidNickname === false
                    ? '#ff5555'
                    : '#2c2c2c',
                color: '#2c2c2c',
              }}
              placeholderTextColor={'#b7b7b7'}
              value={nickname}
              onChangeText={handleChangeNickname}
              autoCapitalize={'none'}
              autoCorrect={false}
              placeholder={'사용할 닉네임을 알려주세요.'}
            />
            <Text
              style={{
                marginTop: 4.5,
                marginLeft: 8.5,
                ...createProfileScreenStyles.nicknameInvalidText,
              }}>
              {isValidNickname === null || isValidNickname === true
                ? ' '
                : nicknameInvalidText}
            </Text>
          </View>
          <View
            style={{
              ...createProfileScreenStyles.checkboxContainer,
              marginTop: 24,
            }}>
            <Checkbox
              checked={privacyPolicy}
              onPressCheckbox={onPressPrivacyPolicyCheckbox}
            />
            <Text style={{...createProfileScreenStyles.checkboxLabel}}>
              <Text
                onPress={() => setPrivacyPolicyModalVisible(true)}
                style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                개인정보처리방침
              </Text>
              에 동의합니다.
            </Text>
          </View>
          <View
            style={{
              ...createProfileScreenStyles.checkboxContainer,
              marginTop: 12,
            }}>
            <Checkbox
              checked={service}
              onPressCheckbox={onPressServiceCheckbox}
            />
            <Text style={{...createProfileScreenStyles.checkboxLabel}}>
              <Text
                onPress={() => setServiceModalVisible(true)}
                style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                서비스 이용약관
              </Text>
              에 동의합니다.
            </Text>
          </View>
          <View
            style={{
              ...createProfileScreenStyles.checkboxContainer,
              marginTop: 12,
            }}>
            <Checkbox
              checked={privacyPolicy && service}
              onPressCheckbox={onPressAllAgreeCheckbox}
            />
            <Text style={{...createProfileScreenStyles.checkboxLabel}}>
              전체 동의합니다.
            </Text>
          </View>
          <EnterButton
            styles={{marginTop: 22, marginHorizontal: 18}}
            isLoading={isLoading}
            onPress={onPressEnterButton}
            disabled={!(privacyPolicy && service && isValidNickname)}
          />
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

const createProfileScreenStyles = {
  createProfileContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    height: 22,
    marginLeft: 24,
  },
  checkboxLabel: {
    marginLeft: 11,
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 15,
    color: '#2c2c2c',
    textAlignVertical: 'center',
    lineHeight: 22,
  },
  nicknameInputLabel: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2c2c2c',
  },
  nicknameInvalidText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 12,
    color: '#ff5555',
  },
};

export default CreateProfileScreen;
