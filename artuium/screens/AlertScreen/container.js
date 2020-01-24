import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlertScreen from './presenter';

class Container extends Component{
    constructor(props){
        super(props)
        const notificationNew = props.navigation.getParam('notificationNew', null)
        const noticeNew = props.navigation.getParam('noticeNew', null)
        const handleNoticeNewChange = props.navigation.getParam('handleNoticeNewChange', null)
        const handleNotificationNewChange = props.navigation.getParam('handleNotificationNewChange', null)
        const index = props.navigation.getParam('index', 0)

        this.state = {
            notificationNew,
            noticeNew,
            index
        }

        this.handleNoticeNewChange = handleNoticeNewChange
        this.handleNotificationNewChange = handleNotificationNewChange
    }

    _clearNotification = () => {
        this.setState({
            notificationNew: false
        })
    }

    _clearNotice = () => {
        this.setState({
            noticeNew: false
        })
    }

    render(){
        return(
            <AlertScreen 
            {...this.props}
            {...this.state}
            handleNoticeNewChange={this.handleNoticeNewChange}
            handleNotificationNewChange={this.handleNotificationNewChange}
            clearNotification={this._clearNotification}
            clearNotice={this._clearNotice}
            />
        )
    }
}

export default Container;