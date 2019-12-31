import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReplyCard from './presenter';

class Container extends Component{
    static propTypes = {
        reply: PropTypes.object.isRequired,
        getRepliesList: PropTypes.func.isRequired,
        selectReply: PropTypes.func.isRequired,
        selectedReply: PropTypes.object,
        followUser: PropTypes.func.isRequired,
        unfollowUser: PropTypes.func.isRequired,
        initialReview: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { reply, reply : { author : { is_me, is_following, following_count, follower_count } } } = props;
        this.state = {
            is_me,
            is_following,
            isSubmitting: false,
            showProfileModal: false,
            following_count,
            follower_count,
            mode: 'follower',
            showFollowModal: false,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            reply
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.reply !== this.props.reply){
            this.setState({
                reply: this.props.reply
            })
        }
    }

    _replyListMore = async() => {
        const { getRepliesList } = this.props;
        const { page, hasNextPage, isLoadingMore, reply : { id } } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getRepliesList(id, page);
                if(result.status === 'ok'){
                    await this.setState({
                        page: this.state.page+1,
                        hasNextPage: result.has_next_page,
                        isLoadingMore: false,
                        reply: {
                            ...this.state.reply,
                            initial_replies: [
                                ...this.state.reply.initial_replies,
                                ...result.replies
                            ]
                        }
                    })
                }
                else{
                    this.setState({
                        isLoadingMore: false,
                        hasNextPage: false
                    })
                }
            }
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
        const { followUser, initialReview, reply : { author : { id } } } = this.props;
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
        const { unfollowUser, initialReview, reply : { author : { id } } } = this.props;
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

    
    render(){
        const { reply } = this.state;
        return(
            <ReplyCard 
                {...this.props}
                {...this.state}
                reply={reply}
                replyListMore={this._replyListMore}
                openProfileModal={this._openProfileModal}
                closeProfileModal={this._closeProfileModal}
                openFollowModal={this._openFollowModal}
                closeFollowModal={this._closeFollowModal}
                follow={this._follow}
                unfollow={this._unfollow}
            />
        )
    }
}

export default Container;