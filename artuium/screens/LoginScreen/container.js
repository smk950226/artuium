import React, { Component } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import LoginScreen from './presenter';

class Container extends Component{
    static propTypes = {
        login: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired,
        getProfileByToken: PropTypes.func.isRequired,
        profile: PropTypes.object,
        token: PropTypes.string,
        checkEmail: PropTypes.func.isRequired
    }

    state = {
        loginId: '',
        loginPw: '',
        username: '',
        usernameForm: false,
        isCheckingUsername: false,
        checkedUsername: false,
        password1: '',
        passwordForm: false,
        password2: '',
        passwordMatch: false,
        nickname: '',
        nicknameForm: false,
        isCheckingNickname: false,
        checkedNickname: false,
        visibleLogin: false,
        visibleSignup: false,
        isSubmitting: false,
        fetchedProfile: false,
        fetchedToken: false,
        fetchClear: false
    }

    _handleLoginIdChange = async(loginId) => {
        this.setState({
            loginId,
        })
    }

    _handleLoginPwChange = async(loginPw) => {
        this.setState({
            loginPw,
        })
    }

    _handleUsernameChange = async(username) => {
        this.setState({
            username,
        })
    }

    _handleCheckUsername = async() => {
        const { username, isCheckingUsername } = this.state;
        const { checkEmail } = this.props;
        let reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
        if(reg.test(username)){
            await this.setState({
                usernameForm: true,
            })
            if(!isCheckingUsername){
                this.setState({
                    isCheckingUsername: true
                })
                const result = await checkEmail(username);
                if(result.status === 'ok'){
                    this.setState({
                        isCheckingUsername: false,
                        checkedUsername: true,
                    })
                    Alert.alert(null,'사용가능한 이메일입니다.')
                }
                else if(result.error){
                    this.setState({
                        isCheckingUsername: false,
                        checkedUsername: false,
                    })
                    Alert.alert(null,result.error)
                }
                else{
                    this.setState({
                        isCheckingUsername: false,
                        checkedUsername: false,
                    })
                    Alert.alert(null,'오류가 발생했습니다.')            
                }
            }
        }
        else{
            await this.setState({
                usernameForm: false,
            })
            Alert.alert(null,'이메일 형식을 확인해 주세요.')    
        }
    }

    _handlePassword1Change = async(password1) => {
        this.setState({
            password1,
        })
        let reg = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{2,}$/;
        if(reg.test(password1) === true){
            this.setState({
                passwordForm: true
            })
            if(this.state.password2){
                if(password1 === this.state.password2){
                    this.setState({
                        passwordMatch: true
                    })
                }
                else{
                    this.setState({
                        passwordMatch: false
                    })
                }
            }
            else{
                this.setState({
                    passwordMatch: false
                })
            }
        }
        else{
            this.setState({
                passwordForm: false    
            })
            if(this.state.password2){
                if(password1 === this.state.password2){
                    this.setState({
                        passwordMatch: true
                    })
                }
                else{
                    this.setState({
                        passwordMatch: false
                    })
                }
            }
            else{
                this.setState({
                    passwordMatch: false
                })
            }
        }
    }

