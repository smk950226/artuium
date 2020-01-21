import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard5 from './presenter';

class Container extends Component{
    static propTypes = {
        review: PropTypes.object.isRequired,
        followUser: PropTypes.func.isRequired,
        unfollowUser: PropTypes.func.isRequired,
        likeReview: PropTypes.func.isRequired,
        unlikeReview: PropTypes.func.isRequired,
        my: PropTypes.bool,
        handleChangeMode:  PropTypes.func,
        reportReview: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { review : { author : { is_me, is_following, following_count, follower_count }, is_liked, like_count, reply_count } } = props;
        this.state = {
            is_liked,
            like_count,
            reply_count,
            is_me,
            is_following,
            follower_count,
            following_count,
            showProfileModal: false,
            mode: 'follower',
            showFollowModal: false,
            isSubmitting: false,
            isReporting: false
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
        const { followUser, review : { author : { id } } } = this.props;
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
        const { unfollowUser, review : { author : { id } } } = this.props;
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
        const { likeReview, review : { id } } = this.props;
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
        const { unlikeReview, review : { id } } = this.props;
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
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }

    _handleOption = async(index, value) => {
        if(value === '신고하기'){
            const { isReporting, is_reported } = this.state;
            const { reportReview, review : { id } } = this.props;
            if(!isReporting){
                if(is_reported){
                    Alert.alert(null, "이미 신고되었습니다.")
                }
                else{
                    this.setState({
                        isReporting: true
                    })
                    const result = await reportReview(id)
                    if(result.status === 'ok'){
                        this.setState({
                            is_reported: true,
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
        else if(value === '수정하기'){
            const { review, goUpdate } = this.props;
            goUpdate(review)
        }
    }
    
    render(){
        return(
            <ArtuiumCard5 
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
            handleOption={this._handleOption}
            />
        )
    }
}

export default Container;