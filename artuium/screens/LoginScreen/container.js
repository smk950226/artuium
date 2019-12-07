import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import LoginScreen from './presenter';

class Container extends Component{
    static propTypes = {
        login: PropTypes.func.isRequired,
        getSaveToken: PropTypes.func.isRequired
    }

    state = {
        isSubmitting: false
    }

    _login = async() => {
        const { isSubmitting } = this.state;
        const { login, getSaveToken } = this.props;
        if(!isSubmitting){
            this.setState({
                isSubmitting: true
            })
            const result = await login()
            if(result.token){
                this.setState({
                    isSubmitting: false
                })
                getSaveToken(result.token)
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