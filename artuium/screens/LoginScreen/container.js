import React, { Component } from 'react';
import { Alert } from 'react-native';
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
        fetchedProfile: false,
        fetchClear: false
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

    _login = async() => {
        const { isSubmitting } = this.state;
        const { login, getSaveToken, getProfileByToken } = this.props;
        if(!isSubmitting){
            this.setState({
                isSubmitting: true
            })
            const result = await login()
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
                Alert.alert(null,'아이디 혹은 비밀번호를 확인해주세요.')
            }
        }
    }

    render(){
        return(
            <LoginScreen 
            {...this.props}
            {...this.state}
            login={this._login}
            />
        )
    }
}

export default Container;