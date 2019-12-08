import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import NoticeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        getNotice: PropTypes.func.isRequired,
        getNoticeMore: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        notice: [],
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        refreshing: false
    }

    componentDidMount = async() => {
        const { getNotice } = this.props;
        const notice = await getNotice()
        this.setState({
            notice,
            loading: false
        })
    }

    _noticeMore = async() => {
        const { getNoticeMore } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getNoticeMore(page+1);
                if(result){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        notice: [...this.state.notice, ...result]
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
        const { getNotice } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const notice = await getNotice()
        this.setState({
            notice,
            refreshing: false
        })
    }  


    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size={'small'} color={'#000'} />
                </View>
            )
        }
        else{
            return(
                <NoticeScreen 
                {...this.props}
                {...this.state}
                noticeMore={this._noticeMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;