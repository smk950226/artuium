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
        checkNoticeAll: PropTypes.func.isRequired,
        checkNotificationAll: PropTypes.func.isRequired,
        getReviewList: PropTypes.func.isRequired,
        getReviewListMore: PropTypes.func.isRequired,
        getNoticeNew: PropTypes.func.isRequired,
        getNotificationNew: PropTypes.func.isRequired,
        noticeNew: PropTypes.bool.isRequired,
        notificationNew: PropTypes.bool.isRequired
    }

    constructor(props){
        super(props)
        const { profile, profile : { following_count, follower_count, is_following, is_me, following_friends_count, like_exhibition_count, like_artwork_count, like_review_count }, noticeNew, notificationNew } = props;
        this.state = {
            loading: profile.id ? false : true,
            loadingReviewList: true,
            showNoticeModal: false,
            noticeNew,
            notificationNew,
            following_count, 
            follower_count, 
            is_following, 
            is_me, 
            following_friends_count,
            like_exhibition_count,
            like_artwork_count,
            like_review_count,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            reviewList: [],
            refreshing: false
        }
    }

    componentDidMount = async() => {
        const { checkNoticeAll, getReviewList, getProfile, checkNotificationAll, getNoticeNew, getNotificationNew } = this.props;
        await getProfile()
        const noticeNew = await checkNoticeAll()
        const notificationNew = await checkNotificationAll()
        if(noticeNew.is_new){
            getNoticeNew(true)
            this.setState({
                noticeNew: true
            })
        }
        else{
            getNoticeNew(false)
            this.setState({
                noticeNew: false
            })
        }
        if(notificationNew.is_new){
            getNotificationNew(true)
            this.setState({
                notificationNew: true
            })
        }
        else{
            getNotificationNew(false)
            this.setState({
                notificationNew: false
            })
        }
        const reviewList = await getReviewList(this.props.profile.id)
        this.setState({
            reviewList,
            loadingReviewList: false
        })
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if((nextProps.profile)){
            const { profile : { following_count, follower_count, is_following, is_me, following_friends_count, like_exhibition_count, like_artwork_count, like_review_count } } = nextProps;
            return {
                following_count,
                follower_count,
                is_following,
                is_me,
                following_friends_count,
                like_exhibition_count,
                like_artwork_count,
                like_review_count
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
                const result = await getReviewListMore(this.props.profile.id, page+1);
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

        const reviewList = await getReviewList(this.props.profile.id)
        this.setState({
            reviewList,
            refreshing: false
        })
    }  

    _openNoticeModal = () => {
        this.setState({
            showNoticeModal: true
        })
    }

    _closeNoticeModal = () => {
        this.setState({
            showNoticeModal: false
        })
    }

    _handleNoticeNewChange = (noticeNew) => {
        this.props.getNoticeNew(noticeNew)
        this.setState({
            noticeNew
        })
    }

    _handleNotificationNewChange = (notificationNew) => {
        this.props.getNotificationNew(notificationNew)
        this.setState({
            notificationNew
        })
    }

    _remount = async() => {
        const { checkNoticeAll, getReviewList, getProfile, checkNotificationAll, getNoticeNew, getNotificationNew } = this.props;
        await getProfile()
        const noticeNew = await checkNoticeAll()
        const notificationNew = await checkNotificationAll()
        if(noticeNew.is_new){
            getNoticeNew(true)
            this.setState({
                noticeNew: true
            })
        }
        else{
            getNoticeNew(false)
            this.setState({
                noticeNew: false
            })
        }
        if(notificationNew.is_new){
            getNotificationNew(true)
            this.setState({
                notificationNew: true
            })
        }
        else{
            getNotificationNew(false)
            this.setState({
                notificationNew: false
            })
        }
        const reviewList = await getReviewList(this.props.profile.id)
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
                    />
                </Fragment>
            )
        }
    }
}

export default Container;