import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import EditProfileScreen from './presenter';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Container extends Component{
    constructor(props){
        super(props);
        this.state = {
            nickname: this.props.profile.nickname,
        }
    }

    componentDidMount(){
        this.props.getProfile
    }

    _handleNicknameChange = (nickname) => {
        this.setState({
            nickname
        })
    }

    _handleNicknameClear = () => {
        this.setState({
            nickname: ''
        })
    }

    _handleChangeNickname = async(nickname) => {
        await this.props.changeNickname(nickname)
        this.props.navigation.goBack(null)
    }


    _askPermissionsAsync = async () => {
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
            this.props.changeProfileImg(source)
        }
    }

    _handleChangeBackgroundImg = async() => {
        const options = {
            mediaTypes: 'Images'
        };

        await this._askPermissionsAsync();
        const result = await ImagePicker.launchImageLibraryAsync(options)
        if(result.cancelled === false){
            const source = { uri: result.uri, type: result.type };
            this.props.changeBackgroundImg(source)
        }
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
            />
        )
    }
}

export default Container;