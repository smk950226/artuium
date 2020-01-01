import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ProfileScreen from './presenter';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import { NavigationEvents } from "react-navigation";

class Container extends Component{
    static propTypes = {
        getProfile: PropTypes.func.isRequired,
        profile: PropTypes.object,
        getReviewList: PropTypes.func.isRequired,
        getReviewListMore: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props)
        const { profile } = props;
        this.state = {
            isSubmitting: false,
            loading: profile.id ? false : true,
            loadingReviewList: true,
            showNoticeModal: false,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            reviewList: [],
            refreshing: false,
            others: props.navigation.getParam('others', null)
        }
    }

    _follow = async() => {
        const { others, isSubmitting } = this.state;
        const { followUser } = this.props;
        if(!isSubmitting){
            if(!others.is_me){
                if(!others.is_following){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await followUser(others.id)
                    if(result.status === 'ok'){
                        this.setState({
                            isSubmitting: false,
                            others: {
                                ...others,
                                is_following: true,
                                follower_count: this.state.others.follower_count + 1
                            }
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
        const { others, isSubmitting } = this.state;
        const { unfollowUser } = this.props;
        if(!isSubmitting){
            if(!others.is_me){
                if(others.is_following){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await unfollowUser(others.id)
                    if(result.status === 'ok'){
                        this.setState({
                            others: {
                                ...others,
                                is_following: false,
                                follower_count: this.state.others.follower_count - 1
                            },
                            isSubmitting: false,
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

    componentDidMount = async() => {
        const { getReviewList, getProfile } = this.props;
        await getProfile()
        const reviewList = await getReviewList(this.state.others.id)
        this.setState({
            reviewList,
            loadingReviewList: false
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if((nextProps.profile)){
            const { profile } = nextProps;
            return {
                profile
            }
        }
        else{
            return null
        }
    }

    _reviewListMore = async() => {
        const { getReviewListMore } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getReviewListMore(this.state.others.id, page+1);
                if(result){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        reviewList: [...this.state.reviewList, ...result]
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
        const { getReviewList } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        const reviewList = await getReviewList(this.state.others.id)
        this.setState({
            reviewList,
            refreshing: false
        })
    }

    _remount = async() => {
        const { getReviewList, getProfile } = this.props;
        await getProfile()
        const reviewList = await getReviewList(this.state.others.id)
        this.setState({
            reviewList,
            loadingReviewList: false
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
                <Fragment>
                    <NavigationEvents
                    onWillFocus={payload => {
                        this._remount()
                    }}
                    />
                    <ProfileScreen 
                    {...this.props}
                    {...this.state}
                    openNoticeModal={this._openNoticeModal}
                    closeNoticeModal={this._closeNoticeModal}
                    handleNoticeNewChange={this._handleNoticeNewChange}
                    reviewListMore={this._reviewListMore}
                    refresh={this._refresh}
                    handleNotificationNewChange={this._handleNotificationNewChange}
                    follow={this._follow}
                    unfollow={this._unfollow}
                    />
                </Fragment>
            )
        }
    }
}

export default Container;