import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import LoginButton from '../../components/LoginButton/LoginButton';
import styles from '../../styles';

class LoginScreen extends React.Component {
  static propTypes = {};

  _handleFacebookLogin = () => {
    const {handleFacebookLogin} = this.props;
    LoginManager.logInWithPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('login is cancelled.');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            handleFacebookLogin(data.accessToken.toString());
          });
        }
      },
      function(error) {
        console.log('login has error: ' + error);
      },
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/bg_login.jpg')}
        resizeMode={'cover'}
        style={[styles.container, styles.center]}>
        <LinearGradient
          style={{width: '100%', height: '100%'}}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#ffffff', '#d8d8d8']}>
          <View style={{flexDirection: 'row', width: '100%', height: '100%'}}>
            <View style={{width: '60%'}}>
              <Text style={{...loginScreenStyles.subTitle}}>
                예술을{'\n'}이야기하는 곳.
              </Text>
              <Image
                source={require('../../assets/images/artuiumLogoBlack.png')}
                style={{marginTop: 8, marginLeft: 56, width: 138.8}}
                resizeMode="stretch"
              />
              <Image
                source={require('../../assets/images/loginBackground1.png')}
                style={{marginTop: 35.5, marginLeft: -46, width: 270}}
              />
            </View>
            <View style={{alignContent: 'flex-end'}}>
              <Image
                source={require('../../assets/images/loginBackground2.png')}
                style={{marginTop: 128.7, marginRight: -56.8}}
              />
              <Image
                source={require('../../assets/images/loginBackground3.png')}
                style={{marginTop: 88.7, marginRight: -27.8}}
              />
            </View>
          </View>
          <View
            style={{
              ...loginScreenStyles.buttonsContainer,
              marginBottom: 70,
            }}>
            <LoginButton
              onPress={this.props.handleKakaoLogin}
              buttonColor={'#ffd421'}
              buttonImgSrc={require('../../assets/images/kakaotalkLogo.png')}
              buttonDescription={'카카오톡으로 로그인'}
            />
            <LoginButton
              onPress={this._handleFacebookLogin}
              buttonColor={'#407ff8'}
              buttonImgSrc={require('../../assets/images/facebookLogo.png')}
              buttonDescription={'페이스북으로 로그인'}
            />
            <LoginButton
              onPress={this.props.handleGoogleLogin}
              buttonColor={'#ffffff'}
              buttonImgSrc={require('../../assets/images/googleLogo.png')}
              buttonDescription={'구글 로그인'}
            />
            {Platform.OS === 'ios' ? (
              <AppleButton
                style={{width: '100%', height: 48, marginTop: 15}}
                cornerRadius={3}
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={this.props.handleAppleSignIn}
              />
            ) : null}
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }
}

const loginScreenStyles = {
  subTitle: {
    marginTop: 101,
    marginLeft: 56,
    textAlign: 'left',
    fontSize: 23,
    fontFamily: 'NotoSansKR-Bold',
    fontWeight: 'bold',
    lineHeight: 34,
  },
  buttonsContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 57,
  },
};

export default LoginScreen;
