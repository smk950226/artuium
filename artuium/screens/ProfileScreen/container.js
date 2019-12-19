import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProfileScreen from './presenter';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';

class Container extends Component{
    static propTypes = {
        getProfile: PropTypes.func.isRequired,
        profile: PropTypes.object,
        checkNoticeAll: PropTypes.func.isRequired,
        getReviewList: PropTypes.func.isRequired,
        getReviewListMore: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { profile, profile : { following_count, follower_count, is_following, is_me, following_friends_count, like_exhibition_count, like_artwork_count, like_review_count } } = props;
        this.state = {
            loading: profile.id ? false : true,
            loadingReviewList: true,
            showNoticeModal: false,
            noticeNew: false,
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
        const { checkNoticeAll, getReviewList, getProfile } = this.props;
        await getProfile()
        const noticeNew = await checkNoticeAll()
        if(noticeNew.is_new){
            this.setState({
                noticeNew: true
            })
        }
        const reviewList = await getReviewList()
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
                const result = await getReviewListMore(page+1);
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

        const reviewList = await getReviewList()
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
        this.setState({
            noticeNew
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
                <ProfileScreen 
                {...this.props}
                {...this.state}
                openNoticeModal={this._openNoticeModal}
                closeNoticeModal={this._closeNoticeModal}
                handleNoticeNewChange={this._handleNoticeNewChange}
                reviewListMore={this._reviewListMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;