    _handlePassword2Change = async(password2) => {
        this.setState({
            password2,
        })
        if(password2){
            if(this.state.password1){
                if(this.state.password1 === password2){
                    await this.setState({
                        passwordMatch: true
                    })
                }
                else{
                    await this.setState({
                        passwordMatch: false
                    })
                }
            }
            else{
                await this.setState({
                    passwordMatch: false
                })
            }
        }
        else{
            await this.setState({
                passwordMatch: false
            })
        }
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

    _askPermissionsAsync = async() => {
        const cameraRoll = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({
            hasCameraRollPermission: cameraRoll.status === 'granted'
        });
    };

    _handleChangeProfileImg = async() => {
        const options = {
            mediaTypes: 'Images'
        };

        await this._askPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync(options)
        if(result.cancelled === false){
            const source = { uri: result.uri, type: result.type };
            this.setState({
                profileImg: source
            })
        }
    }

    _handleSignup = async() => {
        const { username, password1, password2, nickname, profileImg, usernameForm, passwordForm, passwordMatch, checkedUsername, checkedNickname, isSubmitting } = this.state;
        const { getSaveToken, getProfileByToken } = this.props;
        if(!isSubmitting){
            if(username && password1 && password2 && nickname){
                if(usernameForm){
                    if(passwordForm){
                        if(passwordMatch){ 
                            if(usernameForm){
                                if(checkedNickname){
                                    this.setState({
                                        isSubmitting: true
                                    })
                                    const result = await this.props.signUp(username, password1, nickname, profileImg);
                                    if(result){
                                        if(result.token){
                                            await getSaveToken(result.token)
                                            await getProfileByToken(result.token)
                                        }
                                        else{
                                            this.setState({
                                                isSubmitting: false
                                            })
                                            Alert.alert(null,'오류가 발생하였습니다.')
                                        }
                                    }
                                    else{
                                        this.setState({
                                            isSubmitting: false
                                        })
                                        Alert.alert(null,'오류가 발생하였습니다.')
                                    }
                                }
                                else{
                                    Alert.alert(null, '닉네임 중복확인을 해주세요.')
                                }
                            }
                            else{
                                Alert.alert(null, '이메일 중복확인을 해주세요.')
                            }
                        }
                        else{
                            Alert.alert(null, '비밀번호가 일치하지 않습니다.')
                        }
                    }
                    else{
                        Alert.alert(null, '비밀번호는 최소 8자, 1개이상의 숫자와 영문자를 포함해야합니다.')
                    }
                }
                else{
                    Alert.alert(null, '이메일 형식을 확인해 주세요.')
                }
            }
            else{
                Alert.alert(null,'회원정보를 제대로 입력해주세요.')
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile, fetchedToken } = prevState;
        if((!fetchedProfile) || (!fetchedToken)){
            let update = {}
            if((nextProps.profile)){
                update.fetchedProfile = true
            }
            if((nextProps.token)){
                update.fetchedToken = true
            }

            return update
        }
        else{
            return null
        }
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

    _openLogin = () => {
        this.setState({
            visibleLogin: true
        })
    }

    _closeLogin = () => {
        this.setState({
            visibleLogin: false
        })
    }

    _openSignup = () => {
        this.setState({
            visibleSignup: true
        })
    }

    _closeSignup = () => {
        this.setState({
            visibleSignup: false
        })
    }

    _login = async() => {
        const { isSubmitting, loginId, loginPw } = this.state;
        const { login, getSaveToken, getProfileByToken } = this.props;
        if(!isSubmitting){
            if(loginId && loginPw){
                this.setState({
                    isSubmitting: true
                })
                const result = await login(loginId, loginPw)
                if(result){
                    if(result.token){
                        await getSaveToken(result.token)
                        await getProfileByToken(result.token)
                    }
                    else{
                        this.setState({
                            isSubmitting: false,
                        })
                        Alert.alert(null,'아이디 / 비밀번호를 확인해주세요.')
                    }
                }
                else{
                    this.setState({
                        isSubmitting: false,
                    })
                    Alert.alert(null,'아이디 / 비밀번호를 확인해주세요.')
                }
            }
            else{
                Alert.alert(null, "아이디 / 비밀번호를 입력해주세요.")
            }
        }
    }

    render(){
        return(
            <LoginScreen 
            {...this.props}
            {...this.state}
            login={this._login}
            openLogin = {this._openLogin}
            closeLogin = {this._closeLogin}
            openSignup = {this._openSignup}
            closeSignup = {this._closeSignup}
            handleChangeProfileImg={this._handleChangeProfileImg}
            handleLoginIdChange={this._handleLoginIdChange}
            handleLoginPwChange={this._handleLoginPwChange}
            handleUsernameChange={this._handleUsernameChange}
            handlePassword1Change={this._handlePassword1Change}
            handlePassword2Change={this._handlePassword2Change}
            handleNicknameChange={this._handleNicknameChange}
            handleSignup={this._handleSignup}
            handleCheckUsername={this._handleCheckUsername}
            handleCheckNickname={this._handleCheckNickname}
            />
        )
    }
}

export default Container;