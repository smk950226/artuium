import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard from './presenter';

class Container extends Component{
    static propTypes = {
        review: PropTypes.object.isRequired,
        size: PropTypes.string.isRequired,
        followUser: PropTypes.func.isRequired,
        unfollowUser: PropTypes.func.isRequired,
        initialReview: PropTypes.func.isRequired,
        likeReview: PropTypes.func.isRequired,
        unlikeReview: PropTypes.func.isRequired,
        from: PropTypes.string
    }

    constructor(props){
        super(props);
        const { review : { author : { is_me, is_following, following_count, follower_count }, is_liked, like_count, reply_count } } = props;
        this.state = {
            is_me,
            is_following,
            is_liked,
            like_count,
            reply_count,
            isSubmitting: false,
            showProfileModal: false,
            following_count,
            follower_count,
            mode: 'follower',
            showFollowModal: false
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.review !== this.props.review){
            const { review : { author : { is_me, is_following, following_count, follower_count }, is_liked, like_count, reply_count } } = this.props;
            this.setState({
                is_me,
                is_following,
                following_count,
                follower_count, 
                is_liked, 
                like_count, 
                reply_count
            })
        }
    }

    _openProfileModal = () => {
        this.setState({
            showProfileModal: true,
            showFollowModal: false      
        })
    }

    _closeProfileModal = () => {
        this.setState({
            showProfileModal: false
        })
    }

    _openFollowModal = (mode) => {
        this.setState({
            showFollowModal: true,
            showProfileModal: false,
            mode        
        })
    }

    _closeFollowModal = () => {
        this.setState({
            showFollowModal: false,
            mode: 'follower'
        })
    }

    _follow = async() => {
        const { is_following, is_me, isSubmitting } = this.state;
        const { followUser, initialReview, review : { author : { id } } } = this.props;
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
                            isSubmitting: false,
                            follower_count: this.state.follower_count + 1
                        })
                        initialReview()
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
        const { unfollowUser, initialReview, review : { author : { id } } } = this.props;
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
                            isSubmitting: false,
                            follower_count: this.state.follower_count - 1
                        })
                        initialReview()
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

    _like = async() => {
        const { is_liked, isSubmitting } = this.state;
        const { likeReview, initialReview, review : { id } } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeReview(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: true,
                        isSubmitting: false,
                        like_count: this.state.like_count + 1
                    })
                    initialReview()
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }

    _unlike = async() => {
        const { is_liked, isSubmitting } = this.state;
        const { unlikeReview, initialReview, review : { id } } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeReview(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: false,
                        isSubmitting: false,
                        like_count: this.state.like_count - 1
                    })
                    initialReview()
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }
    
    render(){
        return(
            <ArtuiumCard 
            {...this.props}
            {...this.state}
            openProfileModal={this._openProfileModal}
            closeProfileModal={this._closeProfileModal}
            openFollowModal={this._openFollowModal}
            closeFollowModal={this._closeFollowModal}
            follow={this._follow}
            unfollow={this._unfollow}
            like={this._like}
            unlike={this._unlike}
            />
        )
    }
}

export default Container;