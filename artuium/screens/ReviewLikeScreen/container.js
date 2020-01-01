import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ReviewLikeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getReviewLikeList: PropTypes.func.isRequired,
        getReviewLikeListMore: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        likes: [],
        page: 1,
        hasNextPage: true,
        isLoadingMore: false,
        refreshing: false
    }
    
    componentDidMount = async() => {
        const { getReviewLikeList, profile, others } = this.props;
        if(others){
            const likes = await getReviewLikeList(others.id)
            this.setState({
                loading: false,
                likes
            })
        }
        else{
            const likes = await getReviewLikeList(profile.id)
            this.setState({
                loading: false,
                likes
            })
        }
    }
    
    _reviewMore = async() => {
        const { getReviewLikeListMore, profile, others } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(others){
            if(hasNextPage){
                if(!isLoadingMore){
                    await this.setState({
                        isLoadingMore: true
                    });
                    const result = await getReviewLikeListMore(others.id, page+1);
                    if(result){
                        await this.setState({
                            page: this.state.page+1,
                            isLoadingMore: false,
                            likes: [...this.state.likes, ...result]
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
        else{
            if(hasNextPage){
                if(!isLoadingMore){
                    await this.setState({
                        isLoadingMore: true
                    });
                    const result = await getReviewLikeListMore(profile.id, page+1);
                    if(result){
                        await this.setState({
                            page: this.state.page+1,
                            isLoadingMore: false,
                            likes: [...this.state.likes, ...result]
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
    }
    
    _refresh = async() => {
        const { getReviewLikeList, profile, others } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        if(others){
            const likes = await getReviewLikeList(others.id)
            this.setState({
                likes,
                refreshing: false
            })
        }
        else{
            const likes = await getReviewLikeList(profile.id)
            this.setState({
                likes,
                refreshing: false
            })
        }
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
                <ReviewLikeScreen 
                {...this.props}
                {...this.state}
                reviewMore={this._reviewMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;