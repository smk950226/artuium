import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ArtworkDetailScreen from './presenter';

class Container extends Component{
    static propTypes = {
        likeArtwork: PropTypes.func.isRequired,
        unlikeArtwork: PropTypes.func.isRequired,
        getExhibitionDetailByArtwork: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const artwork = props.navigation.getParam('artwork', null)
        const from = props.navigation.getParam('from', null)
        const { is_liked, like_count, review_count } = artwork;
        this.state = {
            artwork,
            is_liked,
            like_count,
            review_count,
            isSubmitting: false,
            loading: true,
            from
        }
    }

    componentDidMount = async() => {
        const  { getExhibitionDetailByArtwork } = this.props;
        const { artwork : { id } } = this.state;
        const result = await getExhibitionDetailByArtwork(id)
        if(result.status === 'ok'){
            this.setState({
                exhibition: result.exhibition,
                loading: false
            })
        }
        else{
            this.setState({
                loading: false,
                exhibition: null
            })
        }
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps !== this.props){
            const from = this.props.navigation.getParam('from', null)
            this.setState({
                from
            })
        }
    }

    _like = async() => {
        const { is_liked, isSubmitting, artwork : { id } } = this.state;
        const { likeArtwork } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeArtwork(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: true,
                        isSubmitting: false,
                        like_count: this.state.like_count + 1
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

    _unlike = async() => {
        const { is_liked, isSubmitting, artwork : { id } } = this.state;
        const { unlikeArtwork } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeArtwork(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: false,
                        isSubmitting: false,
                        like_count: this.state.like_count - 1
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
                <ArtworkDetailScreen 
                {...this.props}
                {...this.state}
                like={this._like}
                unlike={this._unlike}
                />
            )
        }
        
    }
}

export default Container;