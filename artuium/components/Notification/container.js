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

    componentDidUpdate = async(prevProps, prevState) => {
        if(!prevState.expand && this.state.expand){
            const { checkNotification, handleNotificationNewChange, notification : { id } } = this.props;
            const { is_new, isSubmitting } = this.state;
            if(!isSubmitting){
                if(is_new){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await checkNotification(id)
                    if(result === 'clear'){
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
            }
        }
    }

    _openExpand = () => {
        this.setState({
            expand: true
        })
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