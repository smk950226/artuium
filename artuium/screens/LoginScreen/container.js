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
        profile: PropTypes.object
    }

    state = {
        isSubmitting: false,
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

    _handleCheckUsername = async(username) => {
        let reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
        if(reg.test(username) === true){
            await this.setState({
                usernameForm: true,
            })
        }
        else{
            await this.setState({
                usernameForm: false,
            })
            Alert.alert(null,'이메일 형식을 확인해 주세요.')    
        }
        // const { usernameForm, isCheckingUsername } = this.state;
        // if(!isCheckingUsername && this.state.username && usernameForm){
        //     this.setState({
        //         isCheckingUsername: true
        //     })
        //     const { checkUsername } = this.props;
        //     const { username } = this.state;
        //     const result = await checkUsername(username);
        //     if(result.status === 'ok'){
        //         this.setState({
        //             isCheckingUsername: false,
        //             checkedUsername: true,
        //         })
        //         Alert.alert(null,'사용가능한 이메일입니다.')
        //     }
        //     else{
        //         this.setState({
        //             isCheckingUsername: false,
        //             checkedUsername: false,
        //         })
        //         Alert.alert(null,'오류가 발생했습니다.')            
        //     }
        // }
    }

    _handlePassword1Change = async(password1) => {
        this.setState({
            password1,
        })
        let reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/
        if(reg.test(password1) === true){
            this.setState({
                passwordForm: true
            })
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
                passwordForm: false    
            })
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
    }

    _handlePassword2Change = async(password2) => {
        this.setState({
            password2,
        })
        if(password2 !== ""){
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

    _handleNicknameChange = async(nickname) => {
        this.setState({
            nickname,
            checkedNickname: false
        })
    }

    _handleCheckNickname = async(nickname) => {
        let reg = /^[가-힣a-zA-Z0-9]{2,10}$/ ;
        if(reg.test(nickname) === true){
            await this.setState({
                nicknameForm: true,
            })
        }
        else{
            await this.setState({
                nicknameForm: false,
            })
            Alert.alert(null,'닉네임 형식을 확인해 주세요.')    
        }
        const { nicknameForm, isCheckingNickname } = this.state;
        if(!isCheckingNickname && this.state.nickname && nicknameForm){
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
            else{
                this.setState({
                    isCheckingNickname: false,
                    checkedNickname: false,
                })
                Alert.alert(null,'오류가 발생했습니다.')
            }
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
        if(!isSubmitting){
            if(username && password1 && password2 && nickname){
                await console.log("공통정보 : ", username, password1, nickname)
                if(username){
                    if(passwordForm){
                        if(passwordMatch){ 
                            if(usernameForm){
                                if(checkedNickname){
                                    this.setState({
                                        isSubmitting: true
                                    })
                                    const result = await this.props.signUp(username, password1, nickname, profileImg);
                                    if(result){
                                        if(result.error){
                                            this.setState({
                                                isSubmitting: false,
                                                codeError: result.error
                                            })
                                        }
                                        else{
                                            this.setState({
                                                isSubmitting: false
                                            })
                                            this.props.navigation.navigate('홈');
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
                        Alert.alert(null, '비밀번호 형식이 맞지 않습니다.')
                    }
                }
                else{
                    Alert.alert(null, '이메일 형식이 맞지 않습니다.')
                }
            }
            else{
                Alert.alert(null,'회원정보를 제대로 입력해주세요.')
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedProfile } = prevState;
        if((!fetchedProfile)){
            let update = {}
            if((nextProps.profile)){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedProfile && !this.state.fetchClear){
            this.props.getSaveToken(this.state.token)
            this.setState({
                isSubmitting: false,
                fetchClear: true
            })
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

    _login = async(username, password) => {
        const { isSubmitting } = this.state;
        const { login, getSaveToken, getProfileByToken } = this.props;
        if(!isSubmitting){
            this.setState({
                isSubmitting: true
            })
            const result = await login(username, password)
            if(result.token){
                await this.setState({
                    token: result.token
                })
                await getProfileByToken(result.token)
            }
            else{
                this.setState({
                    isSubmitting: false,
                })
                Alert.alert(null,'아이디 / 비밀번호를 확인해주세요.')
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