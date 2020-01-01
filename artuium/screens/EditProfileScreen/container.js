import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import EditProfileScreen from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname: props.profile.nickname,
            nicknameForm: true,
            availableNickname: false,
            isCheckingNickname: false,
            checkedNickname: false,
        }
    }

    componentDidMount(){
        this.props.getProfile()
    }

    _handleNicknameChange = (nickname) => {
        this.setState({
            nickname,
            checkedNickname: false
        })
    }
    
    _handleCheckNickname = async(nickname) => {
        let reg = /^[가-힣a-zA-Z0-9]{2,10}$/ ;
        if(reg.test(nickname)){
            await this.setState({
                nicknameForm: true,
                checkedNickname: true,
            })
        }
        else{
            await this.setState({
                nicknameForm: false,
                checkedNickname: true,
            })
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
                    availableNickname: true,
                })
            }
            else{
                this.setState({
                    isCheckingNickname: false,
                    availableNickname: false,
                    checkedNickname: true,
                })
            }
        }
    }

    _handleNicknameClear = () => {
        this.setState({
            nickname: ''
        })
    }

    _handleChangeNickname = async(nickname) => {
        const { nicknameForm, checkedNickname } = this.state;
        if(nicknameForm && checkedNickname){
            await this.props.changeNickname(nickname)
            this.props.navigation.goBack(null)
        }
        else{
            await this.setState({
                nickname: this.props.profile.nickname
            })
            this.props.navigation.goBack(null)
        }
    }


    // _askPermissionsAsync = async () => {
    //     check(PERMISSIONS.IOS.LOCATION_ALWAYS)
    //     .then(result => {
    //         switch (result) {
    //         case RESULTS.UNAVAILABLE:
    //             Alert.alert(null, '오류가 발생하였습니다.')
    //             break;
    //         case RESULTS.DENIED:
    //             Alert.alert(null, '권한요청이 거절되었습니다.')
    //             break;
    //         case RESULTS.GRANTED:
    //             this.setState({
    //                 hasCameraRollPermission: 'granted'
    //             });
    //             break;
    //         case RESULTS.BLOCKED:
    //             Alert.alert(null, '권한요청이 차단되었습니다.')
    //             break;
    //         }
    //     })
    // };

    _handleChangeProfileImg = async() => {
        const options = {
            mediaTypes: 'Images'
        };

        // await this._askPermissionsAsync();
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
            const source = { uri: response.uri, type: response.type };
            this.props.changeProfileImg(source)
            }
        })
    }

    _handleChangeBackgroundImg = async() => {
        const options = {
            mediaTypes: 'Images'
        };

        // await this._askPermissionsAsync();
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
            const source = { uri: response.uri, type: response.type };
            this.props.changeBackgroundImg(source)
            }
        })
    }

    render(){
        return(
            <EditProfileScreen 
            {...this.props}
            {...this.state}
            handleChangeProfileImg={this._handleChangeProfileImg}
            handleChangeBackgroundImg={this._handleChangeBackgroundImg}
            handleNicknameChange={this._handleNicknameChange}
            handleNicknameClear={this._handleNicknameClear}
            handleChangeNickname={this._handleChangeNickname}
            handleCheckNickname={this._handleCheckNickname}
            />
        )
    }
}

export default Container;