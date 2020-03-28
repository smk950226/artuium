import React, {Component} from 'react';
import {Platform} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import PropTypes from 'prop-types';
import LoginScreen from './presenter';
import RNKakao from 'rn-kakao-login';
import appleAuth, {
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

class Container extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    getSaveToken: PropTypes.func.isRequired,
    getProfileByToken: PropTypes.func.isRequired,
    profile: PropTypes.any,
    token: PropTypes.string,
    checkEmail: PropTypes.func.isRequired,
    checkUsername: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.authCredentialListener = null;
    this.user = null;
    this.state = {
      credentialStateForUser: -1,
      isSubmitting: false,
      fetchedProfile: false,
      fetchedToken: false,
      fetchClear: false,
    };
  }

  componentDidMount = () => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        '834300059497-k2p01j18n5fnh11ek598nm138vh06s2m.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    });
    if (Platform.OS === 'ios') {
      this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
        this.fetchAndUpdateCredentialState().catch(error =>
          this.setState({credentialStateForUser: `Error: ${error.code}`}),
        );
      });

      this.fetchAndUpdateCredentialState()
        .then(res => this.setState({credentialStateForUser: res}))
        .catch(error =>
          this.setState({credentialStateForUser: `Error: ${error.code}`}),
        );
    }
  };

  componentWillUnmount() {
    /**
     * cleans up event listener
     */
    if (Platform.OS === 'ios') {
      this.authCredentialListener();
    }
  }

  _handleAppleSignIn = async () => {
    const {checkUsername} = this.props;
    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      // console.log('appleAuthRequestResponse', appleAuthRequestResponse);

      const {
        fullName,
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      this.user = newUser;

      this.fetchAndUpdateCredentialState()
        .then(res => this.setState({credentialStateForUser: res}))
        .catch(error =>
          this.setState({credentialStateForUser: `Error: ${error.code}`}),
        );

      if (identityToken) {
        const check = await checkUsername(newUser);
        if (check) {
          if (check.type === 'signup') {
            const result = await this.props.appleLogin(
              newUser,
              `${newUser.slice(0, 10)}1234`,
            );
            if (result.token) {
              const profile = await this.props.getProfileByTokenReturn(
                result.token,
              );
              if (profile) {
                if (profile.nickname) {
                  await this.props.getProfileByToken(result.token);
                  await this.props.getSaveToken(result.token);
                } else {
                  this.setState({
                    savedToken: result.token,
                  });
                  await this._openAddInfo();
                }
              }
            }
          } else if (check.type === 'login') {
            const result = await this.props.login(
              newUser,
              `${newUser.slice(0, 10)}1234`,
            );
            if (result.token) {
              const profile = await this.props.getProfileByTokenReturn(
                result.token,
              );
              if (profile) {
                if (profile.nickname) {
                  await this.props.getProfileByToken(result.token);
                  await this.props.getSaveToken(result.token);
                } else {
                  this.setState({
                    savedToken: result.token,
                  });
                  await this._openAddInfo();
                }
              }
            }
          }
        }
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  };

  fetchAndUpdateCredentialState = async () => {
    if (this.user === null) {
      this.setState({credentialStateForUser: 'N/A'});
    } else {
      const credentialState = await appleAuth.getCredentialStateForUser(
        this.user,
      );
      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        this.setState({credentialStateForUser: 'AUTHORIZED'});
      } else {
        this.setState({credentialStateForUser: credentialState});
      }
    }
  };

  _handleFacebookLogin = async accessToken => {
    const result = await this.props.facebookLogin(accessToken);
    if (result.token) {
      const profile = await this.props.getProfileByTokenReturn(result.token);
      if (profile) {
        if (profile.nickname) {
          await this.props.getProfileByToken(result.token);
          await this.props.getSaveToken(result.token);
          console.log(this.state.login);
        } else {
          this.setState({
            savedToken: result.token,
          });
          await this._openAddInfo();
        }
      }
    }
  };

  _handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      const {accessToken} = await GoogleSignin.getTokens();
      const result = await this.props.googleLogin(accessToken);
      if (result.token) {
        const profile = await this.props.getProfileByTokenReturn(result.token);
        if (profile) {
          if (profile.nickname) {
            await this.props.getProfileByToken(result.token);
            await this.props.getSaveToken(result.token);
          } else {
            this.setState({
              savedToken: result.token,
            });
            await this._openAddInfo();
          }
        }
      }
    } catch (error) {
      console.log('에러 :::::::::::::: ', error);
    }
  };

  _handleKakaoLogin = async () => {
    const kakaoResult = await RNKakao.login();
    const result = await this.props.kakaoLogin(kakaoResult.accessToken);
    if (result.token) {
      const profile = await this.props.getProfileByTokenReturn(result.token);
      if (profile) {
        if (profile.nickname) {
          await this.props.getProfileByToken(result.token);
          await this.props.getSaveToken(result.token);
        } else {
          this.setState({
            savedToken: result.token,
          });
          await this._openAddInfo();
        }
      }
    }
  };

  _openAddInfo = () => {
    const {savedToken} = this.state;
    this.props.navigation.navigate('CreateProfile', {
      token: savedToken,
    });
  };

  // _askPermissionsAsync = async() => {
  //     const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //     this.setState({
  //         hasCameraRollPermission: cameraRoll.status === 'granted'
  //     });
  // };

  componentDidUpdate = () => {
    if (
      this.state.fetchedProfile &&
      this.state.fetchedToken &&
      !this.state.fetchClear
    ) {
      this.setState({
        isSubmitting: false,
        fetchClear: true,
      });
      this.props.navigation.navigate('홈');
    }
  };

  render() {
    return (
      <LoginScreen
        {...this.props}
        {...this.state}
        handleFacebookLogin={this._handleFacebookLogin}
        handleKakaoLogin={this._handleKakaoLogin}
        handleGoogleLogin={this._handleGoogleLogin}
        handleAppleSignIn={this._handleAppleSignIn}
      />
    );
  }
}

export default Container;
