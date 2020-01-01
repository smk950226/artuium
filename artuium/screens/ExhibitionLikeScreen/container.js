import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ExhibitionLikeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getExhibitionLikeList: PropTypes.func.isRequired,
        getExhibitionLikeListMore: PropTypes.func.isRequired
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
        const { getExhibitionLikeList, profile, others } = this.props;
        if(others){
            const likes = await getExhibitionLikeList(others.id)
            this.setState({
                loading: false,
                likes
            })
        }
        else{
            const likes = await getExhibitionLikeList(profile.id)
            this.setState({
                loading: false,
                likes
            })
        }
    }
    
    _exhibitionMore = async() => {
        const { getExhibitionLikeListMore, profile, others } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(others){
            if(hasNextPage){
                if(!isLoadingMore){
                    await this.setState({
                        isLoadingMore: true
                    });
                    const result = await getExhibitionLikeListMore(others.id, page+1);
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
                    const result = await getExhibitionLikeListMore(profile.id, page+1);
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
        const { getExhibitionLikeList, profile, others } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        if(others){
            const likes = await getExhibitionLikeList(others.id)
            this.setState({
                likes,
                refreshing: false
            })
        }
        else{
            const likes = await getExhibitionLikeList(profile.id)
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
                <ExhibitionLikeScreen 
                {...this.props}
                {...this.state}
                exhibitionMore={this._exhibitionMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;