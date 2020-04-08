import React from 'react';
import {Text, View} from 'react-native';
import ArtuiumHeader from '../../components/ArtuiumHeader/ArtuiumHeader';
import {backArrow} from '../../assets/images';
import styles from '../../styles';
import {deviceInfo} from '../../util';
import {useDispatch} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const iosStatusBarHeight = getStatusBarHeight();

const SettingScreen = (props) => {
  const dispatch = useDispatch();
  const onPressLogoutButton = () => {
    userActions.getLogout()(dispatch);
  };

  return (
    <View
      style={[
        styles.container,
        {marginTop: deviceInfo.OS === 'ios' ? iosStatusBarHeight : 0},
      ]}>
      <ArtuiumHeader
        label={'환경설정'}
        leftOnPress={() => props.navigation.pop()}
        leftIcon={backArrow}
      />
      <Text style={{...settingScreenStyles.menuTitle, marginTop: 27}}>
        프로필
      </Text>
      <Text
        style={{...settingScreenStyles.menuOption, marginTop: 22}}
        onPress={() => props.navigation.navigate('EditProfile', {})}>
        프로필 설정
      </Text>
      <Text style={{...settingScreenStyles.menuTitle, marginTop: 42}}>
        계정
      </Text>
      <Text
        style={{...settingScreenStyles.menuOption, marginTop: 22}}
        onPress={onPressLogoutButton}>
        로그아웃
      </Text>
    </View>
  );
};

const settingScreenStyles = {
  menuTitle: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#fa4d2c',
    opacity: 0.8,
    marginLeft: 27,
  },
  menuOption: {
    fontFamily: 'Noto Sans KR',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#535353',
    opacity: 0.8,
    marginLeft: 41,
  },
};

export default SettingScreen;
