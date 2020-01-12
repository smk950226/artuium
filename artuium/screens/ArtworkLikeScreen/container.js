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
        refreshing: false,
        images: []
    }

    componentDidMount = async() => {
        const { getArtworkLikeList, profile, others } = this.props;
        if(others){
            const likes = await getArtworkLikeList(others.id)
            let images = []
            likes.map(img => {
                images.push({
                    ...img,
                    URL: img.artwork.image
                })
            })
            this.setState({
                loading: false,
                likes,
                images
            })
        }
        else{
            const likes = await getArtworkLikeList(profile.id)
            let images = []
            likes.map(img => {
                images.push({
                    ...img,
                    URL: img.artwork.image
                })
            })
            this.setState({
                loading: false,
                likes,
                images
            })
        }
    }

    _artworkMore = async() => {
        const { getArtworkLikeListMore, profile, others } = this.props;
        const { page, hasNextPage, isLoadingMore } = this.state;
        if(others){
            if(hasNextPage){
                if(!isLoadingMore){
                    await this.setState({
                        isLoadingMore: true
                    });
                    const result = await getArtworkLikeListMore(others.id, page+1);
                    if(result){
                        let images = []
                        result.map(img => {
                            images.push({
                                ...img,
                                URL: img.artwork.image
                            })
                        })
                        await this.setState({
                            page: this.state.page+1,
                            isLoadingMore: false,
                            likes: [...this.state.likes, ...result],
                            images: this.state.images.concat(images)
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
                    const result = await getArtworkLikeListMore(profile.id, page+1);
                    if(result){
                        let images = []
                        result.map(img => {
                            images.push({
                                ...img,
                                URL: img.artwork.image
                            })
                        })
                        await this.setState({
                            page: this.state.page+1,
                            isLoadingMore: false,
                            likes: [...this.state.likes, ...result],
                            images: this.state.images.concat(images)
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
        const { getArtworkLikeList, profile, others } = this.props;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })
        if(others){
            const likes = await getArtworkLikeList(others.id)
            let images = []
            likes.map(img => {
                images.push({
                    ...img,
                    URL: img.artwork.image
                })
            })
            this.setState({
                likes,
                refreshing: false,
                images
            })
        }
        else{
            const likes = await getArtworkLikeList(profile.id)
            let images = []
            likes.map(img => {
                images.push({
                    ...img,
                    URL: img.artwork.image
                })
            })
            this.setState({
                likes,
                refreshing: false,
                images
            })
        }
    }

    _onPressImage = (item, index) => {
        this.props.navigation.navigate('ArtworkDetail', { artwork: item.artwork, from: 'LikeList' })
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
                onPressImage={this._onPressImage}
                />
            )
        }
    }
}

export default Container;