import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserComp from './presenter';

class Container extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        const { user : { is_following, is_me } } = props;
        this.state = {
            is_following,
            is_me,
            isSubmitting: false
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
    
    render(){
        return(
            <UserComp 
            {...this.props}
            {...this.state}
            follow={this._follow}
            unfollow={this._unfollow}
            />
        )
    }
}

export default Container;