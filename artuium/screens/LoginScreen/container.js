import React, { Component } from 'react';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { GoogleSignin } from '@react-native-community/google-signin';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import PropTypes from 'prop-types';
import LoginScreen from './presenter';
import RNKakao from 'rn-kakao-login';

class Container extends Component{
    static propTypes = {
        login: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        profile: PropTypes.any,
        token: PropTypes.string,
        checkEmail: PropTypes.func.isRequired
    }

    state = {
        nickname: '',
        nicknameForm: false,
        isCheckingNickname: false,
        checkedNickname: false,
        isSubmitting: false,
        fetchedProfile: false,
        fetchedToken: false,
        fetchClear: false,
        agreeTerm: false,
        showTerm: false,
        addInfoModal: false,
    }

    componentDidMount = () => {
        GoogleSignin.configure({
            offlineAccess: true,
            webClientId: '834300059497-k2p01j18n5fnh11ek598nm138vh06s2m.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }

    _handleFacebookLogin = async(accessToken) => {
        const result = await this.props.facebookLogin(accessToken)
        if(result.token){
            const profile = await this.props.getProfileByTokenReturn(result.token);
            if(profile){
                if(profile.nickname){
                    await this.props.getProfileByToken(result.token)
                    await this.props.getSaveToken(result.token)
                }
                else{
                    await this._openAddInfo()
                    this.setState({
                        savedToken: result.token
                    })
                }
            }
        }
    }

    _handleGoogleLogin = async() => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn();
            const { accessToken } = await GoogleSignin.getTokens();
            const result = await this.props.googleLogin(accessToken)
            if(result.token){
                const profile = await this.props.getProfileByTokenReturn(result.token);
                if(profile){
                    if(profile.nickname){
                        await this.props.getProfileByToken(result.token)
                        await this.props.getSaveToken(result.token)
                    }
                    else{
                        await this._openAddInfo()
                        this.setState({
                            savedToken: result.token
                        })
                    }
                }
            }
        }
        catch (error) {
            console.log("에러 :::::::::::::: ", error)
        }
    };

    _handleKakaoLogin = async() => {
        const kakaoResult = await RNKakao.login()
        const result = await this.props.kakaoLogin(kakaoResult.accessToken)
        if(result.token){
            const profile = await this.props.getProfileByTokenReturn(result.token);
            if(profile){
                if(profile.nickname){
                    await this.props.getProfileByToken(result.token)
                    await this.props.getSaveToken(result.token)
                }
                else{
                    await this._openAddInfo()
                    this.setState({
                        savedToken: result.token
                    })
                }
            }
        }
    }

    _addInfoEnd = async() => {
        const { nickname, profileImg, savedToken } = this.state;
        await this.props.addInfo(savedToken, nickname, profileImg)
        await this.props.getProfileByToken(savedToken)
        await this.props.getSaveToken(savedToken)
    }

    _openAddInfo = () => {
        this.setState({
            addInfoModal: true
        })
    }

    _closeAddInfo = () => {
        this.setState({
            addInfoModal: true
        })
    }

    _handleNicknameChange = async(nickname) => {
        this.setState({
            nickname,
            checkedNickname: false
        })
    }

    _handleCheckNickname = async() => {
        const { nickname, isCheckingNickname } = this.state;
        let reg = /^[가-힣a-zA-Z0-9]{2,10}$/ ;
        if(reg.test(nickname) === true){
            await this.setState({
                nicknameForm: true,
            })
            if(!isCheckingNickname){
                this.setState({
                    isCheckingNickname: true
                })
                const { checkNickname } = this.props;
                const { nickname } = this.state;
                const result = await checkNickname(nickname);
                if(result.status === 'ok'){
                    this.setState({
                        isCheckingNickname: false,
                        checkedNickname: true,
                    })
                    Alert.alert(null,'사용가능한 닉네임입니다.')
                }
                else if(result.error){
                    this.setState({
                        isCheckingNickname: false,
                        checkedNickname: false,
                    })
                    Alert.alert(null,result.error)
                }
                else{
                    this.setState({
                        isCheckingNickname: false,
                        checkedNickname: false,
                    })
                    Alert.alert(null,'오류가 발생했습니다.')
                }
            }
        }
        else{
            await this.setState({
                nicknameForm: false,
            })
            Alert.alert(null,'닉네임 형식을 확인해 주세요.')    
        }
    }

    // _askPermissionsAsync = async() => {
    //     const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //     this.setState({
    //         hasCameraRollPermission: cameraRoll.status === 'granted'
    //     });
    // };

    _handleChangeProfileImg = async() => {
        const options = {
            mediaTypes: 'Images'
        };

        // await this._askPermissionsAsync();
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
            } else {
            const source = { uri: response.uri, type: response.type };
            this.setState({
                profileImg: source
            })
            }
        })
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && this.state.fetchedToken && !this.state.fetchClear){
            this.setState({
                isSubmitting: false,
                fetchClear: true
            })
            this.props.navigation.navigate('홈');
        }
    }

    _handleChangeAgreeTerm = () => {
        this.setState({
            agreeTerm: !this.state.agreeTerm
        })
    }

    _handleChangeShowTerm = () => {
        this.setState({
            showTerm: !this.state.showTerm
        })
    }

    render(){
        return(
            <LoginScreen 
            {...this.props}
            {...this.state}
            handleChangeProfileImg={this._handleChangeProfileImg}
            handleNicknameChange={this._handleNicknameChange}
            handleCheckNickname={this._handleCheckNickname}
            handleChangeAgreeTerm={this._handleChangeAgreeTerm}
            handleChangeShowTerm={this._handleChangeShowTerm}
            handleKakaoLogin={this._handleKakaoLogin}
            handleGoogleLogin={this._handleGoogleLogin}
            handleFacebookLogin={this._handleFacebookLogin}
            openAddInfo={this._openAddInfo}
            closeAddInfo={this._closeAddInfo}
            addInfoEnd={this._addInfoEnd}
            />
        )
    }
}

export default Container;