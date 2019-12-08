import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import FollowingList from './presenter';

class Container extends Component{
    static propTypes = {
        followingList: PropTypes.func.isRequired,
        followingListMore: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    state = {
        loading: true,
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        userList: [],
        refreshing: false
    }

    componentDidMount = async() => {
        const { followingList, user } = this.props;
        const result = await followingList(user.id);
        if(result.status === 'ok'){
            this.setState({
                userList: result.user_list,
                loading: false
            })
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    _userListMore = async() => {
        const { followingListMore, user } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await followingListMore(user.id, page+1);
                if(result){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        userList: [...this.state.userList, ...result.user_list],
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
        const { followingList, user } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const result = await followingList(user.id)
        this.setState({
            userList: result.user_list,
            refreshing: false
        })
    }  

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgWhite]}>
                    <ActivityIndicator size={'small'} color={'#000000'} />
                </View>
            )
        }
        else{
            return(
                <FollowingList 
                {...this.props} 
                {...this.state}
                userListMore={this._userListMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;