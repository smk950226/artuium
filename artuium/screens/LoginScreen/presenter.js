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
import styles from '../../styles';

const LoginButton = ({
  onPress,
  buttonColor,
  buttonImgSrc,
  buttonDescription,
  buttonDescriptionColor = 'black',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...loginScreenStyles.loginButton,
        backgroundColor: buttonColor,
        marginTop: 15,
      }}>
      <View style={{...loginScreenStyles.loginButtonIconContainer}}>
        <Image source={buttonImgSrc} />
      </View>
      <View style={{...loginScreenStyles.loginButtonTextContainer}}>
        <Text
          style={{
            ...loginScreenStyles.loginButtonText,
            color: buttonDescriptionColor == 'white' ? '#ffffff' : '#000000',
          }}>
          {buttonDescription}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

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
            <View style={{alignContext: 'end'}}>
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
              <LoginButton
                onPress={this.props.handleAppleSignIn}
                buttonColor={'#000000'}
                buttonImgSrc={require('../../assets/images/appleLogo.png')}
                buttonDescription={'애플 아이디로 로그인'}
                buttonDescriptionColor={'white'}
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
  loginButton: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 3,
  },
  loginButtonIconContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonTextContainer: {
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    lineHeight: 22,
    fontSize: 14,
    fontFamily: 'NotoSansKR-Medium',
  },
};

export default LoginScreen;
