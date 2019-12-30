import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import NotificationScreen from './presenter';

class Container extends Component{
    static propTypes = {
        getNotification: PropTypes.func.isRequired,
        getNotificationMore: PropTypes.func.isRequired,
    }

    state = {
        loading: true,
        notification: [],
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        refreshing: false,
        is_new: false
    }

    componentDidMount = async() => {
        const { getNotification } = this.props;
        const notification = await getNotification()
        this.setState({
            notification: notification.notification,
            is_new: notification.is_new,
            loading: false
        })
    }

    _notificationMore = async() => {
        const { getNotificationMore } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getNotificationMore(page+1);
                if(result){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        notification: [...this.state.notification, ...result.notification],
                        is_new: result.is_new
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

    _refresh = async() => {
        const { getNotification } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const notification = await getNotification()
        this.setState({
            notification: notification.notification,
            is_new: notification.is_new,
            refreshing: false
        })
    }  


    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgGrayF8]}>
                    <ActivityIndicator size={'small'} color={'#000'} />
                </View>
            )
        }
        else{
            return(
                <NotificationScreen 
                {...this.props}
                {...this.state}
                notificationMore={this._notificationMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;