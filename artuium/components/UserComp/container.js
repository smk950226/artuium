import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import UserComp from './presenter';

class Container extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired,
        size: PropTypes.string,
        reportUser: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { user : { is_following, is_me } } = props;
        this.state = {
            is_following,
            is_me,
            isSubmitting: false,
            isReporting: false
        }
    }

    _follow = async() => {
        const { is_following, is_me, isSubmitting } = this.state;
        const { followUser, user : { id } } = this.props;
        if(!isSubmitting){
            if(!is_me){
                if(!is_following){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await followUser(id)
                    if(result.status === 'ok'){
                        this.setState({
                            is_following: true,
                            isSubmitting: false
                        })
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                    }
                }
            }
        }
    }

    _unfollow = async() => {
        const { is_following, is_me, isSubmitting } = this.state;
        const { unfollowUser, user : { id } } = this.props;
        if(!isSubmitting){
            if(!is_me){
                if(is_following){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await unfollowUser(id)
                    if(result.status === 'ok'){
                        this.setState({
                            is_following: false,
                            isSubmitting: false
                        })
                    }
                    else{
                        this.setState({
                            isSubmitting: false
                        })
                    }
                }
            }
        }
    }

    _reportUser = async(index, value) => {
        if(value === '신고하기'){
            const { isReporting } = this.state;
            const { reportUser, user: { id } } = this.props;
            if(!isReporting){
                this.setState({
                    isReporting: true
                })
                const result = await reportUser(id)
                if(result.status === 'ok'){
                    this.setState({
                        isReporting: false
                    })
                    Alert.alert(null, '신고되었습니다.')
                }
                else if(result.error){
                    this.setState({
                        isReporting: false
                    })
                    Alert.alert(null, result.error)
                }
                else{
                    this.setState({
                        isReporting: false
                    })
                    Alert.alert(null, '오류가 발생하였습니다.')
                }
            }
        }
    }
    
    render(){
        return(
            <UserComp 
            {...this.props}
            {...this.state}
            follow={this._follow}
            unfollow={this._unfollow}
            reportUser={this._reportUser}
            />
        )
    }
}

export default Container;