import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notification from './presenter';

class Container extends Component{
    static propTypes = {
        notification: PropTypes.object.isRequired,
        checkNotification: PropTypes.func.isRequired,
        handleNotificationNewChange: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { notification : { is_new } } = props;
        this.state = {
            expand: false,
            is_new,
            isSubmitting: false
        }
    }

    _openExpand = async() => {
        const { checkNotification, handleNotificationNewChange, notification, notification : { id }, navigation, clearNotification } = this.props;
        const { is_new, isSubmitting } = this.state;
        if(!isSubmitting){
            if(is_new){
                this.setState({
                    isSubmitting: true
                })
                const result = await checkNotification(id)
                if(result === 'clear'){
                    clearNotification()
                    handleNotificationNewChange(false)
                    this.setState({
                        is_new: false,
                        isSubmitting: false
                    })
                }
                else if(result){
                    this.setState({
                        is_new: false,
                        isSubmitting: false
                    })
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
            if(notification.type === 'comment_review'){
                if(notification.review.exhibition){
                    navigation.navigate('ExhibitionContent', { exhibition: notification.review.exhibition, mode: 'review', review: notification.review })
                }
                else{
                    navigation.navigate('ArtworkContent', { artwork: notification.review.artwork, mode: 'review', review: notification.review })
                }
            }
            else if(notification.type === 'comment_reply'){
                if(notification.review.exhibition){
                    navigation.navigate('ExhibitionContent', { exhibition: notification.review.exhibition, mode: 'review', review: notification.review })
                }
                else{
                    navigation.navigate('ArtworkContent', { artwork: notification.review.artwork, mode: 'review', review: notification.review })
                }
            }
            else if(notification.type === 'like_review'){
                if(notification.review.exhibition){
                    navigation.navigate('ExhibitionContent', { exhibition: notification.review.exhibition, mode: 'review', review: notification.review })
                }
                else{
                    navigation.navigate('ArtworkContent', { artwork: notification.review.artwork, mode: 'review', review: notification.review })
                }
            }
            else if(notification.type === 'following'){
                navigation.navigate('OthersProfile', { others: notification.from_user })
            }
        }
    }

    _closeExpand = () => {
        this.setState({
            expand: false
        })
    }

    render(){
        return(
            <Notification 
            {...this.props} 
            {...this.state}
            openExpand={this._openExpand}
            closeExpand={this._closeExpand}
            />
        )
    }
}

export default Container;