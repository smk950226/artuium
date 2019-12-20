import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ArtworkLikeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getArtworkLikeList: PropTypes.func.isRequired,
        getArtworkLikeListMore: PropTypes.func.isRequired
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
        const { getArtworkLikeList } = this.props;
        const likes = await getArtworkLikeList()
        this.setState({
            loading: false,
            likes
        })
    }

    _artworkMore = async() => {
        const { getArtworkLikeListMore } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getArtworkLikeListMore(page+1);
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

    _refresh = async() => {
        const { getArtworkLikeList } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const likes = await getArtworkLikeList()
        this.setState({
            likes,
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
                <ArtworkLikeScreen 
                {...this.props}
                {...this.state}
                artworkMore={this._artworkMore}
                refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;